# uniqore.kz

Русскоязычный лендинг UNIQORE — **ИИ-Партнёр для предпринимателя. ИИ, который
внедряет в ваш бизнес сам себя.** Собран из канона продукта
(`uniqore-docs/vision/`, актуальная версия v1.1.0); структура и решения —
спека `uniqore-docs/desktop-cto/specs/landing-vision-refresh.md`.

🔗 **Прод:** https://uniqore.kz

## Стек

Статический сайт без сборки. Страницы:

| Страница | URL | Смысл |
|---|---|---|
| `index.html` | `/` | Главная: боли → три фичи → позиционирование → десктоп → принципы → цены → CTA |
| `mission/index.html` | `/mission/` | Миссия: «Мы обожаем фаундеров», качества, боли, навигатор |
| `speech-analytics/index.html` | `/speech-analytics/` | Флагманская автоматизация «Речевая аналитика воронки продаж» |
| `download/index.html` | `/download/` | Скачать: платформы, первый запуск на macOS, mailto-фолбэк |

Общий хром (токены, нав, футер, кнопки, секции) — `assets/site.css`; страничные
стили и скрипты — инлайн в своей странице. Маскот Юни — инлайн-SVG, логотип в
нав/футере — `/favicon.svg`. Шрифт **Inter** — Google Fonts по CDN.

**Языки.** Новые страницы — только RU. Казахская локаль (`assets/i18n.js` +
`assets/language.css`) осталась только в архивной `/archive/crm/`; перевод новых
страниц — отдельная задача. `Eng` в меню ведёт на **https://uniqore.ai/**.
Хостинг — **GitHub Pages** (деплой из ветки `main`, корень `/`).

**Скачивание.** Кнопки на `/download/` пока «Скоро»; включение — готовые href в
HTML-комментариях рядом с кнопками (`https://api.uniqore.ai/download/darwin` и
`…/download/windows`, публичный эндпойнт cto-server из спеки `app-updates.md`).

## Структура

| Файл | Назначение |
|------|------------|
| `index.html`, `mission/`, `speech-analytics/`, `download/` | Живые страницы (см. выше) |
| `assets/site.css` | Общий хром сайта |
| `assets/i18n.js`, `assets/language.css` | RU→ҚАЗ локализация — используется только `/archive/crm/` |
| `archive/crm/` | Бывшая `/crm/` («Увидьте, где бизнес теряет деньги») — retiring-продукт, `noindex` |
| `archive/tenders/` | Архив тендерного продукта (было `/tenders/`), `noindex` |
| `crm/`, `tenders/`, `tenders/demo/`, `tenders/fullpage/` | Заглушки-редиректы (meta refresh) на `/archive/…`, `noindex` |
| `docs/localization.md` | Решения по локализации (сейчас применимы только к `/archive/crm/`) |
| `404.html` | Страница «не найдено» |
| `CNAME` | Кастомный домен `uniqore.kz` для GitHub Pages |
| `favicon.*`, `apple-touch-icon.png`, `android-chrome-*`, `mstile-150x150.png`, `site.webmanifest`, `browserconfig.xml` | Favicon-набор бренд-пака v1.0.1 |
| `og-home-1200x630-ru-v1.0.1.png` | RU OG-баннер — временно стоит на всех страницах (свои OG — follow-up) |
| `og-crm-1200x630-ru-v1.0.1.png`, `og-image.png` | OG архивных страниц |
| `robots.txt` / `sitemap.xml` | SEO: sitemap — 4 живые страницы; `Disallow: /archive/`, `/tenders/`. `/crm/` не задизаллоулен намеренно — Google должен просканировать заглушку с `noindex` и выкинуть URL из индекса |

## Разработка

Вся работа ведётся в ветках, в `main` — **только через Pull Request** (прямой push в `main` запрещён защитой ветки).

```bash
git checkout -b feat/моя-правка
# правим страницы ...
git commit -am "feat: ..."
git push -u origin feat/моя-правка
gh pr create --base main
```

Для проверки лучше запустить локальный HTTP-сервер из корня репозитория
(конфигурация `.claude/launch.json` использует порт 4173). Сборка не нужна.

## Деплой и домен

- GitHub Pages пересобирает сайт автоматически при мерже в `main`.
- Кастомный домен задаётся файлом `CNAME` (`uniqore.kz`).
- DNS (панель hoster.kz): apex `uniqore.kz` → 4 A-записи GitHub Pages
  (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`);
  `www` → CNAME `uniqore-ai.github.io`. Записи почты (`mail`, `MX`, `SPF`) не трогаем.
- DNS переключён на GitHub Pages: apex отдаёт `185.199.108–111.153`, `www` →
  CNAME `uniqore-ai.github.io`, HTTPS-сертификат Let's Encrypt (`CN=uniqore.kz`)
  выпущен. Проверка: `dig +short uniqore.kz` → адреса GitHub.
