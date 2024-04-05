import axios from 'axios'

axios.defaults.withCredentials = true;

// CHANGE URL AS NEEDED BETWEEN TESTING AND DEVELOPMENT
// TODO: Find a way to make this change between local host and Heroku 
const api = axios.create({
    // Uncomment one, comment out the other as needed
    
    // baseURL: 'http://localhost:3000/auth'
    baseURL: 'http://localhost:4000/auth'
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /register). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

export const getLoggedIn = async () => { 
    return await api.get(`/loggedIn/`)
}
export const loginUser = async (email, password) => {
    return await api.post(`/login/`, {
        email : email,
        password : password
    })
}
export const logoutUser = async () => { 
    return await api.get(`/logout/`) 
}
export const registerUser = async (username, email, password, passwordVerify) => {
    return await api.post(`/register/`, {
        username : username,
        email : email,
        password : password,
        passwordVerify : passwordVerify
    })
}
const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}

export default apis