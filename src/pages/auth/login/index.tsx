import { Row, Col, Container, Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import '../register/styles.scss';

export default function Login() {

    const navigate = useNavigate();

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

                                    <Form>
                                        <Row>

                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>E-mail</Form.Label>
                                                    <Form.Control type="email" placeholder="name@example.com" />
                                                </Form.Group>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Senha</Form.Label>
                                                    <Form.Control type="password" placeholder="#SenhaForte145" />
                                                </Form.Group>
                                            </Col>
                                        </Row>


                                        <Button className="w-100 my-4">
                                            Entrar
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