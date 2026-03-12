# N5 일본어 마스터

JLPT N5 수준의 일본어를 모바일에서 학습할 수 있는 PWA 앱입니다.

## 주요 기능

- **대화 학습** — 일상/동화/현대생활 27개 챕터 시나리오 기반 대화
- **단어 암기** — N5 단어 150개+, SRS(간격 반복) 플래시카드, 4가지 퀴즈 모드
- **문법 학습** — 20개 N5 문법 포인트, 예문, 빈칸 연습
- **AI 대화 연습** — Claude/OpenAI API 연동 시나리오별 회화 연습
- **게임화** — XP, 레벨, 스트릭, 12개 뱃지
- **PWA** — 홈 화면 설치, 오프라인 지원

## 사용법

https://idpark.github.io/nihongo-n5/ 에서 바로 사용하거나, 스마트폰 브라우저에서 "홈 화면에 추가"로 앱처럼 설치할 수 있습니다.

## 기술 스택

- Vanilla JS (ES Modules, 빌드 도구 없음)
- PWA (Service Worker + manifest.json)
- localStorage 상태 관리
- Web Speech API (TTS)
- GitHub Pages 배포
