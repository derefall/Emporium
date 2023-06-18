import React from 'react';
import { Navbar, Nav, Container, Row, Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.scss';
import { UserContext } from '../../contexts/userContext';

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();

    const { token, user } = React.useContext(UserContext)

    if (location.pathname === '/registro' || location.pathname === '/login') {
        return null;
    }

    function isLogged() {

        if (token && user) {
            navigate('/criador')
        } else {
            navigate('/login')
        }
    }

    return (

        <Navbar sticky-top collapseOnSelect expand="lg" className="bg-header" variant="dark">
            <Container className="my-3">

                <Navbar.Brand onClick={() => { navigate('/') }}>emporium.</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Row>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="">
                            <Form.Control type="text" placeholder="procure aqui..." />
                            <Button className="mx-2 buttonDefault" onClick={isLogged}>criador</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Row>

            </Container>
        </Navbar>
    )

}