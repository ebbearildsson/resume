const setTheme = theme => document.documentElement.className = theme;

function setsidebar() {
    let sidebar = document.getElementById("sidebar");
    let button =  document.getElementById("btn");
    let btntext = document.getElementById("btntext");
    let content = document.getElementById("content");

    if(sidebar.style.width != "250px"){
        sidebar.style.width = "250px";
        button.style.marginLeft = "200px";
        btntext.style.transform = "rotate(45deg)";
        content.display = "block";
    } 
    else {
        sidebar.style.width = "0px";
        button.style.marginLeft = "0px";
        btntext.style.transform ="none";
        content.display = "none";
    }
}