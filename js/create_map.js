let table = document.querySelector("#background table tbody");
//model
const back = document.querySelector("#background");
let size_input=document.querySelector("#size"); 
let submit=document.querySelector("#create-form [type='submit']");
let map_ok=false;
let prevcolor;
let prevnumber;
let startingCell;
let nums=[];
function getColorFromInt(num) {
    if (num == 0) return backgray;
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

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
let size;
let gray = "#d8d8d8";
let backgray = "#d8d8d8";
//let gray = "#aaaaaa";
let matrix = [
    []
];
size_input.addEventListener("input",gameInit,false);
function tableInit(tableSize) {
   table.innerHTML = "";
    for (let i = 0; i < tableSize; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < tableSize; j++) {
            let td = document.createElement("td");
            td.style.backgroundColor =backgray;
            if (matrix[i][j].num !== 0 && matrix[i][j].base) {
                td.innerText = matrix[i][j].num;
                td.style.borderSpacing = "0px";
                td.style.boxShadow ="inset 0 0 35px "+ getColorFromInt(matrix[i][j].num);
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

}

function gameInit(fromselection) {
nums=[];
    matrix = [];
    tmpLine = [];
    for (let i = 0; i < size_input.value; i++) {
        tmpLine = [];
        for (let j = 0; j < size_input.value; j++) {
            tmpLine.push({base: false,
            colored: false,
            num: 0,
            protected: false});
        }
        matrix.push(tmpLine);
    }
    table.innerHTML = "";

    size =size_input.value;
    tableInit(size);

}

gameInit(false);
//model_start
let valid=false;
let prevx;
let prevy;
let isUndo = false;
let queue = [];
let actnum=1;

let prev2x;
let prev2y;
let prevTarget;
let ghostCellTarget;
let ghostCell;
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
            prevcolor = getColorFromInt(actnum);
            actnum=getUniqNum();
            prevnumber =actnum;
            if (!matrix[x][y].base &&
                !matrix[x][y].protected) {
            e.target.style.backgroundColor = prevcolor;
            startingCell = matrix[x][y];
            matrix[x][y].colored = true;
            matrix[x][y].num=actnum;
            matrix[x][y].base=true;
            updateFromMatrix();
                window.addEventListener("mouseover", tableMouseOverEventHandler);
            }
        }
    } else if (e.button == 2) {
        tableContextMenuHandler(e);
    }
}


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
    //ok
    if (e.target && e.target.nodeName == "TD") {

        let x = e.target.parentNode.rowIndex;
        let y = e.target.cellIndex;
        queue.push({ x: x, y: y });
        //atlosan lep a jatekos
        if ((x == prevx + 1 && y === prevy + 1) || 
        (x == prevx - 1 && y === prevy - 1) ||
         (x == prevx + 1 && y === prevy - 1) ||
          (x == prevx - 1 && y === prevy + 1)
          || (matrix[x][y].num == prevnumber && !matrix[x][y].base)) {
            if (prevTarget) prevTarget.classList.add("ghostCell");
            ghostCellTarget = prevTarget;
            ghostMode = true;
            ghostCell = queue[queue.length - 2];
            valid=false;
            window.removeEventListener("mouseover", tableMouseOverEventHandler);
            removeCellColorsByColorNumber(prevnumber, false);
            return;
        } 
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
                    matrix[prevx][prevy].num = 0;
                    matrix[prevx][prevy].colored = false;
                }
                 
                

                updateFromMatrix();
            }

        
        //ok
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
        }//ok
        //vagy üres vagy a végpontralép
        if (matrix[x][y].num == 0) {
            matrix[x][y].num = prevnumber;
            //ha a kiindulási cellára lép vissza
            if (matrix[x][y] == startingCell) {
                prevcolor = gray;
                window.removeEventListener("mouseover", tableMouseOverEventHandler);
                removeCellColorsByColorNumber(prevnumber, false);

            }
            //ha a végző mezőre lép, akkor az a szín protected lesz.
            if (startingCell !== matrix[x][y]) {
                    //window.removeEventListener("mouseover", tableMouseOverEventHandler);
                  //  matrix[x][y].protected=true;                    
                 prevcolor = gray;
            }
        } else {
            //ha nem üres, vagy nem a jó végpontra lép
            window.removeEventListener("mouseover", tableMouseOverEventHandler);
            removeCellColorsByColorNumber(prevnumber, false);
             prevcolor = gray;
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
    map_ok=true;
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
            if (num == matrix[i][j].num) {
                if(protectedAlso){
                    matrix[i][j].protected = false;
                    table.rows[i].cells[j].style.backgroundColor = gray;
                    matrix[i][j].colored = false;
                   matrix[i][j].base=false;
                    matrix[i][j].num = 0;
                    table.rows[i].cells[j].innerHTML="";
                }else{
                    if(!matrix[i][j].protected){
                         table.rows[i].cells[j].style.backgroundColor = gray;
                    matrix[i][j].colored = false;
                   matrix[i][j].base=false;
                    matrix[i][j].num = 0;
                    table.rows[i].cells[j].innerHTML="";
                    }
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
        if (matrix[x][y].base) {
            removeCellColorsByColorNumber(prevnumber, false);
            prevcolor = gray;
        }else if( matrix[x][y].num==actnum){
            matrix[x][y].base=true;
            protectCellsByNumber(actnum);
            if(!nums.includes(actnum)) nums.push(actnum);
            actnum=getUniqNum();
        }
    }
    if (prevTarget) { prevTarget.classList.remove("ghostCell"); }
    updateFromMatrix();
    window.removeEventListener("mouseover", tableMouseOverEventHandler);
}
function getUniqNum(){

    for (let i = 1; i < 100; i++) {
            if(!nums.includes(i)){
                return i;
            }
    } 
    return 0;
}
function tableContextMenuHandler(e) {
    e.preventDefault();
    if (e.target && e.target.nodeName == "TD") {
        let x = e.target.parentNode.rowIndex;
        let y = e.target.cellIndex;
        if(matrix[x][y].protected){
            map_ok=false;
            nums.remove(matrix[x][y].num);
            removeCellColorsByColorNumber(matrix[x][y].num, true);
            updateFromMatrix();
        }
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
        
            if (matrix[i][j].colored == true){
                table.rows[i].cells[j].style.backgroundColor = getColorFromInt(matrix[i][j].num);
            if(matrix[i][j].base)
                table.rows[i].cells[j].innerHTML=matrix[i][j].num;
            }
        }
    }

}

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
let name=document.querySelector("#create-form #name");
let diff=document.querySelector("#create-form #diff");
let isize=document.querySelector("#create-form #size");

async function sendMap(){
    if (userid != null && map_ok) {
        const url = 'create_map.php';
        var obj={
                "userid":userid,
                "name":name.value,
                "diff":diff.value,
                "size":isize.value,
                "map":unsolvedMap()
        };
        const response= await ajax(url,obj).then((data)=>{
            feedback(data["message"]);
        });
    }
}
submit.addEventListener('click',sendMap);

/*function feedback(msg){
    response_div.innerHTML =msg;
                    response_div.classList.add("hidden");
                    setTimeout(() => {
                        response_div.classList.remove("hidden");
                        response_div.innerHTML = "";
                        response_div.style.visibility = "visible";
                    }, 4000);
}*/
function unsolvedMap(){
    let tmp=clone(matrix);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if(!tmp[i][j].base){tmp[i][j].num=0;}
            tmp[i][j].colored=false;
            tmp[i][j].protected=false;
        }
    }
    return tmp;
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
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