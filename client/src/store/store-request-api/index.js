import axios from 'axios'
axios.defaults.withCredentials = true;
// const api = axios.create({
//     baseURL: 'https://medical-mayhem-7429b.web.app/api',
// })

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
// export const createPlaylist = (newListName, newSongs, userEmail) => {
//     return api.post(`/playlist/`, {
//         // SPECIFY THE PAYLOAD
//         name: newListName,
//         songs: newSongs,
//         ownerEmail: userEmail
//     })
// }
// export const deletePlaylistById = (id) => api.delete(`/playlist/${id}`)
// export const getPlaylistById = (id) => api.get(`/playlist/${id}`)
// export const getPlaylistPairs = () => api.get(`/playlistpairs/`)
// export const updatePlaylistById = (id, playlist) => {
//     return api.put(`/playlist/${id}`, {
//         // SPECIFY THE PAYLOAD
//         playlist : playlist
//     })
// }

const apis = {
    // createPlaylist,
    // deletePlaylistById,
    // getPlaylistById,
    // getPlaylistPairs,
    // updatePlaylistById
}

export default apis