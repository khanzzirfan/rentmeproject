import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class HeaderComponent extends Component {
    render() {
        return (
            <Navbar className="navbar navbar-default navbar-fixed-top">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">React</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#">Deals</NavItem>
                    <NavItem eventKey={2} href="#">Merchants</NavItem>
                    <NavDropdown eventKey={3} title="Lookups" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1} href="/categories">Categories</MenuItem>
                        <MenuItem eventKey={3.2}>Regions</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}

export default HeaderComponent;


