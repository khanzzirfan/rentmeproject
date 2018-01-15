import * as types from './action-types';
import * as categoriesApi from '../api/categories-api';

export function getCategories() {
    return dispatch => {
        dispatch({
            type: types.FETCH_CATEGORIES,
            payload: categoriesApi.getCategories()
        });
    }
}
export function addCategory(category) {
    return dispatch => {
        dispatch({
            type: types.FETCH_SUBMIT,
            payload: categoriesApi.addCategory(category)
        });
    }
}
export function deleteCategory($key) {
    return dispatch => {
        dispatch({
            type: types.FETCH_SUBMIT,
            payload: categoriesApi.deleteCategory($key)
        });
    }
}