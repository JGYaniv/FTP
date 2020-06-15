import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';
import Session from './session';

const mapStateToProps = (state) => ({
  errors: Object.values(state.errors.session),
  formType: "Login",
  navLink: <Link to={'/signup'}>Sign up here</Link>,
  session: {
    email: '',
    password: ''
  }
});

const mapDispatchToProps = dispatch => ({
  action: (user) => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
