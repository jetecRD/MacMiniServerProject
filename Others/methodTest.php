<?php
/**
 * Created by PhpStorm.
 * User: jetec-rd
 * Date: 2018/9/3
 * Time: 下午3:54
 */
define('FOLDER', '');
if (isset($_POST['a1'])) {
    $a1 = $_POST['a1'];
} else {
    $a1 = "nill\n";
}

if (isset($_GET['a2'])) {
    $a2 = $_GET['a2'];
} else {
    $a2 = "nill\n";
}
$methods = $_SERVER['REQUEST_METHOD'];
echo $methods . "\n";
echo FOLDER . "\n";
echo "{$a1} : {$a2}\n";