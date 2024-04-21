"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnection = exports.queue = void 0;
const socketEvents_1 = __importDefault(require("../../client/src/constants/socketEvents"));
const crypto_1 = require("crypto");
const index_1 = require("./index");
class Rooms {
    constructor() {
        this.gameRoom = '';
    }
}
// The queue that will hold all players currently queueing for a game by email
exports.queue = [];
// Maps socket ids to a set of rooms
const socketRooms = new Map();
// TODO: ADD NAMESPACES SUCH AS /game, /message, etc.
function handleConnection(socket) {
    // Maps the newly connected socket to an object holding its rooms
    socketRooms.set(socket.id, new Rooms());
    // QUEUEING PLAYERS FOR GAMES
    socket.on('disconnect', () => {
        if (exports.queue.includes(socket))
            exports.queue.splice(exports.queue.indexOf(socket), 1);
        socketRooms.delete(socket.id);
    });
    socket.on(socketEvents_1.default.QUEUE_UP, (data) => {
        const opponentSocket = exports.queue.shift();
        if (opponentSocket) {
            // Generate random room number and join it
            let room = (0, crypto_1.randomBytes)(8).toString('hex');
            socket.join(room);
            // Update room data structure
            const currSocketRooms = socketRooms.get(socket.id);
            if (currSocketRooms === undefined) {
                socket.emit('error', 'Socket no longer exists. Please try again later.');
                return;
            }
            // Do the same for the opponent socket
            currSocketRooms.gameRoom = room;
            const currOppSocketRooms = socketRooms.get(opponentSocket.id);
            if (currOppSocketRooms === undefined) {
                socket.emit('error', 'Socket no longer exists. Please try again later.');
                return;
            }
            opponentSocket.join(room);
            currOppSocketRooms.gameRoom = room;
            index_1.io.to(room).emit(socketEvents_1.default.MATCH_FOUND);
        }
        else {
            exports.queue.push(socket);
        }
    });
    socket.on(socketEvents_1.default.LEAVE_QUEUE, (data) => {
        if (exports.queue.includes(socket))
            exports.queue.splice(exports.queue.indexOf(socket), 1);
        console.log(exports.queue);
    });
    // GAMEPLAY SCORE KEEPING
    socket.on(socketEvents_1.default.MY_SCORE_CHANGE, (data) => {
        const currSocketRooms = socketRooms.get(socket.id);
        if (currSocketRooms === undefined) {
            socket.emit('error', 'Socket no longer exists. Please try again later.');
            return;
        }
        socket.to(currSocketRooms.gameRoom)
            .emit(socketEvents_1.default.OPPONENT_SCORE_CHANGE, data);
    });
}
exports.handleConnection = handleConnection;
//# sourceMappingURL=socketHandlers.js.map