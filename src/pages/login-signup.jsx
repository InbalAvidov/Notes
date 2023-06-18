import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { signup, login } from '../store/actions.js'
import { utilService } from '../services/util-service.js'
import note from '../assets/imgs/logo.jpg'
import { userService } from '../services/user-service.js'

export function LoginSignup() {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)
    const { signupState } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (signupState === 'loginState') setIsSignupState(false)
        else if (signupState === 'signupState') setIsSignupState(true)
    }, [signupState])

    function onToggleSignupState(ev) {
        ev.preventDefault()
        setIsSignupState(!isSignupState)
    }

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    async function loginAsGuest() {
        try {
            await login({
                _id: utilService.makeId(),
                username: 'guest',
                password: 'guest',
            })
            navigate('/')
        } catch (err) {
            console.log('err:',err)
        }
    }

    async function onSubmit(ev) {
        ev.preventDefault();
        if (isSignupState)
            try {
                await signup({ ...credentials, fullName: credentials.fullName })
                navigate('/')
            }
            catch (err) {
                console.log('err:',err)
            }
        else try {
            await login(credentials)
            navigate('/')
        } catch (err) {
            console.log('err:',err)
        }
    }

    return (
        <section className="login-signup">
            <div className="login-page">
                <header className="login-header ">
                    <div className="logo">
                        <img className="logo-img" src={note} />
                        <h1>Notes</h1>
                    </div>
                </header>
                <button className="guest-btn" onClick={loginAsGuest}>Login as a guest</button>
                <form className="login-form " onSubmit={onSubmit}>
                    <label>
                        <h2>
                            User Name
                        </h2>
                        <input
                            className="custom-placeholder"
                            type="text"
                            name="userName"
                            value={credentials.userName}
                            placeholder="User name"
                            onChange={handleCredentialsChange}
                            required
                        />
                    </label>
                    <label>
                        <h2>
                            Email
                        </h2>
                        <input
                            className="custom-placeholder"
                            type="email"
                            name="email"
                            value={credentials.email}
                            placeholder="Enter your email"
                            onChange={handleCredentialsChange}
                            required
                        />
                    </label>
                    <label>
                        <h2>
                        Password
                        </h2>
                        <input
                            className="custom-placeholder"
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleCredentialsChange}
                            required
                        />
                    </label>
                    {isSignupState &&
                        <label>
                            <h2>
                            Full Name
                            </h2>
                            <input
                                className="custom-placeholder"
                                type="text"
                                name="fullName"
                                value={credentials.fullName}
                                placeholder="Full name"
                                onChange={handleCredentialsChange}
                                required
                            />
                        </label>
                    }
                    <button className="registration-btn">{isSignupState ? "Signup" : "Login"}</button>
                    <a href="#" onClick={onToggleSignupState}>
                        {isSignupState ? "Have an account? Login" : "Don\"t have an account? Sign up here"}
                    </a>
                </form>
            </div>
        </section>
    )
}