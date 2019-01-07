import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {GET_ERRORS, SET_CURRENT_USER} from './types';
import setAuthToken from '../utils/setAuthToken';

// Register User
export const registerUser = (userData, history) => (dispatch) => {
    axios.post("/api/users/register", userData)
        .then(res => {
            history.push('/login')
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Login - Get user token
export const loginUser = (userData) => (dispatch) => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // Save to localStorage
            const {token} = res.data;
            // Set token to local storage
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decodedData = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decodedData));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Set logged in user
export const setCurrentUser = (decodedData) => {
    return {
        type: SET_CURRENT_USER,
        payload: decodedData
    }
}

// Logout user
export const logoutUser = () => (dispatch) => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}