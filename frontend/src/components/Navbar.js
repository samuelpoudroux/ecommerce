
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import { Form, Nav, Button, FormControl, Navbar, Col } from 'react-bootstrap';
import SmallBasket from './basket/SmallBasket';
import Can from './can'

class Menu extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <Nav>
                <Nav.Link href="/product">
                    produits</Nav.Link>
                <SmallBasket />

                <Nav.Link href="/logout" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px' }} />
                    Se Deconnecter</Nav.Link>
            </Nav>
        )

        const guestLinks = (
            <Nav>
                <Nav.Link href="/register">
                    S'enregistrer</Nav.Link>
                <Nav.Link href="/login">
                    Se connecter</Nav.Link>
            </Nav>
        )



        return (
            <Navbar style={{ height: '7%' }} collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Projet personnel Ecommerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" style={{ color: '#0A79FB' }} className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    {isAuthenticated ? authLinks : guestLinks}

                    <Can>
                        <Nav>
                            <Nav.Link href="/admin">
                                admin</Nav.Link>
                        </Nav>
                    </Can>
                </Navbar.Collapse>
            </Navbar>

        )
    }
}
Menu.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Menu));