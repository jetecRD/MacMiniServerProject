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
    if (!isset($_POST['BookingResult'])) {echo "Missing Parameter";die(201);};
    $data = $_POST['BookingResult'];
//    $string = json_encode($data, true);
    echo $data;

}



// TODO: getFunction
function getFunction() {
    echo "PHP is Working.";
}