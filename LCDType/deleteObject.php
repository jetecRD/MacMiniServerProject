<?php
/**
 * Created by PhpStorm.
 * User: jetec-rd
 * Date: 2018/9/26
 * Time: 上午9:10
 */

require_once 'DropboxController.php';

$methods = $_SERVER['REQUEST_METHOD'];


if ($methods == 'POST') {
    if (!isset($_POST['object'])) {
        echo "object type missing";
        die(http_send_status(201));
    }
    $object = $_POST['object'];
    try {
        $fileString = file_get_contents(FOLDER . FILENAME, true);
        $fileData = json_decode($fileString, true);
    } catch (Exception $e) {
        echo "Get file Error";
        die(http_send_status(202));
    }

    $fileName = FOLDER . FILENAME;

    if ($object == "type") {
        if (isset($_POST["type"])) {
            $type = $_POST['type'];
            $typeExist = false;
            for ($i = 0; $i < count($fileData); $i++) {
                if ($fileData[$i]['type'] == $type) {
                    array_splice($fileData, $i, 1);
                    $jsonString = json_encode($fileData);
                    $file = fopen($fileName, "w+");
                    fwrite($file, $jsonString);
                    fclose($file);
                    $typeExist = true;
                }
            }
            if ($typeExist) {
                echo $jsonString;
            }else {
                // type not find
            }
        } else {
            echo "missing parameter";
            die(http_response_code(203));
        }

    } else if ($object == "cmd") {
        if (isset($_POST['type']) & isset($_POST['cmd'])) {
            $type = $_POST['type'];
            $cmd = $_POST['cmd'];
            $cmdExist = false;
            for ($i = 0; $i < count($fileData); $i++) {
                if ($fileData[$i]['type'] == $type) {
                    for ($ii = 0; $ii < count($fileData[$i]['services']); $ii++) {
                        if ($fileData[$i]['services'][$ii]['cmd'] == $cmd) {
                            array_splice($fileData[$i]['services'], $ii, 1);
                            $jsonString = json_encode($fileData);
                            $file = fopen($fileName, "w+");
                            fwrite($file, $jsonString);
                            fclose($file);
                            $cmdExist = true;
                        }
                    }
                }
            }
            if ($cmdExist) {
                echo $jsonString;
            }else {
                // cmd not find
            }


        } else {
            echo "missing parameter";
            die(http_response_code(203));
        }
    }

}