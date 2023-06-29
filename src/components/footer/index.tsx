import { Col, Row, Form, Container } from "react-bootstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.scss';
const instagram = require("../../assets/images/insta.png");
const tiktok = require("../../assets/images/tiktok.png");
const discord = require("../../assets/images/discord.png");
const spotify = require("../../assets/images/spotify.png");
const telegram = require("../../assets/images/telegram.png");

export default function Footer() {
    const location = useLocation();

    if (location.pathname === '/registro' || location.pathname === '/login' || location.pathname === '/') {
        return null;
    }

    return (
        <div className="footer">
            <div className="bg-footer">

                <Container>
                    <Row>
                        <Col md={6} sm={12}>
                            <p>Redes sociais Emporium</p>
                        </Col>

                        <Col md={6} sm={12}>
                            <p>Dúvidas, sugestões e reclamações</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6} sm={12}>
                            <Row>
                                <Col>
                                    <img className="imgSocial" src={tiktok} />
                                    <img className="imgSocial" src={telegram} />
                                    <img className="imgSocial" src={instagram} />
                                </Col>

                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <img className="imgSocial" src={spotify} />
                                    <img className="imgSocial" src={discord} />
                                </Col>

                            </Row>
                        </Col>

                        <Col md={6} sm={12}>

                            <Row>
                                <Col md={6} sm={12}>
                                    <Form.Control
                                        className="mb-3"
                                        type="text"
                                        placeholder="nome"
                                        name="instagram"

                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="email"
                                        name="instagram"

                                    />
                                </Col>
                                <Col md={6} sm={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            required
                                            placeholder="comentário"
                                            as="textarea"
                                            rows={4}
                                            name="description"
                                        />
                                    </Form.Group>
                                </Col>

                            </Row>

                        </Col>
                    </Row>

                </Container>

            </div>

            <div className="bg-footer-dark">
                <p>feito com <p className="redColor mx-2"> amor </p> por Thayane Bomfim</p>
            </div>
        </div>
    )

}