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

export default function CreatorArticles() {

    const navigate = useNavigate();
    const { token, user } = React.useContext(UserContext)
    const [userArticles, setUserArticles] = useState([]);

    async function reqArticlesByUser() {
        const result: ReturnApi = await getArticlesByUser(token, user?.id)

        if (result.status === 200) {
            setUserArticles(result.records)
        }
    }

    useEffect(() => {
        reqArticlesByUser()
    })

    return (

        <Container>

            <Title title={`Seus artigos`} />

            {

                userArticles ? userArticles.map((article: Article) => (
                    <div className='articleItem'>
                        <Row>
                            <Col md='10' sm='12'>
                                {article.title}
                            </Col>
                            <Col md='2' sm='12'>
                                {FormatDateBr(article.updatedAt)}
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