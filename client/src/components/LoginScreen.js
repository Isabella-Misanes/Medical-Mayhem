import { Box, Button, Typography } from '@mui/material';
import { buttonStyle } from '../App';
import * as Constants from '../constants'

export default function LoginScreen({setCurrScreen}) {
    return(
        <form className="login-form">
            <WelcomePageForm idName={'email'} text={"Email"} /><br />
            <WelcomePageForm idName={'password'} text={"Password"} /><br />
            <div>
            <Button variant="contained"
                    sx={[buttonStyle, {
                        width: '100px',
                        left: '2%'
                    }]}
                    onClick={()=>{
                        setCurrScreen(Constants.WELCOME_SCREEN);
                        }}>
                    Back
            </Button>
            <Button variant="contained"
                sx={[buttonStyle, {
                    width: '100px',
                    left: '2%'
                }]}
                onClick={()=>{
                    // setCurrScreen(Constants.WELCOME_SCREEN);
                    alert("to be implemented -🐻");
                    }}>
                Login
            </Button>
            </div>
        </form>
    )
}

function WelcomePageForm(props) {
    return (
        <div id={props.idName + "-form"}>
            <label htmlFor={props.idName} className='welcome-input'>{props.text}: </label>
            <input type={(props.idName.includes('password') ? 'password' : 'text')} id={props.idName} onChange={(event) => props.setField(event.target.value)} />
            <div>{props.error}</div>
        </div>
    )
}