<?php
/**
 * Created by PhpStorm.
 * User: jetec-rd
 * Date: 2018/9/25
 * Time: 下午4:54
 */

define("FILENAME", "LCDTypeJson.json");
define("FOLDER", "./tmpFile/");
$methods = $_SERVER['REQUEST_METHOD'];
if ($methods == "POST") {
    $fileName = FOLDER . FILENAME;
    if (isset($_POST['type'])) {
        $type = $_POST['type'];
        if (file_exists($fileName)) {

            $data = ["type" => $type, "services" => []];
            $dataString = file_get_contents($fileName, true);
            $dataArray = json_decode($dataString, true);
            array_push($dataArray, $data);
            $jsonString = json_encode($dataArray);
            $file = fopen($fileName, "w+");
            fwrite($file, $jsonString);
            fclose($file);
            echo $jsonString;

        }else {
            $data = [["type" => $type, "services" => []]];
            $jsonString = json_encode($data);
            $file = fopen($fileName, "w+");
            fwrite($file, $jsonString);
            fclose($file);
            echo $jsonString;
        }
    }else {
        http_response_code(201);
        die("no parameter");
    }

}