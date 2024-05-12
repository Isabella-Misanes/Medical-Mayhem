import { createContext, useContext, useEffect, useState } from 'react'
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
    HIDE_MODALS: "HIDE_MODALS",
    CHANGE_SCREEN: "CHANGE_SCREEN",
    CHANGE_SORT_TYPE: "CHANGE_SORT_TYPE",

    // GAME ACTIONS
    UPDATE_TEAMMATES: "UPDATE_TEAMMATES",

    // NEW ACTION TYPES FOR MEDICAL MAYHEM ADDED BY TORIN
    GET_PROFILE: "GET_PROFILE",
    UPDATE_PROFILE: "UPDATE_PROFILE",
    RESET: "RESET",
    UPDATE_PARTY: "UPDATE_PARTY",
    CHANGE_READY: "CHANGE_READY",

    // NEW ACTION TYPES FOR MEDICAL MAYHEM ADDED BY JARED RAAAAAAHHHH
    VIEW_FRIENDS: "VIEW_FRIENDS",
    REMOVE_FRIEND: "REMOVE_FRIENDS",
    GET_ONLINE_PLAYERS: "GET_ONLINE_PLAYERS",
    GET_SETTINGS: "GET_SETTINGS",
    UPDATE_AUDIO_SETTINGS: "UPDATE_AUDIO_SETTINGS",
    UPDATE_KEYBINDS: "UPDATE_KEYBINDS",
    UPDATE_TOGGLES: "UPDATE_TOGGLES",

    GET_RELATION: "GET_RELATION",
    ERROR: "ERROR",

    // NEW ACTION TYPES FOR MEDICAL MAYHEM ADDED BY ISABELLA
    GET_AVATAR: "GET_AVATAR",
    UPDATE_AVATAR: "UPDATE_AVATAR",
    GET_AVATAR_LIST: "GET_AVATAR_LIST",
    UPDATE_AVATAR_LIST: "UPDATE_AVATAR_LIST",
    GET_COMMENTS: "GET_COMMENTS",
    CREATE_COMMENT: "CREATE_COMMENT",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
// const tps = new jsTPS();

const CurrentModal = {
    NONE: "NONE",
}

const CurrentScreen = {
    ABOUT: "ABOUT",
    GAME: "GAME",
    HOME: "HOME",
    CHAR_BUILDER: "CHAR_BUILDER",
    CHAR_SEARCH: "CHAR_SEARCH",
    PROFILE: "PROFILE",
    SETTINGS: "SETTINGS",
    REPORT: "REPORT",
    SOCIAL: "SOCIAL",
}

class Member {
    constructor(username, isReady = false) {
        this.username = username
        this.isReady = isReady
    }

    readyUp() {
        this.isReady = true
    }

    unready() {
        this.isReady = false
    }
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
        CurrentScreen: CurrentScreen.HOME,
        profileInfo: {
            username: "",
            bio: "",
            pfp: ""
        },
        errorMessage: "",
        avatar: {
            pic: "",
            name: "",
            speed: 0,
            strength: 0,
            defense: 0,
            favoredMinigame: "",
            isPublic: false,
        },
        players: [], // an array of usernames for players currently in game with this user (including this user)
        partyMembers: [], // an array of Member objects used for sidebar and ready statuses
        relation: '',
        avatarList: [], // the list of avatars in the Character Search
        commentsList: [],
        settings: {
            masterVolume: 100,
            musicVolume: 100,
            sfxVolume: 100,
            keybinds: {
                UP: 'W',
                LEFT: 'A',
                DOWN: 'S',
                RIGHT: 'D',
                INTERACT: 'E'
            },
            toggles: {
                privateProfile: false,
                messages: true,
                party: true,
            },
        }
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
            case GlobalStoreActionType.UPDATE_TEAMMATES: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                    players: payload,
                    settings: store.settings,
                    commentsList: store.commentsList,
                    partyMembers: store.partyMembers
                });
            }
            case GlobalStoreActionType.GET_PROFILE: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: payload,
                    errorMessage: "",
                    avatar: store.avatar,
                    settings: store.settings,
                    commentsList: store.commentsList,
                    partyMembers: store.partyMembers,
                    players: store.players
                });
            }
            case GlobalStoreActionType.UPDATE_PROFILE: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: payload,
                    errorMessage: "",
                    avatar: store.avatar,
                    settings: store.settings,
                    commentsList: store.commentsList,
                    partyMembers: store.partyMembers,
                    players: store.players
                });
            }
            // essentially a copy paste of the store at the start
            // this is done when logging out, unauthorized, and deleting the account
            case GlobalStoreActionType.RESET: {
                console.log("RESETTING.....")
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: CurrentScreen.HOME,
                    profileInfo: {
                        username: "",
                        bio: "",
                        pfp: ""
                    },
                    errorMessage: "",
                    avatar: {
                        pic: "",
                        name: "",
                        speed: 0,
                        strength: 0,
                        defense: 0,
                        favoredMinigame: "",
                        isPublic: false,
                    },
                    players: [],
                    partyMembers: [],
                    relation: '',
                    avatarList: [],
                    commentsList: [],
                    settings: {
                        masterVolume: 100,
                        musicVolume: 100,
                        sfxVolume: 100,
                        keybinds: {
                            UP: 'W',
                            LEFT: 'A',
                            DOWN: 'S',
                            RIGHT: 'D',
                            INTERACT: 'E'
                        },
                        toggles: {
                            privateProfile: false,
                            messages: true,
                            party: true,
                        },
                    }
                });
            }

            case GlobalStoreActionType.VIEW_FRIENDS: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: payload,
                    errorMessage: "",
                    avatar: store.avatar,
                    partyMembers: store.partyMembers,
                    settings: store.settings,
                    commentsList: store.commentsList,
                    players: store.players
                });
            }

            case GlobalStoreActionType.ERROR: {
                console.log(payload.errorMessage)
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: payload.errorMessage,
                    avatar: store.avatar,
                    settings: store.settings,
                    commentsList: store.commentsList,
                    partyMembers: store.partyMembers,
                    players: store.players
                });
            }

            case GlobalStoreActionType.GET_AVATAR: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: payload,
                    settings: store.settings,
                    commentsList: store.commentsList,
                    partyMembers: store.partyMembers,
                    players: store.players
                });
            }

            case GlobalStoreActionType.UPDATE_AVATAR: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: payload,
                    settings: store.settings,
                    commentsList: store.commentsList,
                    partyMembers: store.partyMembers,
                    players: store.players
                });
            }
            case GlobalStoreActionType.GET_AVATAR_LIST: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                    avatarList: payload,
                    settings: store.settings,
                    commentsList: store.commentsList,
                    partyMembers: store.partyMembers,
                    players: store.players
                });
            }
            case GlobalStoreActionType.UPDATE_AVATAR_LIST: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                    avatarList: payload,
                    settings: store.settings,
                    commentsList: store.commentsList,
                    partyMembers: store.partyMembers,
                    players: store.players
                });
            }
            case GlobalStoreActionType.GET_COMMENTS: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                    settings: store.settings,
                    commentsList: payload,
                    partyMembers: store.partyMembers,
                    players: store.players
                });
            }
            case GlobalStoreActionType.CREATE_COMMENT: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                    settings: store.settings,
                    commentsList: payload,
                    partyMembers: store.partyMembers,
                    players: store.players
                });
            }
            case GlobalStoreActionType.GET_SETTINGS: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                    settings: payload,
                    commentsList: store.commentsList,
                    partyMembers: store.partyMembers,
                    players: store.players
                });
            }
            case GlobalStoreActionType.UPDATE_AUDIO_SETTINGS: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                    settings: {
                        masterVolume: payload.masterVolume,
                        musicVolume: payload.musicVolume,
                        sfxVolume: payload.sfxVolume,
                        keybinds: store.settings.keybinds,
                        toggles: store.settings.toggles
                    },
                    commentsList: store.commentsList,
                    partyMembers: store.partyMembers,
                    players: store.players
                })
            }
            case GlobalStoreActionType.UPDATE_KEYBINDS: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                    settings: {
                        masterVolume: store.settings.masterVolume,
                        musicVolume: store.settings.musicVolume,
                        sfxVolume: store.settings.sfxVolume,
                        keybinds: payload,
                        toggles: store.settings.toggles,
                    },
                    commentsList: store.commentsList,
                    partyMembers: store.partyMembers,
                    players: store.players
                })
            }
            case GlobalStoreActionType.UPDATE_TOGGLES: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                    settings: {
                        masterVolume: store.settings.masterVolume,
                        musicVolume: store.settings.musicVolume,
                        sfxVolume: store.settings.sfxVolume,
                        keybinds: store.settings.keybinds,
                        toggles: payload
                    },
                    commentsList: store.commentsList,
                    partyMembers: store.partyMembers,
                    players: store.players
                })
            }
            case GlobalStoreActionType.UPDATE_PARTY: {
                console.log("UPDATING PARTY...")
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                    partyMembers: payload.partyMembers,
                    settings: store.settings,
                    commentsList: store.commentsList,
                    players: store.players
                });
            }
            case GlobalStoreActionType.CHANGE_READY: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                    partyMembers: payload.partyMembers,
                    settings: store.settings,
                    commentsList: store.commentsList,
                    players: store.players
                });
            }
            case GlobalStoreActionType.GET_RELATION: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    CurrentScreen: store.CurrentScreen,
                    profileInfo: store.profileInfo,
                    errorMessage: "",
                    avatar: store.avatar,
                    partyMembers: store.partyMembers,
                    relation: payload,
                    settings: store.settings,
                    commentsList: store.commentsList,
                    players: store.players
                });
            }
            default:
                return store;
        }
    }

    store.reset = function() {
        console.log("STORE.RESET")
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
                auth.updateUsername(username)
                console.log(response)
                storeReducer({
                    type: GlobalStoreActionType.UPDATE_PROFILE,
                    payload: {
                        username: username,
                        bio: bio,
                        pfp: pfp
                    }
                })
            } catch (error) { 
                console.log(error.response.data.errorMessage)
                storeReducer({
                    type: GlobalStoreActionType.ERROR,
                    payload: { errorMessage: error.response.data.errorMessage }
                })
            }
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

    // Party

    // Adds the given user to the party array
    // where data is an array of usernames for the new users in the party
    store.updateParty = function (data) {

        // For each user received in the data that isn't in the party, create a new Member object for them
        // before sending it as the payload

        const members = []

        for (const username of data.partyMembers) {

            const member = store.partyMembers.find(member => member.username === username)

            if (member)
                members.push(member)

            else
                members.push(new Member(username))   
        }

        storeReducer({
            type: GlobalStoreActionType.UPDATE_PARTY,
            payload:{
                partyMembers: members
            }
        })
    }

    // Sets a member to be "readied up", meaning that they've pressed the Play button and are waiting for other
    // users to press it as well.
    // data is a list of JSONs, each of the format of Member class. They are converted to Member objects after 
    // receiving CHANGE_READY and stored in the store.
    store.changeReady = function (data) {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_READY,
            payload: {
                partyMembers: data.partyMembers.map(member => new Member(member.username, member.isReady))
            }
        })
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
                    type: GlobalStoreActionType.VIEW_FRIENDS,
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
                    payload: response.data.players
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
                let response = await apis.cancelFriendRequest(targetUser);
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

    store.getOnlinePlayers = function() {
        async function asyncGetOnlinePlayers() {
            try {
                let response = await apis.getOnlinePlayers();
                console.log('response:', response);
                storeReducer({
                    type: GlobalStoreActionType.VIEW_FRIENDS,
                    payload: response.data
                })
            } catch(error) { console.error(error); }
        }
        asyncGetOnlinePlayers();
    }

    store.blockPlayer = (targetUser) => {
        async function asyncBlockPlayer() {
            try {
                let response = await apis.blockPlayer(targetUser);
                storeReducer({
                    type: GlobalStoreActionType.VIEW_FRIENDS,
                    payload: response.data
                })
            } catch(err) { console.error(err); }
        }
        asyncBlockPlayer();
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

    store.updateAvatar = function(pic, name, speed, strength, defense, favoredMinigame, isPublic) {
        async function asyncUpdateAvatar() {
            try{
                let response = await apis.updateAvatar(pic, name, speed, strength, defense, favoredMinigame, isPublic);
                console.log(response)
                storeReducer({
                    type: GlobalStoreActionType.UPDATE_AVATAR,
                    payload: {
                        pic: pic,
                        name: name,
                        speed: speed,
                        strength: strength,
                        defense: defense,
                        favoredMinigame: favoredMinigame,
                        isPublic: isPublic,
                    }
                })
                // store.updateAvatarList(pic, name, speed, strength, defense, favoredMinigame, isPublic);
            } catch (error) { alert("Please choose an image below 50 KB.") }
        }
        asyncUpdateAvatar();
    }

    store.updateAvatarList = function(pic, name, speed, strength, defense, favoredMinigame, isPublic) {
        async function asyncUpdateAvatarList() {
            try {
                let response = await apis.updateAvatarList(pic, name, speed, strength, defense, favoredMinigame, isPublic);
                console.log(response)
                storeReducer({
                    type: GlobalStoreActionType.UPDATE_AVATAR_LIST,
                    payload: {
                        pic: pic,
                        name: name,
                        speed: speed,
                        strength: strength,
                        defense: defense,
                        favoredMinigame: favoredMinigame,
                        isPublic: isPublic,
                    }
                })
            } catch(error) {
                console.error(error);
            }
        }
        asyncUpdateAvatarList();
    }

    // Character Info
    store.getComments = function(avatar) {
        async function asyncGetComments() {
            try {
                let response = await apis.getAvatar(avatar)
                console.log(response)
                storeReducer({
                    type: GlobalStoreActionType.GET_COMMENTS,
                    payload: response.data
                })
            } catch (error) {
                console.log(error);
            }
        }
        asyncGetComments();
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
                storeReducer({
                    type: GlobalStoreActionType.UPDATE_AUDIO_SETTINGS,
                    payload: {
                        masterVolume: masterVolume,
                        musicVolume: musicVolume,
                        sfxVolume: sfxVolume
                    }
                })
            } catch(error) { console.error(error); }
        }
        asyncUpdateAudioSettings();
    }

    store.updateKeybinds = ({UP, LEFT, DOWN, RIGHT, INTERACT}) => {
        async function asyncUpdateKeybinds() {
            try {
                await apis.updateKeybinds({UP, LEFT, DOWN, RIGHT, INTERACT});
                storeReducer({
                    type: GlobalStoreActionType.UPDATE_KEYBINDS,
                    payload: {
                        UP: UP,
                        LEFT: LEFT,
                        DOWN: DOWN,
                        RIGHT: RIGHT,
                        INTERACT: INTERACT
                    }
                })
            } catch(error) { console.error(error); }
        }
        asyncUpdateKeybinds();
    }

    store.updateToggles = (privateProfile, toggleChat, toggleParty) => {
        async function asyncUpdateToggles() {
            try {
                await apis.updateToggles(privateProfile, toggleChat, toggleParty);
                storeReducer({
                    type: GlobalStoreActionType.UPDATE_TOGGLES,
                    payload: {
                        privateProfile: privateProfile,
                        messages: toggleChat,
                        party: toggleParty,
                    }
                })
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

    // Misc
    store.getRelationToUser = function(targetUsername) {
        if(auth.role === UserRoleType.GUEST || targetUsername === '') return;
        async function asyncGetRelationToUser() {
            try {
                let response = await apis.getRelationToUser(targetUsername);
                storeReducer({
                    type: GlobalStoreActionType.GET_RELATION,
                    payload: response.data
                })
            } catch(err) { console.error(err) }
        }
        asyncGetRelationToUser();
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

    useEffect(() => {
        if (store.partyMembers.length === 0 && 
            auth.loggedIn &&
            auth.role !== UserRoleType.GUEST) {
                store.partyMembers.push(new Member(auth.username))
            }
    //eslint-disable-next-line
    }, [store.partyMembers, auth.loggedIn])

    useEffect(() => {
        console.log(store.partyMembers)
    })

    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };