import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {loginUserAction} from '../../actions/authActions';
import TextFieldGroup from '../../components/common/TextFieldGroup';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
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
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }

        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUserAction(userData);
    }

    render() {
        const {errors} = this.state;

        return (
            <div className="login">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center">Sign in to your DevConnector account</p>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={this.state.email}
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
                      <input type="submit" className="btn btn-info btn-block mt-4" value="Submit" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUserAction: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {loginUserAction})(Login);