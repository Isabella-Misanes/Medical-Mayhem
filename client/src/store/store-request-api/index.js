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

const apis = {
    getProfile,
    updateProfile
}

export default apis