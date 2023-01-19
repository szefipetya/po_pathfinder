let toolboxToggle = document.querySelector("#toolbox-toggle");
let toolbox = document.querySelector("#toolbox");

function showToolBox() {
    if(window.innerWidth<1420)
    toolbox.classList.toggle('active');
}
if(toolboxToggle!=null)
toolboxToggle.addEventListener('click', showToolBox);