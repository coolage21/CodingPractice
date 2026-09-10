# Codewarm

생각하는 힘을 키우는 코딩 퀴즈 서비스의 Next.js 16 베타 앱입니다.

## 시작하기

```bash
npm install
copy .env.example .env.local
npm run dev
```

`.env.local`에는 Neon PostgreSQL, OpenAI, JWT 시크릿을 설정합니다. 실제 비밀 값은 저장소에 커밋하지 않습니다.

## 주요 구조

- `app/`: Next.js App Router 페이지와 API Route Handler
- `app/api/grade`: AI 채점 API 경계
- `db/schema.ts`: Drizzle 기반 사용자/퀴즈 풀이 스키마
- `lib/`: Neon, OpenAI, JWT 클라이언트 헬퍼
- `app/providers.tsx`: TanStack Query Provider

## 명령어

```bash
npm run lint
npm run build
npm run db:generate
npm run db:migrate
```