import axios from 'axios'
import rootDomain from '../../constants/baseURL';

axios.defaults.withCredentials = true;

export const api = axios.create({
    baseURL: `${rootDomain}/api`
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

export const removeFriend = async(targetUser) => { return await api.post('/friend/remove/:username', {
    username: targetUser.username
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

export const getAvatar = async () => { return await api.get(`/getAvatar/`) }

export const updateAvatar = async (pic, speed, strength, defense, favoredMinigame) => {
    return api.post(`/updateAvatar/`, {
        pic: pic,
        speed: speed,
        strength: strength,
        defense: defense,
        favoredMinigame: favoredMinigame,
    });
}

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
    acceptFriendRequest,
    getAvatar,
    updateAvatar,
}

export default apis