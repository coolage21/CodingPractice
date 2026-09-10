# Codewarm

생각하는 힘을 키우는 코딩 퀴즈 서비스의 Next.js 16 베타 앱입니다.

## 시작하기

```bash
npm install
copy .env.example .env.local
npm run dev
```

`.env.local`에 Neon PostgreSQL의 연결 문자열과 OpenAI, JWT 시크릿을 설정합니다. 실제 비밀 값은 저장소에 커밋하지 않습니다.

Neon 연결 후 문제 은행을 생성하고 20개 시나리오 문제를 저장합니다.

```bash
npm run db:migrate
npm run db:seed
```

`DATABASE_URL`이 비어 있으면 `db:migrate`가 실행되지 않습니다. Neon 콘솔의 연결 문자열을 `DATABASE_URL`에 넣은 뒤 다시 실행하세요.

## 주요 구조

- `app/`: Next.js App Router 페이지와 API Route Handler
- `app/api/grade`: AI 채점 API 경계
- `app/api/quizzes`: Neon에서 문제 목록을 조회하는 API
- `db/schema.ts`: Drizzle 기반 사용자/퀴즈 풀이 스키마
- `db/seed.ts`: `spec.md`의 20개 시나리오 문제 초기 데이터
- `lib/`: Neon, OpenAI, JWT 클라이언트 헬퍼
- `app/providers.tsx`: TanStack Query Provider

## 명령어

```bash
npm run lint
npm run build
npm run db:generate
npm run db:migrate
```