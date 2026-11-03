# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal profile website for Nguyễn Quang Đạt (Next.js 16 + React 19 + Tailwind 4), with a "Đăng ký tư vấn" (consultation sign-up) form. Reply to the user and write commit messages in Vietnamese; code comments are also in Vietnamese.

## Commands

- `npm run dev`: local dev at http://localhost:3000 (Telegram token comes from `.env.local`)
- `npm run build`: production build. This is also the only type check; there is no lint or test setup.
- `firebase deploy --only firestore:rules`: deploy Firestore rules (project `hosonangluc-dat`)

Deploys happen automatically: pushing to `main` triggers a Vercel build. Full deployment notes are in `HUONG-DAN-TRIEN-KHAI.md`.

Next.js 16 has breaking changes compared with older versions. Before writing Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`.

## Architecture

- **Content lives in `src/lib/site.ts`.** All copy (contact info, nav, stats, journey, services, the `NEEDS` list) is defined there. Components in `src/components/sections/` only render it. Text changes go in `site.ts`, not in the components.
- **Registration flow:** `RegisterProvider` (context exposing `useOpenRegister()`) → `RegisterDialog` → `submitRegistration()` → `POST /api/dang-ky` (`src/app/api/dang-ky/route.ts`). The route re-validates the data, writes it to Firestore collection `dang_ky_tu_van` with the client SDK (`firebase/firestore/lite`, no Admin SDK or service account), then notifies Telegram. A Telegram failure never fails the request: it is logged, and the route returns a status string in `telegram`.
- **Validation happens in three places that must stay in sync:** `validateRegistration()` in `src/lib/registration.ts` (shared by browser and API), and `isValidRegistration` in `firestore.rules`. The rules require *exactly* 8 fields (`hoTen, soDienThoai, email, nhuCau, dongY, nguon, trangThai, taoLuc`), `taoLuc == request.time` (so the write must use `serverTimestamp()`), and a hardcoded copy of the `NEEDS` list. Changing a field, a regex, or `NEEDS` means updating all of them. Renaming `COLLECTION` (in `src/lib/firebase-config.ts`) also means updating the rules.
- **Anti-spam:** a hidden `website` honeypot field (the API returns `ok` without saving), plus a 1-submission-per-minute limit in localStorage (`lastSent`/`markSent`).
- **Secrets:** `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are server-only Vercel env vars. Never give them a `NEXT_PUBLIC_` prefix. The Firebase web config is public by design and hardcoded as a fallback in `firebase-config.ts`.
- Deploying `firestore.rules` **replaces** every rule in the Firebase project. Do not deploy it to a project that also hosts a CRM unless the CRM's rules have been merged into this file first.

## legacy/

`legacy/` holds the old static HTML site and an old Cloud Functions handler, kept only for reference. It is excluded from `tsconfig`. Don't edit it or build on it; Cloud Functions are no longer used (the project doesn't need the Blaze plan).
