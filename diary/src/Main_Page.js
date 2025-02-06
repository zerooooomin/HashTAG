import {useState} from 'react';
import React from 'react';
import './App.css';
import CalendarComponent from './FullCalendar';
import Chatting from './Chatting.js';
import Modal from './modal'
import Naviba from './naviba.js';

function Main_Page() {
    return (
            <div className='main_page'>
                <header>
                    <Naviba/>
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