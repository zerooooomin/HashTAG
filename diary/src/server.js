const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

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

// 🔹 채팅 메시지 저장 API (DB에 저장)
app.post('/save-message', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, message: '메시지를 입력하세요' });
  }

  // 현재 날짜 가져오기 (MySQL에 저장할 형식)
  const chatDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const query = 'INSERT INTO chats (chat_date, user_message) VALUES (?, ?)';
  db.query(query, [chatDate, message], (err, result) => {
    if (err) {
      console.error('❌ 메시지 저장 오류:', err);
      return res.status(500).json({ success: false, message: '메시지 저장 실패' });
    }
    res.json({ success: true, message: '메시지 저장 성공' });
  });
});

// 🔹 저장된 메시지 불러오기 API
app.get('/get-messages', (req, res) => {
  const query = 'SELECT * FROM chats ORDER BY chat_date ASC'; // 날짜순 정렬
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
