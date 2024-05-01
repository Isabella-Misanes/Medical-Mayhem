import io from 'socket.io-client'
import rootDomain from './baseURL';
import SocketEvents from './socketEvents';

const socket = io.connect(rootDomain)

// socket.on(SocketEvents.PARTY_INVITE_ACCEPTED, ({accepter}) => {
    
// })

export default socket