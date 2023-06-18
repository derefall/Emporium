import { Row, Col, Container, Form, Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import '../register/styles.scss';
import { LoginUser } from "../../../types/user";
import { defaultLogin } from "../constants";
import { loginUser } from "../../../services/emporium/auth";
import { ReturnApi } from "../../../types/return";
import AlertToast from "../../../components/alertToast";
import { getTokenCookies, setTokenCookies } from "../../../utils/tokenCookies";
import Cookies from 'universal-cookie';

export default function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formUser, setFormUser] = useState<LoginUser>(defaultLogin)

    const handleChange = (e: any) => {
        e.currentTarget.checkValidity()
        setFormUser({
            ...formUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;

        if (form.checkValidity() === true) {
            setLoading(true)

            const result: ReturnApi = await loginUser(formUser);

            if (result.status === 201) {
                setValidated(true);
                setFormUser(defaultLogin);

                setTokenCookies(result.records.token)

            } else {
                AlertToast(
                    'Email e/ou senha incorretos.',
                    'error'
                )
            }

        }
        setLoading(false)

    };

    return (

        <div className='bg-register'>

            <div className='colored-bg'></div>
            <div className='white-bg'>

                <div className='register-modal'>

                    <Container>

                        <Row>
                            <Col>

                                <h4 className="mt-4">Bem vindo ao Emporium</h4>

                                <div>

                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Row>

                                            <Col>
                                                <Form.Group className="mb-3" controlId="emailLogin">
                                                    <Form.Label>E-mail</Form.Label>
                                                    <Form.Control
                                                        required
                                                        pattern="^\w+@\w+\.\w+$"
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        name="email"
                                                        value={formUser.email}
                                                        onChange={handleChange}
                                                    />
                                                    <Form.Control.Feedback type="invalid">Insira um e-mail válido</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="passwordLogin">
                                                    <Form.Label>Senha</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="password"
                                                        placeholder="#SenhaForte145"
                                                        name="password"
                                                        value={formUser.password}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>


                                        <Button type="submit" className="buttonDefault w-100 my-4">
                                            {!loading ?
                                                'Entrar' :
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                            }
                                        </Button>
                                        <p>Não é criador? <a href="#" onClick={() => navigate('/registro')}>Cadastre-se!</a></p>


                                    </Form>

                                </div>

                            </Col>

                        </Row>

                    </Container>

                </div>

            </div>

        </div>

    )

}