import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';

import {HomePage} from '../../pages/home';
import {TablePage} from '../../pages/table';

class Header extends React.Component {
    render() {
        return (
            <header id="header">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {<Link to={HomePage.path}>Сбербанк технологии</Link>}
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer exact={true} to={ HomePage.path }>
                                <NavItem>Главная</NavItem>
                            </LinkContainer>
                            <LinkContainer exact={true} to={ TablePage.path }>
                                <NavItem>Таблица</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}

export default Header;
