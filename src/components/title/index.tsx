import { useState } from "react";
import { Row } from "react-bootstrap";
import 'react-quill/dist/quill.snow.css';
import './styles.scss'

export default function Title({ title }: any) {


    return (
        <Row className="my-5">
            <h2 className="title">{title}</h2>
        </Row>

    )

}