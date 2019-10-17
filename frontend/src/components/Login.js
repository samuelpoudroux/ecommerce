// Login.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import classnames from 'classnames';
import { Progress } from 'semantic-ui-react';
import { form, input } from './styles.js'


class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            progressBar: 0,
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateProgessBar = this.updateProgessBar.bind(this);
        this.checkCompleted = this.checkCompleted.bind(this);

    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user);
    }
    checkCompleted() {
        let done;
        var totalInputs = document.querySelectorAll('#input').length
        var filledInputs = 0;
        document.querySelectorAll('#input').forEach(input => {
            if (input.value !== "") {
                filledInputs++;
            }
        });
        // do the math
        var find = filledInputs / totalInputs * 100;
        // update local variable in Vue data
        done = Math.round(find);
        this.updateProgessBar(done);
    }

    updateProgessBar(done) {
        this.setState({ progressBar: done })
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/product');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/product')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container" style={{ marginTop: '50px', width: '100%' }}>
                <Progress percent={this.state.progressBar} attached='top' color='green' />

                <h2 style={{ marginBottom: '40px' }}>Login</h2>
                <form onSubmit={this.handleSubmit} style={form}>
                    <div className="fohistoryrm-group" style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <input style={input}
                            type="email"
                            placeholder="Email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            id='input'
                            name="email"
                            onChange={this.handleInputChange}
                            onBlur={this.checkCompleted}
                            value={this.state.email}
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group" style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <input style={input}
                            type="password"
                            placeholder="Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            id='input'
                            name="password"
                            onChange={this.handleInputChange}
                            onBlur={this.checkCompleted}

                            value={this.state.password}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Login User
                    </button>
                    </div>
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)