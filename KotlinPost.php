<?php
/**
 * Created by PhpStorm.
 * User: jetec-rd
 * Date: 2018/10/25
 * Time: 1:09 PM
 */

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        postFunction();
        break;
    case  "GET":
        getFunction();
        break;
    default:
        break;
}


// TODO: postFunction
function postFunction() {
    if (!isset($_POST['account']) | !isset($_POST['password'])) {echo "Missing Parameter";die(201);};
    $acc = $_POST['account'];
    $pwd = $_POST['password'];
    $dataArray = ["account" => $acc, "password" => $pwd];
    $string = json_encode($dataArray, true);
    echo $string;

}



// TODO: getFunction
function getFunction() {
    echo "PHP is Working.";
}