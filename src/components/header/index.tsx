import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.scss';
import { UserContext } from '../../contexts/userContext';
import { deleteTokenCookies } from '../../utils/tokenCookies';

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();

    const { token, user, setToken, setUser } = React.useContext(UserContext)
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        if (token && user) {
            setLogged(true)
        }
    }, [token, user])

    function logOut() {
        deleteTokenCookies()
        setLogged(false)
        setToken(undefined)
        setUser(undefined)
        navigate('/login')
    }

    if (location.pathname === '/registro' || location.pathname === '/login') {
        return null;
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
                            <Button className="mx-2 buttonDefault" onClick={() => { logged ? navigate('/artigos-criador') : navigate('/login') }}>criador</Button>
                            {logged ? <Button className=" buttonDefault" onClick={logOut}>sair</Button> : ''}
                        </Nav>
                    </Navbar.Collapse>
                </Row>

            </Container>
        </Navbar>
    )

}