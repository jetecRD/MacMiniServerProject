<?php
/**
 * Created by PhpStorm.
 * User: jetec-rd
 * Date: 2018/9/4
 * Time: 上午9:23
 */

ini_set('memory_limit', '256M');
class getCSVData
{
    private $title;
    private $values;
    function __construct($filename, $mode)
    {
        $csv_file = fopen($filename, $mode);
        $this->values = Array();
        $this->title = Array();

        $count = 0;
        while ($csv_get = fgetcsv($csv_file, 0, ";")) {
            if ($count == 0) {
                $this->title = $csv_get;
            } else {
                $this->values[] = $csv_get;
                if ($count/5000 > 1) {

                    ob_flush();
                    flush();
                }
            }
            $count++;
        }
    }


    function getTitles() {
        return $this->title;
    }

    function getValues() {
        return $this->values;
    }



}
?>