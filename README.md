# Terméknyilvántartás

NestJS- és EJS-alapú webalkalmazás termékek listázásához, kategória szerinti szűréséhez és új termék felvételéhez.

## Indítás

```bash
npm install
npm run start:dev
```

Az alkalmazás alapértelmezés szerint a `http://localhost:3000` címen érhető el.

## Oldalak

- `/` – terméklista növekvő ár szerinti sorrendben
- `/filter` – termékek szűrése kategória szerint
- `/new` – új termék felvétele szerveroldali validációval

Az induló termékek a `src/app.controller.ts` fájlban találhatók. Az új termékek az alkalmazás futása alatt memóriában tárolódnak.

## Ellenőrzések

```bash
npm run build
npm run lint
npm test
npm run test:e2e
```
