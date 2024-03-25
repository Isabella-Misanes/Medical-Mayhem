# Medical Mayhem

**Medical Mayhem** is an in-development multiplayer 2D top-down game.

You are a recent hire at a hospital, and have to make it through a hectic work day with a constant stream of patients flooding in. You may or may not team up with other employees to diagnose and treat patients in a timely manner.

Your objective is to diagnose and treat all patients that come into the hospital during your busy work day. When patients are brought in, you will have to bring them to a hospital bed, diagnose what is wrong with them, then give them the correct treatment. If you and your fellow doctors cannot save enough patients, your hospital will get shut down!

## Setup

### Prerequisities

- Node.js and npm (npm comes with Node.js)
- [MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/)

### Instructions

1. In a terminal, run MongoDB Community Edition.
```console
$ "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="c:\data\db"
```

2. In another terminal, clone this repository:
```console
$ git clone https://github.com/Isabella-Misanes/Medical-Mayhem.git
```

3. Navigate to this repository in the terminal.
```console
$ cd pmedical-mayhem
```

4. Navigate to the `client` and `server` folders and install dependencies using npm.
```console
$ cd client
$ npm install
$ cd ../server
$ npm install
```

5. While in the `server` folder, initialize the database. The username and password for an admin user must be provided and can be anything.
```console
# In the medical-mayhem/server folder
$ node init.js <username_of_admin> <password_of_admin>
```

6. In the `server` folder, start the server. This can be done with either `node` or `nodemon`.
```console
$ node server.js
OR 
$ nodemon server.js
```

7. In another terminal, navigate to the client folder and run the client.
```console
# In the medical-mayhem/client folder
$ npm start
```