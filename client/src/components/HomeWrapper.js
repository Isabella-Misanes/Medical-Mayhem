import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import WelcomeScreen from './WelcomeScreen'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);

    return (auth.loggedIn || store.guest) ? <HomeScreen /> : <WelcomeScreen />;
}