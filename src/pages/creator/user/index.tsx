import { Row, Col, Container, Form, Button, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { CreateUser } from "../../../types/user";
import { defaultForm } from "../../auth/constants";
import './styles.scss';
import Title from "../../../components/title";
import { UserContext } from "../../../contexts/userContext";
import { getUserById, updateUser } from "../../../services/emporium/auth";
import { ReturnApi } from "../../../types/return";
import AlertToast from "../../../components/alertToast";
import { mountBodyUserUpdate } from "./constants";

export default function User() {
    const [formUser, setFormUser] = useState<CreateUser>(defaultForm)
    const [loading, setLoading] = useState(false);
    const { token, user } = React.useContext(UserContext)

    const handleChange = (e: any) => {
        e.currentTarget.checkValidity()
        setFormUser({
            ...formUser,
            [e.target.name]: e.target.value,
        });
    };

    async function getUser() {
        if (user?.id) {
            const result: ReturnApi = await getUserById(
                user.id
            )

            if (result.status === 200) {
                setFormUser({
                    name: result.records.name,
                    description: result.records.description,
                    public_name: result.records.public_name,
                    email: result.records.email,
                    password: result.records.password,
                    telegram: result.records.telegram,
                    instagram: result.records.instagram,
                    facebook: result.records.facebook
                })
            }
        }
    }

    const sendUser = async (e: any) => {
        setLoading(true)
        e.preventDefault();
        e.stopPropagation();

        const userBody = mountBodyUserUpdate(
            formUser.public_name,
            formUser.instagram,
            formUser.facebook,
            formUser.telegram
        )

        const userReturn = await updateUser(
            userBody,
            token,
            user?.id
        )
        console.log('aaa', userReturn)

        if (userReturn.status === 200) {
            AlertToast(
                'Usuário atualizado com sucesso!',
                'success'
            )
        }
        setFormUser(defaultForm)
        setLoading(false)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <Container className='mh-100vh'>

            <Row>
                <Col>
                    <Title title={`Editar dados para ${user ? user?.name : ''}`} />

                    <div>

                        <Form onSubmit={sendUser} className="formUser">
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="John Doe"
                                            name="name"
                                            value={formUser.name}
                                            onChange={handleChange}
                                            disabled={true}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control
                                            required
                                            pattern="^\w+@\w+\.\w+$"
                                            type="email"
                                            placeholder="name@example.com"
                                            name="email"
                                            value={formUser.email}
                                            onChange={handleChange}
                                            disabled={true}
                                        />
                                    </Form.Group>
                                </Col>

                            </Row>
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
                                {!loading ?
                                    'Enviar' :
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                }
                            </Button>


                        </Form>

                    </div>

                </Col>

            </Row>

        </Container>
    )

}