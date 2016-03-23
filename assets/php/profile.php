<?php 
	include("../../connection.php");
	$data = json_decode(file_get_contents("php://input"));
	$token = $data->token;

	$user = $db->query("SELECT FIRSTNAME, LASTNAME, username, email FROM users WHERE token=$token");
	if ($user) {
		$user = $user->fetchAll();

		if (count($user) == 1){
			echo json_encode($user);
		}
	} else {
			echo "unauthorized";
	}
	

?>