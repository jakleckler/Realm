<?php
	include("../../connection.php");
	$data = json_decode(file_get_contents("php://input"));
	$token = $data->token;
	$username = $data->username;
	$oldPass = sha1($data->oldPass);
	$newPass = sha1($data->newPass);

	$check = $db->query("SELECT username FROM users WHERE token='$token' AND password='$oldPass'");
	if ($check) {
		$check = $check->fetchAll();

		if (count($check) == 1){
			echo "authorized";
			$statement = "UPDATE users SET password=:newPass WHERE username=:username AND password=:oldPass";
			$query = $db->prepare($statement);
			$execute = $query->execute(array(
				":newPass" -> $newPass,
				":username"->$username,
				":oldPass"->$oldPass
			));
			echo "success";
		}
	} else {
			echo "unauthorized";
	}

?>
	