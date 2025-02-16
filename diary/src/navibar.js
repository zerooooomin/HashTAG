import {React} from "react";
import './App.css';
import { useNavigate } from 'react-router-dom';

function Navibar(){
    const navigate = useNavigate();
    const ModalClickMainDiary = () => {
        navigate('/');
    }
    return(
            <nav>
                    <div className='logo'>
                        <span onClick={ModalClickMainDiary}>HashTAG</span>
                    </div>
                    <div>
                        <ul className='login_signup'>
                            <li>
                                <a href='#'>Login</a>
                            </li>
                            <li>
                                <a href='#'>Sign Up</a>
                            </li>
                        </ul>
                    </div>
                </nav>
    )
}

export default Navibar;