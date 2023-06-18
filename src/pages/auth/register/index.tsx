import { Row, Col, Container, Form, Button, Modal, Spinner } from "react-bootstrap";
import './styles.scss';
import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faCheckDouble, faPenNib } from '@fortawesome/free-solid-svg-icons'
import { CreateUser } from "../../../types/user";
import createUser from "../../../services/emporium/auth";
import { ReturnApi } from "../../../types/return";
import AlertToast from "../../../components/alertToast";
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const lamp = <FontAwesomeIcon icon={faLightbulb} size="xl" color="#9582ab" />
    const check = <FontAwesomeIcon icon={faCheckDouble} size="xl" color="#9582ab" />
    const pen = <FontAwesomeIcon icon={faPenNib} size="xl" color="#9582ab" />

    const defaultForm = {
        name: '',
        description: '',
        public_name: '',
        email: '',
        password: '',
        telegram: '',
        instagram: '',
        facebook: ''
    }


    const [formUser, setFormUser] = useState<CreateUser>(defaultForm)

    const handleChange = (e: any) => {
        e.currentTarget.checkValidity()
        setFormUser({
            ...formUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;

        if (form.checkValidity() === true) {
            handleShow()
        }

        setValidated(true);

    };

    const handleCreateUser = async () => {
        setLoading(true)

        if (formUser.facebook === '') {
            delete formUser.facebook
        }
        if (formUser.instagram === '') {
            delete formUser.instagram
        }
        if (formUser.public_name === '') {
            delete formUser.public_name
        }

        const result: ReturnApi = await createUser(formUser);
        if (result.status === 201) {
            handleClose();

            AlertToast(
                'Usuário criado com sucesso!',
                'success'
            )
            setValidated(false);
            setFormUser(defaultForm);
            navigate('/login')

        } else {
            AlertToast(
                'Erro na criação do usuário.',
                'error'
            )
        }

        setLoading(false)

    };

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
                                <Button onClick={handleCreateUser}>
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
                            </Modal.Footer>
                        </Modal>

                        <Row>
                            <Col>
                                <h3 className="mt-4">Quer criar conteúdo para o Emporium?</h3>

                                <div>

                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Row>
                                            <Form.Group className="mb-3" controlId="name">
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="John Doe"
                                                    name="name"
                                                    value={formUser.name}
                                                    onChange={handleChange}
                                                />
                                                <Form.Control.Feedback type="invalid">Insira seu nome.</Form.Control.Feedback>
                                            </Form.Group>

                                        </Row>

                                        <Row>

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
                                                    />
                                                    <Form.Control.Feedback type="invalid">Insira um e-mail válido. Ele será usado no login!</Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group className="mb-3" controlId="password">
                                                    <Form.Label>Senha</Form.Label>
                                                    <Form.Control
                                                        required
                                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$"
                                                        type="password"
                                                        placeholder="#SenhaForte145"
                                                        name="password"
                                                        value={formUser.password}
                                                        onChange={handleChange}
                                                    />
                                                    <Form.Control.Feedback type="invalid">A senha deve conter letras maiusculas, minusculas, números e símbolos.</Form.Control.Feedback>
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

                                        <Row>
                                            <Form.Group className="mb-3" controlId="description">
                                                <Form.Label>Sobre o que você quer escrever no Emporium?</Form.Label>
                                                <Form.Control
                                                    required
                                                    as="textarea"
                                                    rows={2}
                                                    name="description"
                                                    value={formUser.description}
                                                    onChange={handleChange}
                                                />
                                                <Form.Control.Feedback type="invalid">Precisamos saber mais sobre você e sobre o que quer escrever.</Form.Control.Feedback>
                                            </Form.Group>

                                        </Row>

                                        <Button type="submit" className="w-100 mt-4">
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