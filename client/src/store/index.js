import { createContext, useContext, useState } from 'react'
import AuthContext, { UserRoleType } from '../auth';
import apis from './store-request-api';
// import { useNavigate } from 'react-router-dom'
// import jsTPS from '../common/jsTPS'
// import api from './store-request-api'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_LIST_INFO: "LOAD_LIST_INFO",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    CHANGE_SCREEN: "CHANGE_SCREEN",
    CHANGE_SORT_TYPE: "CHANGE_SORT_TYPE",
    PUBLISH_LIST: "PUBLISH_LIST",
    CHANGE_SEARCH_BAR: "CHANGE_SEARCH_BAR",
    SET_PLAYING_LIST: "SET_PLAYING_LIST",
    LIKE_DISLIKE: "LIKE_DISLIKE",
    PLAY_SONG: "PLAY_SONG",

    // GAME ACTIONS
    UPDATE_TEAMMATES: "UPDATE_TEAMMATES",

    // NEW ACTION TYPES FOR MEDICAL MAYHEM ADDED BY TORIN
    GET_PROFILE: "GET_PROFILE",
    UPDATE_PROFILE: "UPDATE_PROFILE",
    RESET: "RESET",

    // NEW ACTION TYPES FOR MEDICAL MAYHEM ADDED BY JARED RAAAAAAHHHH
    VIEW_FRIENDS: "VIEW_FRIENDS",
    REMOVE_FRIEND: "REMOVE_FRIENDS",
    ERROR: "ERROR",
    GET_SETTINGS: "GET_SETTINGS",

    // NEW ACTION TYPES FOR MEDICAL MAYHEM ADDED BY ISABELLA
    GET_AVATAR: "GET_AVATAR",
    UPDATE_AVATAR: "UPDATE_AVATAR",
    GET_AVATAR_LIST: "GET_AVATAR_LIST",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
// const tps = new jsTPS();

const CurrentModal = {
    NONE: "NONE",
    DELETE_LIST: "DELETE_LIST",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG"
}

const CurrentHomeScreen = {
    HOME: "HOME",
    ALL_LISTS: "ALL_LISTS",
    USERS: "USERS"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth:", auth);

    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal: CurrentModal.NONE,
        currentHomeScreen: CurrentHomeScreen.HOME,
        profileInfo: {
            username: "",
            bio: "",
            pfp: ""
        },
        errorMessage: "",
        avatar: {
            pic: "",
            speed: 0,
            strength: 0,
            defense: 0,
            favoredMinigame: "",
        },
        players: [], // an array of usernames for players matched with
        avatarList: [], // the list of avatars in the Character 
    });

    console.log("inside useGlobalStore");

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        console.log("STATE UPDATE");
        console.log(type);
        console.log(payload);
        console.log(store);
        switch (type) {
            // UPDATES
            case GlobalStoreActionType.CHANGE_SEARCH_BAR: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                });
            }
            case GlobalStoreActionType.UPDATE_TEAMMATES: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                    players: payload
                });
            }
            case GlobalStoreActionType.GET_PROFILE: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    profileInfo: payload,
                    errorMessage: "",
                    avatar: store.avatar,
                });
            }
            case GlobalStoreActionType.UPDATE_PROFILE: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    profileInfo: payload,
                    errorMessage: "",
                    avatar: store.avatar,
                });
            }
            case GlobalStoreActionType.RESET: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: CurrentHomeScreen.HOME,
                    profileInfo: {},
                    errorMessage: "",
                    avatar: {
                        pic: "",
                        speed: 0,
                        strength: 0,
                        defense: 0,
                        favoredMinigame: "",
                    }
                });
            }

            case GlobalStoreActionType.VIEW_FRIENDS: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    profileInfo: payload,
                    errorMessage: "",
                    avatar: store.avatar,
                });
            }

            case GlobalStoreActionType.ERROR: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: payload.errorMessage,
                    avatar: store.avatar
                })
            }

            case GlobalStoreActionType.GET_AVATAR: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: payload,
                });
            }

            case GlobalStoreActionType.UPDATE_AVATAR: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: payload,
                });
            }
            case GlobalStoreActionType.GET_AVATAR_LIST: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                    avatarList: payload,
                });
            }
            case GlobalStoreActionType.GET_SETTINGS: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    profileInfo: payload,
                    errorMessage: "",
                    avatar: store.avatar,
                })
            }
            default:
                return store;
        }
    }

    store.reset = function() {
        storeReducer({
            type: GlobalStoreActionType.RESET,
            payload: {}
        });
    }

    // Game
    store.updatePlayers = function (data) {
        console.log(data)
        storeReducer({
            type: GlobalStoreActionType.UPDATE_TEAMMATES,
            payload: data.players
        })
    }

    // HomeScreen
    store.acceptInvite = function (event) {
        console.log("Invite ACCEPTED in store.");
    }

    store.rejectInvite = function (event) {
        console.log("Invite REJECTED in store.");
    }

    // Profile Screen

    store.getProfile = function() {
        async function asyncGetProfile() {
            try {
                let response = await apis.getProfile()
                console.log(response)
                storeReducer({
                    type: GlobalStoreActionType.GET_PROFILE,
                    payload: response.data
                })
            } catch (error) {
                console.log(error)
            }
        }

        asyncGetProfile()
    }

    store.updateProfile = function(username, bio, pfp) {
        async function asyncUpdateProfile() {
            try{
                let response = await apis.updateProfile(username, bio, pfp)
                console.log(response)
                storeReducer({
                    type: GlobalStoreActionType.UPDATE_PROFILE,
                    payload: {
                        username: username,
                        bio: bio,
                        pfp: pfp
                    }
                })
            } catch (error) { console.error(error) }
        }

        asyncUpdateProfile()
    }

    // Sidebar

    store.openPrivateMessaging = function (event, id) {
        console.log("Private messaging in store")
    }

    store.sendFriend = function(targetUser, handleFriendModalClose, setConfirmModal) {
        console.log("Sending friend request to user", targetUser, "in store");
        async function asyncSendFriend() {
            try {
                let response = await apis.sendFriendRequest(targetUser)
                if(response.status === 200) {
                    handleFriendModalClose();
                    setConfirmModal(true);
                    console.log("Successfully sent a friend request to user", targetUser);
                }
                else console.log("Failed to send friend request.");
            } catch(error) {
                console.error(error.response.data.errorMessage);
                storeReducer({
                    type: GlobalStoreActionType.ERROR,
                    payload: { errorMessage: error.response.data.errorMessage }
                })
            }
        }
        asyncSendFriend();
    }

    store.promoteToLeader = function (event) {
        console.log("Promote to leader in store");
    }

    store.removeFromParty = function (event) {
        console.log("Remove from party in store");
    }

    store.reportPlayer = function (event) {
        console.log("Report player in store");
    }

    // Messages
    store.sendPublicMessage = function(event) {
        console.log("Send public message in store.");
    }

    store.sendPartyMessage = function(event) {
        console.log("Send party message in store.");
    }

    store.sendPrivateMessage = function(event) {
        console.log("Send private message in store.");
    }

    // Social Screen
    store.removeFriend = (targetUser) => {
        async function asyncRemoveFriend() {
            console.log(targetUser);
            try {
                let response = await apis.removeFriend(targetUser);
                storeReducer({
                    type: GlobalStoreActionType.REMOVE_FRIEND,
                    payload: response.data
                })
            } catch(err) { console.error(err) }
        }
        asyncRemoveFriend();
    }

    store.viewFriends = function () {
        async function asyncViewFriends() {
            try {
                let response = await apis.viewFriends()
                console.log(response);
                storeReducer({
                    type: GlobalStoreActionType.VIEW_FRIENDS,
                    payload: response.data
                })
            } catch (error) { console.log(error) }
        }
        asyncViewFriends();
    }

    store.showRecentPlayers = function () {
        console.log("Show recent players in store");
        async function asyncViewRecentPlayers() {
            try {
                let response = await apis.getRecentPlayers()
                console.log(response);
                storeReducer({
                    type: GlobalStoreActionType.VIEW_FRIENDS,
                    payload: response.data
                })
            } catch (error) { console.error(error) }
        }
        asyncViewRecentPlayers();
    }

    store.showSentRequests = function() {
        console.log("Show friend requests SENT in store.");
        async function asyncViewSentRequests() {
            try {
                let response = await apis.viewSentRequests()
                console.log(response);
                storeReducer({
                    type: GlobalStoreActionType.VIEW_FRIENDS,
                    payload: response.data
                })
            } catch (error) { console.error(error) }
        }
        asyncViewSentRequests();
    }

    store.showReceivedRequests = function () {
        console.log("Show friends requests RECEIVED in store");
        async function asyncViewReceivedRequests() {
            try {
                let response = await apis.viewReceivedRequests()
                console.log(response);
                storeReducer({
                    type: GlobalStoreActionType.VIEW_FRIENDS,
                    payload: response.data
                })
            } catch (error) { console.error(error) }
        }
        asyncViewReceivedRequests();
    }

    store.cancelFriendRequest = function(targetUser) {
        console.log("Cancel friend request in store");
        async function asyncCancelFriendRequest() {
            try {
                console.log(targetUser);
                let response = await apis.cancelFriendRequest(targetUser)
                console.log(response);
                storeReducer({
                    type: GlobalStoreActionType.VIEW_FRIENDS,
                    payload: response.data
                })
            } catch (error) { console.error(error) }
        }
        asyncCancelFriendRequest();
    }

    store.ignoreFriendRequest = function(targetUser) {
        console.log("Ignore friend request in store");
        async function asyncIgnoreFriendRequest() {
            try {
                let response = await apis.ignoreFriendRequest(targetUser)
                console.log(response);
                storeReducer({
                    type: GlobalStoreActionType.VIEW_FRIENDS,
                    payload: response.data
                })
            } catch (error) { console.error(error) }
        }
        asyncIgnoreFriendRequest();
    }
    store.acceptFriendRequest = function(targetUser) {
        console.log("Accept friend request in store");
        async function asyncAcceptFriendRequest() {
            try {
                let response = await apis.acceptFriendRequest(targetUser)
                console.log(response);
                storeReducer({
                    type: GlobalStoreActionType.VIEW_FRIENDS,
                    payload: response.data
                })
            } catch (error) { console.error(error) }
        }
        asyncAcceptFriendRequest();
    }
    // Forums Screen
    store.openThread = function (event) {
        console.log("Opening thread in store.");
    }
    
    store.postThread = function (event) {
        console.log("Post thread in store.");
    }

    // Map Search Screen
    store.openMap = function (event) {
        console.log("Opening map in store.");
    }

    store.getAllAvatars = function () {
        async function asyncGetAllAvatars() {
            try {
                let response = await apis.getAllAvatars()
                console.log(response);
                storeReducer({
                    type: GlobalStoreActionType.GET_AVATAR_LIST,
                    payload: response.data
                })
            } catch (error) { console.log(error) }
        }
        asyncGetAllAvatars();
    }

    // Character Select Screen
    store.getAvatar = function() {
        async function asyncGetAvatar() {
            try {
                let response = await apis.getAvatar()
                console.log(response)
                storeReducer({
                    type: GlobalStoreActionType.GET_AVATAR,
                    payload: response.data
                })
            } catch (error) {
                console.log(error);
            }
        }
        asyncGetAvatar();
    }

    store.updateAvatar = function(pic, speed, strength, defense, favoredMinigame) {
        async function asyncUpdateProfile() {
            try{
                let response = await apis.updateAvatar(pic, speed, strength, defense, favoredMinigame);
                console.log(response)
                storeReducer({
                    type: GlobalStoreActionType.UPDATE_AVATAR,
                    payload: {
                        pic: pic,
                        speed: speed,
                        strength: strength,
                        defense: defense,
                        favoredMinigame: favoredMinigame,
                    }
                })
            } catch (error) { alert("Please choose an image below 50 KB.") }
        }
        asyncUpdateProfile();
    }

    // Leaderboard Screen
    store.sortHighestScore = function(event) {
        console.log("Sort by highest score in store.");
    }
    store.sortTotalScore = function(event) {
        console.log("Sort by total score in store.");
    }
    store.sortGamesPlayed = function(event) {
        console.log("Sort by games played in store.");
    }
    store.sortMinigamesPlayed = function(event) {
        console.log("Sort by minigames played in store.");
    }

    // Settings Screen
    store.getSettings = () => {
        if(auth.role === UserRoleType.GUEST) return;
        async function asyncGetSettings() {
            try {
                let response = await apis.getSettings();
                storeReducer({
                    type: GlobalStoreActionType.GET_SETTINGS,
                    payload: response.data
                })
            } catch(err) {console.error(err)}
        }
        asyncGetSettings();
    }

    store.updateAudioSettings = (masterVolume, musicVolume, sfxVolume) => {
        async function asyncUpdateAudioSettings() {
            try {
                await apis.updateAudioSettings(masterVolume, musicVolume, sfxVolume);
            } catch(error) { console.error(error); }
        }
        asyncUpdateAudioSettings();
    }

    store.updateKeybinds = ({up, left, down, right, interact}) => {
        async function asyncUpdateKeybinds() {
            try {
                await apis.updateKeybinds({up, left, down, right, interact});
            } catch(error) { console.error(error); }
        }
        asyncUpdateKeybinds();
    }

    store.updateToggles = (privateProfile, toggleChat, toggleParty) => {
        async function asyncUpdateToggles() {
            try {
                await apis.updateToggles(privateProfile, toggleChat, toggleParty);
            } catch(error) { console.error(error); }
        }
        asyncUpdateToggles();
    }

    // Report Modal

    store.submitReport = function(event) {
        console.log("Submit report in store.");
    }

    // Report Screen

    store.ignoreReport = function(event) {
        console.log("Ignored report in store.");
    }

    store.completeReport = function(event) {
        console.log("Completed report in store.");
    }

    store.hideModal = () => {
        storeReducer({
            type: GlobalStoreActionType.ERROR,
            payload: { errorMessage: "" }
        })
    }

    store.isErrorModalOpen = () => {
        return auth.errorMessage !== "";
    }

    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };