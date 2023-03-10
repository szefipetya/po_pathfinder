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
                Ezt a megold??st Szeifert Peter k??ldte be ??s k??sz??tette a Webprogramozas kurzus PHP beadand?? feladat??hoz. Kijelentem, hogy ez a megold??s a saj??t munk??m. Nem m??soltam vagy haszn??ltam harmadik f??lt??l sz??rmaz?? megold??sokat. Nem tov??bb??tottam megold??st hallgat??t??rsaimnak,
                ??s nem is tettem k??zz??. Az E??tv??s Lor??nd Tudom??nyegyetem Hallgat??i K??vetelm??nyrendszere (ELTE szervezeti ??s m??k??d??si szab??lyzata, II. K??tet, 74/C. ??) kimondja, hogy mindaddig, am??g egy hallgat?? egy m??sik hallgat?? munk??j??t - vagy legal??bbis
                annak jelent??s r??sz??t - saj??t munk??jak??nt mutatja be, az fegyelmi v??ts??gnek sz??m??t. A fegyelmi v??ts??g legs??lyosabb k??vetkezm??nye a hallgat?? elbocs??t??sa az egyetemr??l.
            </p>
        </div>
        <button id="button-credit-back">Go Back</button>
    </div>
    <div id="info-page">
        <div class="content">
            <p>
                <ul>
                <li>                Ez egy olyan game, ahol azonos sz??mok k??z??tt v??gig kell menni az eg??rrel. 
</li>
                <li>                Ek??zben a kis sz??r??s mitugr??sz v??ltozatos sz??n?? fest??kekkel befesti az utat maga alatt.
</li>
                <li>                Ha m??g van sz??z padl?? r??szlet, akkor azon az egeret ??gy kell ??trugdosni, hogy ek??zben ne kenje ??ssze mag??t temper??val.
</li>
                <li>                Ha ??tl??san vagy m??r sz??nes padl??burkolatra l??psz, 
</li>
                <li>                akkor az eg??r h??ts?? zseb??b??l el??b??jik egy nagynyom??s?? slag, amely Hig??t??val m??k??dik ??s exclude-olja a fest??kanyagot.
</li>
                <li>                Ilyenkor csak az eg??r has??n tal??lhat?? sz??n??rnyalatot szedi fel h??la az ??gnek.
</li>
                <li>                Ha az eg??sz p??lya m??r a sziv??rv??ny minden sz??n??ben pomp??zik, akkor lehet, hogy k??szen vagy, Nice!
</li>
                </ul>
            </p>
        </div>
        <button id="button-info-back">Go Back</button>
    </div>


    <?php require_once("partials/footer.php"); ?>

    <script type="text/javascript " src="js/index.js "></script>
