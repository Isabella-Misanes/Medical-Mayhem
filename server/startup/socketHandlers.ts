import { Socket } from 'socket.io';
import SocketEvents from '../../client/src/constants/socketEvents'
import { randomBytes } from 'crypto';
import { io } from './index'

class Rooms {
    gameRoom: string

    constructor() {
        this.gameRoom = ''
    }
}

// The queue that will hold all players currently queueing for a game by email
export const queue : Socket[] = []

// Maps socket ids to a set of rooms
const socketRooms = new Map<string, Rooms>()

// TODO: ADD NAMESPACES SUCH AS /game, /message, etc.

export function handleConnection(socket: Socket) {

    // Maps the newly connected socket to an object holding its rooms
    socketRooms.set(socket.id, new Rooms())

    // QUEUEING PLAYERS FOR GAMES

    socket.on('disconnect', () => {

        if (queue.includes(socket))
            queue.splice(queue.indexOf(socket), 1)

        socketRooms.delete(socket.id)
    })

    socket.on(SocketEvents.QUEUE_UP, (data) => {

        const opponentSocket = queue.shift()

        if (opponentSocket) {

            // Generate random room number and join it
            let room = randomBytes(8).toString('hex')
            socket.join(room)

            // Update room data structure
            const currSocketRooms = socketRooms.get(socket.id)

            if (currSocketRooms === undefined) {
                socket.emit('error', 'Socket no longer exists. Please try again later.')
                return
            }

            // Do the same for the opponent socket
            currSocketRooms.gameRoom = room

            const currOppSocketRooms = socketRooms.get(opponentSocket.id)

            if (currOppSocketRooms === undefined) {
                socket.emit('error', 'Socket no longer exists. Please try again later.')
                return
            }

            opponentSocket.join(room)
            currOppSocketRooms.gameRoom = room
            
            io.to(room).emit(SocketEvents.MATCH_FOUND)
        }
        else {
            queue.push(socket)
        }   
    })

    socket.on(SocketEvents.LEAVE_QUEUE, (data) => {
        if (queue.includes(socket))
            queue.splice(queue.indexOf(socket), 1)
        console.log(queue)
    })

    // GAMEPLAY SCORE KEEPING

    socket.on(SocketEvents.MY_SCORE_CHANGE, (data) => {
        const currSocketRooms = socketRooms.get(socket.id)

        if (currSocketRooms === undefined) {
            socket.emit('error', 'Socket no longer exists. Please try again later.')
            return
        }

        socket.to(currSocketRooms.gameRoom)
            .emit(SocketEvents.OPPONENT_SCORE_CHANGE, data)
    })
}

