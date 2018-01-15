import firebase from "../config/firebase";
import _ from "lodash";
import * as constants from "../common/constants";

// get data from firebase
export const getCategories = () =>
  firebase
    .database()
    .ref(constants.CATEGORIES_URL)
    .once(constants.VALUE)
    .then(snap =>
      _.map(snap.val(), (value, key) => _.extend({ $key: key }, value))
    )
    .catch(err => `${constants.UNSUCCESSFUL}: ${err.message}`);
// add data to firebase
export const addCategory = category =>
  firebase
    .database()
    .ref(constants.CATEGORIES_URL)
    .push({
      name: category.name,
      active: category.active,
      updated: category.updated
    })
    .once(constants.VALUE)
    .then(snap => `${constants.SAVE_SUCCESSFUL}: ${snap.key}`)
    .catch(err => `${constants.SAVE_UNSUCCESSFUL}: ${err.message}`);
// delete data from firebase
export const deleteCategory = $key => {
  const ref = `${constants.CATEGORIES_URL}/${$key}`;
  return firebase
    .database()
    .ref(ref)
    .remove()
    .then(snap => `${constants.DELETE_SUCCESSFUL}: ${$key}`)
    .catch(err => `${constants.DELETE_UNSUCCESSFUL}: ${err.message}`);
};
