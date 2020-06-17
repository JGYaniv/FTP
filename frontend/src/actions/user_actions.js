import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_USER = "REMOVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

const receiveAllUsers = users => {
  return {
    type: RECEIVE_ALL_USERS,
    users
  };
};

const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user
  };
};

const removeUser = userId => {
  return {
    type: REMOVE_USER,
    userId
  };
};

const receiveUserErrors = errors => {
  return {
    type: RECEIVE_USER_ERRORS,
    errors
  };
};

export const fetchUsers = () => dispatch => {
  return UserAPIUtil.fetchUsers()
    .then(users => dispatch(receiveAllUsers(users)));
};

export const createUser = userData => dispatch => {
  return UserAPIUtil.createUser(userData)
    .then(user => dispatch(receiveUser(user)),
      err => dispatch(receiveUserErrors(err)));
};

export const updateUser = (userData, userId) => dispatch => {
  return UserAPIUtil.updateUser(userData, userId)
    .then(user => dispatch(receiveUser(user)),
      err => dispatch(receiveUserErrors(err)));
};

export const deleteUser = userId => dispatch => {
  return UserAPIUtil.deleteUser(userId)
    .then(() => dispatch(removeUser(userId)));
};
