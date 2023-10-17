import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import './styles.scss';

export default function NotFound() {
    const navigate = useNavigate();

    return (

        <div className='bg-space'>
            <div>
                <h1>404</h1>
                <h2>Oops! Página não encontrada!</h2>
                <p>Esta página não existe ou está em construção!</p>
                <Button className='buttonDefault' onClick={() => navigate('/')}>Volte para a página inicial</Button>
            </div>
        </div>

    )

}