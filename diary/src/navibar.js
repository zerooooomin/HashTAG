import React from "react";
import './App.css';

function Navibar(){
    return(
            <nav>
                    <div className='logo'>
                        <a href='#'>HashTAG</a>
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