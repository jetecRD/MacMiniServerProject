<?php
/**
 * Created by PhpStorm.
 * User: jetec-rd
 * Date: 2018/9/26
 * Time: 上午8:51
 */

require './vendor/autoload.php';
use Kunnu\Dropbox\DropboxApp;
use Kunnu\Dropbox\Dropbox;
use Kunnu\Dropbox\DropboxFile;

define("FILENAME", "LCDTypeJson.json");
define("FOLDER", "./tmpFile/");

class DropboxController
{
    private $client_id = "6m8w8hjne2kcy12";
    private $client_secret = "5iv05wf700c8g2v";
    private $auth = "ZQkwJd6SxhAAAAAAAAAAHZdOgFUpF6-nL3eczGGQhQnToADzToipCDdnjVlEkTKj";
    private $fileName = FOLDER . FILENAME;
    public $dropbox;
    public $app;


    function __construct()
    {
        $this->app = new DropboxApp($this->client_id, $this->client_secret, $this->auth);
        $this->dropbox = new Dropbox($this->app);
    }


    public function updateFile($localPath, $cloudPath) {

        try {
            $dropboxFile = new DropboxFile($localPath);
            $this->dropbox->upload($dropboxFile, "/" . $cloudPath,
                ['autorename' => false, 'mode' => 'overwrite']);

        } catch (Exception $e) {
            echo "Failed\n";
        }
    }

}