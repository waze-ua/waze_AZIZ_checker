// ==UserScript==
// @name         WME Checker - Open all links
// @namespace    https://greasyfork.org/ru/users/160654-waze-ukraine
// @version      2023.03.01.001
// @description  Скрипт создает кнопку открытия всех пермалинков, расположенных на одной странице ошибок, в отдельных вкладках.
// @author       Sapozhnik
// @match        https://checker.waze.uz/checker/errorlist/*
// @updateURL    https://greasyfork.org/ru/scripts/457575-wme-checker-open-all-links
// @downloadURL  https://greasyfork.org/ru/scripts/457575-wme-checker-open-all-links
// ==/UserScript==

(function() {
    'use strict';
   // Array.from(document.getElementsByClassName('lnk')).map(i=>{i.target="_blank"; return i}).map(i=>{i.click(); return i});

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
var hide1 = document.createElement("span");

hide1.innerHTML = '<th><span><b><a href> Hide All </a></b>&nbsp;&nbsp;</span></th>';
    hide1.onclick = function() { MyFunc_hide()}
// Получаем ссылку на элемент, перед которым мы хотим вставить hide1
var hide2 = document.document.querySelectorAll('th');
    
    //Получаем ссылку на родителя hide2
var parentDiv = hide2[12];
//            console.log (parentDiv);

// Вставляем sp1 перед sp2
parentDiv.innerHTML = hide1;


    
    

function MyFunc(){
    Array.from(document.getElementsByClassName('lnk')).map(i=>{i.target="_blank"; return i}).map(i=>{i.click(); return i});
}
function MyFunc_hide(){
    Array.from(document.querySelectorAll('a[href*="/hide_element/"]')).map(i=>{i.target="_blank"; return i}).map(i=>{i.click(); return i});
}


})();
