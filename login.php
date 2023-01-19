<?php
require_once("utils/_init.php");

if (verify_post("email", "password")) {
  // ! előfeldogozás
  $email = trim($_POST["email"]);
  $password = $_POST["password"];

  // ! hibaellenőrzés (authentication)
  $users = $user_storage->query(function ($user) use ($email, $password) {
    return $user["email"] === $email && password_verify($password, $user["password"]);
  });

  $user = array_shift($users);

  if ($user === NULL) {
    // ! hiba
    $errors[] = "Invalid username or password";
  }

  // ! feldolgozás
  if (empty($errors)) {
    // ! bejelentkeztetjük a felhasználót
    $_SESSION["user"] = $user;
    $_SESSION["user"]["mapid"]=0;
    $_SESSION["user"]["id"]=$user["id"];
    $_SESSION["user"]["email"]=$user["email"];
    $_SESSION["user"]["rank"]=$user["rank"];
    redirect("list_maps.php");
  }
}
?>

<?php require_once("partials/header.php"); ?>

<form id="form-center" action="login.php" method="post">
  <!-- label+input:email+label+input:password+button:submit -->
  <label for="email">E-mail</label><br>
  <input type="email" name="email" id="email"><p style="color:crimson ;" id="emailerrors"></p><br><br>
  <label for="password">Password</label><br>
  <input type="password" name="password" id="password"><br><p style="color:crimson ;" id="pwerrors"></p><br><br>
  <button type="submit" id="submit">Log in</button>
</form>
<script src="js/validate_form.js"></script>
<?php require_once("partials/footer.php"); ?>