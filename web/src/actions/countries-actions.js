import * as types from './action-types';
import * as fetch from '../common/fetch';
import * as constants from '../common/constants';
import api from '../common/api';
import toaster from '../common/toast';
import { browserHistory } from 'react-router';

export const getCountries = (user) => {
    return dispatch => {
        dispatch({ type: types.FETCH_COUNTRIES_PENDING });
        return fetch.getJson(api.countries, null, user.token)
            .then(response => {
                if (response.status === constants.UNAUTHORIZED) {
                    throw new Error(constants.TOKEN_ERROR);
                }
                return response.json();
            })
            .then(json => dispatch({ type: types.FETCH_COUNTRIES_FULFILLED, payload: json }))
            .catch(error => {
                toaster(`${constants.UNSUCCESSFUL}: ${error.message}`, constants.ERROR);
                dispatch({ type: types.FETCH_COUNTRIES_REJECTED, payload: error.message });
                if (error.message === constants.TOKEN_ERROR) {
                    dispatch({ type: types.SUBMIT_LOGOUT });
                    browserHistory.push(constants.LOGIN_URL);
                }
            });
    }
}
export const submitCountryApi = (dispatch, user, item) => {
    if (item.id) {
        //update data to server
        return fetch.putJson(api.countries, item, user.token)
            .then(response => {
                if (response.status === constants.UNAUTHORIZED) {
                    throw new Error(constants.TOKEN_ERROR);
                }
                toaster(`${constants.UPDATE_SUCCESSFUL}: ${item.id}`, constants.SUCCESS);
                browserHistory.push(constants.COUNTRIES_URL);
            })
            .catch(error => {
                toaster(`${constants.UPDATE_UNSUCCESSFUL}: ${error.message}`, constants.ERROR);
                if (error.message === constants.TOKEN_ERROR) {
                    dispatch({ type: types.SUBMIT_LOGOUT });
                    browserHistory.push(constants.LOGIN_URL);
                }
                else {
                    browserHistory.push(constants.COUNTRIES_URL);
                }
            });
    }
    else {
        //add data to server
        return fetch.postJson(api.countries, item, user.token)
            .then(response => {
                if (response.status === constants.UNAUTHORIZED) {
                    throw new Error(constants.TOKEN_ERROR);
                }
                toaster(`${constants.SAVE_SUCCESSFUL}`, constants.SUCCESS);
                browserHistory.push(constants.COUNTRIES_URL);
            })
            .catch(error => {
                toaster(`${constants.SAVE_UNSUCCESSFUL}: ${error.message}`, constants.ERROR);
                if (error.message === constants.TOKEN_ERROR) {
                    dispatch({ type: types.SUBMIT_LOGOUT });
                    browserHistory.push(constants.LOGIN_URL);
                }
                else {
                    browserHistory.push(constants.COUNTRIES_URL);
                }
            });
    }
}
export function submitCountry(user, item) {
    return dispatch => {
        dispatch({ type: types.FETCH_SUBMIT, payload: submitCountryApi(dispatch, user, item) });
    }
}
export const deleteCountry = (user, id) => {
    let url = `${api.countries}/${id}`;
    return dispatch => {
        dispatch({ type: types.FETCH_SUBMIT_PENDING });
        return fetch.deleteJson(url, null, user.token)
            .then(response => {
                if (response.status === constants.UNAUTHORIZED) {
                    throw new Error(constants.TOKEN_ERROR);
                }
                return response.json();
            })
            .then(json => {
                toaster(`${constants.DELETE_SUCCESSFUL}: ${id}`, constants.SUCCESS);
                dispatch({ type: types.FETCH_SUBMIT_FULFILLED, payload: json });
                dispatch(getCountries(user));
            })
            .catch(error => {
                toaster(`${constants.DELETE_UNSUCCESSFUL}: ${error.message}`, constants.ERROR);
                dispatch({ type: types.FETCH_SUBMIT_REJECTED, payload: error.message });
                if (error.message === constants.TOKEN_ERROR) {
                    dispatch({ type: types.SUBMIT_LOGOUT });
                    browserHistory.push(constants.LOGIN_URL);
                }
            });
    }
}