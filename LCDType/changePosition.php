<?php
/**
 * Created by PhpStorm.
 * User: jetec-rd
 * Date: 2018/9/27
 * Time: 上午9:26
 */


define("FILENAME", "LCDTypeJson.json");
define("FOLDER", "./tmpFile/");
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    if (isset($_POST['section'])
        && isset($_POST['row'])
        && isset($_POST['status'])) {
        $section = $_POST['section'];
        $row = $_POST['row'];
        $status = $_POST['status'];
        $fileName = FOLDER . FILENAME;

        if (file_exists($fileName)) {
            $fileString = file_get_contents($fileName);
            $fileData = json_decode($fileString, true);
            if (isset($fileData[$section]['services'][$row])) {
                if ($status == 'up') {

                    if ($row > 0) {
                        $tmp = $fileData[$section]['services'][$row - 1];
                        $fileData[$section]['services'][$row - 1] = $fileData[$section]['services'][$row];
                        $fileData[$section]['services'][$row] = $tmp;
                    }
                }else if ($status == 'down') {

                    if ($row < count($fileData[$section]['services']) - 1) {
                        $tmp = $fileData[$section]['services'][$row + 1];
                        $fileData[$section]['services'][$row + 1] = $fileData[$section]['services'][$row];
                        $fileData[$section]['services'][$row] = $tmp;
                    }
                }
                $jsonString = json_encode($fileData);

                $file = fopen($fileName, "w+");
                fwrite($file, $jsonString);
                fclose($file);
                echo $jsonString;
            }
        }

    }else {
        echo 'missing parameter';
        die(http_response_code(201));
    }
}