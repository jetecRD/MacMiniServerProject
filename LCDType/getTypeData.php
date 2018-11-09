<?php
/**
 * Created by PhpStorm.
 * User: jetec-rd
 * Date: 2018/9/11
 * Time: 上午9:11
 */

$methods = $_SERVER['REQUEST_METHOD'];

if ($methods == 'GET') {
    $fileName = 'tmpFile/LCDTypeJson.json';
    if (file_exists($fileName)) {
        $data = file_get_contents($fileName);
        echo $data;
    }
}else {
    echo 'PHP is Working';
}
