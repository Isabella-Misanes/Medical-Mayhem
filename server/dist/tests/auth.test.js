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
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../.env') }); // ty DavidP on SO
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
let cookie;
const pfp = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../assets/default-avatar.txt'), 'utf8');
let userId;
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
        cookie = cookies[0]; // save cookie for other requests
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
describe("GET /getProfile", () => {
    it("gets a default profile succesfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .get("/api/getProfile")
            .set('Cookie', [cookie])
            .send()
            .expect(200)
            .expect('Content-Type', /json/);
        expect(response.body).toEqual({
            bio: "",
            pfp: ""
        });
    }));
});
describe("POST /updateProfile", () => {
    it("updates a username successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .post("/api/updateProfile")
            .set('Cookie', [cookie])
            .send({
            username: 'diff username',
            bio: 'bio',
            pfp: ''
        })
            .expect(200);
    }));
    it("updates a bio successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .post("/api/updateProfile")
            .set('Cookie', [cookie])
            .send({
            username: 'username',
            bio: 'bio',
            pfp: ''
        })
            .expect(200);
    }));
    it("updates a profile picture successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .post("/api/updateProfile")
            .set('Cookie', [cookie])
            .send({
            username: 'username',
            bio: 'bio',
            pfp: pfp
        })
            .expect(200);
    }));
});
//# sourceMappingURL=auth.test.js.map