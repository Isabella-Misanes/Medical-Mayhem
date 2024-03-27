import './App.css';
import * as Constants from './constants';
import { useState } from 'react';
import { HomeScreen, WelcomeScreen, AboutScreen, SettingsScreen, SocialScreen, ForumScreen, MapSearchScreen, MapBuilderScreen, ProfileScreen, GameScreen } from './components';

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

function App() {
  const [currScreen, setCurrScreen] = useState(Constants.WELCOME_SCREEN);

  switch(currScreen) {
    case Constants.WELCOME_SCREEN:
      return <WelcomeScreen setCurrScreen={setCurrScreen} />

    case Constants.HOME_SCREEN:
      return <HomeScreen setCurrScreen={setCurrScreen} />
    case Constants.ABOUT_SCREEN:
      return <AboutScreen setCurrScreen={setCurrScreen} />
    case Constants.SETTINGS_SCREEN:
      return <SettingsScreen setCurrScreen={setCurrScreen} />
    case Constants.SOCIAL_SCREEN:
      return <SocialScreen setCurrScreen={setCurrScreen} />
    
    case Constants.FORUM_SCREEN:
      return <ForumScreen setCurrScreen={setCurrScreen} />
    case Constants.VIEW_POSTS_SCREEN:
      return <HomeScreen setCurrScreen={setCurrScreen} />
    case Constants.POSTS_SCREEN:
      return <HomeScreen setCurrScreen={setCurrScreen} />
    case Constants.NEW_THREAD_SCREEN:
      return <HomeScreen setCurrScreen={setCurrScreen} />

    case Constants.PROFILE_SCREEN:
      return <ProfileScreen setCurrScreen={setCurrScreen} />
    case Constants.ACHIEVEMENTS_SCREEN:
      return <HomeScreen setCurrScreen={setCurrScreen} />

    case Constants.LEADERBOARD_SCREEN:
      return <HomeScreen setCurrScreen={setCurrScreen} />
    
    case Constants.MAP_SEARCH_SCREEN:
      return <MapSearchScreen setCurrScreen={setCurrScreen} />
    case Constants.MAP_BUILDER_SCREEN:
      return <MapBuilderScreen setCurrScreen={setCurrScreen} />

    case Constants.REPORTS_SCREEN:
      return <HomeScreen setCurrScreen={setCurrScreen} />

    case Constants.GAME_SCREEN:
      return <GameScreen setCurrScreen={setCurrScreen} />

    default:
      return <h1>404 Page Not Found</h1>
  }
}

export default App;
