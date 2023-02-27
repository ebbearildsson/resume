function enterKeyPressed(event) {
    if (event.keyCode == 13) {
        let span = document.createElement("span")
        span.innerHTML = "> " + document.getElementById("input").value
        document.getElementById("input").value = ""
        document.getElementById("console").appendChild(span)
        span.scrollIntoView()
    } 
 }