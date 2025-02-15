import { useState, useEffect } from 'react';
import React from 'react';
import './Chatting.css';
import { ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import Modal from './modal';

const Chatting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]); // 현재 채팅 메시지 목록
  const [newMessage, setNewMessage] = useState(''); // 사용자가 입력한 메시지

  // 🔹 기본 Bot 메시지
  const botGreeting = {
    bot_message: "오늘도 와줬구나 반가워. 오늘은 무슨 일이 있었어? 너의 얘기가 궁금해~"
  };

  useEffect(() => {
    fetchMessages(); // 기존 채팅 메시지 불러오기
  }, []);

  // 🔹 기존 메시지를 불러오는 함수 (bot 메시지 포함)
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4000/get-messages');
      const data = await response.json();

      // 🔹 bot 메시지를 항상 첫 번째 요소로 유지
      setMessages([botGreeting, ...data]);
    } catch (error) {
      console.error('메시지 불러오기 오류:', error);
    }
  };

  // 🔹 메시지 전송 함수 (DB 저장)
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = { message: newMessage };

    try {
      const response = await fetch('http://127.0.0.1:4000/save-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        fetchMessages(); // 채팅 목록 다시 불러오기 (bot 메시지 유지)
        setNewMessage('');
      }
    } catch (error) {
      console.error('메시지 저장 오류:', error);
    }
  };

  return (
    <div className='chatting'>
      <ul>
        <li className='name'>사용자가 지정한 애칭</li>
        <li className='chatting_body' style={{ width: 786 }}>
          <ChatContainer>
            <MessageList style={{ marginTop: 15 }}>
              {messages.map((msg, index) => (
                msg.user_message ? (
                  <Message
                    key={index}
                    model={{
                      message: msg.user_message,
                      direction: 'outgoing' // ✅ 사용자 메시지는 오른쪽 (outgoing)
                    }}
                  />
                ) : msg.bot_message ? (
                  <Message
                    key={index}
                    model={{
                      message: msg.bot_message,
                      direction: 'incoming' // ✅ Bot 메시지는 왼쪽 (incoming)
                    }}
                  />
                ) : null
              ))}
            </MessageList>
            <MessageInput
              placeholder="메시지 작성"
              value={newMessage}
              onChange={(val) => setNewMessage(val)}
              onSend={sendMessage}
            />
          </ChatContainer>
        </li>
        {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </ul>
    </div>
  );
};

export default Chatting;
