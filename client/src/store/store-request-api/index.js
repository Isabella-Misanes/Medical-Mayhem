import axios from 'axios'

axios.defaults.withCredentials = true;
// CHANGE URL AS NEEDED BETWEEN TESTING AND DEVELOPMENT
// TODO: Find a way to make this change between local host and Heroku 
export const api = axios.create({
    // Uncomment one, comment out the other as needed
    
    baseURL: 'https://medical-mayhem-c0832c3f548e.herokuapp.com/api'
    // baseURL: 'http://localhost:4000/api'
})

export const getProfile = async () => { return await api.get(`/getProfile/`) }

export const updateProfile = async (username, bio, pfp) => {
    return api.post(`/updateProfile/`, {
        // SPECIFY THE PAYLOAD
        username: username,
        bio: bio,
        pfp: pfp
    })
}
export const viewFriends = async() => { return await api.get('/friends/'); }

export const sendFriendRequest = async(targetUsername) => { return await api.post('/friendRequest/:targetUsername', {
    targetUsername: targetUsername
}); }

export const removeFriend = async(targetUser) => { return await api.post('/friend/remove/:targetUser', {
    targetUser: targetUser
}); }

export const getRecentPlayers = async() => { return await api.get('/recentPlayers') }

export const viewSentRequests = async() => { return await api.get('/friendRequests/sent'); }

export const viewReceivedRequests = async() => { return await api.get('/friendRequests/received'); }

export const cancelFriendRequest = async(targetUser) => { return await api.post('/friendRequest/:targetUser/cancel', {
    targetUser: targetUser
}); }

export const ignoreFriendRequest = async(targetUser) => { return await api.post('/friendRequest/:targetUser/ignore', {
    targetUser: targetUser
}); }

export const acceptFriendRequest = async(targetUser) => { return await api.post('/friendRequest/:targetUser/accept', {
    targetUser: targetUser
}); }

const apis = {
    getProfile,
    updateProfile,
    removeFriend,
    viewFriends,
    sendFriendRequest,
    getRecentPlayers,
    viewSentRequests,
    viewReceivedRequests,
    cancelFriendRequest,
    ignoreFriendRequest,
    acceptFriendRequest
}

export default apis