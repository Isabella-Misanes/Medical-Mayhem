import request from 'supertest';
import app from '../startup/index';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import path from 'path'
import { MongoMemoryServer } from 'mongodb-memory-server'
import Cookies from 'js-cookie'
import fs from 'fs'

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

let cookie: string
const pfp = fs.readFileSync(path.resolve(__dirname, '../../assets/default-avatar.txt'), 'utf8')

describe("POST /register", () => {

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

        cookie = cookies[0] // save cookie for other requests

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

describe("GET /getProfile", () => {

    it("gets a default profile successfully", async () => {
        const response = await request(app)
            .get("/api/getProfile")
            .set('Cookie', [cookie])
            .send()
            .expect(200)
            .expect('Content-Type', /json/)
        
            expect(response.body).toEqual({
                bio: "",
                pfp: "" 
            })             
    })
})

describe("POST /updateProfile", () => {

    it("updates a username successfully", async () => {
        await request(app)
            .post("/api/updateProfile")
            .set('Cookie', [cookie])
            .send({
                username: 'diff username',
                bio: '',
                pfp: ''
            })
            .expect(200)
    })

    it("updates a bio successfully", async () => {
        await request(app)
            .post("/api/updateProfile")
            .set('Cookie', [cookie])
            .send({
                username: 'username',
                bio: 'bio',
                pfp: ''
            })
            .expect(200)
    })

    it("updates a profile picture successfully", async () => {
        await request(app)
            .post("/api/updateProfile")
            .set('Cookie', [cookie])
            .send({
                username: 'username',
                bio: 'bio',
                pfp: pfp
            })
            .expect(200)
    })

    it("Should run", () => {
        
    })
})

describe("GET /loggedIn", () => {

    it("logs in a user with a cookie", async () => {
        const response = await request(app).post("/auth/loggedIn").send({
            username: 'username',
            email: "john.smith@blah.com",
            password: 'password',
            passwordVerify: 'password'
        })
        .set('Cookie', [cookie])
        .expect(200)
        .expect('Content-Type', /json/)
    
        expect(response.body).toEqual({
            username: 'username',
            email: 'john.smith@blah.com'
        })         
    })
})