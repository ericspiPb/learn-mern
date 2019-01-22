import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ProfileForm from './ProfileForm';
import {createProfileAction, getCurrentProfileAction} from "../../actions/profileActions";
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
    constructor(props){
        super(props);

        this.form = React.createRef();
    }

    componentDidMount() {
        this.props.getCurrentProfileAction()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.form.setState({errors: nextProps.errors})
        }

        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            // Set component fields state
            this.form.setState({
                handle: profile.handle,
                status: profile.status,
                skills: profile.skills.join(","),
                company: !isEmpty(profile.company) ? profile.company : "",
                location: !isEmpty(profile.location) ? profile.location : "",
                bio: !isEmpty(profile.bio) ? profile.bio : "",
                website: !isEmpty(profile.website) ? profile.website : "",
                displaySocialInput: !isEmpty(profile.social) ? true : false,
                github: !isEmpty(profile.github) ? profile.github : "",
                twitter: !isEmpty(profile.twitter) ? profile.twitter : "",
                facebook: !isEmpty(profile.facebook) ? profile.facebook : "",
                linkedin: !isEmpty(profile.linkedin) ? profile.linkedin : "",
                instagram: !isEmpty(profile.instagram) ? profile.instagram : "",
                youtube: !isEmpty(profile.youtube) ? profile.youtube : ""
            });
        }
    }

    submitForm = (profileData) => {
        this.props.createProfileAction(profileData, this.props.history);
    }

    render() {
        return (
            <div className="edit-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Edit Profile</h1>
                            <p className="lead text-center">Let's fill all information to make your profile stand out</p>
                            <small className="d-block pb-3">* = required fields</small>
                            <ProfileForm displaySocialInput={this.form.displaySocialInput} onSubmit={this.submitForm} ref={(profileForm)=>{this.form=profileForm;}} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EditProfile.propTypes = {
    profile: PropTypes.object,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {createProfileAction, getCurrentProfileAction})(EditProfile);