<?php
	include("../../connection.php");
	$data = json_decode(file_get_contents("php://input"));
	$username = $data->username;
	$keyword = $data->title;

	$result = $db->query("SELECT userID FROM users WHERE username='$username'");

	if ($result) {	    	
		$statement = "SELECT infoID, keyword, information FROM data WHERE keyword='$keyword' AND userID IN (SELECT userID FROM users WHERE username='$username')";
		$information = $db->query($statement);
		if ($information) {
			$information = $information->fetchAll();

			echo json_encode($information);
		}
	} else {
	    echo "0 results";
	}

?>