import React, { useState } from 'react';
import { Row, Col, Form, Button, Spinner, Container } from "react-bootstrap";
import ReactQuill from 'react-quill';
import Title from "../../components/title";
import { UserContext } from '../../contexts/userContext';
import './styles.scss'

export default function Creator() {

    const { token, user } = React.useContext(UserContext)
    const [userData, setUserData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');

    function setText() {
        console.log('o texto', value)
    }


    return (
        <Container>
            <Title title={`Olá, ${user?.name}`} />

            <div className="createDiv">

                <Row>

                    <Col sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="trilha">
                            <Form.Label>Criar trilha</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Trilha Exemplo"
                                name="trilha"
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={12} md={6}>

                        <Form.Group className="mb-3" controlId="trilha">
                            <Form.Label>Criar conteúdo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Conteúdo Exemplo"
                                name="trilha"
                            />
                        </Form.Group>

                    </Col>

                </Row>

                <Row className="d-flex justify-content-end">

                    <Col sm={12} md={2}>
                        <Button type="submit" className="w-100 my-4 buttonDefault">
                            {!loading ?
                                'Salvar' :
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            }
                        </Button>
                    </Col>

                </Row>

            </div>

            <div className="mt-5"><Title title={'Novo Artigo'} /></div>

            <div className="selectDiv">

                <Row className="d-flex justify-content-center">

                    <Col sm={12} md={3}>
                        <Form.Select className="mb-3">
                            <option>Tópicos</option>
                            <option value="1">One</option>
                        </Form.Select>
                    </Col>

                    <Col sm={12} md={3}>

                        <Form.Select className="mb-3">
                            <option>Trilhas</option>
                            <option value="1">One</option>
                        </Form.Select>

                    </Col>

                    <Col sm={12} md={3}>

                        <Form.Select className="mb-3">
                            <option>Conteúdos</option>
                            <option value="1">One</option>
                        </Form.Select>

                    </Col>

                </Row>

                <Row className="d-flex justify-content-center mt-5">

                    <Col sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="trilha">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Título pequeno"
                                name="title"
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="trilha">
                            <Form.Label>Subtítulo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Subtítulo Opcional - pode ser grande"
                                name="subtitle"
                            />
                        </Form.Group>
                    </Col>
                </Row>

            </div>

            <div className='textCreateDiv'>

                <ReactQuill theme="snow" value={value} onChange={setValue} />

                <Button onClick={setText} className="w-100 my-4 buttonDefault">
                    Salvar
                </Button>

            </div>

        </Container>
    )

}