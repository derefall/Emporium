import { Col, Container, Row } from "react-bootstrap";
import Title from "../../components/title";
import './styles.scss'
import { useState, useEffect } from "react";
import { ReturnApi } from "../../types/return";
import { getTopics } from "../../services/emporium/topics";
import { useNavigate } from 'react-router-dom';
import { Topic } from "../../types/topic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask, faHandsPraying } from '@fortawesome/free-solid-svg-icons'

export default function Topics() {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);

    const religion = <FontAwesomeIcon icon={faHandsPraying} size="lg" color="#9582ab" />
    const science = <FontAwesomeIcon icon={faFlask} size="lg" color="#9582ab" />

    async function reqTopics() {
        const result: ReturnApi = await getTopics()

        if (result.status === 200) {
            setTopics(result.records)
        }
    }

    useEffect(() => {
        reqTopics()
    }, [])

    return (

        <>
            <Container className="my-5">

                <Title title='Sobre o que você quer ler?' />

                <Row>
                    <Col md="5" sm="12">
                        {topics.map((topic: Topic) => (
                            !topic.scientific ?

                                <Row className="roundItem" onClick={() => { navigate(`/trilhas/` + topic.id) }}>
                                    <Col md="2" className="d-flex justify-content-center">
                                        {religion}
                                    </Col>
                                    <Col ms="10" className="topicItem">
                                        <p>{topic.name}</p>
                                    </Col>
                                </Row> : ''
                        ))}
                    </Col>
                    <Col md="5" sm="12">
                        {topics.map((topic: Topic) => (
                            topic.scientific ?
                                <Row className="roundItem" onClick={() => { navigate(`/trilhas/` + topic.id) }}>
                                    <Col md="2" className="d-flex justify-content-center">
                                        {science}
                                    </Col>
                                    <Col ms="10" className="topicItem">
                                        <p>{topic.name}</p>
                                    </Col>
                                </Row> : ''
                        ))}
                    </Col>

                </Row>


            </Container>

            <div className="bodyBg">

                <div className="background">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>

                    <Container>

                        <h2 className="mb-5">Quem nós somos?</h2>

                        <p>O Emporium é um local repleto de artigos e matérias de grandes contribuintes da religiosidade e ciência. Aqui é um local de respeito as crenças onde você pode encontrar todo tipo de assunto religioso e/ou mitológico para seus estudos, assim como assuntos científicos que não são ouvidos no dia a dia.</p>
                        <p>Nossos contribuintes são especializados em suas religiões e crenças, possuem estudo e interesse e redigem os textos com a maior quantia de fontes para que você prossiga seus estudos.</p>
                        <p>Ningúem recebe nenhum valor deste site ou por qualquer artigo/matéria redigida e publicada.</p>

                    </Container>
                </div>

            </div>

            <Container className="mt-5">

                <Title title='Como posso ajudar?' />

                <div>

                    <p>Caso você queira fazer parte da comunidade e redigir textos e artigos, basta você ir a página Criador, e realizar a criação da sua conta. Após análise, nós iremos entrar em contato para explicar regras e assim que você for aprovado já terá acesso a área de escrita de artigos relacionada a sua área religiosa ou científica.</p>
                    <p>Você pode auxiliar nossa iniciativa consultando esse link que lhe mostrará diversas ONGs e frentes que você pode ajudar até mesmo na sua cidade fisicamente ou à distância. Seja com dinheiro, atenção ou prestação de serviços, podemos fazer do mundo um lugar mais adequado para todos os seres vivos!</p>

                </div>

            </Container>

        </>
    )

}