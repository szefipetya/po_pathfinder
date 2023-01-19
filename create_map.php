<?php
require_once("utils/_init.php");
authorize_page("admin");

?>

<?php
$maps = $map_storage->findAll();

$userid_set=isset($_SESSION["user"]["id"]);

$userid_set_str=isset($_SESSION["user"]["id"])? 'true' : 'false';
$_POST_CUSTOM = json_decode(file_get_contents('php://input'), true);
$post=false;
if(isset($_POST_CUSTOM["userid"])&&
isset($_POST_CUSTOM["name"])&&
isset($_POST_CUSTOM["diff"])&&
isset($_POST_CUSTOM["map"])
){
  header('Content-Type: application/json');
  if(strlen($_POST_CUSTOM["name"])==0){
    $response=[
      "message"=>"Error: Please, provide a name with a positive length!",
      "status"=>http_response_code(200)
    ];
    echo json_encode($response);
    exit();
  }
  $post=true;
$new=[
  "id"=> uniqid(),
        "distributor"=> $user_storage->find_by_attribute("id",$_POST_CUSTOM["userid"])["fullname"],
        "name"=> $_POST_CUSTOM["name"],
        "difficulty"=> $_POST_CUSTOM["diff"],
        "solved_times"=> 0,
        "map"=> $_POST_CUSTOM["map"]
];
$map_storage->add($new);
$response=[
  "message"=>"Map has been succesfully saved on the server!",
  "status"=>http_response_code(200)
];
echo json_encode($response);
exit("");
}else{


$post=false;
require_once("partials/header.php");

}
?>
<?php if(!$post): ?>
  
<script type="text/javascript">


var instant=false;    
        var userid=<?php if(isset($_SESSION["user"]["id"])) echo "\"".$_SESSION["user"]["id"]."\""; else echo "null";?>;
    
</script>






<div id="create-form" >
<fieldset>
  Name: <br>
  <input type="text" name="name" id="name">
</fieldset>
<fieldset>
    Difficulty:<br>
  <input type="number" id="diff" name="diff"  min="1" max="4" value="1">

</fieldset>
<fieldset>
  <label for="size">Enter table size</label><br>
  <input type="number" id="size" name="size" min="3" max="25" value="5">
</fieldset>
  <button type="submit">Save</button>
</div>




<div id="background" class="bg-create">
        <table>
            <tbody>
              <tr>
                <td>
                  Betöltés...
                </td>
              </tr>
            </tbody>
        </table>
    </div>

<?php require_once("partials/footer.php"); ?>

<script src="js/create_map.js"></script>
<?php endif; ?>
