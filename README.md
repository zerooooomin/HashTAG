# HashTAG_diary

## 🚀 프로젝트 소개
HashTAG는 사용자가 자신의 감정과 생각을 편리하게 기록할 수 있도록 도와주는 AI 기반의 챗봇 애플리케이션입니다.  
챗봇은 사용자의 이야기를 경청하고, 의미 있는 대화를 제공합니다.

## MVP Features
1. Front-end
2. Chat-bot
3. Database Connections

## DataBase Commands
1. CREATE 'hashtag' SCHEMA
```
CREATE DATABASE IF NOT EXISTS hashtag CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. USE 'hashtag'
```
USE hashtag;
```

3. CREATE 'chats' TABLE
```
CREATE TABLE chats (
    chat_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    chat_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    user_message TEXT NULL,
    bot_message TEXT NULL,
    user_alias VARCHAR(50) NULL,
    bot_profile_image VARCHAR(255) NULL
);
```


## Installation Commands
#### 프로젝트에 필요한 패키지 설치
- Python Library
```bash
pip install -r requirements.txt
```

- CMD Terminal
```bash
FOR /F %i IN (requirements.txt) DO npm install %i
```

- Windows Powershell
```bash
Get-Content requirements.txt | ForEach-Object { npm install $_ }
```

#### 서버 및 데이터베이스 실행
**`HashTAG/diary/src/`** 디렉토리로 이동한 후, 아래 명령어를 실행하세요.

```bash
node server.js
```

#### 애플리케이션 실행 방법
**`HashTAG/diary/`** 디렉토리에서 아래 명령어를 입력하세요.

```bash
npm start
```

## 🔑 API Key 요청 안내
이 프로젝트를 실행하기 위해서는 **OpenAI API Key**가 필요합니다.  
프로젝트를 실행하고 싶다면 **HashTAG 팀에 문의하시면 API Key를 제공해드립니다.**

#### 👥 팀원
- 김영민
- 최수혁
- 김영욱
- 이수현
