(function(){
  'use strict';

  var items = [
    {
      slug:'speech-analytics', path:'/speech-analytics/', icon:'🎙️', status:'live',
      categories:['sales','team'], tags:['Продажи','Команда'],
      title:'Речевая аналитика продаж',
      summary:'Анализирует все переписки и записи разговоров, показывает, где менеджеры теряют сделки, и даёт личный план каждому.'
    },
    {
      slug:'cash-flow-statement', icon:'🏦', status:'soon',
      categories:['finance','operations'], tags:['Финансы','Операции'],
      title:'Отчет о движении денежных средств (ДДС) из банковских выписок',
      summary:'Разносит операции по статьям и собирает движение денег без ручной таблицы.'
    },
    {
      slug:'competitor-monitoring', icon:'🕵️', status:'soon',
      categories:['marketing'], tags:['Маркетинг'],
      title:'Слежка за конкурентами',
      summary:'Собирает изменения цен, товаров и акций конкурентов, чтобы вам не ходить по их сайтам.'
    },
    {
      slug:'sales-funnel-analysis', path:'/automations/sales-funnel-analysis/', icon:'📊', status:'live',
      categories:['sales'], tags:['Продажи'],
      title:'Анализ воронки продаж',
      summary:'Находит этапы, где застревают и умирают сделки, и считает цену этих потерь.'
    },
    {
      slug:'daily-pulse', icon:'🌅', status:'soon',
      categories:['operations','team'], tags:['Операции','Команда'],
      title:'Ежедневный пульс',
      summary:'Каждое утро присылает новые лиды, застрявшие сделки и вчерашние победы одним сообщением.'
    },
    {
      slug:'abcd-customer-analysis', icon:'🧮', status:'soon',
      categories:['sales','marketing'], tags:['Продажи','Маркетинг'],
      title:'ABCD-анализ клиентской базы',
      summary:'Показывает, кто приносит выручку, кто растёт, кто уснул и кого вы теряете.'
    },
    {
      slug:'sales-manager-activity', icon:'🏃', status:'soon',
      categories:['team','sales'], tags:['Команда','Продажи'],
      title:'Аналитика активности менеджеров по продажам',
      summary:'Показывает, кто действительно работал со сделками на этой неделе — по данным CRM.'
    },
    {
      slug:'manager-coaching', icon:'🧑‍💼', status:'soon',
      categories:['team','sales'], tags:['Команда','Продажи'],
      title:'Личный разбор менеджеру',
      summary:'Каждому — только его звонки, ошибки, сильные стороны и следующий шаг.'
    },
    {
      slug:'personalized-proposals', icon:'📄', status:'soon',
      categories:['sales','marketing'], tags:['Продажи','Маркетинг'],
      title:'Персональные КП',
      summary:'Готовит коммерческие предложения под тип клиента — на ваших данных и вашем бланке.'
    },
    {
      slug:'expense-optimization', icon:'✂️', status:'soon',
      categories:['finance'], tags:['Финансы'],
      title:'Экономия на расходах (косторезка)',
      summary:'Находит лишние расходы и показывает, сколько можно экономить каждый месяц без ущерба для бизнеса.'
    },
    {
      slug:'profit-and-loss', icon:'📈', status:'soon',
      categories:['finance'], tags:['Финансы'],
      title:'Отчет о прибылях и убытках (ОПиУ)',
      summary:'Собирает понятный отчет о прибыли и убытках из ваших файлов.'
    },
    {
      slug:'cash-flow-xray', icon:'💸', status:'soon',
      categories:['finance','operations'], tags:['Финансы','Операции'],
      title:'Рентген денежного потока',
      summary:'Показывает, куда реально уходят деньги и где можно сэкономить — по банковским выпискам.'
    },
    {
      slug:'debtor-radar', icon:'⏳', status:'soon',
      categories:['finance','sales'], tags:['Финансы','Продажи'],
      title:'Радар должников',
      summary:'Показывает, кто вам должен, сколько и как давно — до того, как долг станет списанием.'
    },
    {
      slug:'rfm-customer-analysis', icon:'🎯', status:'soon',
      categories:['marketing','sales'], tags:['Маркетинг','Продажи'],
      title:'RFM-анализ клиентской базы',
      summary:'Показывает, кому продавать снова, кого пора вернуть и на кого не тратить бюджет.'
    }
  ];

  function escapeHtml(value){
    return String(value).replace(/[&<>"']/g,function(character){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[character];
    });
  }

  function statusLabel(item){ return item.status === 'live' ? 'уже есть' : 'скоро'; }

  function interestUrl(item){
    var message = 'Добрый день! Пишу вам с сайта uniqore.kz. Мне нужна автоматизация "' + item.title + '"';
    return window.UniqoreContact ? window.UniqoreContact.whatsappUrl(message) : 'https://wa.me/';
  }

  function renderCatalog(container){
    if (!container) return;
    container.innerHTML = items.map(function(item){
      var cta = item.status === 'live'
        ? '<a class="btn btn-primary btn-sm auto-card-cta" href="' + item.path + '">Посмотреть →</a>'
        : '<a class="btn btn-sm auto-card-cta auto-card-interest" href="' + interestUrl(item) + '" target="_blank" rel="noopener" aria-label="Мне это нужно: автоматизация ' + escapeHtml(item.title) + '">Мне это нужно</a>';
      return '<article class="auto-card" data-categories="' + item.categories.join(' ') + '">' +
        '<div class="auto-card-top"><div class="auto-card-icon" aria-hidden="true">' + item.icon + '</div>' +
        '<span class="auto-status ' + item.status + '">' + statusLabel(item) + '</span></div>' +
        '<h4>' + escapeHtml(item.title) + '</h4>' +
        '<p>' + escapeHtml(item.summary) + '</p>' +
        '<div class="auto-card-footer"><div class="auto-card-tags">' + item.tags.map(function(tag){ return '<span class="auto-card-tag">' + escapeHtml(tag) + '</span>'; }).join('') + '</div>' + cta + '</div>' +
      '</article>';
    }).join('');
  }

  function currentSlug(){
    var parts = location.pathname.split('/').filter(Boolean);
    return parts.length > 1 && parts[0] === 'automations' ? parts[1] : '';
  }

  function renderDetail(container){
    if (!container) return;
    var slug = container.dataset.automationSlug || currentSlug();
    var item = items.find(function(candidate){ return candidate.slug === slug; });
    if (!item || item.status !== 'live') {
      container.innerHTML = '<div class="automation-detail-card card"><h1>Автоматизация не найдена</h1><p>Вернитесь в каталог и выберите готовую автоматизацию.</p><a class="btn btn-primary" href="/automations/">Все автоматизации →</a></div>';
      return;
    }
    var primary = '<a class="btn btn-primary" href="/download/">Скачать и запустить</a>';
    container.innerHTML = '<div class="automation-detail-card card">' +
      '<div class="automation-detail-top"><div class="automation-detail-icon" aria-hidden="true">' + item.icon + '</div><span class="auto-status ' + item.status + '">' + statusLabel(item) + '</span></div>' +
      '<h1>' + escapeHtml(item.title) + '</h1>' +
      '<p class="automation-detail-summary">' + escapeHtml(item.summary) + '</p>' +
      '<div class="auto-card-tags">' + item.tags.map(function(tag){ return '<span class="auto-card-tag">' + escapeHtml(tag) + '</span>'; }).join('') + '</div>' +
      '<div class="automation-detail-actions">' + primary + '<a class="btn btn-ghost" href="/automations/">Все автоматизации →</a></div>' +
    '</div>';
  }

  window.UniqoreAutomations = {items:items,renderCatalog:renderCatalog,renderDetail:renderDetail};
})();
