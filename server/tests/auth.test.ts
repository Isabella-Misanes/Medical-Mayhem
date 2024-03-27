import request from 'supertest';
import {app, PORT} from '../index';

// TODO: Implement tests by tomorrow 3/28

describe("POST /register", () => {

    it("given email, username, password", async () => {
        const response = await request(app).post("/auth/register").send({
            username: 'username',
            email: "john.smith@gmail.com",
            password: 'password',
            passwordVerify: 'password'
        })

        // This is hanging rn bc idk yet how to handle mongoose queries in tests.
        // For example, if there's a line in a handler that saves a user in the db, 
        // is it really saved if it's all dummy data?
        expect(response.statusCode).toBe(200)

    //     const cookies = response.header['set-cookie']
    //     expect(cookies).toBeDefined()
    //     expect(cookies[0]).toEqual({
    //         httpOnly: true,
    //         secure: true,
    //         sameSite: "none"
    //     })

    //     expect(response.body).toEqual({
    //         success: true,
    //         user: {
    //             username: "username",
    //             email: "john.smith@gmail.com"              
    //         }
    //     })
    })

    // describe("password too short", () => {

    // })

    // describe("mismatching password verification", () => {

    // })

    // describe("given an already-registered email", () => {

    // })
})

// describe("POST /login", () => {

//     describe("given email, password", () => {

//     })

//     describe("not given email", () => {

//     })

//     describe("not given password", () => {
        
//     })

//     describe("given wrong email", () => {

//     })

//     describe("given wrong password", () => {

//     })
// })