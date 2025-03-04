require('dotenv').config({ path : './openapi.env' });   // openai.env 로드 (API 키 호출)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const OpenAI = require("openai");

const app = express();
const PORT = 4000;

// 🔹 MySQL 데이터베이스 연결
const db = mysql.createConnection({
  host: 'localhost', // MySQL 호스트
  user: 'root', // MySQL 사용자
  password: 'root1234!!', // MySQL 비밀번호
  database: 'hashtag' // ✅ 사용자가 설정한 스키마 이름
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL 연결 오류:', err);
  } else {
    console.log('✅ MySQL 연결 성공');
  }
});

app.use(bodyParser.json());
app.use(cors()); // React와 Express가 통신할 수 있도록 CORS 허용

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 🔒 API 키 보호 -> openai.env에서 API 키 가져오기
});


// 🔹 채팅 메시지 저장 API (DB에 저장) + OpneAI API 호출 -> asnyc : 비동기
app.post('/save-message', async (req, res) => {
try{
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, message: '메시지를 입력하세요' });
  }

  // 사용자 메시지
  // 현재 날짜 가져오기 (MySQL에 저장할 형식)
  const chatDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const userQuery = 'INSERT INTO chats (chat_date, user_message) VALUES (?, ?)';
  db.query(userQuery, [chatDate, message], (err, result) => {
    if (err) {
      console.error('❌ 메시지 저장 오류:', err);
      return res.status(500).json({ success: false, message: '메시지 저장 실패' });
    }
    res.json({ success: true, message: '메시지 저장 성공' });
  });

  // 🔹 OpenAI API 호출
  // 프롬프트 추후 수정 가능
  const systemMessage = {
    "role": "system",
    "content": [
        {
          "type": "text",
          "text": `
          "당신의 일기 작성을 도와주는 친구 같은 챗봇 역할을 수행합니다.

          당신이 겪었던 일이나 감정을 편안하게 나눌 수 있도록 대화를 유도합니다. 
          챗봇은 당신의 이야기와 생각을 경청하고, 자연스러우면서도 관련 있는 질문이나 아이디어를 제안합니다. 
          필요하면 조언을 제공하거나 고민 해결을 위한 협력을 합니다. 
          당신이 원할 경우, 대화 내용을 간단하게 요약해 드립니다.
          
          # Steps
          
          - 준비가 되었을 때 챗봇에게 생각이나 감정을 이야기하세요.
          - 오늘 하루 있었던 일이나 느낀 감정 등을 자유롭게 나누세요.
          - 챗봇은 당신 이야기를 경청하며, 자연스럽게 더 깊은 대화를 위해 관련 질문을 던집니다.
          - 고민이 있으면 챗봇과 함께 해결방안을 모색하세요.
          - 대화된 내용을 원하실 경우 간단히 정리해 드릴 수 있습니다.
          
          # Output Format
          
          대화를 위한 일상적인 문장으로 제공됩니다. 필요에 따라 짧은 문단 형식이나 요점 정리도 가능합니다.
          
          # Examples
          
          **Example 1:**
          
          - **Input:** 오늘 하루 종일 피곤하고 긴장되었던 일을 이야기하고 싶어요. 회사에서 중요한 발표가 있었거든요.
          - **Output:** 발표 준비 과정에서 어떤 일이 있었나요? 발표 후에는 어떤 기분이었는지 궁금하네요.
          
          *Example 2:**

          - **Input:** 오늘은 정말 기분이 좋았어요. 친구와 오랜만에 만나 즐거운 시간을 보냈거든요.
          - **Output:** 친구와 함께 어떤 활동을 했나요? 가장 인상 깊은 순간은 무엇이었어요?

          # Notes

          - 사용자에게 편안하고 친근한 대화 분위기를 제공합니다.
          - 진솔한 감정을 나누도록 유도하며, 비판 없이 경청하는 태도를 유지합니다.
          - 사용자 정보와 프라이버시는 철저히 보호합니다.

          친구와 메시지를 주고받는 느낌처럼, 일상적이고 자연스러운 대화를 제공합니다."
          `
        }
      ]
  };

  // respone 생성
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [systemMessage, { role: "user", content: message }],
    response_format: {
      "type": "text"
    },
    temperature: 1.20,
    max_completion_tokens: 2048,
    stop: ["그만"],
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });

  const botReply = response.choices[0]?.message?.content || "오류가 발생했어요.";  // 여기 한번 확인

  // 🔹 AI 응답을 DB에 저장
  const botQuery = 'INSERT INTO chats (chat_date, bot_message) VALUES (?, ?)';
  db.query(botQuery, [chatDate, botReply], (err) => {
    if (err) console.error('❌ AI 응답 저장 오류:', err);
  });

  // 클라이언트에게 응답 반환
  //res.json({ success: true, bot_message: botReply });

  } catch (error) {
    console.error("❌ OpenAI API 호출 오류:", error);
    res.status(500).json({ error: "OpenAI API 호출 실패" });
  }
});

// 🔹 저장된 메시지 불러오기 API (사용자 & AI 메시지)
app.get('/get-messages', (req, res) => {
  const query = 'SELECT chat_date, user_message, bot_message FROM chats ORDER BY chat_date ASC'; // 날짜순 정렬
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ 메시지 불러오기 오류:', err);
      return res.status(500).json({ success: false, message: '메시지 불러오기 실패' });
    }
    res.json(results);
  });
});


// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ Express 서버 실행됨: http://127.0.0.1:${PORT}`);
});
