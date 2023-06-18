import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import './styles.scss';

export default function Home() {
    const navigate = useNavigate();

    return (

        <div className='bg-home'>

            <div className="cat">
                <div className="ear ear--left"></div>
                <div className="ear ear--right"></div>
                <div className="face">
                    <div className="eye eye--left">
                        <div className="eye-pupil"></div>
                    </div>
                    <div className="eye eye--right">
                        <div className="eye-pupil"></div>
                    </div>
                    <div className="muzzle"></div>
                </div>
            </div>

            <div className="d-flex  align-items-center flex-column">

                <Button onClick={() => { navigate('/topicos') }} className="mb-3 buttonDefault">
                    explorar
                </Button>

                <h5>a sua enciclopédia de religião e ciência</h5>

            </div>

        </div>

    )

}