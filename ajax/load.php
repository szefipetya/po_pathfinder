<?php
require_once("../utils/_init.php");
require_once("../utils/_init_custom_post.php");

$save_header_storage = new JSONStorage("${root_dir}/storage/save_headers.json");
$saves_storage = new JSONStorage("${root_dir}/storage/saves.json");
$saves=$saves_storage->findAll();
$response=[
    "status"=>200,
    "message"=>"",
    "mapid"=>"",
    "map"=>[]
];
if(isset($_POST_CUSTOM["userid"])&&
isset($_POST_CUSTOM["name"])&&
isset($_POST_CUSTOM["mapid"])
){
    foreach($saves as $s){
        if($s["userid"]==$_POST_CUSTOM["userid"]&&
       $s["name"]==$_POST_CUSTOM["name"]){
           $response["status"]=http_response_code(200);
        $response["message"]="Game succesfully loaded from the server!";
        $response["map"]=$s["map"];
        $response["mapid"]=$s["mapid"];
       }
    }
}else{
    $response["status"]=http_response_code(403);
    $response["message"]="Sorry, your save could not loaded from the server!";
}
echo json_encode($response);
