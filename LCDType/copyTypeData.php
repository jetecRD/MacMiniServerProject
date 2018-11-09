<?php
/**
 * Created by PhpStorm.
 * User: jetec-rd
 * Date: 2018/9/27
 * Time: 下午5:56
 */

define("FILENAME", "LCDTypeJson.json");
define("FOLDER", "./tmpFile/");
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    if (isset($_POST['section'])
        && isset($_POST['targetSection'])) {
        $section = $_POST['section'];
        $targetSection = $_POST['targetSection'];
        $fileName = FOLDER . FILENAME;

        if (file_exists($fileName)) {
            $fileString = file_get_contents($fileName);
            $fileData = json_decode($fileString, true);
            if (isset($fileData[$section]) && isset($fileData[$targetSection])) {
                if ($section != $targetSection) {
                    $fileData[$targetSection]['services'] = $fileData[$section]['services'];
                    $jsonString = json_encode($fileData);

                    $file = fopen($fileName, "w+");
                    fwrite($file, $jsonString);
                    fclose($file);
                    echo $jsonString;
                }else {
                    echo "cant paste data to it's self";
                    die(http_response_code(202));
                }
            }
        }
    }else {
        echo 'missing parameter';
        die(http_response_code(201));
    }
}