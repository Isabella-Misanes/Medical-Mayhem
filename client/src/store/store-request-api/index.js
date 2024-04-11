import axios from 'axios'
import AuthContext from '../../auth';

axios.defaults.withCredentials = true;
// CHANGE URL AS NEEDED BETWEEN TESTING AND DEVELOPMENT
// TODO: Find a way to make this change between local host and Heroku 
const api = axios.create({
    // Uncomment one, comment out the other as needed
    
    // baseURL: 'https://medical-mayhem-c0832c3f548e.herokuapp.com/api'
    baseURL: 'http://localhost:4000/api'
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

export const getProfile = async () => { return await api.get(`/getProfile/`) }

export const updateProfile = async (bio, pfp) => {
    return api.post(`/updateProfile/`, {
        // SPECIFY THE PAYLOAD
        bio: bio,
        pfp: pfp
    })
}

const apis = {
    getProfile,
    updateProfile
}

export default apis