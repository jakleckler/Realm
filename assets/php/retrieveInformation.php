<?php
	include("../../connection.php");
	$data = json_decode(file_get_contents("php://input"));
	$token = $data->token;
	$keyword = $data->title;

	$result = $db->query("SELECT userID FROM users WHERE token=$token");

	if ($result) {	    	
		$statement = "SELECT infoID, keyword, information FROM data WHERE keyword='$keyword' AND userID IN (SELECT userID FROM users WHERE token=$token)";
		$information = $db->query($statement);
		if ($information) {
			$information = $information->fetchAll();

			echo json_encode($information);
		}
	} else {
	    echo "0 results";
	}

?>