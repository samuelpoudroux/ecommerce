import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';
import { Progress } from 'semantic-ui-react';
import { Button } from 'react-bootstrap';
import { form, input } from './styles.js'


class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {},
            progressBar: 0,

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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.registerUser(user, this.props.history);
    }
    checkCompleted() {
        let done;
        var totalInputs = document.querySelectorAll('#registerInput').length
        var filledInputs = 0;
        document.querySelectorAll('#registerInput').forEach(input => {
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        const input =    {
            border:  'none',
            borderBottom: '2px solid grey'
        } 
        return (
            <div className="container" style={{ marginTop: '50px', width: '100%' }}>
                <Progress percent={this.state.progressBar} attached='top' color='green' />
                <div style={{ marginTop: '50px', width: '100%', display:'flex', justifyContent:'center'}}>
                <form onSubmit={this.handleSubmit} style={form}>
                <h2 style={{ marginBottom: '40px' }}>Registration</h2>
                    <div className="form-group" style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <input style = {input}
                            id='registerInput'
                            type="text"
                            placeholder="Name"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.name
                            })}
                            name="name"
                            onChange={this.handleInputChange}
                            onBlur={this.checkCompleted}
                            value={this.state.name}
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group" style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <input style = {input}
                            id='registerInput'
                            type="email"
                            placeholder="Email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            name="email"
                            onChange={this.handleInputChange}
                            onBlur={this.checkCompleted}
                            value={this.state.email}
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group" style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <input style = {input}
                            id='registerInput'
                            type="password"
                            placeholder="Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            name="password"
                            onChange={this.handleInputChange}
                            onBlur={this.checkCompleted}
                            value={this.state.password}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group" style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <input style = {input}
                            id='registerInput'
                            type="password"
                            placeholder="Confirm Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password_confirm
                            })}
                            name="password_confirm"
                            onChange={this.handleInputChange}
                            onBlur={this.checkCompleted}
                            value={this.state.password_confirm}
                        />
                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    </div>
                    <div className="form-group" style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Button type='submit' variant="outline-primary">S'enregistrer</Button>
                    </div>
                </form>


                </div>
               
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register))