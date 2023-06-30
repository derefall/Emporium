import { Container, ListGroup, Row } from "react-bootstrap";
import Title from "../../components/title";
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import "./styles.scss"
import { ReturnApi } from "../../types/return";
import { getContentByTrailId } from "../../services/emporium/content";
import { Content } from "../../types/content";
import { getArticlesByContent } from "../../services/emporium/articles";
import { ArticleContent } from "../../types/article";

export default function Contents() {
    const { id } = useParams();
    const [contents, setContents] = useState<Content[]>([]);
    const [articlesByContent, setarticlesByContent] = useState<ArticleContent[]>([]);
    const next = <FontAwesomeIcon icon={faArrowRight} size="sm" color="#9582ab" />

    const navigate = useNavigate();

    async function reqContentsByTrailcId() {
        const contentsReturn: ReturnApi = await getContentByTrailId(id)
        if (contentsReturn.status === 200) {
            setContents(contentsReturn.records)
            await reqArticlesBtContentId(contentsReturn.records)
        }
    }

    async function reqArticlesBtContentId(contentsReq: Content[]) {

        if (contentsReq.length > 0) {

            let updatedArticlesByContent = []

            for (let content of contentsReq) {
                const articlesReturn: ReturnApi = await getArticlesByContent(content.id)

                if (articlesReturn.status === 200) {

                    const articleContentObj = {
                        id: content.id,
                        title: content.name,
                        articles: articlesReturn.records
                    }

                    updatedArticlesByContent.push(articleContentObj)
                }

            }

            setarticlesByContent(updatedArticlesByContent)

        }

    }

    useEffect(() => {
        reqContentsByTrailcId()
    }, [])


    return (

        <Container className="mh-100vh">

            {
                contents.length > 0 ? <Title title={`${contents ? contents[0].trail.name : ''}`} /> :
                    <Title title="Conteúdos indisponíveis" />
            }

            <Row>

                {
                    Object.values(articlesByContent).map((content) => (
                        <div key={content.id} className="mb-5">
                            {console.log('conteudo com artigos', content)}

                            <h4>{content.title}</h4>

                            {
                                content && content.articles.length > 0 ? content.articles.map((article) => (
                                    <div className="groupAmount" key={article.id}>
                                        <ListGroup className="selectItem" onClick={() => { navigate('/artigo/' + article.id) }}>
                                            <ListGroup.Item>
                                                <p>{article.title}</p>
                                                <div>{next}</div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>

                                )) : ''
                            }


                        </div>

                    ))
                }

            </Row>
        </Container>

    )

}