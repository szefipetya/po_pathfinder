<?php
require_once("utils/_init.php");
require_once("utils/utils.php");
require_once("utils/storage.php");
$maps = $map_storage->findAll();
require_once("partials/header.php");

$instant_set=isset($_GET["instant"]);
$userid_set=isset($_SESSION["user"]["id"]);
$mapid_set=isset($_GET["mapid"]);

$instant_set_str=isset($_GET["instant"])? 'true' : 'false';
$userid_set_str=isset($_SESSION["user"]["id"])? 'true' : 'false';
$mapid_set_str=isset($_GET["mapid"])? 'true' : 'false';

if(verify_get("mapid")){
    $mapid=$_GET["mapid"];
}else{$mapid="0";}

?>

<script type="text/javascript">


var instant=false;
let mapid="<?php if($mapid_set){echo $_GET["mapid"];   }else echo "0";?>";
    if(mapid==""||mapid<0){
        mapid=-1;
    }
 
    if(<?=$instant_set_str?>){
       instant=<?php if($instant_set) echo $_GET["instant"];
       else echo "false";?>;
         }
    
        var matrix_from_php=JSON.parse('<?php echo json_encode($map_storage->find_by_id($mapid)["map"]);?>');
        var userid=<?php if(isset($_SESSION["user"]["id"])) echo "\"".$_SESSION["user"]["id"]."\""; else echo "null";?>;
       //  var mapid=<?= $mapid?>;
    
</script>
    <div id="level-select-div">
        <div id="easy" onclick="mapSelect(0)">
            <table>
                <tbody>
                </tbody>
            </table>
            <div class="text">easy</div>
        </div>
        <div id="medium" onclick="mapSelect(1)">
            <table>
                <tbody>

                </tbody>
            </table>
            <div class="text">medium</div>
        </div>
        <div id="hard" onclick="mapSelect(2)">
            <table>
                <tbody>

                </tbody>
            </table>
            <div class="text">hard</div>
        </div>
    </div>
    <div id="save-page">
        <span id="save-exit" onclick="saveExit()">X</span>
        <button id="save-submit-button">save</button>
    </div>
    <div id="load-page">
        <span id="load-exit" onclick="loadExit()">X</span>
        <button id="load-submit-button">load</button>
    </div>

    <div id="home-page" class="active">
        <div id="gamenav">
            <button id="newGame" onclick="gameInit()">New Game</button>
            <button id="level-select-button" onclick="levelSelectShow()">Level Selection</button>
            <button id="save" onclick="openSavePage()">Save</button>
            <button id="load" onclick="openLoadPage()">Load</button>
            <button id="info" onclick="openInfoPage()">Info</button>
            <button id="credit">Credit</button>
        </div>
    </div>

    <div id="background" class="dark">
        <table>
            <tbody>
            </tbody>
        </table>
    </div>
    <div id="credit-page">
        <div class="content">
            <p>Keszitette :&nbsp;Szeifert Peter</p>
            <p>Neptun :&nbsp;H9PBCL</p>
            <p>Feladat :&nbsp;Webprogramozas - PHP/javascript beadando </p>
            <p>Datum :&nbsp;2019.11.05</p>
            <p>
                Ezt a megoldást Szeifert Peter küldte be és készítette a Webprogramozas kurzus PHP beadandó feladatához. Kijelentem, hogy ez a megoldás a saját munkám. Nem másoltam vagy használtam harmadik féltől származó megoldásokat. Nem továbbítottam megoldást hallgatótársaimnak,
                és nem is tettem közzé. Az Eötvös Loránd Tudományegyetem Hallgatói Követelményrendszere (ELTE szervezeti és működési szabályzata, II. Kötet, 74/C. §) kimondja, hogy mindaddig, amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis
                annak jelentős részét - saját munkájaként mutatja be, az fegyelmi vétségnek számít. A fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.
            </p>
        </div>
        <button id="button-credit-back">Go Back</button>
    </div>
    <div id="info-page">
        <div class="content">
            <p>
                <ul>
                <li>                Ez egy olyan game, ahol azonos számok között végig kell menni az egérrel. 
</li>
                <li>                Eközben a kis szőrös mitugrász változatos színű festékekkel befesti az utat maga alatt.
</li>
                <li>                Ha még van szűz padló részlet, akkor azon az egeret úgy kell átrugdosni, hogy eközben ne kenje össze magát temperával.
</li>
                <li>                Ha átlósan vagy már színes padlóburkolatra lépsz, 
</li>
                <li>                akkor az egér hátsó zsebéből előbújik egy nagynyomású slag, amely Higítóval működik és exclude-olja a festékanyagot.
</li>
                <li>                Ilyenkor csak az egér hasán található színárnyalatot szedi fel hála az égnek.
</li>
                <li>                Ha az egész pálya már a szivárvány minden színében pompázik, akkor lehet, hogy készen vagy, Nice!
</li>
                </ul>
            </p>
        </div>
        <button id="button-info-back">Go Back</button>
    </div>


    <?php require_once("partials/footer.php"); ?>

    <script type="text/javascript " src="js/index.js "></script>
