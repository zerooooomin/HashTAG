import React from 'react';
import './App.css';
import Diarypage from './Diarypage';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main_Page from './Main_Page';



const Modal = ({ isOpen, onClose }) => { 
    if (!isOpen) return null;  

    // 새 창을 열기 위한 함수
    const ModalClickDiary = () => {
        window.open( '/diarypage');  // 새 탭 또는 새 창에서 열기
    };

    return (
        <div className='modal'>
            <ul className='modal_1'>
                <li>
                    {/* 새 창을 열기 위한 버튼 */}
                    <span onClick={ModalClickDiary}>잘자요</span>
                </li>
                <li>
                    애칭 설정 
                </li>
                <li>
                    Diray List
                </li>
            </ul>
            <ul className='modal_2'>
                <li></li>
            </ul> 
        </div>
    );
}

export default Modal;