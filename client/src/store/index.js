import { createContext, useContext, useState } from 'react'
import AuthContext from '../auth';
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



    // NEW ACTION TYPES FOR MEDICAL MAYHEM ADDED BY TORIN
    GET_PROFILE: "GET_PROFILE",
    UPDATE_PROFILE: "UPDATE_PROFILE",
    RESET: "RESET"
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

const SortType = {
    NAME: "NAME",
    PUBLISH_DATE: "PUBLISH_DATE",
    EDIT_DATE: "EDIT_DATE",
    LISTENS: "LISTENS",
    LIKES: "LIKES",
    DISLIKES: "DISLIKES"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal: CurrentModal.NONE,
        currentHomeScreen: CurrentHomeScreen.HOME,
        profileInfo: {}
    });

    // const history = useNavigate();

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
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_SEARCH_BAR: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                });
            }
            case GlobalStoreActionType.GET_PROFILE: {
                //console.log("IN GET: " + payload.bio)
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    profileInfo: payload
                });
            }
            case GlobalStoreActionType.UPDATE_PROFILE: {
                console.log("IN UPDATE PROFILE: " + payload)
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    profileInfo: payload
                });
            }
            case GlobalStoreActionType.RESET: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: CurrentHomeScreen.HOME,
                    profileInfo: {}
                });
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
            let response = await apis.getProfile()
            console.log("RESPONSE DATA: " + JSON.stringify(response.data))
            storeReducer({
                type: GlobalStoreActionType.GET_PROFILE,
                payload: response.data
            })
        }

        asyncGetProfile()
    }

    // TODO: INCLUDE TRY CATCH
    store.updateProfile = function (bio, pfp) {

        async function asyncUpdateProfile() {
            let response = await apis.updateProfile(bio, pfp)
            console.log(response)
            storeReducer({
                type: GlobalStoreActionType.UPDATE_PROFILE,
                payload: {
                    bio: bio,
                    pfp: pfp
                }
            })
        }

        asyncUpdateProfile()
    }

    // Sidebar

    store.openPrivateMessaging = function (event, id) {
        console.log("Private messaging in store")
    }

    store.addFriend = function (event) {
        console.log("Add friend in store");
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
    store.removeFriend = function (event) {
        console.log("Remove friend in store");
    }

    store.showFriends = function () {
        console.log("Show friends in store");
    }

    store.showRecentPlayers = function () {
        console.log("Show recent players in store");
    }

    store.showSentRequests = function() {
        console.log("Show friend requests SENT in store.");
    }

    store.showReceivedRequests = function () {
        console.log("Show friends requests RECEIVED in store");
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

    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };