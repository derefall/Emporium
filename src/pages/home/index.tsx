import { Button } from "react-bootstrap";
import './styles.scss';

export default function Home() {

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

                <Button className="mb-3">
                    explorar
                </Button>

                <h5>a sua enciclopédia de religião e ciência</h5>

            </div>

        </div>

    )

}