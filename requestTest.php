<?php

header("Access-Control-Allow-Origin:*");
$method = $_SERVER['REQUEST_METHOD'];
$body = $method == "GET" ? $_GET : $_POST;
$data = ["method" => $method, "header" => apache_request_headers(), "body" => $body];
$json = json_encode($data, true);
echo $json;
