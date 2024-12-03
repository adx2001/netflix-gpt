import React, { useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice"
import { useDispatch } from "react-redux"
import { NETFLIX_LOGO } from '../utils/constants';

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(store => store.user)

    function handleButtonClick() {
        signOut(auth).then(() => {
            navigate("/")
        }).catch((error) => {
            navigate("/error")
        });
    }

    useEffect(() => {
        const unsubscribe = () => onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                const { displayName, email, uid, photoURL } = user
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                navigate("/browse")
            } else {
                // User is signed out
                dispatch(removeUser())
                navigate("/")

            }
        })
        return () => unsubscribe()
    }, [])

    return (
        <header className="absolute px-4 md:px-8 py-4 bg-gradient-to-b from-black to-transparent w-full z-10 flex justify-between items-center">
            {/* Logo Section */}
            <div>
                <img
                    src={NETFLIX_LOGO}
                    alt="Logo"
                    className="w-32 md:w-44"
                />
            </div>

            {/* User Avatar and Sign-Out Button */}
            {
                user && (
                    <div className="flex items-center space-x-4">

                        <p className="hidden md:block md:text-lg md:text-black md:font-bold">
                            {user?.displayName}
                        </p>
                        <img
                            src={user.photoURL}
                            alt="User Avatar"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-700"
                        />
                        <button
                            className="px-3 py-2 md:px-4 md:py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition shadow-lg"
                            onClick={handleButtonClick}
                        >
                            Sign Out
                        </button>
                    </div>
                )
            }

        </header>
    );
};

export default Header;
