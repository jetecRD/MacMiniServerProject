<?php
/**
 * Created by PhpStorm.
 * User: jetec-rd
 * Date: 2018/9/26
 * Time: 下午5:15
 */


define("FILENAME", "LCDTypeJson.json");
define("FOLDER", "./tmpFile/");
$method = $_SERVER['REQUEST_METHOD'];


if ($method == 'POST') {
    if (isset($_POST['section'])
        && isset($_POST['row'])
        && isset($_POST['cmd'])
        && isset($_POST['value_type'])
        && isset($_POST['name'])) {

        $section = $_POST['section'];
        $row = $_POST['row'];
        $cmd = $_POST['cmd'];
        $value_type = $_POST['value_type'];
        $name = $_POST['name'];
        $fileName = FOLDER . FILENAME;
        if (file_exists($fileName)){
            $fileString = file_get_contents($fileName);
            $fileData = json_decode($fileString, true);
            if (isset($fileData[$section]['services'][$row])) {
                $fileData[$section]['services'][$row]['cmd'] = $cmd;
                $fileData[$section]['services'][$row]['value_type'] = $value_type;
                $fileData[$section]['services'][$row]['name'] = $name;

                $jsonString = json_encode($fileData);
                $file = fopen($fileName, "w+");
                fwrite($file, $jsonString);
                fclose($file);
                echo $jsonString;

            }

        }else {
            echo "File Not Found";
            die(http_response_code(203));
        }



    }else {
        // no parameter
        http_response_code(201);
    }
}else {
    http_response_code(202);
    // not post
}