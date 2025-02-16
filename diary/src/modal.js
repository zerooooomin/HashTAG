import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';


const Modal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;  

    // 새 창을 열기 위한 함수
    const ModalClickDiary = () => {
        navigate('/diarypage');  // 새 탭 또는 새 창에서 열기
    };

    return (
        <div className='modal'>
            <ul className='modal_1'>
                <li onClick={ModalClickDiary}>
                    {/* 새 창을 열기 위한 버튼 */}
                    잘자요
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