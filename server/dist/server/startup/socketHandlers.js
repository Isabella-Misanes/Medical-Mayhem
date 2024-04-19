"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnection = exports.queue = void 0;
const socketEvents_1 = __importDefault(require("../../client/src/constants/socketEvents"));
const crypto_1 = require("crypto");
const index_1 = require("./index");
// The queue that will hold all players currently queueing for a game by email
exports.queue = [];
// TODO: CHANGE any TYPE TO AN OBJECT THAT HOLDS ALL POSSIBLE ROOMS TYPES
// Maps socket ids to objects that holds room ids
const socketRooms = new Map();
// TODO: ADD NAMESPACES SUCH AS /game, /message, etc.
function handleConnection(socket) {
    // Maps room names to room ids (ex: 'game': 123456)
    socketRooms.set(socket.id, new Map());
    // QUEUEING PLAYERS FOR GAMES
    socket.on('disconnect', () => {
        if (exports.queue.includes(socket))
            exports.queue.splice(exports.queue.indexOf(socket), 1);
        socketRooms.delete(socket.id);
    });
    socket.on(socketEvents_1.default.QUEUE_UP, (data) => {
        const opponentSocket = exports.queue.shift();
        if (opponentSocket) {
            let room = (0, crypto_1.randomBytes)(8).toString('hex');
            socket.join(room);
            socketRooms.get(socket.id).set('game', room);
            opponentSocket.join(room);
            socketRooms.get(opponentSocket.id).set('game', room);
            index_1.io.to(room).emit(socketEvents_1.default.MATCH_FOUND);
        }
        else {
            exports.queue.push(socket);
        }
        console.log(socketRooms);
    });
    socket.on(socketEvents_1.default.LEAVE_QUEUE, (data) => {
        if (exports.queue.includes(socket))
            exports.queue.splice(exports.queue.indexOf(socket), 1);
        console.log(exports.queue);
    });
    // GAMEPLAY SCORE KEEPING
    socket.on(socketEvents_1.default.MY_SCORE_CHANGE, (data) => {
        socket.to(socketRooms.get(socket.id).get('game'))
            .emit(socketEvents_1.default.OPPONENT_SCORE_CHANGE, data);
    });
}
exports.handleConnection = handleConnection;
//# sourceMappingURL=socketHandlers.js.map