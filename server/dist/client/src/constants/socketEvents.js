"use strict";
// This is all of the possible events that the client and server can send back and forth between each other.
Object.defineProperty(exports, "__esModule", { value: true });
const SocketEvents = {
    // SENT BY CLIENT
    QUEUE_UP: "QUEUE_UP",
    MY_SCORE_CHANGE: "MY_SCORE_CHANGE",
    LEAVE_QUEUE: "LEAVE_QUEUE",
    // SENT BY SERVER
    MATCH_FOUND: "MATCH_FOUND",
    OPPONENT_SCORE_CHANGE: "OPPONENT_SCORE_CHANGE",
    ERROR: "ERROR"
};
exports.default = SocketEvents;
//# sourceMappingURL=socketEvents.js.map