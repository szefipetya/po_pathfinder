<?php
require_once("../utils/_init.php");
$save_header_storage = new JSONStorage("${root_dir}/storage/save_headers.json");

$_POST_CUSTOM = json_decode(file_get_contents('php://input'), true);
$headers=$save_header_storage->findAll();
$response=Array();
if(isset($_POST_CUSTOM["userid"])){
    header('Content-Type: application/json');
foreach($headers as $h){
    if($h["userid"]==$_POST_CUSTOM["userid"]){
        $response[]=$h;
    }
}
    echo json_encode($response);
}

?>
