import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {registerUserAction} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerUserAction(newUser, this.props.history);
    }

    render() {
        const {errors} = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit} noValidate>
                                <TextFieldGroup
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={this.state.name}
                                    error={errors.name}
                                    onChange={this.onChange}
                                />
                                <TextFieldGroup
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={this.state.email}
                                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                    error={errors.email}
                                    onChange={this.onChange}
                                />
                                <TextFieldGroup
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    error={errors.password}
                                    onChange={this.onChange}
                                />
                                <TextFieldGroup
                                    type="password"
                                    name="password2"
                                    placeholder="Confirm Password"
                                    value={this.state.password2}
                                    error={errors.password2}
                                    onChange={this.onChange}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUserAction: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {registerUserAction})(Register);