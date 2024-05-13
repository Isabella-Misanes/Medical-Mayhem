// This is all of the possible events that the client and server can send back and forth between each other.

const SocketEvents = {
    
    // SENT BY CLIENT
    QUEUE_UP: "QUEUE_UP",
    MY_SCORE_CHANGE: "MY_SCORE_CHANGE",
    LEAVE_QUEUE: "LEAVE_QUEUE",
    SET_USERNAME: "SET_USERNAME",
    PARTY_INVITE: "PARTY_INVITE",
    PARTY_INVITE_ACCEPTED: "PARTY_INVITE_ACCEPTED",
    UPDATE_PARTY_INFO: "UPDATE_PARTY_INFO", // when a user is added to a party, the inviter will send current party members
    LEAVE_PARTY: "LEAVE_PARTY",
    CHANGE_READY: "CHANGE_READY",
    SEND_PUBLIC_MESSAGE: "SEND_PUBLIC_MESSAGE",
    RECEIVE_PUBLIC_MESSAGE: "RECEIVE_PUBLIC_MESSAGE",

    // SENT BY SERVER
    MATCH_FOUND: "MATCH_FOUND",
    OPPONENT_SCORE_CHANGE: "OPPONENT_SCORE_CHANGE",
    ERROR: "ERROR",

    PLAYER_MOVED: "PLAYER_MOVED",
    STOP_FOLLOW: "STOP_FOLLOW"
}

export default SocketEvents