import request from 'supertest';
import app from '../index';
import db from '../db';

const registerUser = jest.fn()

afterAll(async () => {
    await db.close()
})

describe("POST /register", () => {

    // After tests are done and the server closes, close the database connection as well.

    it("responds with status 200 given email, username, password", async () => {
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

    it("responds with status 201 given password too short", async () => {
        await request(app).post("/auth/register").send({
            username: 'username',
            email: "john.smith@blah.com",
            password: 'p',
            passwordVerify: 'p'
        })
        .expect(201)
        .expect('Content-Type', /json/)
    })

    it("responds with status 202 given mismatching password verification", async () => {
        await request(app).post("/auth/register").send({
            username: 'username',
            email: "john.smith@blah.com",
            password: 'password',
            passwordVerify: 'passwo'
        })
        .expect(202)
        .expect('Content-Type', /json/)
    })

    it("responds with status 203 given an already-registered email", async () => {
        await request(app).post("/auth/register").send({
            username: 'username',
            email: "john.smith@blah.com",
            password: 'password',
            passwordVerify: 'password'
        })
        .expect(203)
        .expect('Content-Type', /json/)
    })
})

describe("POST /login", () => {

    it("responds with status 200 given email, password", async () => {
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

    it("responds with status 201 given no email", async () => {
        await request(app).post("/auth/login").send({
            password: 'password',
        })
        .expect(201)
        .expect('Content-Type', /json/)
    })

    it("responds with status 201 given no password", async () => {
        await request(app).post("/auth/login").send({
            email: "john.smith@blah.com",
        })
        .expect('Content-Type', /json/)
        .expect(201)
    })

    it("responds with status 202 given wrong email", async () => {
        await request(app).post("/auth/login").send({
            email: "jane.doe@blah.com",
            password: 'password',
        })
        .expect(202)
        .expect('Content-Type', /json/)
    })

    it("responds with status 203 given wrong password", async () => {
        await request(app).post("/auth/login").send({
            email: "john.smith@blah.com",
            password: 'passwordy',
        })
        .expect(203)
        .expect('Content-Type', /json/)
    })
})

function cleanUpDb() {
    // TODO: Implement clean up from saving dummy data in database
}