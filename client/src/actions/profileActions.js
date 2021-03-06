import axios from 'axios';

import {
    PROFILE_LOADING,
    GET_PROFILE,
    CLEAR_CURRENT_USER,
    GET_ERRORS,
    SET_CURRENT_USER,
    GET_PROFILES
} from './types';

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// Get current profile
export const getCurrentProfileAction = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        )
}

// Get profile by handle
export const getProfileByHandleAction = (handle) => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/handle/${handle}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        )
}

// Clear profile
export const clearCurrentProfileAction = () => {
    return {
        type: CLEAR_CURRENT_USER
    }
}

// Create profile
export const createProfileAction = (profileData, history) => (dispatch) => {
    axios.post("/api/profile", profileData)
            .then(res => history.push("/dashboard"))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            )
}

// Add experience
export const addExperienceAction = (expData, history) => (dispatch) => {
    axios.post('/api/profile/experience', expData)
            .then(res => history.push("/dashboard"))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            )
}

// Delete experience
export const deleteExperienceAction = (id) => (dispatch) => {
    axios.delete(`/api/profile/experience/${id}`)
            .then(res => 
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                })
            )
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            )
}

// Add education
export const addEducationAction = (eduData, history) => (dispatch) => {
    axios.post('/api/profile/education', eduData)
            .then(res => history.push("/dashboard"))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            )
}

// Delete education
export const deleteEducationAction = (id) => (dispatch) => {
    axios.delete(`/api/profile/education/${id}`)
            .then(res =>
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                })
            )
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            )
}

// Delete profile
export const deleteAccountAction = () => (dispatch) => {
    if(window.confirm('Are you sure? This can NOT be undone!')) {
        axios.delete('/api/profile')
                .then(res =>
                    dispatch({
                        type: SET_CURRENT_USER,
                        payload: {}
                    })
                ).catch(err =>
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                )
    }
}

// Get all profiles
export const getProfiles = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/all')
         .then(res =>
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
         )
         .catch(err =>
            dispatch({
                type: GET_PROFILES,
                paylod: err.response.data
            })
         )
}