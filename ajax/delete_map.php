<?php 

require_once("../utils/_init.php");

$maps=$map_storage->findAll();
$plus="forreal";
if(isset($_GET["mapid"])){
    $map_storage->order();
   if($map_storage->delete_by_attribute("id",$_GET["mapid"])){
    $map_storage->order();
       $map_storage->save();


       $user_storage->order();
       $users=$user_storage->findAll();
      for($k=0;$k<count($users);$k++){
        $record=$users[$k];
          if(in_array($_GET["mapid"],$record["solved_maps"])){
              array_values($users[$k]["solved_maps"]);
              array_values($record["solved_maps"]);
              $plus.=$k;
              if(is_array($users[$k]["solved_maps"])){
                  $plus.="array";
              }
              array_values($users[$k]["solved_maps"]);
              array_values($record["solved_maps"]);

              for ($i=0;$i<count($users[$k]["solved_maps"])+50;$i++){
                  if(isset($users[$k]["solved_maps"][$i])){
                    if($users[$k]["solved_maps"][$i]==$_GET["mapid"]){
                        $plus.= implode("|", $users[$k]["solved_maps"]);

                        unset($record["solved_maps"][$i]);
                        unset($users[$k]["solved_maps"][$i]);

                        array_values($users[$k]["solved_maps"]);
                        array_values($record["solved_maps"]);
                        $user_storage->update($k,$record);
                        array_values($users[$k]["solved_maps"]);

                    break;
                        $plus.= "after ".implode("|", $record["solved_maps"]);
                    }
                }
              }
          }
      }
      $user_storage->save();
       $response["message"]="Map has been succesfully deleted from the server!";
       $response["status"]=http_response_code(200);
   }else{
    $map_storage->order();
    $response["message"]="The specified Map doesn't exist on the server";
    $response["status"]=http_response_code(500);
   }

}else{
    $response["message"]="Wrong request format!";
    $response["status"]=http_response_code(403);
}
redirect('../list_maps.php?message='.$response["message"].'&status='.$response["status"]);
//echo json_encode($response);
