import { Row, Col, Container, Form, Button, Spinner } from "react-bootstrap";
import React, { useState } from "react";
import { CreateUser } from "../../../types/user";
import { defaultForm } from "../../auth/constants";
import './styles.scss';
import Title from "../../../components/title";
import { UserContext } from "../../../contexts/userContext";

export default function User() {
    const [formUser, setFormUser] = useState<CreateUser>(defaultForm)
    const { token, user } = React.useContext(UserContext)

    const handleChange = (e: any) => {
        e.currentTarget.checkValidity()
        setFormUser({
            ...formUser,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Container className='mh-100vh'>

            <Row>
                <Col>
                    <Title title={`Editar dados para ${user ? user?.name : ''}`} />

                    <div>

                        <Form onSubmit={() => { }} className="formUser">
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="public_name">
                                        <Form.Label>Nome Publico</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="O Mágico John"
                                            name="public_name"
                                            value={formUser.public_name}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="telegram">
                                        <Form.Label>Telegram</Form.Label>
                                        <Form.Control
                                            required
                                            type="link"
                                            placeholder="link"
                                            name="telegram"
                                            value={formUser.telegram}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">É necessário um Telegram para que possamos entrar em contato.</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>

                                <Col>
                                    <Form.Group className="mb-3" controlId="facebook">
                                        <Form.Label>Facebook</Form.Label>
                                        <Form.Control
                                            type="link"
                                            placeholder="link"
                                            name="facebook"
                                            value={formUser.facebook}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3" controlId="instagram">
                                        <Form.Label>Instagram</Form.Label>
                                        <Form.Control
                                            type="link"
                                            placeholder="link"
                                            name="instagram"
                                            value={formUser.instagram}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Button type="submit" className="buttonDefault w-100 mt-4">
                                Enviar
                            </Button>


                        </Form>

                    </div>

                </Col>

            </Row>

        </Container>
    )

}