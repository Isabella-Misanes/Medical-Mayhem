import { useContext, useState, useEffect } from 'react'
import HomeScreen from './HomeScreen'
import WelcomeScreen from './WelcomeScreen'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        console.log("HomeWrapper useEffect")
        console.log("auth.loggedIN: " + auth.loggedIn)
        if(auth.loggedIn)
            setIsAuthorized(true)

        else
            setIsAuthorized(false)
    }, [auth.loggedIn])

    return (isAuthorized || store.guest) ? <HomeScreen /> : <WelcomeScreen />;
}