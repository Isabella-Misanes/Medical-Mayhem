export default function Login() {
    return(
        <form className="login-form">
            <WelcomePageForm idName={'email'} text={"Email"} /><br />
            <WelcomePageForm idName={'password'} text={"Password"} /><br />
            <div>
                <button className="welcome-button">Back</button>
                <button className="welcome-button">Login</button>
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