/**
 * File: javaScript
 * Credit: Szeifert Péter
 * Neptun: H9PBCL
 * Last modified: 2019.11.05 - 21:00
 * Title: JS beadandó (küldöncök)
 *  
 * 
 */
let table = document.querySelector("#background table tbody");
//model
const back = document.querySelector("#background");


//menu
const menuButton = document.querySelector("#menu");
const homePage = document.querySelector("#home-page");
const levelSelectDiv = document.querySelector("#level-select-div");
const saveSubmitButton = document.querySelector("#save-submit-button");
const loadSubmitButton = document.querySelector("#load-submit-button");
const creditPageButton = document.querySelector("#credit");
const savePage = document.querySelector("#save-page");
const loadPage = document.querySelector("#load-page");
const creditPage = document.querySelector("#credit-page");
let savePageList;
let loadPageList;
let addToSaveListButton;
let loadSelect;
let saveSelect;

let onCredits = false;

let ghostMode = false;
let ghostCell;
let oninfo = false;

function menuClicked() {

    if (onCredits || oninfo) {
        homePage.classList.remove("slide-right");
        creditPage.classList.remove("slide-right");
        homePage.classList.remove("slide-up");
        infoPage.classList.remove("active");
        onCredits = false;
        oninfo = false;
    } else {
        homePage.classList.toggle("active");
        back.classList.toggle("dark");
        savePage.classList.remove("active");
        loadPage.classList.remove("active");
    }

}
menuClicked();
if (instant) {
    menuClicked();
}
menuButton.addEventListener('click', menuClicked);
//menu-end
let size;
let gray = "#d8d8d8"
let matrix = [
    []
];
let o = { base: true, num: 1, protected: false };
let easyMatrix = [
    [{ base: true, colored: false, num: 1, protected: false }, { base: true, colored: false, num: 2, protected: false }, { base: true, colored: false, num: 3, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 4, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 4, protected: false }, { base: true, colored: false, num: 2, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 1, protected: false }, { base: true, colored: false, num: 3, protected: false }, { base: false, colored: false, num: 0, protected: false }],
];
let mediumMatrix = [
    [{ base: true, colored: false, num: 2, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 9, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 5, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: true, colored: false, num: 1, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 8, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 11, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 5, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 2, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 6, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 7, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 11, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 10, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 7, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 4, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 3, protected: false }, { base: true, colored: false, num: 6, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 9, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 4, protected: false }, { base: true, colored: false, num: 8, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 1, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 10, protected: false }, { base: true, colored: false, num: 3, protected: false }]
];
let hardMatrix = [
    [{ base: true, colored: false, num: 1, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 3, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 5, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 2, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 8, protected: false }, { base: true, colored: false, num: 5, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: true, colored: false, num: 7, protected: false }, { base: true, colored: false, num: 4, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 6, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 1, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 2, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 4, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 7, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 3, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }],
    [{ base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 6, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: false, colored: false, num: 0, protected: false }, { base: true, colored: false, num: 8, protected: false }]
];
let prevcolor;
let prevnumber;
let startingCell;
const COLORS = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
  ];
function getColorFromInt(num) {
    if (num == 1) return "brown";
    if (num == 2) return "aqua";
    if (num == 3) return "lightcoral";
    if (num == 4) return "lightgreen";
    if (num == 5) return "darkblue";
    if (num == 6) return "yellow";
    if (num == 7) return "darkgreen";
    if (num == 8) return "black";
    if (num == 9) return "coral";
    if (num == 10) return "blueviolet";
    if (num == 11) return "Olive";
    if (num > 11) return COLORS[num];
}
//save and load
//here
async function actualizeLists() {
    savePageList.innerHTML = "";
    loadPageList.innerHTML = "";
    if (userid != null) {
        let obj = { "userid": parseInt(userid) };
        await ajax("ajax/get_save_headers.php", obj).then((data) => {
            for (let i = 0; i < data.length; i++) {
                var d = new Date(data[i]["date"]);
                //d.setUTCSeconds(data[i]["date"]);

                let li = document.createElement("li");
                li.innerHTML = data[i]["name"] + "\t" + `<small style="font-size: 14px;position: absolute;right: 30px;margin: 2px;">${d.toString().substr(0, 25)}</small>`;
                li.dataset.name = data[i]["name"];
                let li2 = document.createElement("li");
                li2.innerHTML = data[i]["name"] + "\t" + `<small style="font-size: 14px;position: absolute;right: 30px;margin: 2px;">${d.toString().substr(0, 25)}</small>`;
                li2.dataset.name = data[i]["name"];
                savePageList.appendChild(li);
                loadPageList.appendChild(li2);
            }
        });

    } else {
        for (let i = 0; i < window.localStorage.length; i++) {

            let li = document.createElement("li");
            li.innerText = localStorage.key(i)
            li.dataset.name = localStorage.key(i);
            let li2 = document.createElement("li");
            li2.innerText = localStorage.key(i);
            li2.dataset.name = localStorage.key(i);
            savePageList.appendChild(li);
            loadPageList.appendChild(li2);
        }

    }
    addSaveListLiRemoveXes();
    addLoadListLiRemoveXes();

}

function initSaveAndLoad() {
    let ol = document.createElement("ol");
    let ol2 = document.createElement("ol");
    for (let i = 0; i < window.localStorage.length; i++) {
        let li = document.createElement("li");
        li.innerText = localStorage.key(i);
        li.dataset.name = localStorage.key(i);
        let li2 = document.createElement("li");
        li2.innerText = localStorage.key(i);
        li2.dataset.name = localStorage.key(i);
        ol.appendChild(li);
        ol2.appendChild(li2);
    }
    loadPage.appendChild(ol);
    savePage.appendChild(ol2);
    addToSaveListButton = document.createElement("button");
    addToSaveListButton.innerText = "Add new";
    addToSaveListButton.style.position = "relative";
    addToSaveListButton.style.fontSize = "1em";
    addToSaveListButton.style.padding = "3px 6px";
    addToSaveListButton.style.margin = "10px";
    addToSaveListButton.style.display = "block";
    addToSaveListButton.style.left = "2em";

    addToSaveListButton.style.bottom = "unset";

    savePage.appendChild(addToSaveListButton);

    addToSaveListButton.addEventListener('click', addItemToSaveList);

    savePageList = document.querySelector("#save-page ol");
    loadPageList = document.querySelector("#load-page ol");
    savePageList.addEventListener("click", savePageLiClicked);
    loadPageList.addEventListener("click", loadPageLiClicked);
    addSaveListLiRemoveXes();
    addLoadListLiRemoveXes();

}
initSaveAndLoad();

function addItemToSaveList() {
    let li = document.createElement("li");
    let input = document.createElement("input");
    input.style.fontSize = "1em";
    input.type = "text";
    li.appendChild(input);
    savePageList.appendChild(li);
    addToSaveListButton.style.visibility = "hidden";
    input.addEventListener('click', () => {
        savePageLiClicked(savePageList.lastChild)
    });

}

function addSaveListLiRemoveXes() {
    savePageList.querySelectorAll("li").forEach((elem) => {
        let x = document.createElement("span");
        x.innerText = "X";
        elem.appendChild(x);
        x.addEventListener('click', removeSaveListLi);
    });
}
//xes--
function addLoadListLiRemoveXes() {
    loadPageList.querySelectorAll("li").forEach((elem) => {
        let x = document.createElement("span");
        x.innerText = "X";
        elem.appendChild(x);
        x.addEventListener('click', removeLoadListLi);
    });
}
//itta
function removeLoadListLi(e) {
    if (e.target && e.target.parentNode) {
        if(userid!=null){
            let obj={"userid":userid,"name":e.target.parentNode.dataset.name};
                const response=ajax("ajax/remove_save.php",obj).then((data)=>{
                    feedback(data["message"]);
                    if(data["status"]==200){
                        loadPageList.removeChild(e.target.parentNode);
                    }else{}
                });
        }else{
            localStorage.removeItem(e.target.parentNode.dataset.name);
            loadPageList.removeChild(e.target.parentNode);
        }
       
    }
}

function removeSaveListLi(e) {
    if (e.target && e.target.parentNode) {
        if(userid!=null){
            let obj={"userid":userid,"name":e.target.parentNode.dataset.name};
                const response=ajax("ajax/remove_save.php",obj).then((data)=>{
                    feedback(data["message"]);
                    if(data["status"]==200){
                        savePageList.removeChild(e.target.parentNode);
                    }else{}
                });
        }else{
            localStorage.removeItem(e.target.parentNode.dataset.name);
            savePageList.removeChild(e.target.parentNode);
        }
       
    }
}

function openSavePage() {
    actualizeLists();
    savePage.classList.add("active");
    homePage.classList.add("blur");
    addToSaveListButton.style.visibility = "visible";
}

// Example POST method implementation:
async function ajax(url = '', obj = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}
async function saveGame() {
    homePage.classList.remove("blur");
    if (saveSelect != undefined) {
        savePage.classList.remove("active");
        addToSaveListButton.style.visibility = "hidden";
        input = saveSelect.querySelector("input");
        if (userid != null) {
            const url = 'ajax/save.php';
            let obj={};
            if (input != undefined)
                 obj = {
                    "name": input.value,
                    "mapid":mapid,
                    "userid": userid,
                    "date": Date.now(),
                    "map": matrix
                }
            else {
                 obj = {
                    "name": saveSelect.dataset.name,
                    "mapid":mapid,
                    "userid": userid,
                    "date": Date.now(),
                    "map": matrix
                }   
            }
            const response = ajax(url, obj).then((data) => {
                    feedback(data["message"]);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else if(userid==null) {
            if (input != undefined) {
                localStorage.setItem(input.value, JSON.stringify(matrix));
            } else {
                localStorage.setItem(saveSelect.dataset.name, JSON.stringify(matrix));
            }
            feedback("Game has been saved to local storage");
        }
      

    } else {
        alert("Jeölj ki egy mezőt!");
    }
}
function openLoadPage() {
    actualizeLists();
    loadPage.classList.add("active");
    homePage.classList.add("blur");

}

function loadGame() {
    if (loadSelect != undefined && matrix != null) {
        loadPage.classList.remove("active");
        homePage.classList.remove("blur");

        if(userid!=null){
        let obj={"userid":userid,"name":loadSelect.dataset.name,"mapid":mapid};
        const response= ajax("ajax/load.php",obj).then((data)=>{
            feedback(data["message"]);
            if(data["status"]==200){
            mapid=data["mapid"];
            matrix=data["map"];
            size = matrix.length;
             tableInit(size);
             updateFromMatrix();
             menuClicked();
            }else{

            }
        });}
        else{
            matrix = JSON.parse(localStorage.getItem(loadSelect.dataset.name));
            size = matrix.length;
            tableInit(size);
            updateFromMatrix();
            menuClicked();
        }
        
      

    } else {
        alert("Jeölj ki egy mezőt!");
    }
    loadSelect = undefined;

}
saveSubmitButton.addEventListener("click", saveGame);
loadSubmitButton.addEventListener("click", loadGame);

function loadPageLiClicked(e) {
    if (e.target && e.target.nodeName == "LI") {
        loadPageList.querySelectorAll("li").forEach(element => {
            element.classList.remove("selected")
        });
        e.target.classList.add("selected");
        loadSelect = e.target;
    }
}

function savePageLiClicked(e) {
    if (e.target && e.target.nodeName == "LI") {
        savePageList.querySelectorAll("li").forEach(element => {
            element.classList.remove("selected")
        });
        e.target.classList.add("selected");
        saveSelect = e.target;
    }
    if (e && e.nodeName == "LI") {
        savePageList.querySelectorAll("li").forEach(element => {
            element.classList.remove("selected")
        });
        e.classList.add("selected");
        saveSelect = e;
    }
}

function saveExit() {
    addToSaveListButton.style.visibility = "hidden";
    savePage.classList.remove("active");
    homePage.classList.remove("blur");
}

function loadExit() {
    loadPage.classList.remove("active");
    homePage.classList.remove("blur");

}
//save and load-end
function initLevelselectIndexes() {
    const tableContainers = document.querySelectorAll("#level-select-div>div");
    const indexTables = document.querySelectorAll("#level-select-div table tbody");
    let pixelScale = tableContainers[0].clientWidth / easyMatrix.length;

    for (let i = 0; i < 5; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < 5; j++) {
            let td = document.createElement("td");
            td.dataset.colorNumber = easyMatrix[i][j].num;
            td.style.backgroundColor = gray;
            td.style.height = pixelScale + "px";
            td.style.width = pixelScale + "px";
            if (easyMatrix[i][j].num !== 0) {
                td.innerText = easyMatrix[i][j].num;
                td.style.boxShadow=`inset 0px 0px 15px 10px ${getColorFromInt(easyMatrix[i][j].num)},4px 4px 30px 1px black`;
                td.style.borderSpacing = "0px";
            }
            tr.appendChild(td);
            //hard
        }
        indexTables[0].appendChild(tr);
    }
    pixelScale = (tableContainers[0].clientWidth - mediumMatrix.length) / mediumMatrix.length;
    for (let i = 0; i < 9; i++) {
        let tr = document.createElement("tr");
        let tr2 = document.createElement("tr");

        for (let j = 0; j < 9; j++) {
            let td = document.createElement("td");
            td.dataset.colorNumber = mediumMatrix[i][j].num;
            td.style.backgroundColor = gray;
            td.style.height = pixelScale + "px";
            td.style.width = pixelScale + "px";
            if (mediumMatrix[i][j].num !== 0) {
                td.style.fontSize="1em"
                td.innerText = mediumMatrix[i][j].num;
                td.style.boxShadow=`inset 0px 0px 15px 10px ${getColorFromInt(mediumMatrix[i][j].num)},4px 4px 30px 1px black`;
                td.style.borderSpacing = "0px";
            }
            tr.appendChild(td);

            //hard
            td = document.createElement("td");
            td.dataset.colorNumber = hardMatrix[i][j].num;
            td.style.backgroundColor = gray;
            td.style.height = pixelScale + "px";
            td.style.width = pixelScale + "px";
            if (hardMatrix[i][j].num !== 0) {
                td.style.fontSize="1em"
                td.innerText = hardMatrix[i][j].num;
                td.style.boxShadow=`inset 0px 0px 15px 10px ${getColorFromInt(hardMatrix[i][j].num)},4px 4px 30px 1px black`;
                td.style.borderSpacing = "0px";
            }
            tr2.appendChild(td);
        }
        indexTables[1].appendChild(tr);
        indexTables[2].appendChild(tr2);
    }
}
initLevelselectIndexes();

function tableInit(tableSize) {
    table.innerHTML = "";
    for (let i = 0; i < tableSize; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < tableSize; j++) {
            let td = document.createElement("td");
            td.style.backgroundColor = gray;
            if (matrix[i][j].num !== 0 && matrix[i][j].base) {
                td.innerText = matrix[i][j].num;
                td.style.boxShadow=`inset 0px 0px 15px 10px ${getColorFromInt(matrix[i][j].num)},4px 4px 30px 1px black`;
                td.style.borderSpacing = "0px";
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

}
selectedLevel = mapid;

function levelSelectShow() {
    levelSelectDiv.classList.add("active");
    homePage.classList.add("blur");
    menuButton.classList.add("blur");
}

function mapSelect(lvl) {
    selectedLevel = lvl;
    levelSelectDiv.classList.remove("active");
    setTimeout(() => {
        homePage.classList.remove("blur");
        menuButton.classList.remove("blur");

    }, 200);
    gameInit(true);
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function gameInit(fromselection) {
    if (selectedLevel >= 0 && selectedLevel <= 2 && fromselection) {
        window.location.href = `index.php?mapid=${selectedLevel}&instant=true`;
    }
    else { menuClicked(); }
    matrix = [];
    inputMatrix = matrix_from_php;




    if (selectedLevel == -1||inputMatrix==null) {
        table.innerText = "Sorry, we could not load your game! (wrong mapid)";
        return;
    }
    tmpLine = [];
    for (let i = 0; i < inputMatrix.length; i++) {
        tmpLine = [];
        for (let j = 0; j < inputMatrix.length; j++) {
            tmpLine.push(clone(inputMatrix[i][j]));
        }
        matrix.push(tmpLine);
    }
    table.innerHTML = "";

    size = inputMatrix.length;
    tableInit(size);

}

gameInit(false);
//model_start
let valid=false;
let prevx;
let prevy;
let isUndo = false;
let queue = [];
//model_end
function tableClickEventHandler(e) {
    e.preventDefault();
    if (e.button == 0) {
        valid=true;
        ghostMode = false;
        isUndo = false;
        queue = [];
        let x = e.target.parentNode.rowIndex;
        let y = e.target.cellIndex;
        prevx = x;
        prevy = y;
        if (e.target && e.target.nodeName == "TD") {
            queue.push({ x: x, y: y });
            // List item found!  Output the ID!
            prevcolor = getColorFromInt(matrix[x][y].num)
            prevnumber = matrix[x][y].num;
            e.target.style.backgroundColor = prevcolor;
            startingCell = matrix[x][y];
            matrix[x][y].colored = true;
            if (matrix[x][y].base &&
                !matrix[x][y].protected) {
                window.addEventListener("mouseover", tableMouseOverEventHandler);
            }
        }
    } else if (e.button == 2) {
        tableContextMenuHandler(e);
    }
}
let prev2x;
let prev2y;
let prevTarget;
let ghostCellTarget;

function isGhostModeHandler(e) {
    if (e.target && e.target.nodeName == "TD") {
        if (ghostMode == false) {
            if (ghostCellTarget) { ghostCellTarget.classList.remove("ghostCell"); }
            return false;

        }
        if (ghostMode == true &&
            e.target.parentNode.rowIndex == ghostCell.x &&
            e.target.cellIndex == ghostCell.y) {

            ghostMode = false;
            return false;
        }

        return true;
    }
    return false;

}

function tableMouseOverEventHandler(e) {
    e.preventDefault();
    if (isGhostModeHandler(e)) { return; }

    //kilep az egérrel palyarol
    if (e.target == back) {
        window.removeEventListener("mouseover", tableMouseOverEventHandler);
        removeCellColorsByColorNumber(prevnumber, false);
        return;
    }
    if (e.target && e.target.nodeName == "TD") {

        let x = e.target.parentNode.rowIndex;
        let y = e.target.cellIndex;
        queue.push({ x: x, y: y });
        //atlosan lep a jatekos
        if ((x == prevx + 1 && y === prevy + 1) || (x == prevx - 1 && y === prevy - 1) || (x == prevx + 1 && y === prevy - 1) || (x == prevx - 1 && y === prevy + 1)) {
            if (prevTarget) prevTarget.classList.add("ghostCell");
            ghostCellTarget = prevTarget;
            ghostMode = true;
            ghostCell = queue[queue.length - 2];
            valid=false;
            window.removeEventListener("mouseover", tableMouseOverEventHandler);
            removeCellColorsByColorNumber(prevnumber, false);
            return;
        } else {
            //visszafele mozog a jatekos
            if (matrix[x][y].num == prevnumber && !matrix[x][y].base) {
                let obj = queue[queue.length - 3];
                if (obj !== undefined) {
                    let prevqx = obj.x;
                    let prevqy = obj.y;
                    if (!(matrix[prevqx][prevqy] !== matrix[x][y])) {
                        queue.pop();
                        queue.pop();
                    } else {
                        window.removeEventListener("mouseover", tableMouseOverEventHandler);
                        removeCellColorsByColorNumber(prevnumber, false);
                        return;
                    }
                }
                if (!matrix[prevx][prevy].protected) {
                    matrix[prevx][prevy].num = 0;
                    matrix[prevx][prevy].colored = false;
                }

                updateFromMatrix();
            }

        }
        x = e.target.parentNode.rowIndex;
        y = e.target.cellIndex;
        prevx = x;
        prevy = y;
        matrix[x][y].colored = true;
        //protected mezőre lép
        if (matrix[x][y].protected && !matrix[x][y].base) {
            if (prevTarget) prevTarget.classList.add("ghostCell");
            ghostCellTarget = prevTarget;
            ghostMode = true;
            ghostCell = queue[queue.length - 2];
            valid=false;
            window.removeEventListener("mouseover", tableMouseOverEventHandler);
            removeCellColorsByColorNumber(prevnumber, false);

            return;
        }
        //vagy üres vagy a végpontralép
        if (matrix[x][y].num == 0 || matrix[x][y].num == prevnumber) {
            matrix[x][y].num = prevnumber;
            //ha a kiindulási cellára lép vissza
            if (matrix[x][y] == startingCell) {
                prevcolor = gray;
                window.removeEventListener("mouseover", tableMouseOverEventHandler);
                removeCellColorsByColorNumber(prevnumber, false);

            }
            //ha a végző mezőre lép, akkor az a szín protected lesz.
            if (matrix[x][y].num == prevnumber &&
                startingCell !== matrix[x][y] &&
                matrix[x][y].base) {
                    window.removeEventListener("mouseover", tableMouseOverEventHandler);
                       protectCellsByNumber(prevnumber);
                    
                // prevcolor = gray;
            }
        } else {
            //ha nem üres, vagy nem a jó végpontra lép
            window.removeEventListener("mouseover", tableMouseOverEventHandler);
            removeCellColorsByColorNumber(prevnumber, false);
            // prevcolor = gray;
        }
        //végpontra lép, de nem jóra
        if (matrix[x][y].base && matrix[x][y].num != prevnumber) {
            if (!matrix[x][y].protected)
                matrix[x][y].colored = false;
            removeCellColorsByColorNumber(prevnumber, false);
            window.removeEventListener("mouseover", tableMouseOverEventHandler);
        }
        updateFromMatrix();
        prevTarget = e.target;
    }


}

const response = document.querySelector("#response");
function checkWin() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (!matrix[i][j].protected) {
                return;
            }
        }
    }
    if (userid != null) {
        const url = 'ajax/map_completed.php';
        let obj={"userid":userid,"mapid":mapid};
        const response= ajax(url,obj).then((data)=>{
                feedback(data["message"]);
        })
    }
    //alert("Felhasználó nyert!");
}

function protectCellsByNumber(num) {
    let count = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (matrix[i][j].num == num) {
                matrix[i][j].protected = true;
            }
        }
    }
    checkWin();
}

function removeCellColorsByColorNumber(num, protectedAlso) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (protectedAlso && num == matrix[i][j].num) {
                matrix[i][j].protected = false;
            }
            if ((matrix[i][j].num == num && !matrix[i][j].protected)) {
                table.rows[i].cells[j].style.backgroundColor = gray;
                matrix[i][j].colored = false;
                if (!matrix[i][j].base) {
                    matrix[i][j].num = 0;
                }
            }
        }
    }
    prevcolor = gray;
    prevnumber = -1;
}


function tableRemoveEventsAndCheck(e) {
    let x = e.target.parentNode.rowIndex;
    if (e.target.cellIndex == undefined) {
        removeCellColorsByColorNumber(prevnumber, false);
        prevcolor = gray;
    } else {
        let y = e.target.cellIndex;
        if (!matrix[x][y].base) {
            removeCellColorsByColorNumber(prevnumber, false);
            prevcolor = gray;
        }
    }
    if (prevTarget) { prevTarget.classList.remove("ghostCell"); }
    updateFromMatrix();
    window.removeEventListener("mouseover", tableMouseOverEventHandler);
}

function tableContextMenuHandler(e) {
    e.preventDefault();
    if (e.target && e.target.nodeName == "TD") {
        let x = e.target.parentNode.rowIndex;
        let y = e.target.cellIndex;
        removeCellColorsByColorNumber(matrix[x][y].num, true);
        updateFromMatrix();
    }
}
table.addEventListener("mousedown", tableClickEventHandler);
window.addEventListener("mouseup", tableRemoveEventsAndCheck);
table.oncontextmenu = ((e) => {
    e.preventDefault();
})

function updateFromMatrix() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (matrix[i][j].colored == true)
                table.rows[i].cells[j].style.backgroundColor = getColorFromInt(matrix[i][j].num);
            else {
                //if ()
                table.rows[i].cells[j].style.backgroundColor = gray;
            }
        }
    }

}

function creditPageClicked() {
    homePage.classList.add("slide-right");
    creditPage.classList.add("slide-right");
    onCredits = true;
}
const creditBackButton = document.querySelector("#button-credit-back");

function creditBackButtonClicked() {
    homePage.classList.remove("slide-right");
    creditPage.classList.remove("slide-right");
    onCredits = false;
}
creditBackButton.addEventListener('click', creditBackButtonClicked)
creditPageButton.addEventListener("click", creditPageClicked);

let button_info_back = document.querySelector("#button-info-back");
let infoPage = document.querySelector("#info-page");

function closeInfoPage() {
    homePage.classList.remove("slide-up");
    infoPage.classList.remove("active");
    oninfo = false;
}
button_info_back.addEventListener('click', closeInfoPage);

function openInfoPage() {
    homePage.classList.add("slide-up");
    infoPage.classList.add("active");
    oninfo = true;
}

