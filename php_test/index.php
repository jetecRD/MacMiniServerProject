<?php
/**
 * Created by PhpStorm.
 * User: jetec-rd
 * Date: 2018/9/7
 * Time: 上午8:52
 */

require "vendor/autoload.php";
use Kunnu\Dropbox\DropboxApp;
use Kunnu\Dropbox\Dropbox;
use Kunnu\Dropbox\DropboxFile;

define("FILENAME", "myJson.json");
define("FOLDER", "./tmpFile/");

$client_id = "6m8w8hjne2kcy12";
$client_secret = "5iv05wf700c8g2v";
$auth = "ZQkwJd6SxhAAAAAAAAAADLFBGfAzOm682G77Sj8_iWSyKq4Fne9LBIOeUNgP3_VH";

$mydata = ["id" => 1, "name" => "Simon", "email" => "ccc@gmail.com"];
$json = json_encode($mydata);

$fileName = FOLDER . FILENAME;
$file = fopen($fileName, 'w+');
fwrite($file, $json);
fclose($file);
//$dropbox->postToAPI()

$app = new DropboxApp($client_id, $client_secret, $auth);

//Configure Dropbox service
$dropbox = new Dropbox($app);

$pathToLocalFile = $fileName;
/*
$dropboxFile = new DropboxFile($pathToLocalFile);
$file = $dropbox->upload($dropboxFile, "/My-Hello-World.json", ['autorename' => false]);
$file->getName();
*/
try {
    $file = $dropbox->getMetadata("/My-Hello-World.json");
    $fname = $file->getName();
    $fsize = $file->getSize();
    echo $fname . "\n" . $fsize . "\n";
}catch (Exception $e) {
    try {
        $dropboxFile = new DropboxFile($pathToLocalFile);
        $file = $dropbox->upload($dropboxFile, "/My-Hello-World.json", ['autorename' => false]);
        $file->getName();
    }catch (Exception $e) {

    }
}
/*
if ($file = $dropbox->getMetadata("/My-Hello-World.json")) {

}else {

    $dropboxFile = new DropboxFile($pathToLocalFile);
    $file = $dropbox->upload($dropboxFile, "/My-Hello-World.json", ['autorename' => false]);
    $file->getName();
}

*/






