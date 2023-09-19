import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Title from "../../../components/title";
import { ReturnApi } from "../../../types/return";
import { deleteArticle, getArticlesByUser } from "../../../services/emporium/articles";
import { UserContext } from '../../../contexts/userContext';
import { Article } from '../../../types/article';
import './styles.scss'
import { FormatDateBr } from '../../../utils/utilFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import AlertToast from '../../../components/alertToast';

export default function CreatorArticles() {

    const navigate = useNavigate();
    const { token, user } = React.useContext(UserContext)
    const [userArticles, setUserArticles] = useState([]);

    const edit = <FontAwesomeIcon icon={faEdit} size="1x" color="#9582ab" />
    const remove = <FontAwesomeIcon icon={faTrash} size="1x" color="#9582ab" />

    async function reqArticlesByUser() {
        const result: ReturnApi = await getArticlesByUser(token, user?.id)

        if (result.status === 200) {
            setUserArticles(result.records)
        }
    }

    async function removeArticle(id: string) {
        const articleReturn = await deleteArticle(
            id,
            token
        )

        if (articleReturn.status === 204) {
            AlertToast(
                'Artigo excluído com sucesso!',
                'success'
            )
            reqArticlesByUser()
        }
    }

    useEffect(() => {
        reqArticlesByUser()
    }, [token, user])

    return (

        <Container className='mh-100vh'>

            <Title title={`Seus artigos`} />

            {

                userArticles ? userArticles.map((article: Article) => (
                    <div className='articleItem my-3'>
                        <Row>
                            <Col md='9' sm='12' className='mb-3'>
                                {article.title}
                            </Col>
                            <Col md='3' sm='12' className='d-flex justify-content-end'>
                                {FormatDateBr(article.updatedAt)}

                                <div className='ms-3 cursor' onClick={() => { navigate('/editar-artigo/' + article.id) }}>
                                    {edit}
                                </div>
                                <div className='ms-3 cursor' onClick={() => { removeArticle(article.id) }}>
                                    {remove}
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))
                    :
                    <p>Você não possui artigos ainda!</p>

            }

            <Row className="d-flex justify-content-end">

                <Col sm={12} md={2}>
                    <Button onClick={() => { navigate('/criador') }} className="w-100 my-4 buttonDefault">
                        Área de criação
                    </Button>
                </Col>

            </Row>

        </Container>

    )

}