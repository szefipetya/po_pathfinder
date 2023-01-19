<!doctype html>

<head>
    <meta charset="utf-8">
    <title>Pathfinder</title>
    <link rel="stylesheet" href="style.css">

</head>

<body>
    <?php if (isset($_SESSION["user"])): ?>
    <div id="welcome">
        <strong>Welcome <?php echo $_SESSION["user"]["fullname"]; ?></strong>
    </div>
    <?php endif;?>

    <?php if (isset($_SESSION["user"])): ?>
    <div id="toolbox">
        <strong><a href="list_maps.php"> <button id="listmaps">View Maps</button></a></strong>
     <?php if($_SESSION["user"]["email"]=="admin@admin.hu"):?>
        <strong><a href="create_map.php"> <button id="createmap">Create Map</button></a></strong>
     <?php endif;?>
    </div>
        <?php endif;?>
    <nav>
    <?php if (isset($_SESSION["user"])): ?>
        <button id="toolbox-toggle">Tools</button>
        <?php endif;?>
        <?php if(basename($_SERVER['PHP_SELF'])=="index.php"): ?>
        <strong><a> <button id="menu">Menu</button></a></strong>
        <?php else:?>
        <strong><a href="index.php?mapid=<?php if(isset($_SESSION["user"]["mapid"]))
        {echo$_SESSION["user"]["mapid"]; }else{echo "0";}?>"> 
            <button id="menu">Menu</button>
            </a>
        </strong>

        <?php endif;?>
        <?php if (authorize("writer")): ?>
        <strong><a href="addarticle.php">Add new map</a></strong>
        <?php endif; ?>

        <?php if (isset($_SESSION["user"])): ?>
        <strong>
            <a href="logout.php">
                Log out (<?= $_SESSION["user"]["fullname"] ?>)
            </a>
        </strong>
        <?php else: ?>
        <strong><a href="login.php">Log in</a></strong>
        <strong><a href="signup.php">Sign up</a></strong>
        <?php endif; ?>

        <div id="logo">
            <img src="./images/logo.png" alt="logo">
        </div>

    </nav>