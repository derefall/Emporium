import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import './styles.scss';

export default function Construction() {
    const navigate = useNavigate();

    return (

        <div className='bg-space'>
            <div>
                <h1>Esta página ainda está sendo construída!</h1>
                <Button className='buttonDefault' onClick={() => navigate('/')}>Volte para a página inicial</Button>
            </div>
        </div>

    )

}