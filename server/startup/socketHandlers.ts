import { Socket } from 'socket.io';
import SocketEvents from '../../client/src/constants/socketEvents'
import { randomBytes } from 'crypto';
import { io } from './index'

class SocketInfo {
    username: string
    socket: Socket
    gameRoom: string
    partyRoom: string

    constructor(socket: Socket, username = '') {
        this.username = username
        this.socket = socket
        this.gameRoom = ''
        this.partyRoom = ''
    }
}

// The queue that will hold all players currently queueing for a game by username
export const queue : Socket[] = []

// Maps socket ids to an object holding info about their state in the app
const socketInfos = new Map<string, SocketInfo>()

// TODO: ADD NAMESPACES SUCH AS /game, /message, etc.

export function handleConnection(socket: Socket) {

    // Maps the newly connected socket to an object holding its rooms
    socketInfos.set(socket.id, new SocketInfo(socket))

    socket.on('disconnect', () => {

        if (queue.includes(socket))
            queue.splice(queue.indexOf(socket), 1)

        socketInfos.delete(socket.id)
    })

    socket.on(SocketEvents.SET_USERNAME, (data) => {
        (socketInfos.get(socket.id) as SocketInfo).username = data
        console.log(data)
    })

    socket.on(SocketEvents.QUEUE_UP, (data) => {

        if (queue.length >= 3) {

            // Generate random room number and join it
            let room = randomBytes(8).toString('hex')
            socket.join(room)

            // Update room data structure
            const currSocketInfo = socketInfos.get(socket.id) as SocketInfo
            currSocketInfo.username = data
            currSocketInfo.gameRoom = room

            const players = []
            players.push(currSocketInfo.username)

            // Pop players from queue and add them to the room
            for (let i = 0; i < 3; i++) {
                const teammateSocket = queue.shift() as Socket
                teammateSocket.join(room)

                const currTeammateSocketInfo = socketInfos.get(teammateSocket.id) as SocketInfo
                currTeammateSocketInfo.gameRoom = room

                players.push(currTeammateSocketInfo.username)
            }

            io.to(room).emit(SocketEvents.MATCH_FOUND, {
                players: players
            })
        }
        else {
            queue.push(socket)
        }   
    })

    socket.on(SocketEvents.LEAVE_QUEUE, (data) => {
        if (queue.includes(socket))
            queue.splice(queue.indexOf(socket), 1)
    })

    // PARTY

    socket.on(SocketEvents.PARTY_INVITE, (data) => {

        console.log(data)
        console.log(socketInfos)
        console.log("PARTY INVITE")

        const receiverInfo = [...socketInfos.values()].find(socketInfo => socketInfo.username == data.receiver)

        console.log(receiverInfo)

        if (receiverInfo == undefined) {
            socket.emit(SocketEvents.ERROR, 'User invited no longer exists.')
            return
        }

        socket.to(receiverInfo.socket.id).emit(SocketEvents.PARTY_INVITE, {
            inviter: data.inviter
        })
    })

    socket.on(SocketEvents.PARTY_INVITE_ACCEPTED, async (data) => {

        // Find the inviter's socket info using the given inviter's username
        const inviterInfo = [...socketInfos.values()].find(socketInfo => socketInfo.username == data.inviter)

        if (inviterInfo == undefined) {
            socket.emit(SocketEvents.ERROR, 'User invited no longer exists.')
            return
        }

        // Create a party room for the inviter if no party exists
        if (inviterInfo.partyRoom == '') {
            let room = randomBytes(8).toString('hex')
            inviterInfo.socket.join(room)
            inviterInfo.partyRoom = room
        }

        // Add the accepter to the party room
        const accepterInfo = socketInfos.get(socket.id) as SocketInfo
        let room = inviterInfo.partyRoom
        socket.join(room)
        accepterInfo.partyRoom = room

        const partyUsers = [...socketInfos.values()].filter(socketInfo => socketInfo.partyRoom == room)?.map(user => user.username)

        console.log("PARTYUSERES:" + partyUsers)
        console.log(socketInfos)
        // Let the inviter know that the accepter has accepted the invite
        io.to(room).emit(SocketEvents.UPDATE_PARTY_INFO, {
            partyUsers: partyUsers
        })
    })

    socket.on(SocketEvents.LEAVE_PARTY, (data) => {

        const oldPartyRoom = (socketInfos.get(socket.id) as SocketInfo).partyRoom;
        (socketInfos.get(socket.id) as SocketInfo).partyRoom = ''

        io.to(oldPartyRoom).emit(SocketEvents.UPDATE_PARTY_INFO, {
            partyUsers: data.partyUsers
        })
    })

    // GAMEPLAY

    // data is a player username, and a vec
    socket.on(SocketEvents.PLAYER_MOVED, (data) => {
        io.to((socketInfos.get(socket.id) as SocketInfo).gameRoom).emit(SocketEvents.PLAYER_MOVED, data)
    })

    // data is a player username
    socket.on(SocketEvents.STOP_FOLLOW, (data) => {
        io.to((socketInfos.get(socket.id) as SocketInfo).gameRoom).emit(SocketEvents.STOP_FOLLOW, data)
    })
}

