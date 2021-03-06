import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import './Dashboard.css';

import Projects from '../Projects/Projects';
import { successMessage } from '../../redux/actions/message';
import { userLogOut } from '../../redux/actions/user';
import { sendVerifyEmailLink } from '../../controllers/verifyEmail';

class Dashboard extends Component {
  handleVerifyEmail = () => {
    sendVerifyEmailLink().then((res) => {
      if (!res.error) {
        this.props.dispatch(successMessage('Verification email sent. Please check your inbox!'));
      } else {
        this.props.dispatch(userLogOut());
      }
    });
  };

  render() {
    return (
      <div className='Dashboard'>
        {!this.props.isVerified && (
          <div className='Verify-Email'>
            <div>Please verify your email first before you create any project.</div>
            <Button
              variant='contained'
              size='medium'
              color='primary'
              className='Verify-Email-Button'
              onClick={this.handleVerifyEmail}
            >
              Verify Email
            </Button>
          </div>
        )}
        {this.props.isVerified && (
          <div className='Content'>
            <Projects />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.user.auth, isVerified: state.user.isVerified };
};

export default connect(mapStateToProps)(Dashboard);
