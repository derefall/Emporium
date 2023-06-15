import { Navbar, Nav, Container, Row, Button, Form } from "react-bootstrap";
import './styles.scss';

export default function Header() {

    return (

        <Navbar sticky-top collapseOnSelect expand="lg" className="bg-header" variant="dark">
            <Container className="my-3">

                <Navbar.Brand href="#home">emporium.</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Row>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="">
                            <Form.Control type="text" placeholder="procure aqui..." />
                            <Button className="mx-2">criador</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Row>

            </Container>
        </Navbar>
    )

}