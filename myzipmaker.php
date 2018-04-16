<?php
/* creates a compressed zip file */
function create_zip($filesLocations = array(), $filesNames, $destination = '', $overwrite = true) {
	//if the zip file already exists and overwrite is false, return false
	if(file_exists($destination) && !$overwrite) {
    return false;
  }
	//vars
	$valid_files = array();
	//if files were passed in...
	if(is_array($filesLocations)) {
		//cycle through each file
		foreach($filesLocations as $fileLocation) {
			//make sure the file exists
			if(file_exists($fileLocation)) {
				$valid_files[] = $fileLocation;
			}
		}
	}
	//if we have good files...
	if(count($valid_files)) {
		//create the archive
		$zip = new ZipArchive();

    // $zip->open($destination, $overwrite? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE);
    // var_dump($zip->status);
    $couille = $zip->open($destination, ZipArchive::OVERWRITE);
    if($couille !== true) {
		// if($zip->open($destination, $overwrite? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
			return false;
		}


		//add the files
    for ($i=0; $i < count($valid_files); $i++) {
      $zip->addFile($valid_files[$i], $filesNames[$i]);
    }
		//debug
		//echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status;

		//close the zip -- done!
		$zip->close();

		//check to make sure the file exists
    if(file_exists($destination)){
      return $destination;
    }else{
      return false;
    }
	}
	else
	{
		return false;
	}
}


?>
