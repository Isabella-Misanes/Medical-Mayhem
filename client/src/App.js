import './App.css';
import WelcomeScreen from './components/WelcomeScreen';

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
  return (
    <WelcomeScreen />
  );
}

export default App;
