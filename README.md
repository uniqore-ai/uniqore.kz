# uniqore.kz

Русско- и казахоязычный лендинг Uniqore — **ИИ-Партнёр для предпринимателя. ИИ, который
внедряет в ваш бизнес сам себя.** Собран из канона продукта
(`uniqore-docs/vision/`, актуальная версия v1.3.0); структура и решения —
спека `uniqore-docs/desktop-cto/specs/landing-vision-refresh.md`.

🔗 **Прод:** https://uniqore.kz

## Стек

Статический сайт без сборки. Страницы:

| Страница | URL | Смысл |
|---|---|---|
| `index.html` | `/` | Главная: боли → три фичи → позиционирование → десктоп → принципы → цены → CTA |
| `mission/index.html` | `/mission/` | Миссия: «Мы обожаем фаундеров», качества, боли, навигатор |
| `automations/index.html` | `/automations/` | Общий каталог готовых автоматизаций с фильтрами |
| `automations/*/index.html` | `/automations/<slug>/` | Отдельные страницы автоматизаций из общего каталога |
| `speech-analytics/index.html` | `/speech-analytics/` | Флагманская автоматизация «Речевая аналитика продаж» |
| `download/index.html` | `/download/` | Скачать: платформы, первый запуск на macOS, mailto-фолбэк |

Общий хром (токены, нав, футер, кнопки, секции) — `assets/site.css`; страничные
стили и скрипты — инлайн в своей странице. Маскот Юни — инлайн-SVG, в навигации
используется графический wordmark бренд-пака v1.2.0 (`assets/wordmark-dark-v1.2.0.svg`).
Шрифт **Inter** — Google Fonts по CDN.

**Языки.** Все живые страницы работают на RU и ҚАЗ без дублирования HTML:
казахский включается через `?lang=kk`, выбор сохраняется между маршрутами и в
`localStorage`. Переводы, метаданные и динамические сообщения находятся в
`assets/i18n.js`, dropdown — в `assets/language.css`. `Eng` в меню открывает
**https://uniqore.ai/** в новой вкладке.
Хостинг — **GitHub Pages** (деплой из ветки `main`, корень `/`).

**Скачивание.** Обе кнопки на `/download/` живые и ведут на публичный эндпойнт
cto-server (`https://api.uniqore.ai/download/darwin` и `…/download/windows`,
спека `app-updates.md`) — он отдаёт последнюю опубликованную сборку, так что при
новом релизе править тут нечего. Слаги платформ — `PLATFORMS` в
`cto-server/src/routes/releases.rs`.

## Структура

| Файл | Назначение |
|------|------------|
| `index.html`, `mission/`, `automations/`, `speech-analytics/`, `download/` | Живые страницы (см. выше) |
| `assets/site.css` | Общий хром сайта |
| `assets/automations.js`, `assets/automations.css` | Единый каталог, карточки и страницы автоматизаций |
| `assets/illustrations/` | Оптимизированные иллюстрации для смысловых блоков главной |
| `assets/wordmark-dark-v1.2.0.svg` | Актуальный графический wordmark `UNIQORE` из бренд-пака v1.2.0 |
| `assets/i18n.js`, `assets/language.css` | RU→ҚАЗ локализация живых страниц и архивной `/archive/crm/` |
| `archive/crm/` | Бывшая `/crm/` («Увидьте, где бизнес теряет деньги») — retiring-продукт, `noindex` |
| `archive/tenders/` | Архив тендерного продукта (было `/tenders/`), `noindex` |
| `crm/`, `tenders/`, `tenders/demo/`, `tenders/fullpage/` | Заглушки-редиректы (meta refresh) на `/archive/…`, `noindex` |
| `docs/localization.md` | Решения и сценарии проверки RU / ҚАЗ локализации |
| `404.html` | Страница «не найдено» |
| `CNAME` | Кастомный домен `uniqore.kz` для GitHub Pages |
| `favicon.*`, `apple-touch-icon.png`, `android-chrome-*`, `mstile-150x150.png`, `site.webmanifest`, `browserconfig.xml` | Favicon-набор бренд-пака v1.0.1 |
| `og-home-1200x630-ru-v1.0.1.png` | RU OG-баннер — временно стоит на всех страницах (свои OG — follow-up) |
| `og-crm-1200x630-ru-v1.0.1.png`, `og-image.png` | OG архивных страниц |
| `robots.txt` / `sitemap.xml` | SEO: sitemap включает основные страницы и каталог автоматизаций; `Disallow: /archive/`, `/tenders/`. `/crm/` не задизаллоулен намеренно — Google должен просканировать заглушку с `noindex` и выкинуть URL из индекса |

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
