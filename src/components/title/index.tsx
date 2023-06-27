import { useState } from "react";
import { Row } from "react-bootstrap";
import 'react-quill/dist/quill.snow.css';
import './styles.scss'

export default function Title({ title, subtitle, isCentered }: any) {

    return (
        <>

            {
                isCentered ? <Row className="my-5 text-center titleCentered">
                    <h2>{title}</h2>
                    <h3>{subtitle}</h3>
                </Row> : <Row className="my-5">
                    <h2 className="title">{title}</h2>
                </Row>
            }

        </>

    )

}