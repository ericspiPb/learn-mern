import React, { Component } from 'react'
import PropTypes from 'prop-types'

import isEmpty from '../../validation/is-empty'

class ProfileAbout extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  }

  render() {
    const {profile} = this.props;

    const firstname = profile && profile.user && profile.user.name && profile.user.name.trim().split(' ')[0];

    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ))  

    return (
      <div className="card card-body body bg-light mb-3">
        <h3 className="text-center text-info">{firstname}'s Bio</h3>
        <p className="lead">{isEmpty(profile.bio) ? (<span>{firstname} does not have bio</span>) : (<span>{profile.bio}</span>)}</p>
        <h3 className="text-center text-info">Skill Set</h3>
        <div className="row">
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {skills}
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileAbout;