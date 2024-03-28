export default function Register() {
    // const [username, setUsername] = useState("")
    // const [usernameError, setUsernameError] = useState("")
    // const [email, setEmail] = useState("")
    // const [emailError, setEmailError] = useState("")
    // const [password, setPassword] = useState("")
    // const [passwordError, setPasswordError] = useState("")
    // const [passwordVerification, setPasswordVerification] = useState("")
    // const [passwordVerifError, setPasswordVerifError] = useState("")

    // const handleRegister = (event) => {
    //     event.preventDefault();

    //     /*
    //         Regex for a valid email is taken from this source:
    //         https://www.regular-expressions.info/email.html
    //     */
    //     const emailRegex = /^[^@]+@[^@]+\.[^@]+$/
    //     const passwordRegex = new RegExp(username + '|' + email.substring(0, email.indexOf('@')), "gi")

    //     if(username.length === 0) {
    //         setUsernameError("Invalid username.")
    //         return
    //     }
    //     else setUsernameError("")

    //     // Email should have a correct format.
    //     if(!emailRegex.test(email)) {
    //         setEmailError("Invalid email.")
    //         return
    //     }
    //     else setEmailError("")

    //     if(password.length === 0) {
    //         setPasswordError("Invalid password.")
    //         return
    //     }
    //     else setPasswordError("")

    //     // The typed password should not contain the username or the email id.
    //     if(passwordRegex.test(password)) {
    //         setPasswordError("The password must not contain the username nor the email id.")
    //         return
    //     }
    //     else setPasswordError("")

    //     // The password verification must match the password.
    //     if(password !== passwordVerification) {
    //         setPasswordVerifError("The password verification does not match the typed password.")
    //         return
    //     }
    //     else setPasswordVerifError("")

    //     const registerUser = async () => {
    //         const userData = {
    //             username: username,
    //             email: email,
    //             password: password,
    //         }

    //         const res = await axios.post('http://localhost:8000/register', userData)
    //         return res
    //     }
    
    //     registerUser()
    //         .then(() => {
    //             alert("Registration successful.");
    //             setCurrPage(Constants.LOGIN_PAGE)
    //         })
    //         .catch(error => {
    //             if(!error.response) alert("Server is down. Try again later.")
    //             else setEmailError("Email is already associated with an existing user.")
    //         })
    // }

    /*
        Ngl this is a monstrosity to look at, but it gets the job done.
        If you want to fix it, be my guest. - Torin

        fixed with modularization 😎 -jared
    */
    return (
        /*
        <form className="welcome-form" onSubmit={handleRegister}>
            <WelcomePageForm idName={'username'} text={"Username"} setField={setUsername} error={usernameError} /><br />
            <WelcomePageForm idName={'email'} text={"Email"} setField={setEmail} error={emailError} /><br />
            <WelcomePageForm idName={'password'} text={"Password"} setField={setPassword} error={passwordError} /><br />
            <WelcomePageForm idName={"passwordverification"} text={"Verify Password"} setField={setPasswordVerification} error={passwordVerifError} /><br />
        */
        <form className="welcome-form">
            <WelcomePageForm idName={'username'} text={"Username"} /><br />
            <WelcomePageForm idName={'email'} text={"Email"} /><br />
            <WelcomePageForm idName={'password'} text={"Password"} /><br />
            <WelcomePageForm idName={"passwordverification"} text={"Verify Password"} /><br />
            <div>
                {/* <button tabIndex='0' className="welcome-button" onClick={() => setCurrPage(Constants.SPLASH_PAGE)}>Back</button> */}
                <button tabIndex='0' className="welcome-button">Back</button>
                <button tabIndex='0' className="welcome-button">Sign Up</button>
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