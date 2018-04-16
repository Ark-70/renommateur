<?php
require 'myzipmaker.php';



$filesToZipLocations = $_FILES['userfiles']['tmp_name'];

$newNames = json_decode($_POST['names']);

$nomZip = 'les_cv_de_mes_petits_mmi';
$zipArchive = create_zip($filesToZipLocations, $newNames, $nomZip.'.zip');



header("Content-type: application/zip");
header("Content-Disposition: attachment; filename=".$zipArchive);
readfile($zipArchive);

unlink($zipArchive);
// ici clean le dossier susdit
