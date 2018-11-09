<?php
/**
 * Created by PhpStorm.
 * User: jetec-rd
 * Date: 2018/9/26
 * Time: 下午4:43
 */

require_once 'DropboxController.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $fileName = FOLDER . FILENAME;
    if (file_exists($fileName)) {
        try {
            $fileString = file_get_contents($fileName, true);

        }catch (Exception $e) {
            http_send_status(203);
        }
        $dropbox = new DropboxController();
        $dropbox->updateFile($fileName, FILENAME);


    }else {
        echo "file not found";
        http_response_code(202);
    }
}else {
    echo "permission denied";
    http_response_code(201);
}