
<?php
if (!isset($_FILES["file"]))
{
    ?>
    <html>
    <body>
    <h1>Convert CSV to XLSX</h1>
    <form  method="post" enctype="multipart/form-data">
        <input type="file" name="file"/>
        <input type="submit"/>
    </form>
    </body>
    </html>
    <?php
    exit;
}

//obtain PHPExcel from http://phpexcel.codeplex.com
require_once('Classes/PHPExcel.php');
require_once('CSVToExcelConverter.php');

if ($_FILES["file"]["error"] > 0)
{
    echo "Error: " . $_FILES["file"]["error"];
    exit;
}

try
{
    header('Content-type: application/ms-excel');
    header('Content-Disposition: attachment; filename='."{$_FILES['file']['name']}.xls");

    CSVToExcelConverter::convert($_FILES['file']['tmp_name'], 'php://output');
} catch(Exception $e) {
    echo $e->getMessage();
}

?>
