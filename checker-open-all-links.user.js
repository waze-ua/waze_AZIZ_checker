// ==UserScript==
// @name         WME AZ-Checker - Addons
// @namespace    https://greasyfork.org/ru/users/160654-waze-ukraine
// @version      2023.03.02.004
// @description  Скрипт создает кнопку Open All и Hide All всех пермалинков, расположенных на одной странице ошибок, в отдельных вкладках.
// @author       Sapozhnik
// @match        https://checker.waze.uz/checker/errorlist/*
// @updateURL    https://greasyfork.org/ru/scripts/457575-wme-checker-open-all-links
// @downloadURL  https://greasyfork.org/ru/scripts/457575-wme-checker-open-all-links
// ==/UserScript==

(function() {
    'use strict';
    // Создаем Open All
    // Создаём новый <span>
var sp1 = document.createElement("span");

sp1.innerHTML = '<span><b><a href> Open All </a></b>&nbsp;&nbsp;</span>';
// Получаем ссылку на элемент, перед которым мы хотим вставить sp1
    sp1.onclick = function() {MyFunc()}

var sp2 = document.getElementsByClassName('page-links');
    //Получаем ссылку на родителя sp2
var parentDiv = sp2[0].parentNode;
//            console.log (parentDiv);

// Вставляем sp1 перед sp2
parentDiv.insertBefore(sp1, sp2[0]);

// Создаем hide
    // Создаём новый <span>
var hide1 = document.createElement("th");
hide1.innerHTML = '<a href> Hide All </a>';

    // Получаем ссылку на элемент, перед которым мы хотим вставить hide1
var hide2 = document.querySelectorAll('th');
    // получаем кол-во элементов, чтоб найти последний
var hide2_lenght = document.querySelectorAll('th').length - 1;

    //Получаем ссылку на родителя hide2
var parentDiv_hide = hide2[hide2_lenght];

    //Получаем ссылку на родителя hide2
var parentDiv_hide = hide2[12];
//           console.log (parentDiv_hide);

// Вставляем hide1 вместо hide2
    parentDiv_hide.innerHTML = hide1.innerHTML;
    parentDiv_hide.onclick = function() {MyFunc_hide()}

function MyFunc(){
    Array.from(document.getElementsByClassName('lnk')).map(i=>{i.target="_blank"; return i}).map(i=>{i.click(); return i});
}
function MyFunc_hide(){
    Array.from(document.querySelectorAll('a[href*="/hide_element/"]')).map(i=>{i.target="_blank"; return i}).map(i=>{i.click(); return i});
}

})();
