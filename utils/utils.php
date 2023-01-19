<?php

function array_check_all_keys($arr, $keys) {
  foreach ($keys as $key) {
    if (!isset($arr[$key])) {
      return FALSE;
    }
  }
  return TRUE;
}

function verify_get(...$required_keys) {
  return array_check_all_keys($_GET, $required_keys);
}

function verify_post(...$required_keys) {
  return array_check_all_keys($_POST, $required_keys);
}

function redirect($page) {
  header("Location:" . $page);
  exit();
}

function is_logged_in() {
  return isset($_SESSION["user"]);
}

function authorize(...$ranks) {
  if (!is_logged_in()) {
    return false;
  }

  return in_array($_SESSION["user"]["rank"], $ranks);
}

function authorize_page(...$ranks) {
  if (!authorize(...$ranks)) {
    redirect("index.php");
  }
}







