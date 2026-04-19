// ==UserScript==
// @name         WME AZ-Checker - UI Addons
// @namespace    https://greasyfork.org/ru/users/160654-waze-ukraine
// @version      2026.04.19.001
// @description  Додаток перекладає елементи меню, заголовки таблиць, кнопки та інші текстові елементи на деяких сторінках Checker. Додає додаткові кнопки "Відкрити всі" та "Приховати всі" на сторінках звіту про помилки. Приховує рядки, що містять "Russia".
// @author       Sapozhnik
// @match        https://checker2.waze.uz/*
// @match        https://checker.waze.uz/*
// @grant        none
// @downloadURL  https://update.greasyfork.org/scripts/457575/WME%20AZ-Checker%20-%20UI%20Addons.user.js
// @updateURL    https://update.greasyfork.org/scripts/457575/WME%20AZ-Checker%20-%20UI%20Addons.meta.js
// ==/UserScript==

(function () {
    'use strict';

    // --- Переклади мовами ---
    const translations = {
        'en': {
            'Home': 'Home',
            'Statistics': 'Statistics',
            'Last editors': 'Last editors',
            'Settings': 'Settings',
            'Visitors': 'Visitors',
            'Find segment': 'Find segment',
            'Help': 'Help',
            'What\'s New': 'What\'s New',
            'About': 'About',
            'Open All': 'Open All',
            'Open All': 'Open All',
            'Hide All': 'Hide All',
            'History': 'History',
            'Country': 'Country',
            'Errors': 'Errors',
            'Loaded (UTC)': 'Loaded (UTC)',
            'Checked (UTC)': 'Checked (UTC)',
            'Countries': 'Countries',
            'Code': 'Code',
            'Issue types': 'Issue types',
            'ToDo': 'ToDo',
            'Total / Visited / Hidden': 'Total / Visited / Hidden',
            'Description': 'Description',
            'Hidden': 'Hidden'
        },
        'uk': {
            'Home': 'Головна',
            'Statistics': 'Статистика',
            'Last editors': 'Останні редактори',
            'Settings': 'Налаштування',
            'Visitors': 'Відвідувачі',
            'Find segment': 'Знайти сегмент',
            'Help': 'Допомога',
            'What\'s New': 'Що нового',
            'About': 'Про нас',
            'Open All': 'Відкрити всі',
            'Open all': 'Відкрити всі',
            'Hide All': 'Приховати всі',
            'History': 'Історія',
            'Country': 'Країна',
            'Errors': 'Помилки',
            'Loaded (UTC)': 'Завантажено (UTC)',
            'Checked (UTC)': 'Перевірено (UTC)',
            'Countries': 'Країни',
            'Code': 'Код',
            'Issue types': 'Типи проблем',
            'ToDo': 'До виконання',
            'Total / Visited / Hidden': 'Всього / Відвідано / Приховано',
            'Description': 'Опис',
            'Hidden': 'Приховано'
        },
        'ru': {
            'Home': 'Главная',
            'Statistics': 'Статистика',
            'Last editors': 'Последние редакторы',
            'Settings': 'Настройки',
            'Visitors': 'Посетители',
            'Find segment': 'Найти сегмент',
            'Help': 'Помощь',
            'What\'s New': 'Что нового',
            'About': 'О нас',
            'Open All': 'Открыть все',
            'Open all': 'Открыть все',
            'Hide All': 'Скрыть все',
            'History': 'История',
            'Country': 'Страна',
            'Errors': 'Ошибки',
            'Loaded (UTC)': 'Загружено (UTC)',
            'Checked (UTC)': 'Проверено (UTC)',
            'Countries': 'Страны',
            'Code': 'Код',
            'Issue types': 'Типы проблем',
            'ToDo': 'К выполнению',
            'Total / Visited / Hidden': 'Всего / Посещено / Скрыто',
            'Description': 'Описание',
            'Hidden': 'Скрыто'
        }
    };

    const userLang = navigator.language.split('-')[0];
    const currentTranslations = translations[userLang] || translations['en'];

    function translateElementWithIcon(element) {
        const iconElement = element.querySelector('i');
        if (iconElement) {
            let originalText = element.innerText.replace(iconElement.innerText, '').trim();
            if (currentTranslations[originalText]) {
                const iconHtml = iconElement.outerHTML;
                element.innerHTML = `${iconHtml}${currentTranslations[originalText]}`;
                return true;
            }
        }
        return false;
    }

    function translateTextElement(element) {
        if (element.children.length > 0 && element.querySelector('br') && element.querySelector('nobr')) {
            let firstTextNode = null;
            let nobrElement = null;
            for (let node of element.childNodes) {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0 && !firstTextNode) {
                    firstTextNode = node;
                } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'NOBR') {
                    nobrElement = node;
                }
            }
            if (firstTextNode && nobrElement) {
                const originalToDoText = firstTextNode.textContent.trim();
                const originalSubText = nobrElement.textContent.trim();
                firstTextNode.textContent = currentTranslations[originalToDoText] || originalToDoText;
                nobrElement.textContent = currentTranslations[originalSubText] || originalSubText;
                return true;
            }
        }
        const originalText = element.textContent.trim();
        if (currentTranslations[originalText]) {
            element.textContent = currentTranslations[originalText];
            return true;
        }
        return false;
    }

    function hideTableRowsContaining(textToHide) {
        const mainTable = document.querySelector('table.table');
        if (!mainTable) return;
        const tableRows = mainTable.querySelectorAll('tbody tr');
        tableRows.forEach(row => {
            if (row.textContent.toLowerCase().includes(textToHide.toLowerCase())) {
                row.style.display = 'none';
            }
        });
    }

    // --- Виконання перекладів ---
    document.querySelectorAll('.navbar-nav .nav-item .nav-link').forEach(item => translateElementWithIcon(item));
    document.querySelectorAll('a.action-btn').forEach(button => translateElementWithIcon(button));
    document.querySelectorAll('th[scope="col"]').forEach(header => translateTextElement(header));
    const countriesHeader = document.querySelector('h5.mb-0');
    if (countriesHeader) translateElementWithIcon(countriesHeader);

    if (document.querySelector('table.table')) {
        hideTableRowsContaining('Russia');
    }

    document.querySelector('body').style.backgroundColor = "#f0f0f3";

    // --- Додавання кнопок управління (Open All / Hide All) ---
    if (window.location.pathname.includes('/checker/')) {

        // 1. Кнопка Open All у заголовку
        const openAllSpan = document.createElement("span");
        openAllSpan.innerHTML = `<a href="javascript:void(0)" style="text-decoration:none; color:inherit;">${currentTranslations['Open All']}</a><br>`;
        openAllSpan.onclick = function (e) {
            e.preventDefault();
            const links = document.querySelectorAll('td a[href*="/checker/go_waze/"]');
            links.forEach(link => {
                if (link.innerText.trim() !== 'β') {
                    window.open(link.href, '_blank');
                }
            });
        };

        const firstTheadTr = document.querySelector('thead tr');
        if (firstTheadTr && firstTheadTr.cells.length > 1) {
            firstTheadTr.cells[1].insertBefore(openAllSpan, firstTheadTr.cells[1].firstChild);
        }

        // 2. Кнопка Hide All у заголовку останньої колонки
        const lastTh = document.querySelector('thead tr th:last-child');
        if (lastTh) {
            const hideAllLink = document.createElement("a");
            hideAllLink.href = "javascript:void(0)";
            hideAllLink.style.textDecoration = "none";
            hideAllLink.style.color = "inherit";
            hideAllLink.textContent = currentTranslations['Hide All'];
            hideAllLink.onclick = function (e) {
                e.preventDefault();
                const hideForms = document.querySelectorAll('form[action*="/hide_element/"]');
                if (hideForms.length === 0) return;
                
                if (confirm(`${currentTranslations['Hide All']} (${hideForms.length})?`)) {
                    hideForms.forEach((form, index) => {
                        setTimeout(() => {
                            form.target = "_blank"; // Щоб не перезавантажувати поточну сторінку
                            form.submit();
                        }, index * 150); // Невелика затримка для стабільності
                    });
                }
            };
            lastTh.innerHTML = ''; 
            lastTh.appendChild(hideAllLink);
        }
    }
})();