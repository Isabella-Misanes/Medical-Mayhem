// import './App.css';
// import * as Constants from './constants';
// import { useState } from 'react';
// import { HomeScreen, WelcomeScreen, LoginScreen, AboutScreen, SettingsScreen, SocialScreen, ForumScreen, MapSearchScreen, MapBuilderScreen, ProfileScreen, GameScreen, PostScreen, NewThreadScreen, LeaderboardScreen, ReportsScreen, RegisterScreen } from './components';

// // Styling
// export const modalStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'white',
//   boxShadow: 24,
//   p: 3
// };
// export const buttonStyle = {
//   bgcolor: '#3A9158',
//   ":hover": {
//     bgcolor: '#2d7044'},
// }

// function App() {
//   const [currScreen, setCurrScreen] = useState(Constants.WELCOME_SCREEN);

//   switch(currScreen) {
//     case Constants.WELCOME_SCREEN:
//       return <WelcomeScreen setCurrScreen={setCurrScreen} />
//     case Constants.REGISTER_SCREEN:
//       return <RegisterScreen setCurrScreen={setCurrScreen} />
//     case Constants.LOGIN_SCREEN:
//       return <LoginScreen setCurrScreen={setCurrScreen} />
//     case Constants.HOME_SCREEN:
//       return <HomeScreen setCurrScreen={setCurrScreen} />
//     case Constants.ABOUT_SCREEN:
//       return <AboutScreen setCurrScreen={setCurrScreen} />
//     case Constants.SETTINGS_SCREEN:
//       return <SettingsScreen setCurrScreen={setCurrScreen} />
//     case Constants.SOCIAL_SCREEN:
//       return <SocialScreen setCurrScreen={setCurrScreen} />
    
//     case Constants.FORUM_SCREEN:
//       return <ForumScreen setCurrScreen={setCurrScreen} />
//     case Constants.POST_SCREEN:
//       return <PostScreen setCurrScreen={setCurrScreen} />
//     case Constants.NEW_THREAD_SCREEN:
//       return <NewThreadScreen setCurrScreen={setCurrScreen} />

//     case Constants.PROFILE_SCREEN:
//       return <ProfileScreen setCurrScreen={setCurrScreen} />
//     case Constants.ACHIEVEMENTS_SCREEN:
//       return <ProfileScreen setCurrScreen={setCurrScreen} />

//     case Constants.LEADERBOARD_SCREEN:
//       return <LeaderboardScreen setCurrScreen={setCurrScreen} />
    
//     case Constants.MAP_SEARCH_SCREEN:
//       return <MapSearchScreen setCurrScreen={setCurrScreen} />
//     case Constants.MAP_BUILDER_SCREEN:
//       return <MapBuilderScreen setCurrScreen={setCurrScreen} />

//     case Constants.REPORTS_SCREEN:
//       return <ReportsScreen setCurrScreen={setCurrScreen} />

//     case Constants.GAME_SCREEN:
//       return <GameScreen setCurrScreen={setCurrScreen} />

//     default:
//       return <h1>404 Page Not Found</h1>
//   }
// }

// export default App;

import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
  HomeScreen,
  WelcomeScreen,
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
  ReportsScreen,
  RegisterScreen
} from './components'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/

// Styling
export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 3
};
export const buttonStyle = {
  bgcolor: '#3A9158',
  ":hover": {
    bgcolor: '#2d7044'},
}

const App = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>
                    <Routes>
                        <Route path="/" exact element={<WelcomeScreen />} />
                        <Route path="/home" exact element={<HomeScreen />} />
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
                        <Route path="/reports/" exact element={<ReportsScreen />} />
                    </Routes>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App