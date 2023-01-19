<?php
require_once("../utils/_init.php");

require_once("../utils/_init_custom_post.php");
$save_header_storage = new JSONStorage("${root_dir}/storage/save_headers.json");

$response=[
    "status"=>200,
    "message"=>""
];

$response["status"]=http_response_code(500);
$response["message"]="Game is not found on the server!";

if(isset($_POST_CUSTOM["userid"])&&
isset($_POST_CUSTOM["name"])){
   
$arr=$save_header_storage->query(function($e) use ($_POST_CUSTOM){
    return $e["userid"] == $_POST_CUSTOM["userid"];
});

$exists=FALSE;
foreach($arr as $val){
    if($val["name"]==$_POST_CUSTOM["name"]){
        $exists=TRUE;
        break;
    }
}
$save_storage = new JSONStorage("${root_dir}/storage/saves.json");

if($exists){
    $response_ok=FALSE;
        $save_storage->order();
        $saves=$save_storage->findAll();

        for ($i = 0; $i <= count($saves); $i++) {
            if(isset($saves[$i]["userid"])&&isset($saves[$i]["name"])){
                
                
                if($saves[$i]["userid"]==$_POST_CUSTOM["userid"]&&
                $saves[$i]["name"]==$_POST_CUSTOM["name"]){
                    $save_storage->delete($i);
                    $response["status"]=http_response_code(200);
                    $response["message"]="Game save succesfully removed from the server!";
                }
            }
        }
        $save_header_storage->order();
        $save_headers=$save_header_storage->findAll();

        for ($i = 0; $i <= count($save_headers); $i++) {
            
            if(isset($save_headers[$i]["userid"])&&isset($save_headers[$i]["name"]))
               {
            if($save_headers[$i]["userid"]==$_POST_CUSTOM["userid"]&&
            $save_headers[$i]["name"]==$_POST_CUSTOM["name"]){
                $save_header_storage->delete($i);
                $response["status"]=http_response_code(200);
                $response["message"]="Game save succesfully removed from the server!";
            }
          }
        }


       
        
}else{
    $response["status"]=http_response_code(403);
    $response["message"]="Sorry, your game save could not be removed from the server!";
}

$save_storage->save();
$save_header_storage->save();    
echo json_encode($response);
}
?>