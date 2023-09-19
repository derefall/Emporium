import { Container, Row, Col } from "react-bootstrap";
import Title from "../../components/title";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { ReturnApi } from "../../types/return";
import { getArticlesById, getArticleMaterialByUrl } from "../../services/emporium/articles";
import { UserContext } from '../../contexts/userContext';
import { Article } from "../../types/article";
import Parser from 'html-react-parser';
import './styles.scss'
const instagram = require("../../assets/images/instagram.png");

export function ArticlePage() {
    const { id } = useParams();
    const [article, setArticle] = useState<Article>();

    async function reqArticle() {
        if (id) {
            const result: ReturnApi = await getArticlesById(
                id
            )

            if (result.status === 200) {

                const s3Material = await reqMaterialBucket(
                    result.records.material
                )

                if (s3Material) {
                    result.records.material = s3Material
                }

                setArticle(result.records)
            }
        }
    }

    async function reqMaterialBucket(materialUrl: string) {
        const materials3: ReturnApi = await getArticleMaterialByUrl(
            materialUrl
        )
        return materials3
    }

    useEffect(() => {
        reqArticle()
    }, [])


    return (
        <Container className="mh-100vh">

            <Title title={article?.title} subtitle={article?.subtitle} isCentered={true} />

            <div className="itens">
                {
                    article && article?.material ? Parser(article?.material) : ''
                }
            </div>

            <div className="divAutor">

                {
                    article && article.user ?
                        <>

                            <Row className="d-flex justify-content-center author">
                                <h3 className="mb-4">Sobre o autor</h3>

                                <Col sm={12} className="d-flex justify-content-between">
                                    <h4>{article.user.public_name}</h4>

                                    {
                                        article.user.instagram ?
                                            <a href={article.user.instagram} target="_blank"><img className="imgSocialMedia" src={instagram} /></a>
                                            : ''
                                    }

                                </Col>

                                <Col sm={11}>
                                    <p>{article.user.description}</p>
                                </Col>

                            </Row>
                        </>
                        : ''
                }

            </div>

        </Container>
    )
}