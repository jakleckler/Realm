<?php
	include("../../connection.php");
	$data = json_decode(file_get_contents("php://input"));
	$token = $data->token;
	$username = $data->username;

	$result = $db->query("SELECT userID FROM users WHERE username='$username'");

	if ($result) {	    	
		$statement = "SELECT friendUsername, status FROM friend WHERE username='$username'";
		$information = $db->query($statement);
		if ($information) {
			$information = $information->fetchAll();

			echo json_encode($information);
		}
	} else {
	    echo "0 results";
	}

?>