"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authManager() {
    // Middleware used in subsequent requests after the user is logged in
    const verify = (req, res, next) => {
        console.log("req: " + req);
        console.log("next: " + next);
        console.log("Who called verify?");
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    loggedIn: false,
                    user: null,
                    errorMessage: "Unauthorized"
                });
            }
            const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            console.log("verified.userId: " + verified.userId);
            req.userId = verified.userId;
            next();
        }
        catch (err) {
            console.error(err);
            return res.status(401).json({
                loggedIn: false,
                user: null,
                errorMessage: "Unauthorized"
            });
        }
    };
    // Used when the user is logging in
    const verifyUser = (req) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return null;
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            return decodedToken.userId;
        }
        catch (err) {
            return null;
        }
    };
    const signToken = (userId) => {
        return jsonwebtoken_1.default.sign({
            userId: userId
        }, process.env.JWT_SECRET);
    };
    return {
        verify,
        verifyUser,
        signToken
    };
}
exports.auth = authManager();
//# sourceMappingURL=index.js.map