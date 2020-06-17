import * as ContactTypeAPIUtil from '../util/contact_type_api_util';

export const RECEIVE_ALL_CONTACT_TYPES = "RECEIVE_ALL_CONTACT_TYPES";
export const RECEIVE_CONTACT_TYPE = "RECEIVE_CONTACT_TYPE";
export const EDIT_CONTACT_TYPE = "EDIT_CONTACT_TYPE";
export const REMOVE_CONTACT_TYPE = "REMOVE_CONTACT_TYPE";
export const RECEIVE_CONTACT_TYPE_ERRORS = "RECEIVE_CONTACT_TYPE_ERRORS";

const receiveAllContactTypes = contactTypes => {
  return {
    type: RECEIVE_ALL_CONTACT_TYPES,
    contactTypes
  };
};

const receiveContactType = contactType => {
  return {
    type: RECEIVE_CONTACT_TYPE,
    contactType
  };
};

const editContactType = (contactType, typeId) => {
  return {
    type: EDIT_CONTACT_TYPE,
    contactType,
    typeId
  };
};

const removeContactType = contactTypeId => {
  return {
    type: REMOVE_CONTACT_TYPE,
    contactTypeId
  };
};

const receiveContactTypeErrors = errors => {
  return {
    type: RECEIVE_CONTACT_TYPE_ERRORS,
    errors
  };
};

export const fetchContactTypes = () => dispatch => {
  return ContactTypeAPIUtil.fetchContactTypes()
    .then(contactTypes => dispatch(receiveAllContactTypes(contactTypes)));
};

export const createContactType = typeData => dispatch => {
  return ContactTypeAPIUtil.createContactType(typeData)
    .then(contactType => dispatch(receiveContactType(contactType)),
      err => dispatch(receiveContactTypeErrors(err)));
};

export const updateContactType = (typeData, typeId) => dispatch => {
  return ContactTypeAPIUtil.updateContactType(typeData, typeId)
    .then(contactType => dispatch(editContactType(contactType, typeId)),
      err => dispatch(receiveContactTypeErrors(err)));
};

export const deleteContactType = typeId => dispatch => {
  return ContactTypeAPIUtil.deleteContactType(typeId)
    .then(() => dispatch(removeContactType(typeId)));
};
