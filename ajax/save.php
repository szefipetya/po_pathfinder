<?php
require_once("../utils/_init.php");
require_once("../utils/_init_custom_post.php");

$save_header_storage = new JSONStorage("${root_dir}/storage/save_headers.json");
if(isset($_POST_CUSTOM["map"])&&
isset($_POST_CUSTOM["userid"])&&
isset($_POST_CUSTOM["name"])&&
isset($_POST_CUSTOM["date"])&&
isset($_POST_CUSTOM["mapid"])

){
    $url = 'get_save_headers.php';
$data = [
    "userid"=>$_POST_CUSTOM["userid"]
];

$arr=$save_header_storage->query(function($e) use ($_POST_CUSTOM){
    return $e["userid"] == $_POST_CUSTOM["userid"];
});

$exists=FALSE;

$response=["message"=>"Failed to save the Game on the server!",
"mapid"=>$_POST_CUSTOM["mapid"]
];

foreach($arr as $val){
    if($val["name"]==$_POST_CUSTOM["name"]){
        $exists=TRUE;
        break;
    }
}


$save_storage = new JSONStorage("${root_dir}/storage/saves.json");
   // var_dump($_POST_CUSTOM["map"]);
    $new=[
        "id"=>uniqid(),
        "name"=>$_POST_CUSTOM["name"],
        "userid"=>$_POST_CUSTOM["userid"],
        "mapid"=>$_POST_CUSTOM["mapid"],
        "date"=>$_POST_CUSTOM["date"],
        "map"=>$_POST_CUSTOM["map"]
    ];

    $new_header=[
        "id"=>uniqid(),
        "name"=>$_POST_CUSTOM["name"],
        "userid"=>$_POST_CUSTOM["userid"],
        "mapid"=>$_POST_CUSTOM["mapid"],
        "date"=>$_POST_CUSTOM["date"]
    ];
    if($exists){
        $save_storage->order();
        $saves=$save_storage->findAll();
        for ($i = 0; $i < count($saves); $i++) {
            if($saves[$i]["userid"]==$_POST_CUSTOM["userid"]&&
            $saves[$i]["name"]==$_POST_CUSTOM["name"]){
                $save_storage->update($i,$new);
                $response["message"]="Game has been succesfully updated on the server";
            }
        }
        
        $save_header_storage->order();
        $save_headers=$save_header_storage->findAll();
        for ($i = 0; $i < count($save_headers); $i++) {
            if($save_headers[$i]["userid"]==$_POST_CUSTOM["userid"]&&
            $save_headers[$i]["name"]==$_POST_CUSTOM["name"]){
                $save_header_storage->update($i,$new_header);
                $response["message"]="Game has been succesfully updated on the server";

            }
        }

    }else{
    $save_storage->add($new);
    $save_header_storage->add($new_header);
    $response["message"]="Game has been succesfully saved on the server";
}
    
    
    $save_storage->save();
    $save_header_storage->save();    
    echo json_encode($response);
}
?>