# uniqore.kz

Русско- и казахоязычный лендинг **uniqore.ai** — UNIQORE: ИИ, который сам
внедряется в бизнес (готовые автоматизации + «Рентген воронки продаж» для CRM).

🔗 **Прод:** https://uniqore.kz

## Стек

Статический сайт без сборки. Две страницы:

| Страница | URL | Смысл |
|---|---|---|
| `index.html` | `/` | «ИИ, который сам внедряется в ваш бизнес» — каталог автоматизаций |
| `crm/index.html` | `/crm/` | «Увидьте, где бизнес теряет деньги» — CRM-акцент |

Обе страницы используют общие локализационные файлы `assets/i18n.js` и
`assets/language.css`; логотип/маскот встроены как base64, шрифт **Inter** —
Google Fonts по CDN, остальные стили и интерактив (демо-дашборд «Рентген
воронки продаж» + чат) заданы инлайн в `<style>`/`<script>`.

На первом визите казахская локаль браузера (`kk`, включая `kk-KZ`) включает
казахский, остальные локали — русский. Ручной выбор Рус/Қаз запоминается в
`localStorage` и имеет приоритет над локалью браузера; `?lang=kk` даёт прямую
ссылку на казахскую версию. Eng в меню ведёт на **https://uniqore.ai/**.
Хостинг — **GitHub Pages** (деплой из ветки `main`, корень `/`).

Источник дизайна — `uniqore-docs/landing/`: `uniqore-ai-landing-v0.2.0.html` →
`index.html`, `uniqore-ai-landing-v0.1.0.html` → `crm/index.html`. Текст правится
прямо в HTML соответствующей страницы.

## Структура

| Файл | Назначение |
|------|------------|
| `index.html` | Главная (hero · каталог · демо · шаги · цена · CTA) |
| `crm/index.html` | Страница `/crm` (CRM-акцент) |
| `assets/i18n.js` | Выбор языка, RU→ҚАЗ перевод обеих страниц и локализованные метаданные |
| `assets/language.css` | Общий выпадающий переключатель языка |
| `docs/localization.md` | Решения по локализации и пошаговая проверка |
| `404.html` | Брендовая страница «не найдено» |
| `CNAME` | Кастомный домен `uniqore.kz` для GitHub Pages |
| `favicon.*`, `apple-touch-icon.png`, `android-chrome-*`, `mstile-150x150.png`, `site.webmanifest`, `browserconfig.xml` | Favicon-набор бренд-пака v1.0.1 (скруглённые края), подключён на `/` и `/crm` |
| `og-home-1200x630-ru-v1.0.1.png` / `og-crm-1200x630-ru-v1.0.1.png` | RU OG-баннеры соцпревью (1200×630) для `/` и `/crm` |
| `og-image.png` | Старый OG (используется тендерным архивом) |
| `robots.txt` / `sitemap.xml` | SEO |
| `tenders/index.html` | Прежний тендерный лендинг — архив на `/tenders/`, `noindex` |
| `tenders/demo/` | Прежнее приватное демо макета (было `/privatedemo13/`), под паролем, `noindex` |
| `tenders/fullpage/` | Прежний полный лендинг по презентации (было `/fullpage/`), `noindex` |

Раздел **`/tenders/`** — архив старого тендерного продукта («Uniqore — Тендеры»).
Целиком закрыт от поисковиков: `Disallow: /tenders/` в `robots.txt` + `noindex`
на страницах. Из основной навигации (`/`, `/crm`) не связан.

## Разработка

Вся работа ведётся в ветках, в `main` — **только через Pull Request** (прямой push в `main` запрещён защитой ветки).

```bash
git checkout -b feat/моя-правка
# правим index.html / crm/index.html ...
git commit -am "feat: ..."
git push -u origin feat/моя-правка
gh pr create --base main
```

Для проверки общих файлов лучше запустить локальный HTTP-сервер из корня
репозитория (конфигурация `.claude/launch.json` использует порт 4173). Сборка не
нужна.

## Деплой и домен

- GitHub Pages пересобирает сайт автоматически при мерже в `main`.
- Кастомный домен задаётся файлом `CNAME` (`uniqore.kz`).
- DNS (панель hoster.kz): apex `uniqore.kz` → 4 A-записи GitHub Pages
  (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`);
  `www` → CNAME `uniqore-ai.github.io`. Записи почты (`mail`, `MX`, `SPF`) не трогаем.
- DNS переключён на GitHub Pages: apex отдаёт `185.199.108–111.153`, `www` →
  CNAME `uniqore-ai.github.io`, HTTPS-сертификат Let's Encrypt (`CN=uniqore.kz`)
  выпущен. Проверка: `dig +short uniqore.kz` → адреса GitHub.
