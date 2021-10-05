const setTheme = theme => document.documentElement.className = theme;

function setLang(lang){
    let hideelement = document.getElementsByClassName(lang == 'sv' ? 'en' : 'sv');
    let showelement = document.getElementsByClassName(lang);
    for(let i = 0; i < hideelement.length; i ++){
        hideelement[i].style.display = "none";
        showelement[i].style.display = "inline"
    }
}

function setsidebar() {
    let sidebar = document.getElementById("sidebar");
    let button =  document.getElementById("btn");
    let btntext = document.getElementById("btntext");

    if(sidebar.style.width != "250px"){
        sidebar.style.width = "250px";
        button.style.marginLeft = "200px";
        btntext.style.transform = "rotate(45deg)";
    } 
    else {
        sidebar.style.width = "0px";
        button.style.marginLeft = "0px";
        btntext.style.transform ="none";
    }
}

window.onload = function(e){
    setTheme('light')
}

document.write('\
<div id="sidebar">\
        <a href="/index.html" class="contentlink">\
            <span class="en">Start</span>\
            <span class="sv">Startsida</span>\
        </a>\
        <a href="" class="contentlink">\
            <span class="en">TODO</span>\
            <span class="sv">Att Göra</span>\
        </a>\
        <a href="" class="contentlink">\
            <span class="en">Texts</span>\
            <span class="sv">Texter</span>\
        </a>\
        <a href="" class="contentlink">\
            <span class="en">Programs</span>\
            <span class="sv">Program</span>\
        </a>\
        <a href="/html/about.html" class="contentlink">\
            <span class="en">About me</span>\
            <span class="sv">Om mig</span>\
        </a>\
        <div id="switcher">\
            <button class="theme lightbtn" onclick="setTheme(\'light\')"></button>\
            <button class="theme darkbtn" onclick="setTheme(\'dark\')"></button>\
        </div>\
        <div class="switcher">\
            <button class="lang svbtn" onclick="setLang(\'sv\')"></button>\
            <button class="lang enbtn" onclick="setLang(\'en\')"></button>\
        </div>\
    </div>\
    <div id="btn" onclick="setsidebar()"><a id="btntext" href="javascript:void(0)">+</a></div>\
\
');