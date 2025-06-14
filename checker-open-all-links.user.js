// ==UserScript==
// @name         WME AZ-Checker - UI Addons
// @namespace    https://greasyfork.org/ru/users/160654-waze-ukraine
// @version      2025.06.14.001
// @description  Crates addition button Open All и Hide All for all permalinks which placed on one page of report
// @author       Sapozhnik
// @match        https://checker2.waze.uz/checker/errorlist/*
// @match        https://checker.waze.uz/checker/errorlist/*
// @downloadURL https://update.greasyfork.org/scripts/457575/WME%20AZ-Checker%20-%20UI%20Addons.user.js
// @updateURL https://update.greasyfork.org/scripts/457575/WME%20AZ-Checker%20-%20UI%20Addons.meta.js
// ==/UserScript==

(function () {
    'use strict';

    // Створюємо Open All кнопку
    var sp1 = document.createElement("span");
    sp1.innerHTML = '<span><a href>Open All</a><br></span>';
    sp1.onclick = function () { MyFunc() };

    // Знаходимо <thead>
    var thead = document.querySelector('thead');

    if (thead) {
        // Знаходимо перший рядок <tr> всередині <thead>
        var firstTr = thead.querySelector('tr');

        if (firstTr) {
            // Знаходимо всі <th> в першому <tr>
            var allThInFirstTr = firstTr.querySelectorAll('th');

            // Перевіряємо, чи існує другий <th> (індекс 1)
            if (allThInFirstTr.length > 1) {
                var secondTh = allThInFirstTr[1]; // Це другий <th>

                // Вставляємо sp1 перед вмістом другого <th>
                secondTh.insertBefore(sp1, secondTh.firstChild);
                console.log("'Open All' button inserted into the second <th>.");
            } else {
                console.warn("Could not find a second <th> element in the first <tr> of <thead>.");
            }
        } else {
            console.warn("Could not find the first <tr> element inside <thead>.");
        }
    } else {
        console.warn("Could not find <thead> element on the page. 'Open All' button will not be added.");
    }


    // Створюємо Hide All кнопку (цей блок залишається майже без змін)
    var hide1 = document.createElement("th");
    hide1.innerHTML = '<a href> Hide All </a>';

    var hide2 = document.querySelectorAll('th');
    var hide2_lenght = document.querySelectorAll('th').length - 1;

    if (hide2.length > 0) {
        var parentDiv_hide = hide2[hide2_lenght];
        parentDiv_hide.innerHTML = hide1.innerHTML;
        parentDiv_hide.onclick = function () { MyFunc_hide() };
        console.log("'Hide All' button processed.");
    } else {
        console.warn("No <th> elements found for 'Hide All' button. It might not be added.");
    }

    // Зміна дизайну
    document.querySelector('body').setAttribute("style","background-color: #f0f0f3");


    function MyFunc() {
        Array.from(document.querySelectorAll('a[href$="/0/"][href*="/checker/go_waze"]')).map(i => { i.target = "_blank"; return i }).map(i => { i.click(); return i });
    }

    function MyFunc_hide() {
        Array.from(document.querySelectorAll('a[href*="/hide_element"]')).map(i => { i.target = "_blank"; return i }).map(i => { i.click(); return i });
    }



})();