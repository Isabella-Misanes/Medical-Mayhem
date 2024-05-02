import io from 'socket.io-client'
import rootDomain from './baseURL';
import SocketEvents from './socketEvents';

const socket = io.connect(rootDomain)

export default socket