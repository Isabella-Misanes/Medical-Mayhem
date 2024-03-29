import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import path from 'path'
import { MongoMemoryServer } from 'mongodb-memory-server'
dotenv.config({ path: path.resolve(__dirname, '../.env')}); // ty DavidP on SO

let mongoServer: MongoMemoryServer; 

// Create test database to store dummy data
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri();

    mongoose
        .connect(mongoUri)
        .then(() => {
            console.log('Successfully connected to ' + process.env.URI)
        })
        .catch(e => {
            console.error('Connection error', e.message)
        })
})

// Tears down test database after tests finish
afterAll(async () => {
    await mongoServer.stop()
    await mongoose.disconnect()
})

describe("POST /register", () => {

    // TODO: add test for missing email, username, password, or password verification

    it("registers a user successfully", async () => {
        const response = await request(app).post("/auth/register").send({
            username: 'username',
            email: "john.smith@blah.com",
            password: 'password',
            passwordVerify: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)

        const cookies = response.header['set-cookie']
        expect(cookies).toBeDefined()
        expect(cookies[0]).toContain('token')

        expect(response.body).toEqual({
            success: true,
            user: {
                username: "username",
                email: "john.smith@blah.com"              
            }
        })
    })

    it("responds with status 400 & error message given password too short", async () => {
        await request(app).post("/auth/register").send({
            username: 'username',
            email: "john.smith@blah.com",
            password: 'p',
            passwordVerify: 'p'
        })
        .expect(400)
        .expect('Content-Type', /json/)
    })

    it("responds with status 400 & error message given mismatching password verification", async () => {
        await request(app).post("/auth/register").send({
            username: 'username',
            email: "john.smith@blah.com",
            password: 'password',
            passwordVerify: 'passwo'
        })
        .expect(400)
        .expect('Content-Type', /json/)
    })

    it("responds with status 400 & error message given an already-registered email", async () => {
        await request(app).post("/auth/register").send({
            username: 'username',
            email: "john.smith@blah.com",
            password: 'password',
            passwordVerify: 'password'
        })
        .expect(400)
        .expect('Content-Type', /json/)
    })
})

describe("POST /login", () => {

    it("logs a user in successfully", async () => {
        const response = await request(app).post("/auth/login").send({
            email: "john.smith@blah.com",
            password: 'password',
        })
        .expect(200)
        .expect('Content-Type', /json/)

        const cookies = response.header['set-cookie']
        expect(cookies).toBeDefined()
        expect(cookies[0]).toContain('token')

        expect(response.body).toEqual({
            success: true,
            user: {
                username: "username",
                email: "john.smith@blah.com"              
            }
        })
    })

    it("responds with status 400 & error message given no email", async () => {
        await request(app).post("/auth/login").send({
            password: 'password',
        })
        .expect(400)
        .expect('Content-Type', /json/)
    })

    it("responds with status 400 & error message given no password", async () => {
        await request(app).post("/auth/login").send({
            email: "john.smith@blah.com",
        })
        .expect('Content-Type', /json/)
        .expect(400)
    })

    it("responds with status 401 & error message given wrong email", async () => {
        await request(app).post("/auth/login").send({
            email: "jane.doe@blah.com",
            password: 'password',
        })
        .expect(401)
        .expect('Content-Type', /json/)
    })

    it("responds with status 401 & error message given wrong password", async () => {
        await request(app).post("/auth/login").send({
            email: "john.smith@blah.com",
            password: 'passwordy',
        })
        .expect(401)
        .expect('Content-Type', /json/)
    })
})