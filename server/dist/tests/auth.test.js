"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') }); // ty DavidP on SO
let mongoServer;
// Create test database to store dummy data
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    mongoose_1.default
        .connect(mongoUri)
        .then(() => {
        console.log('Successfully connected to ' + process.env.URI);
    })
        .catch(e => {
        console.error('Connection error', e.message);
    });
}));
// Tears down test database after tests finish
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoServer.stop();
    yield mongoose_1.default.disconnect();
}));
describe("POST /register", () => {
    // TODO: add test for missing email, username, password, or password verification
    it("registers a user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).post("/auth/register").send({
            username: 'username',
            email: "john.smith@blah.com",
            password: 'password',
            passwordVerify: 'password'
        })
            .expect(200)
            .expect('Content-Type', /json/);
        const cookies = response.header['set-cookie'];
        expect(cookies).toBeDefined();
        expect(cookies[0]).toContain('token');
        expect(response.body).toEqual({
            success: true,
            user: {
                username: "username",
                email: "john.smith@blah.com"
            }
        });
    }));
    it("responds with status 400 & error message given password too short", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post("/auth/register").send({
            username: 'username',
            email: "john.smith@blah.com",
            password: 'p',
            passwordVerify: 'p'
        })
            .expect(400)
            .expect('Content-Type', /json/);
    }));
    it("responds with status 400 & error message given mismatching password verification", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post("/auth/register").send({
            username: 'username',
            email: "john.smith@blah.com",
            password: 'password',
            passwordVerify: 'passwo'
        })
            .expect(400)
            .expect('Content-Type', /json/);
    }));
    it("responds with status 400 & error message given an already-registered email", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post("/auth/register").send({
            username: 'username',
            email: "john.smith@blah.com",
            password: 'password',
            passwordVerify: 'password'
        })
            .expect(400)
            .expect('Content-Type', /json/);
    }));
});
describe("POST /login", () => {
    it("logs a user in successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).post("/auth/login").send({
            email: "john.smith@blah.com",
            password: 'password',
        })
            .expect(200)
            .expect('Content-Type', /json/);
        const cookies = response.header['set-cookie'];
        expect(cookies).toBeDefined();
        expect(cookies[0]).toContain('token');
        expect(response.body).toEqual({
            success: true,
            user: {
                username: "username",
                email: "john.smith@blah.com"
            }
        });
    }));
    it("responds with status 400 & error message given no email", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post("/auth/login").send({
            password: 'password',
        })
            .expect(400)
            .expect('Content-Type', /json/);
    }));
    it("responds with status 400 & error message given no password", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post("/auth/login").send({
            email: "john.smith@blah.com",
        })
            .expect('Content-Type', /json/)
            .expect(400);
    }));
    it("responds with status 401 & error message given wrong email", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post("/auth/login").send({
            email: "jane.doe@blah.com",
            password: 'password',
        })
            .expect(401)
            .expect('Content-Type', /json/);
    }));
    it("responds with status 401 & error message given wrong password", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post("/auth/login").send({
            email: "john.smith@blah.com",
            password: 'passwordy',
        })
            .expect(401)
            .expect('Content-Type', /json/);
    }));
});
//# sourceMappingURL=auth.test.js.map