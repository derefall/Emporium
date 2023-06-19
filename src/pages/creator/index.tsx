import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Spinner, Container } from "react-bootstrap";
import ReactQuill from 'react-quill';
import Title from "../../components/title";
import { UserContext } from '../../contexts/userContext';
import './styles.scss'
import { ReturnApi } from '../../types/return';
import { getTopics } from '../../services/emporium/topics';
import { Topic } from '../../types/topic';
import { defaultSelect } from './constants';
import { getTrailsByTopicId } from '../../services/emporium/trails';
import { Trail } from '../../types/trail';
import { getContentByTrailId } from '../../services/emporium/content';
import { Content } from '../../types/content';

export default function Creator() {

    const { token, user } = React.useContext(UserContext)
    const [topicsUser, setTopicsUser] = useState([]);
    const [trailsTopic, setTrailsTopic] = useState([]);
    const [contentTrail, setContentTrailc] = useState([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [selectOptions, setSelectOptions] = useState(defaultSelect);


    const handleOptionChange = (event: any) => {
        setSelectOptions({
            ...selectOptions,
            [event.target.name]: event.target.value
        });
    };

    async function reqTopicsByUser() {
        const result: ReturnApi = await getTopics()

        if (result.status === 200) {
            const topics: any = []

            user?.topics.forEach((topicUser: Topic) => {

                const filtered = result.records.filter((topic: Topic) => topic.id === topicUser.id)
                topics.push(filtered[0])
            })

            setTopicsUser(topics)
        }
    }

    async function reqTrailsByTopic() {
        const result: ReturnApi = await getTrailsByTopicId(selectOptions.topic)
        if (result.status === 200) {
            setTrailsTopic(result.records)
        }
    }

    async function reqContentByTrail() {
        const result: ReturnApi = await getContentByTrailId(selectOptions.trail)
        if (result.status === 200) {
            setContentTrailc(result.records)
        }
    }

    useEffect(() => {
        reqTopicsByUser()
    }, [user])

    useEffect(() => {
        reqTrailsByTopic()
    }, [selectOptions.topic])

    useEffect(() => {
        reqContentByTrail()
    }, [selectOptions.trail])


    function setText() {
        console.log('o texto', value)
    }


    return (
        <Container>
            <Title title={`Olá, ${user ? user?.name : ''}`} />

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
                        <Form.Select className="mb-3" name='topic' value={selectOptions.topic} onChange={handleOptionChange}>
                            <option>Tópicos</option>
                            {topicsUser.map((topic: Topic) => (
                                <option value={topic.id}>{topic.name}</option>
                            ))}
                        </Form.Select>
                    </Col>

                    <Col sm={12} md={3}>

                        <Form.Select className="mb-3" name='trail' value={selectOptions.trail} onChange={handleOptionChange}>
                            <option>Trilhas</option>
                            {trailsTopic.map((trail: Trail) => (
                                <option value={trail.id}>{trail.name}</option>
                            ))}
                        </Form.Select>

                    </Col>

                    <Col sm={12} md={3}>

                        <Form.Select className="mb-3" name='content' value={selectOptions.content} onChange={handleOptionChange}>
                            <option>Conteúdos</option>
                            {contentTrail.map((content: Content) => (
                                <option value={content.id}>{content.name}</option>
                            ))}
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