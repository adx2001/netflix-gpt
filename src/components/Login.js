import React, { useRef } from "react";
import Header from "./Header";
import { useState } from "react";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { PHOTO_URL } from "../utils/constants";

const Login = () => {
    const [isSignInFrom, setIsSignInForm] = useState(true)
    const [errorMessage, setErrorMEssage] = useState(null)
    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const dispatch = useDispatch()

    const handleButtonClick = () => {

        //validate the email and password and update the errorMessage state accordingly
        const message = checkValidData(email.current.value, password.current.value)
        setErrorMEssage(message)
        if (message) return

        if (!isSignInFrom) {
            //sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: PHOTO_URL 
                    }).then(() => {
                        const { displayName, email, uid, photoURL } = auth.currentUser
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                    }).catch((error) => {
                        console.log("🚀 ~ .then ~ error:", error)
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMEssage(errorCode + " - " + errorMessage)
                });

        }
        else {
            //sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMEssage(errorCode + " - " + errorMessage)
                });
        }
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInFrom)
    }

    return (
        <>
            {/* Header */}
            <div>
                <Header />
            </div>

            {/* Background Image */}
            <div>
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/2bcf01ee-7ef6-4930-b0d5-c6863853c461/web/IN-en-20241125-TRIFECTA-perspective_a47db038-756f-4f26-b1f7-cfc882b98746_large.jpg"
                    alt="main-img"
                    className="absolute top-0 left-0 w-full h-screen object-cover -z-10"
                />
                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-60 -z-10"></div>
            </div>

            {/* Login Form */}
            <div className="flex items-center justify-center h-screen">
                <div className="w-11/12 md:w-3/12 bg-black bg-opacity-50 text-white p-8 rounded-md">
                    <h1 className="font-bold text-3xl mb-6">{isSignInFrom ? "Sign In" : "Sign Up"}</h1>
                    <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
                        {!isSignInFrom && <input
                            ref={name}
                            type="text"
                            className="p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Name"
                        />}
                        <input
                            autoComplete="off"
                            autoSave="off"
                            ref={email}
                            type="email"
                            className="p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Email"
                        />
                        <input
                            ref={password}
                            type="password"
                            className="p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Password"
                        />
                        <p className="text-red-500">{errorMessage}</p>
                        <button className="p-3 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition" onClick={handleButtonClick}>
                            {isSignInFrom ? "Sign In" : "Sign Up"}
                        </button>
                    </form>
                    <div className="flex justify-between items-center mt-4 text-sm">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="/" className="text-gray-400 hover:underline">
                            Need help?
                        </a>
                    </div>
                    <div className="mt-8 text-center text-gray-400">
                        <p onClick={toggleSignInForm} className="text-white hover:underline cursor-pointer" >
                            {isSignInFrom ? "New to Netflix?" : "Already Registered"}   {" "}

                            {isSignInFrom ? "Sign Up" : "Sign In"}

                        </p>
                        <p className="text-xs mt-2">
                            This page is protected by Google reCAPTCHA to ensure you're not a
                            bot.{" "}
                            <a href="/" className="text-blue-400 hover:underline">
                                Learn more.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
