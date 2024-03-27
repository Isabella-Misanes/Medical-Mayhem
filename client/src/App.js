import './App.css';
import * as Constants from './constants';
import { useState } from 'react';
import { HomeScreen, WelcomeScreen } from './components';

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
    default:
      return <h1>404 Page Not Found</h1>
  }
}

export default App;
