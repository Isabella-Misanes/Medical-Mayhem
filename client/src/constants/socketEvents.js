// This is all of the possible events that the client and server can send back and forth between each other.

const SocketEvents = {
    
    // SENT BY CLIENT
    QUEUE_UP: "QUEUE_UP",
    LEAVE_QUEUE: "LEAVE_QUEUE",

    // SENT BY SERVER
    MATCH_FOUND: "MATCH_FOUND"
}

export default SocketEvents