import { combineReducers } from 'redux';
import {
  ELECTION_FETCH_REQUEST,
  ELECTION_FETCH_SUCCESS,
  ELECTION_FETCH_FAILURE,
  ELECTION_CREATE_REQUEST,
  ELECTION_CREATE_SUCCESS,
  ELECTION_CREATE_FAILURE,
  ELECTION_UPDATE_REQUEST,
  ELECTION_UPDATE_SUCCESS,
  ELECTION_UPDATE_FAILURE,
} from 'redux/state/election';

import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from 'redux/state/register';

import {
  UNIT_FETCH_REQUEST,
  UNIT_FETCH_SUCCESS,
  UNIT_FETCH_FAILURE,
  UNIT_GET_REQUEST,
  UNIT_GET_SUCCESS,
  UNIT_GET_FAILURE,
  UNIT_UPDATE_REQUEST,
  UNIT_UPDATE_SUCCESS,
  UNIT_UPDATE_FAILURE,
  UNIT_CREATE_REQUEST,
  UNIT_CREATE_SUCCESS,
  UNIT_CREATE_FAILURE,
} from 'redux/state/unit';

import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from 'redux/state/user';
/**
 * Utility function to making a simple reducer to swap the loading indicator status.
 *
 * @param {String} request - The request constant to use
 * @param {String} success - The success constant to use
 * @param {String} failure - The failure constant to use
 * @return {function} a reducer
 */
export function makeReducer(request, success, failure) {
  return function reducer(state = false, action) {
    if (action.type === request) {
      return true;
    } else if (action.type === success || action.type === failure) {
      return false;
    }
    return state;
  };
}

/**
 * Utility function to create a reducer that listens to mutliple actions and
 * swap loading indicator status
 *
 * @param  {Array.String} startActions - Actions that intiate loading
 * @param  {Array.String} finishActions - Actions that stop loading
 * @return {Function}
 */
export function makeMultiActionReducer(startActions, finishActions) {
  let counter = 0;
  return function reducer(state = false, action) {
    if (startActions.indexOf(action.type) !== -1) {
      counter += 1;
    } else if (finishActions.indexOf(action.type) !== -1 && counter > 0) {
      counter -= 1;
    } else {
      return state;
    }
    return counter > 0;
  };
}

export default combineReducers({
  election: makeMultiActionReducer(
    [ELECTION_FETCH_REQUEST, ELECTION_CREATE_REQUEST, ELECTION_UPDATE_REQUEST],
    [ELECTION_FETCH_SUCCESS, ELECTION_CREATE_SUCCESS, ELECTION_UPDATE_SUCCESS],
    [ELECTION_FETCH_FAILURE, ELECTION_CREATE_FAILURE, ELECTION_UPDATE_FAILURE],
  ),
  user: makeReducer(USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE),
  unit: makeMultiActionReducer(
    [UNIT_FETCH_REQUEST, UNIT_UPDATE_REQUEST, UNIT_GET_REQUEST, UNIT_CREATE_REQUEST],
    [UNIT_FETCH_SUCCESS, UNIT_UPDATE_SUCCESS, UNIT_GET_SUCCESS, UNIT_CREATE_SUCCESS],
    [UNIT_FETCH_FAILURE, UNIT_UPDATE_FAILURE, UNIT_GET_FAILURE, UNIT_CREATE_FAILURE],
  ),
  register: makeReducer(REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE),
});
