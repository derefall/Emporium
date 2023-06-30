import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Title from "../../../components/title";
import { ReturnApi } from "../../../types/return";
import { getArticlesByUser } from "../../../services/emporium/articles";
import { UserContext } from '../../../contexts/userContext';
import { Article } from '../../../types/article';
import './styles.scss'
import { FormatDateBr } from '../../../utils/utilFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default function CreatorArticles() {

    const navigate = useNavigate();
    const { token, user } = React.useContext(UserContext)
    const [userArticles, setUserArticles] = useState([]);

    const edit = <FontAwesomeIcon icon={faEdit} size="1x" color="#9582ab" />

    async function reqArticlesByUser() {
        const result: ReturnApi = await getArticlesByUser(token, user?.id)

        if (result.status === 200) {
            setUserArticles(result.records)
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
                            <Col md='9' sm='12'>
                                {article.title}
                            </Col>
                            <Col md='3' sm='12' className='d-flex justify-content-end'>
                                {FormatDateBr(article.updatedAt)}

                                <div className='ms-3'>
                                    {edit}
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))
                    :
                    "Você não possui artigos ainda!"

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