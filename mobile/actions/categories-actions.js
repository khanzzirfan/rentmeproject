import firebase from '../config/firebase';
import _ from 'lodash';
import * as constants from '../common/constants';
import * as types from './action-types';

//get data from firebase
export function getCategories() {
    return dispatch => {
        dispatch({ type: types.FETCH_CATEGORIES_PENDING });
        return firebase.database().ref(constants.CATEGORIES_URL)
            .once(constants.VALUE)
            .then(snap => {
                var payload = _.map(snap.val(), (value, key) => _.extend({ $key: key }, value))
                dispatch({ type: types.FETCH_CATEGORIES_FULFILLED, payload });
            })
            .catch(err => {
                dispatch({
                    type: types.FETCH_CATEGORIES_REJECTED,
                    payload: `${constants.UNSUCCESSFUL}: ${err.message}`
                });
            });
    }
}
/*
//add data to firebase
export const addCategory = (category) => {
    return firebase.database().ref(constants.CATEGORIES_URL)
        .push({
            name: category.name,
            active: category.active,
            updated: category.updated
        })
        .once(constants.VALUE)
        .then(snap => `${constants.SAVE_SUCCESSFUL}: ${snap.key}`)
        .catch(err => `${constants.SAVE_UNSUCCESSFUL}: ${err.message}`);
}
//delete data from firebase
export const deleteCategory = ($key) => {
    let ref = `${constants.CATEGORIES_URL}/${$key}`;
    return firebase.database().ref(ref)
        .remove()
        .then(snap => `${constants.DELETE_SUCCESSFUL}: ${$key}`)
        .catch(err => `${constants.DELETE_UNSUCCESSFUL}: ${err.message}`);
}
*/