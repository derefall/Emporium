import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Spinner, Container } from "react-bootstrap";
import ReactQuill from 'react-quill';
import Title from "../../components/title";
import { UserContext } from '../../contexts/userContext';
import './styles.scss'
import { ReturnApi } from '../../types/return';
import { getTopics } from '../../services/emporium/topics';
import { Topic } from '../../types/topic';
import { defaultSelect, defaulFormItems, mountBodyTrailCreate, mountBodyContentCreate, mountBodyArticleCreate, defaulFormArticle, mountBodyArticleUpdate } from './constants';
import { createTrail, getTrailsByTopicId } from '../../services/emporium/trails';
import { Trail } from '../../types/trail';
import { createContent, getContentByTrailId } from '../../services/emporium/content';
import { Content } from '../../types/content';
import AlertToast from "../../components/alertToast";
import { createArticle, getArticlesById, updateArticle } from '../../services/emporium/articles';
import { useParams } from 'react-router-dom';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl', 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'direction', 'align',
    'color', 'background',
    'link', 'clean'
]

export default function Creator() {
    const { id } = useParams();

    const { token, user } = React.useContext(UserContext)
    const [topicsUser, setTopicsUser] = useState<Topic[]>([]);
    const [trailsTopic, setTrailsTopic] = useState([]);
    const [allTrailsTopic, setAllTrailsTopic] = useState([]);
    const [contentTrail, setContentTrailc] = useState([]);

    const [loading, setLoading] = useState(false);

    const [valueArticle, setValueArticle] = useState('');
    const [selectOptions, setSelectOptions] = useState(defaultSelect);
    const [selectItemsOpt, setSelectItemsOpt] = useState(defaultSelect);
    const [formItems, setFormItems] = useState(defaulFormItems)

    const [formArticle, setFormArticle] = useState(defaulFormArticle)

    const handleOptionChange = (event: any) => {
        setSelectOptions({
            ...selectOptions,
            [event.target.name]: event.target.value
        });
    };

    const handleOptionItemsChange = (event: any) => {
        setSelectItemsOpt({
            ...selectItemsOpt,
            [event.target.name]: event.target.value
        });
    };


    const handleItems = (event: any) => {
        setFormItems({
            ...formItems,
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
        if (result && result.status === 200) {
            setTrailsTopic(result.records)
        }
    }

    async function reqAllTrailsByTopic() {
        const allTrailReturn: any = []

        for (const topic of topicsUser) {
            const result: ReturnApi = await getTrailsByTopicId(topic.id)
            if (result.status === 200 && result.records.length > 0) {
                if (result.records.length > 0) {
                    result.records.forEach((trailsTopic: any) => {
                        allTrailReturn.push(trailsTopic)
                    });

                }

            }
        }
        setAllTrailsTopic(allTrailReturn)
    }

    async function reqContentByTrail() {
        const result: ReturnApi = await getContentByTrailId(selectOptions.trail)
        if (result && result.status === 200) {
            setContentTrailc(result.records)
        }
    }

    async function handleCreateItems() {
        setLoading(true)
        if (user?.active) {

            if (formItems.trailName) {
                const trailBody = mountBodyTrailCreate(
                    formItems.trailName,
                    formItems.trailDescription,
                    selectItemsOpt.topic,
                    user.id
                )

                const trailReturn = await createTrail(
                    trailBody,
                    token
                )

                if (trailReturn.status === 201) {
                    AlertToast(
                        'Trilha criada com sucesso!',
                        'success'
                    )

                    reqTrailsByTopic()
                    reqAllTrailsByTopic()
                }
            }

            if (formItems.content) {
                const contentBody = mountBodyContentCreate(
                    formItems.content,
                    selectItemsOpt.trail,
                    user.id
                )

                const contentReturn = await createContent(
                    contentBody,
                    token
                )

                if (contentReturn.status === 201) {
                    AlertToast(
                        'Conteúdo criado com sucesso!',
                        'success'
                    )
                }
            }
            setLoading(false)
            setFormItems(defaulFormItems);
        }
    }

    const handleArticleText = (event: any) => {
        setFormArticle({
            ...formArticle,
            [event.target.name]: event.target.value
        });
    };

    async function setText(value: any) {
        setValueArticle(value)
    }

    const sendArticle = async () => {
        setLoading(true)

        if (user?.active) {

            if (!id) {
                const articleBody = mountBodyArticleCreate(
                    formArticle.title,
                    formArticle.subtitle,
                    valueArticle,
                    selectOptions.content,
                    user.id
                )

                const articleReturn = await createArticle(
                    articleBody,
                    token
                )

                if (articleReturn.status === 201) {
                    AlertToast(
                        'Artigo criado com sucesso!',
                        'success'
                    )
                }
            } else {
                console.log('entrou no atualizar')
                const articleBody = mountBodyArticleUpdate(
                    formArticle.title,
                    formArticle.subtitle,
                    valueArticle,
                )

                const articleReturn = await updateArticle(
                    articleBody,
                    token,
                    id
                )
                console.log('aaa', articleReturn)

                if (articleReturn.status === 200) {
                    AlertToast(
                        'Artigo atualizado com sucesso!',
                        'success'
                    )
                }
            }

        }
        setFormArticle(defaulFormArticle)
        setValueArticle('')
        setLoading(false)
    }

    async function getArticleById() {
        if (id) {
            const result: ReturnApi = await getArticlesById(
                id
            )

            if (result.status === 200) {
                setFormArticle({
                    title: result.records.title,
                    subtitle: result.records.subtitle
                })
                setValueArticle(result.records.material)
            }
        }
    }

    useEffect(() => {
        console.log('id', id)
        getArticleById()
    }, [])

    useEffect(() => {
        reqAllTrailsByTopic()
    }, [topicsUser])

    useEffect(() => {
        reqTopicsByUser()
    }, [user])

    useEffect(() => {
        reqTrailsByTopic()
    }, [selectOptions.topic])

    useEffect(() => {
        reqContentByTrail()
    }, [selectOptions.trail])

    return (
        <Container className='mh-100vh'>
            {!id ? <Title title={`Olá, ${user ? user?.name : ''}`} /> : ''}
            {!user?.active ? <>
                <div className='mb-5 info-inactive'>
                    <p>Seu usuário está <strong>desativado</strong>. Aguarde até que nossa equipe entre em contato com você e ative seu usuário!</p>
                    <p>Caso já tenham passado 7 dias, nos envie uma mensagem através do formulário no rodapé!</p>
                </div>
            </> : ''}

            {
                !id ?
                    <>
                        <div className="createDiv">

                            <Row>
                                <Col sm={12} md={6}>
                                    <Form.Label>Escolha o tópico que será vinculado com sua nova trilha</Form.Label>
                                    <Form.Select disabled={!user?.active} className="mb-3" name='topic' value={selectItemsOpt.topic} onChange={handleOptionItemsChange}>
                                        <option>Tópicos</option>
                                        {topicsUser.map((topic: Topic) => (
                                            <option value={topic.id}>{topic.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                <Col sm={12} md={6}>
                                    <Form.Group className="mb-3" controlId="trilha">
                                        <Form.Label>Criar trilha</Form.Label>
                                        <Form.Control
                                            disabled={!user?.active}
                                            type="text"
                                            placeholder="Trilha Exemplo"
                                            name="trailName"
                                            value={formItems.trailName}
                                            onChange={handleItems}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="trilha">
                                        <Form.Label>Descrição trilha</Form.Label>
                                        <Form.Control
                                            disabled={!user?.active}
                                            type="text"
                                            placeholder="Trilha Exemplo"
                                            name="trailDescription"
                                            value={formItems.trailDescription}
                                            onChange={handleItems}
                                        />
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Row className='mt-5'>

                                <Col sm={12} md={6}>
                                    <Form.Label>Escolha a trilha que será vinculada com seu novo tópico</Form.Label>

                                    <Form.Select disabled={!user?.active} className="mb-3" name='trail' value={selectItemsOpt.trail} onChange={handleOptionItemsChange}>
                                        <option>Trilhas</option>
                                        {allTrailsTopic.map((trail: Trail) => (
                                            <option value={trail.id}>{trail.name}</option>
                                        ))}
                                    </Form.Select>

                                </Col>


                                <Col sm={12} md={6}>

                                    <Form.Group className="mb-3" controlId="trilha">
                                        <Form.Label>Criar conteúdo</Form.Label>
                                        <Form.Control
                                            disabled={!user?.active}
                                            type="text"
                                            placeholder="Conteúdo Exemplo"
                                            name="content"
                                            value={formItems.content}
                                            onChange={handleItems}
                                        />
                                    </Form.Group>

                                </Col>

                            </Row>

                            <Row className="d-flex justify-content-end">

                                <Col sm={12} md={2}>
                                    <Button onClick={handleCreateItems} className="w-100 my-4 buttonDefault" disabled={!user?.active}>
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
                    </> : ''
            }

            <div className="mt-5"><Title title={!id ? 'Novo Artigo' : 'Editar Artigo'} /></div>

            <div className="selectDiv">

                {
                    !id ?
                        <>
                            <Row className="d-flex justify-content-center">

                                <Col sm={12} md={3}>
                                    <Form.Select disabled={!user?.active} className="mb-3" name='topic' value={selectOptions.topic} onChange={handleOptionChange}>
                                        <option>Tópicos</option>
                                        {topicsUser.map((topic: Topic) => (
                                            <option value={topic.id}>{topic.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                <Col sm={12} md={3}>

                                    <Form.Select disabled={!user?.active} className="mb-3" name='trail' value={selectOptions.trail} onChange={handleOptionChange}>
                                        <option>Trilhas</option>
                                        {trailsTopic.map((trail: Trail) => (
                                            <option value={trail.id}>{trail.name}</option>
                                        ))}
                                    </Form.Select>

                                </Col>

                                <Col sm={12} md={3}>

                                    <Form.Select disabled={!user?.active} className="mb-3" name='content' value={selectOptions.content} onChange={handleOptionChange}>
                                        <option>Conteúdos</option>
                                        {contentTrail.map((content: Content) => (
                                            <option value={content.id}>{content.name}</option>
                                        ))}
                                    </Form.Select>

                                </Col>

                            </Row>
                        </> : ''
                }

                <Row className="d-flex justify-content-center mt-5">

                    <Col sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="trilha">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                disabled={!user?.active}
                                type="text"
                                placeholder="Título pequeno"
                                name="title"
                                value={formArticle.title}
                                onChange={handleArticleText}
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="trilha">
                            <Form.Label>Subtítulo</Form.Label>
                            <Form.Control
                                disabled={!user?.active}
                                type="text"
                                placeholder="Subtítulo Opcional - pode ser grande"
                                name="subtitle"
                                value={formArticle.subtitle}
                                onChange={handleArticleText}
                            />
                        </Form.Group>
                    </Col>
                </Row>

            </div>

            <div className='textCreateDiv'>

                <ReactQuill
                    theme="snow"
                    value={valueArticle}
                    onChange={setText}
                    modules={modules}
                    formats={formats}
                />

                <Button disabled={!user?.active} onClick={sendArticle} className="w-100 my-4 buttonDefault">
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

            </div>

        </Container>
    )

}