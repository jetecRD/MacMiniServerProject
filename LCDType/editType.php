<?php
/**
 * Created by PhpStorm.
 * User: jetec-rd
 * Date: 2018/9/27
 * Time: 下午2:17
 */


define("FILENAME", "LCDTypeJson.json");
define("FOLDER", "./tmpFile/");
$method = $_SERVER['REQUEST_METHOD'];


if ($method == 'POST') {
    if (isset($_POST['section'])
        && isset($_POST['type'])) {

        $section = $_POST['section'];
        $type = $_POST['type'];
        $fileName = FOLDER . FILENAME;
        if (file_exists($fileName)){
            $fileString = file_get_contents($fileName);
            $fileData = json_decode($fileString, true);
            if (isset($fileData[$section])) {
                $fileData[$section]['type'] = $type;

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