import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Button, Form, Col } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.scss';
import { UserContext } from '../../contexts/userContext';
import { deleteTokenCookies } from '../../utils/tokenCookies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();

    const { token, user, setToken, setUser } = React.useContext(UserContext)
    const [logged, setLogged] = useState(false);
    const userFace = <FontAwesomeIcon icon={faUser} size="1x" color="#c0bed3" />

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

                <Row className='w-100 d-flex align-items-center'>
                    <Col xs={12} lg={6} className='d-flex justify-content-between'>
                        <Navbar.Brand onClick={() => { navigate('/') }}>emporium.</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='mb-2' />
                    </Col>

                    <Col xs={12} lg={6}>
                        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
                            <Nav className="d-flex flex-row justify-content-end align-items-center">
                                <div className='color-navbar'>
                                    {/* <Form.Control type="text" placeholder="procure aqui..." /> */}
                                    {logged ? <div className='d-flex align-items-center cursor' onClick={() => { navigate('/usuario') }}>{userFace}</div> : ''}
                                    <Button className="mx-2 buttonDefault" onClick={() => { logged ? navigate('/artigos-criador') : navigate('/login') }}>criador</Button>
                                    {logged ? <Button className=" buttonDefault" onClick={logOut}>sair</Button> : ''}
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>

                </Row>

            </Container>
        </Navbar>
    )

}