import { createContext, useState } from 'react'
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
    VIEW_AS_GUEST: "VIEW_AS_GUEST",
    SET_PLAYING_LIST: "SET_PLAYING_LIST",
    LIKE_DISLIKE: "LIKE_DISLIKE",
    PLAY_SONG: "PLAY_SONG",
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

    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal: CurrentModal.NONE,
        currentHomeScreen: CurrentHomeScreen.HOME,
        sortType: SortType.NAME,
        listInfo: [],
        currentList: null,
        currentSongIndex: -1,
        currentSong: null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        searchBar: null,
        guest: false,
        playingList: null,
        playingSong: 0,
    });
    // const history = useNavigate();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    // const { auth } = useContext(AuthContext);
    // console.log("auth: " + auth);

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
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    sortType: store.sortType,
                    listInfo: payload.listInfo,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchBar: store.searchBar,
                    guest: store.guest,
                    playingList: store.playingList,
                    playingSong: store.playingSong,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    sortType: store.sortType,
                    listInfo: store.listInfo,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchBar: store.searchBar,
                    guest: store.guest,
                    playingList: store.playingList,
                    playingSong: store.playingSong,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: CurrentHomeScreen.HOME,
                    sortType: store.sortType,
                    listInfo: store.listInfo,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchBar: store.searchBar,
                    guest: store.guest,
                    playingList: store.playingList,
                    playingSong: store.playingSong,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_LIST_INFO: {
                return setStore({
                    currentModal: store.currentModal,
                    currentHomeScreen: store.currentHomeScreen,
                    sortType: store.sortType,
                    listInfo: payload,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchBar: store.searchBar,
                    guest: store.guest,
                    playingList: store.playingList,
                    playingSong: store.playingSong,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal: CurrentModal.DELETE_LIST,
                    currentHomeScreen: store.currentHomeScreen,
                    sortType: store.sortType,
                    listInfo: store.listInfo,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    searchBar: store.searchBar,
                    guest: store.guest,
                    playingList: store.playingList,
                    playingSong: store.playingSong,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    sortType: store.sortType,
                    listInfo: store.listInfo,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchBar: store.searchBar,
                    guest: store.guest,
                    playingList: store.playingList,
                    playingSong: store.playingSong,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    sortType: store.sortType,
                    listInfo: store.listInfo,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchBar: store.searchBar,
                    guest: store.guest,
                    playingList: store.playingList,
                    playingSong: store.playingSong,
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal: CurrentModal.EDIT_SONG,
                    currentHomeScreen: store.currentHomeScreen,
                    sortType: store.sortType,
                    listInfo: store.listInfo,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchBar: store.searchBar,
                    guest: store.guest,
                    playingList: store.playingList,
                    playingSong: store.playingSong,
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal: CurrentModal.REMOVE_SONG,
                    currentHomeScreen: store.currentHomeScreen,
                    sortType: store.sortType,
                    listInfo: store.listInfo,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchBar: store.searchBar,
                    guest: store.guest,
                    playingList: store.playingList,
                    playingSong: store.playingSong,
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    sortType: store.sortType,
                    listInfo: store.listInfo,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchBar: store.searchBar,
                    guest: store.guest,
                    playingList: store.playingList,
                    playingSong: store.playingSong,
                });
            }
            case GlobalStoreActionType.CHANGE_SCREEN: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: payload.screen,
                    sortType: SortType.NAME,
                    listInfo: payload.listData,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    searchBar: null,
                    guest: store.guest,
                    playingList: null,
                    playingSong: 0,
                });
            }
            case GlobalStoreActionType.CHANGE_SEARCH_BAR: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: store.currentHomeScreen,
                    guest: store.guest,
                });
            }
            case GlobalStoreActionType.VIEW_AS_GUEST: {
                return setStore({
                    currentModal: CurrentModal.NONE,
                    currentHomeScreen: payload.screen,
                    guest: payload.guest,
                });
            }
            default:
                return store;
        }
    }

    store.loginGuest = function () {
        async function asyncGuest() {
            storeReducer({
                type: GlobalStoreActionType.VIEW_AS_GUEST,
                payload: { guest: true, screen: CurrentHomeScreen.ALL_LISTS }
            });
        }
        asyncGuest();
    }

    store.logoutGuest = function () {
        async function asyncGuest() {
            storeReducer({
                type: GlobalStoreActionType.VIEW_AS_GUEST,
                payload: { guest: false, screen: CurrentHomeScreen.HOME }
            });
        }
        asyncGuest();
    }

    // HomeScreen
    store.acceptInvite = function (event) {
        console.log("Invite ACCEPTED in store.");
    }

    store.rejectInvite = function (event) {
        console.log("Invite REJECTED in store.");
    }

    // Profile Screen

    store.submitProfileEdits = function (event) {
        console.log("In submit profile edits in store.");
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

    // Map Search Screen
    store.openMap = function (event) {
        console.log("Opening map in store.");
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