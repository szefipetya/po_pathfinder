    <?php foreach ($errors as $error): ?>
      <div><?= $error ?></div>
    <?php endforeach; ?>
    <div id="response"></div>
    <script src="js/feedback.js"></script>
    <?php if(isset($_GET["message"])): ?>
      <script>
       var msgin=`<?=$_GET["message"] ?>`;
          feedback(`<?=$_GET["message"] ?>`);
      </script>
    <?php endif; ?>
    <script type="text/javascript " src="js/toolbox.js "></script>
</body>