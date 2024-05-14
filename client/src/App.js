import './App.css';
import { React } from 'react'
import { HashRouter } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import ErrorHandler from './components/ErrorHandler';
import MainLayout from './components/MainLayout';

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
        <HashRouter>
          <AuthContextProvider>
            <GlobalStoreContextProvider>
              <ErrorHandler>
                <MainLayout/>
              </ErrorHandler>
            </GlobalStoreContextProvider>
          </AuthContextProvider>
        </HashRouter>
    )
}

export default App