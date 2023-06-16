import { Row, Col, Container, Form, Button, Modal } from "react-bootstrap";
import './styles.scss';
import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faCheckDouble, faPenNib } from '@fortawesome/free-solid-svg-icons'

export default function Register() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const lamp = <FontAwesomeIcon icon={faLightbulb} size="xl" color="#9582ab" />
    const check = <FontAwesomeIcon icon={faCheckDouble} size="xl" color="#9582ab" />
    const pen = <FontAwesomeIcon icon={faPenNib} size="xl" color="#9582ab" />

    return (

        <div className='bg-register'>

            <div className='colored-bg'></div>
            <div className='white-bg'>

                <div className='register-modal'>

                    <Container>

                        <Modal size="lg" centered show={show} onHide={handleClose}>
                            <Modal.Header>
                                <Modal.Title className="m-3">Regras e experiência Emporium</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <Row>
                                    <Col className="d-flex justify-content-center align-items-center" md='2' sm='12'>
                                        {lamp}
                                    </Col>
                                    <Col md='10' sm='12'>
                                        <h6>O que é ser um criador?</h6>
                                        <p>Você poderá redigir artigos para suas áreas de atuação religiosa e/ou científica e publicá-los aqui. Temos regras a seguir e respeitamos todos os tipos de crenças.</p>
                                        <p>Você só poderá editar os artigos que você redigir e não poderá criar conteúdo para áreas que você não tenha sido liberado.</p>
                                    </Col>

                                </Row>

                                <Row>
                                    <Col className="d-flex justify-content-center align-items-center" md='2' sm='12'>
                                        {check}
                                    </Col>
                                    <Col md='10' sm='12'>
                                        <h6>Nosso processo de aprovação</h6>
                                        <p>Após enviar seus dados, entraremos em contato com você para saber mais sobre suas intenções e frequencia de escrita, conheceremos mais sobre você e entenderemos suas áreas de estudo.</p>
                                        <p>Seu usuário ficará desativado até que entremos em contato com você. Isso é para a segurança de nossos leitores, já que os textos do Emporium devem ter respeito e conteúdo sério em primeiro lugar.</p>
                                    </Col>

                                </Row>

                                <Row>
                                    <Col className="d-flex justify-content-center align-items-center" md='2' sm='12'>
                                        {pen}
                                    </Col>
                                    <Col md='10' sm='12'>
                                        <h6>Estou aprovado e agora?</h6>
                                        <p>Você receberá um guia de como pode criar seus conteúdos aqui com a gente e mais informações de segurança e seu usuário será ativado!</p>
                                        <p>Caso algum de seus textos não passe por nossas diretrizes, iremos desativá-lo e entraremos em contato com você.</p>
                                        <p>Você tem três advertências possíveis, e caso ultrapasse, seu usuário será desativado.</p>
                                    </Col>

                                </Row>


                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleClose}>
                                    Voltar
                                </Button>
                                <Button onClick={handleClose}>
                                    Enviar
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Row>
                            <Col>
                                <h3 className="mt-4">Quer criar conteúdo para o Emporium?</h3>

                                <div>

                                    <Form>
                                        <Row>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control type="text" placeholder="John Doe" />
                                            </Form.Group>

                                        </Row>

                                        <Row>

                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>E-mail</Form.Label>
                                                    <Form.Control type="email" placeholder="name@example.com" />
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Senha</Form.Label>
                                                    <Form.Control type="password" placeholder="#SenhaForte145" />
                                                </Form.Group>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Nome Publico</Form.Label>
                                                    <Form.Control type="text" placeholder="O Mágico John" />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Telegram</Form.Label>
                                                    <Form.Control type="link" placeholder="link" />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>

                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Facebook</Form.Label>
                                                    <Form.Control type="link" placeholder="link" />
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Instagram</Form.Label>
                                                    <Form.Control type="link" placeholder="link" />
                                                </Form.Group>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Sobre o que você quer escrever no Emporium?</Form.Label>
                                                <Form.Control as="textarea" rows={2} />
                                            </Form.Group>

                                        </Row>

                                        <Button onClick={handleShow} className="w-100 mt-4">
                                            Enviar
                                        </Button>


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