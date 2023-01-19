<?php

$_POST_CUSTOM = json_decode(file_get_contents('php://input'), true);
header('Content-Type: application/json');
$response=[
    "status"=>200,
    "message"=>""
];