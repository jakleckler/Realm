<?php
	include("../../connection.php");
	$data = json_decode(file_get_contents("php://input"));
	$token = $data->token;
	$keyword = $data->title;
	$information = $data->information;

	$result = $db->query("SELECT userID FROM users WHERE token=$token");

	if ($result) {	    	
		$statement = "INSERT INTO data (userID, keyword, information) VALUES ((SELECT userID FROM users WHERE token=$token), :keyword, :information)";
		$query = $db->prepare($statement);
		$execute = $query->execute(array(
			":keyword" => $keyword,
			":information" => $information,
		));

		echo "success" , var_dump($keyword), var_dump($information);
	} else {
	    echo "0 results";
	}

?>