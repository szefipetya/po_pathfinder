<?php
require_once("utils/_init.php");
$maps = $map_storage->findAll();
?>
<?php require_once("partials/header.php");
authorize_page("member","admin");
?>

<h1>Maps made by the community</h1>
<script>
let map_json;
</script>
<?php foreach ($maps as $id => $map) : ?>
  <article data-mapid="<?=$map["id"]?>">
    <h1>
      <a href="index.php?mapid=<?= $map["id"] ?>&instant=true">
        <?= $map["name"] ?>
      </a>
    </h1>
  <h4>
    Difficulty: <?=$map["difficulty"]?>
  </h4>
    <p> 
       Distributor: 
    <?= $map["distributor"] ?>
    </p>
    <small>
      Solved by <?= $map["solved_times"] ?> people.
    </small>
    <p><?php 
      if(in_array($map["id"],$user_storage->find_by_attribute("id", $_SESSION["user"]["id"])["solved_maps"])){
        echo "You solved this";
      }
      else echo "You didn't solve this yet";
    ?></p>
    <?php if($_SESSION["user"]["rank"]=="admin"): ?>
      <a href="ajax/delete_map.php?mapid=<?= $map["id"] ?>&pw=<?=$_SESSION["user"]["id"]?>">
      <button>Delete</button>
    </a>    <?php endif;?>
</article>
  <hr>
<?php endforeach; ?>

<?php require_once("partials/footer.php"); ?>