import { useContext, useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom'
import AuthContext, { UserRoleType } from "../auth";
import {
    LoginScreen,
    AboutScreen,
    SettingsScreen,
    SocialScreen,
    ForumScreen,
    MapSearchScreen,
    MapBuilderScreen,
    ProfileScreen,
    GameScreen,
    PostScreen,
    NewThreadScreen,
    LeaderboardScreen,
    RegisterScreen,
    HomeWrapper,
    Sidebar,
    InviteModal
} from '.'
import GlobalStoreContext from "../store";

export default function MainLayout() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const [displayInviteModal, setDisplayInviteModal] = useState(false)
    const [displaySidebar, setDisplaySidebar] = useState(false)


    useEffect(() => {
        setDisplaySidebar(auth.loggedIn && auth.role !== UserRoleType.GUEST)
    }, [auth])

    return (
        <div id='main-content'>
            <div id='body'>
                <Routes>
                    <Route path="/" exact element={<HomeWrapper />} />
                    <Route path="/login/" exact element={<LoginScreen />} />
                    <Route path="/register/" exact element={<RegisterScreen />} />
                    <Route path="/about/" exact element={<AboutScreen />} />
                    <Route path="/settings/" exact element={<SettingsScreen />} />
                    <Route path="/social/" exact element={<SocialScreen />} />
                    <Route path="/forum/" exact element={<ForumScreen />} />
                    <Route path="/mapsearch/" exact element={<MapSearchScreen />} />
                    <Route path="/mapbuilder/" exact element={<MapBuilderScreen />} />
                    <Route path="/profile/" exact element={<ProfileScreen />} />
                    <Route path="/game/" exact element={<GameScreen />} />
                    <Route path="/post/" exact element={<PostScreen />} />
                    <Route path="/newthread/" exact element={<NewThreadScreen />} />
                    <Route path="/leaderboard/" exact element={<LeaderboardScreen />} />
                </Routes>
                <InviteModal displayInviteModal={displayInviteModal} setDisplayInviteModal= {setDisplayInviteModal} inviter={store.inviter} />
            </div>
            {displaySidebar && <Sidebar />}
        </div>
    )
}