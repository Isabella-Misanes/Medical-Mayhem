import { Socket } from 'socket.io';
import { queue } from './index'
import SocketEvents from '../../client/src/constants/socketEvents'
import { randomBytes } from 'crypto';
import { io } from './index'

export function handleConnection(socket: Socket) {

    // QUEUEING PLAYERS FOR GAMES

    socket.on('disconnect', () => {

        if (queue.includes(socket))
            queue.splice(queue.indexOf(socket), 1)
    })

    socket.on(SocketEvents.QUEUE_UP, (data) => {

        if (!queue.includes(data.email)) {
            if (queue.length > 0) {

                let room = 'game'
                
                socket.join(room)
                
                const opponentSocket = queue.shift()
                if (!opponentSocket)
                    return

                opponentSocket.join(room)

                io.to(room).emit(SocketEvents.MATCH_FOUND)
            }
            else {
                queue.push(socket)
            }

            console.log(queue)
        }
    })

    socket.on(SocketEvents.LEAVE_QUEUE, (data) => {
        if (queue.includes(socket))
            queue.splice(queue.indexOf(socket), 1)
        console.log(queue)
    })
}

