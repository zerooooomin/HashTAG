import {useState} from 'react';
import React from 'react';
import './App.css';
import CalendarComponent from './FullCalendar';
import Chatting from './Chatting.js';
import Modal from './modal'
import Navibar from './navibar.js';
import { useEffect } from 'react';

function Main_Page() {
    useEffect(() => {
        console.log("🏠 Main Page is rendering...");
    }, []);

    return (
            <div className='main_page'>
                <header>
                    <Navibar />
                </header>
                <section className='main_page_body'>
                    <ul>
                        <li className='body_left'>
                            <ul>
                                <li className='body_left_1'>
                                    <ul>
                                        <li>
                                            <span>이달의 목표</span>
                                        </li> 
                                        <li>
                                            우주 최강 푸바오되기
                                        </li>
                                    </ul>
                                </li>
                                <li className='body_left_2'>
                                    <CalendarComponent/>
                                </li>
                            </ul>
                        </li>
                        <li className='body_right'>
                            <div>
                                <ul>
                                    <li>
                                        <Chatting/>
                                    </li>
                                    <li className='modal'>
                                        <Modal/>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </section>    
            </div>
    );
}

export default Main_Page;