import { Accordion, Container, Row, Col, Button } from "react-bootstrap";
import Title from "../../components/title";
import { useNavigate, useParams } from 'react-router-dom';
import './styles.scss'
import { useEffect, useState } from "react";
import { ReturnApi } from "../../types/return";
import { getTrailsByTopicId } from "../../services/emporium/trails";
import { Trail } from "../../types/trail";

export default function Trails() {
    const { id } = useParams();
    const [trails, setTrails] = useState<Trail[]>([]);
    const navigate = useNavigate();

    async function reqTrailsByTopicId() {
        const result: ReturnApi = await getTrailsByTopicId(id)

        if (result.status === 200) {
            setTrails(result.records)
        }
    }

    useEffect(() => {
        reqTrailsByTopicId()
    }, [id])

    return (

        <Container className="mh-100vh">

            {
                trails.length > 0 ? <Title title={`Trilhas de aprendizado para ${trails ? trails[0].topic.name : ''}`} /> :
                    <Title title="Ainda não possuímos trilhas para esse tópico!" />
            }

            <Accordion>
                {
                    trails.map((trail: Trail, index: number) => (

                        <Accordion.Item eventKey={`${index}`}>
                            <Accordion.Header>
                                <Row className="w-100">
                                    <Col>
                                        {trail.name}
                                    </Col>
                                </Row>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col md="10" className="d-flex align-items-center">
                                        {trail.description}
                                    </Col>
                                    <Col md="2" className="text-end">
                                        <Button className="buttonDefault" onClick={() => { navigate(`/conteudos/` + trail.id) }}>Ver</Button>
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>

                    ))
                }
            </Accordion>

        </Container>

    )

}