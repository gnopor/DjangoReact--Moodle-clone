import axios from "axios";
import * as actionTypes from "./actionTypes";


export const getGradedASNTListStart = () => {
    return {
        type: actionTypes.GET_GRADED_ASSIGNMENT_START
    };
};

export const getGradedASNTListSuccess = assignments => {
    return {
        type: actionTypes.GET_GRADED_ASSIGNMENT_SUCCESS,
        assignments
    };
};

export const getGradedASNTListFail = error => {
    return {
        type: actionTypes.GET_GRADED_ASSIGNMENT_FAIL,
        error: error
    };
};

export const getGradedASNTS = (username, token) => {
    return dispatch => {
        dispatch(getGradedASNTListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };

        axios
            .get(`http://127.0.0.1:8000/graded-assignments/?username=${username}`)
            .then(res => {
                const assignments = res.data;
                dispatch(getGradedASNTListSuccess(assignments));
            })
            .catch(err => {
                dispatch(getGradedASNTListFail(err));
            });
    };
};


export const createGradedASNT = (token, asnt) => {
    return dispatch => {
        //dispatch(createASNTStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };

        axios
            .post(`http://127.0.0.1:8000/graded-assignments/create/`, asnt)
            .then(res => {
                //dispatch(createASNTSuccess());
            })
            .catch(err => {
                //dispatch(createASNTFail(err));
            });
    };
};