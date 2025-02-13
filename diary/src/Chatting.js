import { useState , useEffect } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './Chatting.css'
import {MainContainer, ChatContainer, MessageList, Message, MessageInput} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import Modal from './modal'


const Chatting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const messageInputDiv = document.querySelector('.cs-message-input > div:first-child');

    if (messageInputDiv) {
      messageInputDiv.addEventListener('click', toggleModal);
    }

    return () => {
      if (messageInputDiv) {
        messageInputDiv.removeEventListener('click', toggleModal);
      }
    };
  }, []);
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const message_input_button = document.querySelector(".cs-message-input__tools");
    return (
      <div className='chatting'>
            <ul>
                <li className='name'>사용자가 지정한 애칭</li>
                <li className='chatting_body' style={{
                        width: 786,
                    }}>
                    <ChatContainer >
                        <MessageList style={{marginTop:15}}>
                            <Message
                                model={{
                                    message: '안녕',
                                    direction: 'incoming',
                                    position: 'first'
                                }}/>
                            <Message
                                model={{
                                    message: '나도 안녕',
                                    direction: 'outgoing',
                                    position: 'first'
                                }}/>
                        </MessageList>
                        <MessageInput placeholder="메세지 작성"/>
                    </ChatContainer>
                </li>
                {isModalOpen && <Modal isOpen={isModalOpen} onClose={toggleModal} />}
            </ul> 
            

        </div>
    );
};

export default Chatting;