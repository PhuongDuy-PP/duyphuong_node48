import React, { useEffect, useState } from 'react';
import '../style/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { login, loginFacebook, register } from '../api/authService';
import { toast } from 'react-toastify';
import ReactFacebookLogin from 'react-facebook-login';


const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [pass_word, setPassword] = useState('');
    const [full_name, setFullName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await login({ email, pass_word });
            console.log("Login response: ", response);

            // Hiển thị thông báo đăng nhập thành công
            toast.success("Login successfully");

            // lưu access token vào localStorage của browser
            localStorage.setItem("USER_LOGIN", response.token);

            // chuyển hướng đến trang chủ
            navigate('/');
        } catch (error) {
            setError("Login failed");
            toast.error("Login failed");
            console.log("Login failed: ", error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await register({ email, pass_word, full_name });
            toast.success("Register successfully");
            console.log("Register response: ", response);
        } catch (error) {
            setError("Register failed: ", error);
            toast.error(error.response.data.message);
            console.log("Register failed: ", error);
        }
    }

    const handleLoginFacebook = async (payload) => {
        try {
            console.log("payload login facebook: ", payload);
            const response = await loginFacebook(payload);
            if(response.status === 200) {
                toast.success("Login successfully");
                localStorage.setItem("USER_LOGIN", response.data.token);
                navigate('/');
            }
        } catch (error) {
            console.log("Login Facebook failed: ", error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        const handleSignUp = () => container.classList.add('right-panel-active');
        const handleSignIn = () => container.classList.remove('right-panel-active');

        if (signUpButton && signInButton && container) {
            signUpButton.addEventListener('click', handleSignUp);
            signInButton.addEventListener('click', handleSignIn);
        }

        return () => {
            if (signUpButton && signInButton) {
                signUpButton.removeEventListener('click', handleSignUp);
                signInButton.removeEventListener('click', handleSignIn);
            }
        };
    }, []);

    return (
        <div className="container-login" id="container">
            {/* Sign Up Form */}
            <div className="form-container sign-up-container">
                <form onSubmit={handleRegister}>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <ReactFacebookLogin
                            appId='1414546939706641'
                            fields='name,email,picture'
                            callback={handleLoginFacebook}
                        />
                        <a href="#" className="social"><i className="fab fa-google-plus-g" /></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input
                        type="text"
                        placeholder="Full name"
                        value={full_name}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={pass_word}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>

            {/* Sign In Form */}
            <div className="form-container sign-in-container">
                <form onSubmit={handleLogin}>
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <ReactFacebookLogin
                            appId='1414546939706641'
                            fields='name,email,picture'
                            callback={handleLoginFacebook}
                            icon="fa-facebook"
                        />
                        <a href="#" className="social"><i className="fab fa-google-plus-g" /></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
                    </div>
                    <span>or use your account</span>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={pass_word}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Link to="/forgot-pass">
                        Forgot your password?
                    </Link>
                    <button>Sign In</button>
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LoginComponent;