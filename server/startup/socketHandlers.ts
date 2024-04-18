import { Socket } from 'socket.io';
import SocketEvents from '../../client/src/constants/socketEvents'
import { randomBytes } from 'crypto';
import { io } from './index'

// The queue that will hold all players currently queueing for a game by email
export const queue : Socket[] = []

// TODO: CHANGE any TYPE TO AN OBJECT THAT HOLDS ALL POSSIBLE ROOMS TYPES
// Maps socket ids to objects that holds room ids
const socketRooms = new Map<string, any>()

// TODO: ADD NAMESPACES SUCH AS /game, /message, etc.

export function handleConnection(socket: Socket) {

    // Maps room names to room ids (ex: 'game': 123456)
    socketRooms.set(socket.id, new Map<string, any>())

    // QUEUEING PLAYERS FOR GAMES

    socket.on('disconnect', () => {

        if (queue.includes(socket))
            queue.splice(queue.indexOf(socket), 1)

        socketRooms.delete(socket.id)
    })

    socket.on(SocketEvents.QUEUE_UP, (data) => {

        const opponentSocket = queue.shift()

        if (opponentSocket) {
            let room = randomBytes(8).toString('hex')
            
            socket.join(room)
            socketRooms.get(socket.id).set('game', room)

            opponentSocket.join(room)
            socketRooms.get(opponentSocket.id).set('game', room)
            
            io.to(room).emit(SocketEvents.MATCH_FOUND)
        }
        else {
            console.log('PUSH')
            queue.push(socket)
        }

        console.log("SOCKET ROOMS")
        console.log(socketRooms)
    })

    socket.on(SocketEvents.LEAVE_QUEUE, (data) => {
        if (queue.includes(socket))
            queue.splice(queue.indexOf(socket), 1)
        console.log(queue)
    })

    // GAMEPLAY SCORE KEEPING

    socket.on(SocketEvents.MY_SCORE_CHANGE, (data) => {
        socket.to(socketRooms.get(socket.id).get('game'))
            .emit(SocketEvents.OPPONENT_SCORE_CHANGE, data)
    })
}

