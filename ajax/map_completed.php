<?php


require_once("../utils/_init.php");
require_once("../utils/_init_custom_post.php");

$users=$user_storage->findAll();
$data = [
    "message"=>"Error: Map not found! ",
    "userid"=>$_POST_CUSTOM['userid'],
    "mapid"=>$_POST_CUSTOM['mapid'],
    "status"=>http_response_code(200)

];
if(isset($_POST_CUSTOM["userid"])&&
isset($_POST_CUSTOM["mapid"]))
{
    $record=$user_storage->find_by_attribute("id",$_POST_CUSTOM['userid']);
        if(!in_array($_POST_CUSTOM["mapid"],$record["solved_maps"])){
            $record['solved_maps'][]=$_POST_CUSTOM['mapid']; 
            $user_storage->update($_POST_CUSTOM['userid'], $record);
            $user_storage->save(); 
            $record_map=$map_storage->find_by_attribute("id",$_POST_CUSTOM['mapid']);
    $record_map["solved_times"]++;
    $map_storage->update_by_attribute("id",$_POST_CUSTOM['mapid'], $record_map);
    $data["message"] = "Success:completition has been updated on the server";
        }else{
            $data["message"]="Note: You have already completed this map";
        }
   
    $map_storage->save();

  
}
else{

    $data["message"]="completition could not be updated (wrong Parameters)";
    $data["status"]=http_response_code(500);
}

echo json_encode($data);
