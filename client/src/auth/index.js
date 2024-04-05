import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    ERROR: "ERROR"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: ""
    });
    const navigate = useNavigate();

    // TODO: THIS SHOULD RUN WITH EVERY PAGE CHANGE TO VERIFY THAT THE USER IS STILL AUTHORIZED
    // This will be handled once we start backend use cases when dealing with user roles.  - Torin

    useEffect(() => {
        auth.getLoggedIn();
        // eslint-disable-next-line
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: ""
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: ""
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: ""
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: ""
                })
            }
            case AuthActionType.ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: payload.errorMessage
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try {
            const response = await api.getLoggedIn();
            console.log("getLoggedIn response: " + response.status)
            console.log(response)
            if (response.status === 200 && !auth.loggedIn) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        } catch(error) {
            console.log("LOGGING OUT USER...INVALID TOKEN")
            
            // Log the user out if the token or user no longer exists
            // if not already
            if (auth.loggedIn)
                authReducer( {
                    type: AuthActionType.LOGOUT_USER,
                    payload: null
                })

            // Take them back to the welcome screen
            navigate("/");
        }
    }

    auth.registerUser = async function(username, email, password, passwordVerify) {
        try {
            const response = await api.registerUser(username, email, password, passwordVerify);
            console.log(response);
            if (response.status === 200) {
                console.log("success");
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: { user: response.data.user }
                })
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                navigate("/");
            }
        } catch(error) {
            console.log(error.response.data.errorMessage);
            authReducer({
                type: AuthActionType.ERROR,
                payload: { errorMessage: error.response.data.errorMessage }
            })
        }
    }

    auth.loginUser = async function(email, password) {
        console.log("Login user");
        try {
            const response = await api.loginUser(email, password);
            console.log(response);
            if (response.status === 200) {
                console.log("success");
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                navigate("/");
            } 
        } catch(error) {
            console.log(error.response.data.errorMessage);
            authReducer({
                type: AuthActionType.ERROR,
                payload: { errorMessage: error.response.data.errorMessage }
            })
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            navigate("/");
        }
    }

    auth.hideModal = () => {
        authReducer({
            type: AuthActionType.ERROR,
            payload: { errorMessage: "" }
        });
    }

    auth.isErrorModalOpen = () => {
        return auth.errorMessage !== "";
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };