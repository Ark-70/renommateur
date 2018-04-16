<?php
require 'myzipmaker.php';

$DEBUG = false;

$filesToZipLocations = $_FILES['userfiles']['tmp_name'];
if($DEBUG) var_dump($filesToZipLocations);

$newNames = json_decode($_POST['names']);
if($DEBUG) var_dump($newNames);

$nomZip = 'les_cv_de_mes_petits_mmi';
$zipArchive = create_zip($filesToZipLocations, $newNames, $nomZip.'.zip');

if($zipArchive!==false){
  //Set Headers:
  header("Content-type: application/zip");
  header("Content-Disposition: attachment; filename=".$zipArchive);
  header('Pragma: public');
  header('Expires: 0');
  header('Content-Transfer-Encoding: binary');
  header('Content-Length: ' . filesize($zipArchive));
  readfile($zipArchive);
  exit();
}else{
  var_dump('ntm');

}

if($zipArchive!==false){
  unlink($zipArchive);
}




// if(file_exists('test.zip')){
//     header('Pragma: public');
//     header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
//     header('Last-Modified: ' . gmdate('D, d M Y H:i:s', filemtime('test.zip')) . ' GMT');
//     header('Content-Type: application/force-download');
//     header('Content-Disposition: inline; filename="test.zip"');
//     header('Content-Length: ' . filesize('test.zip'));
//     header('Connection: close');
//     readfile('test.zip');
//     exit();
// }
//
// if(file_exists('test.zip')){
//     unlink('test.zip');
//
// }
