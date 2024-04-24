import { useContext, useState, useEffect } from 'react'
import HomeScreen from './HomeScreen'
import WelcomeScreen from './WelcomeScreen'
import AuthContext from '../auth'
// import { GlobalStoreContext } from '../store'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    // const { store } = useContext(GlobalStoreContext);
    const [isAuthorized, setIsAuthorized] = useState(undefined)

    console.log(isAuthorized)

    useEffect(() => {
        console.log("HomeWrapper useEffect")
        console.log("auth.loggedIN: " + auth.loggedIn)
        setIsAuthorized(auth.loggedIn)
    }, [auth.loggedIn])

    if (isAuthorized === undefined) return null

    return (isAuthorized) ? <HomeScreen /> : <WelcomeScreen />;
}