<?php
require_once("utils/_init.php");

if (verify_post("email", "password", "fullname")) {
  // ! előfeldogozás
  $email = trim($_POST["email"]);
  $password = $_POST["password"];
  $fullname = trim($_POST["fullname"]);

  // ! hibaellenőrzés (authentication)
  $users = $user_storage->query(function ($user) use ($email) {
    return $user["email"] === $email;
  });

  if (!empty($users)) {
    // ! hiba
    $errors[] = "E-mail already registered";
  }

  if (strlen($password) < 4) {
    $errors[] = "Password too short";
  }

  if ($fullname === "") {
    $errors[] = "You must provide your full name";
  }

  // ! feldolgozás
  $count=count($user_storage->findAll());
  if (empty($errors)) {
    $user = [
      "id"=>count($user_storage->findAll()),
      "email" => $email,
      "password" => password_hash($password, PASSWORD_DEFAULT),
      "fullname" => $fullname,
      "rank" => "member",
      "solved_maps"=> []

    ];
    $user_storage->add($user);

    // ! létrehozom a usert az adatbázisban
    redirect("login.php");
  }
}
?>

<?php require_once("partials/header.php"); ?>

<form id="form-center" action="signup.php" method="post">
  <label for="email">E-mail</label><br>
  <input type="email" name="email" id="email" placeholder="example@email.com"><p style="color:crimson ;" id="emailerrors"></p><br>
  <label for="password">Password</label><br>
  <input type="password" name="password" id="password"><br><p style="color:crimson ;" id="pwerrors"></p><br>
  <label for="fullname">Full name</label><br>
  <input type="text" name="fullname" id="fullname"><br><p style="color:crimson ;" id="nameerrors"></p><br>
  <button type="submit" id="submit">Sign up</button>
</form>



<?php require_once("partials/footer.php"); ?>
<script src="js/validate_form.js"></script>