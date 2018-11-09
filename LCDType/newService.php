<?php
/**
 * Created by PhpStorm.
 * User: jetec-rd
 * Date: 2018/9/7
 * Time: 上午8:52
 */

define("FILENAME", "LCDTypeJson.json");
define("FOLDER", "./tmpFile/");

//$method = $_SERVER['REQUEST_METHOD'];
$method = $_SERVER["REQUEST_METHOD"];
if ($method == 'POST') {


    if (isset($_POST['type'])) {
        $type = $_POST["type"];
    } else {
        echo "no type";
        die(http_response_code(202));

    }
    if (isset($_POST['valueType'])) {
        $value_type = $_POST["valueType"];
    } else {
        echo "no name";
        die(http_response_code(203));

    }
    if (isset($_POST['cmd'])) {
        $cmd = $_POST["cmd"];
    } else {
        echo "no cmd";
        die(http_response_code(204));

    }
    if (isset($_POST['name'])) {
        $name = $_POST["name"];
    } else {
        echo "no name";
        die(http_response_code(205));
    }

    $fileName = FOLDER . FILENAME;
    if (file_exists($fileName)) {

        $fileString = file_get_contents($fileName, true);
        if ($fileString != null) {
            $fileData = json_decode($fileString, true);
            $typeExist = false;
            for ($i = 0; $i < count($fileData); $i++) {
                if ($fileData[$i]["type"] == $type) {
                    $cmdExist = false;
                    for ($ii = 0; $ii < count($fileData[$i]["services"]); $ii++) {
                        if ($fileData[$i]["services"][$ii]["cmd"] == $cmd) {
                            $fileData[$i]["services"][$ii] = ["cmd" => $cmd, "value_type" => $value_type, "name" => $name];
                            $cmdExist = true;
                        }
                    }
                    if (!$cmdExist) {
                        $fileData[$i]["services"][] = ["cmd" => $cmd, "value_type" => $value_type, "name" => $name];
                    }
                    $typeExist = true;
                }
            }
            if (!$typeExist) {
                array_push($fileData, ["type" => $type, "services" => [["cmd" => $cmd, "value_type" => $value_type, "name" => $name]]]);
            }
            $json = json_encode($fileData);
            $file = fopen($fileName, 'w+');
            fwrite($file, $json);
            fclose($file);
            echo $json;

        } else {
            echo("2");
            $services = [$cmd];
            $data = [["type" => $type, "services" => [["cmd" => $cmd, "value_type" => $value_type, "name" => $name]]]];

            $json = json_encode($data);
            $file = fopen($fileName, 'w+');
            fwrite($file, $json);
            fclose($file);
            echo $json;
        }
    } else {
        $services = [$cmd];
        $data = [["type" => $type, "services" => [["cmd" => $cmd, "value_type" => $value_type, "name" => $name]]]];

        $json = json_encode($data);
        $file = fopen($fileName, 'w+');
        fwrite($file, $json);
        fclose($file);
        echo $json;
    }


//TODO Dropbox Area


    /*
    $callbackUrl = "http://localhost:8080/index.php";
    $authUrl = $authHelper->getAuthUrl($callbackUrl);
    $authHelper = $dropbox->getAuthHelper();
    $accessToken = $authHelper->getAccessToken($code, $state, $callbackUrl);
    */


} else {
    echo "permission denied";
}
?>