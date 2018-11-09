<?php

define("FILENAME", 'log.csv');
define("FOLDER", '');
define("SEPARATOR", '');
define("STR_SUCCESS", 'set FIN');
define("STR_ERROR", 'error');

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $datePrefix = date("Y-m-d_H:i:s", strtotime('+8 hours'));
    $pathname = FOLDER.SEPARATOR.$datePrefix.'_'.FILENAME;
    $postdata = file_get_contents("php://input");
    $handle = fopen($pathname, 'w+');
    $content = var_export($postdata, true);
    fwrite($handle, substr($content, 1, strlen($content)-2));
    fclose($handle);
    echo (($handle === false) ? STR_ERROR : STR_SUCCESS)."\r\n";
}
else {
    echo "The PHP script is working!";
}

?>