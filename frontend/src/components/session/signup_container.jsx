import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, login } from '../../actions/session_actions';
import Session from './session';

const mapStateToProps = (state) => ({
  errors: Object.values(state.errors.session),
  formType: "Signup",
  navLink: <Link to="/login">Already have an account?</Link>,
  session: {
    email: '',
    password: '',
    passwordConfirm: '',
  }

});

const mapDispatchToProps = dispatch => ({
  action: (user) => dispatch(signup(user)),
  login: (user) => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
