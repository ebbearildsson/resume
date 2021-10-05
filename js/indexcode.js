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