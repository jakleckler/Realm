<?php
	include("../../connection.php");
	$data = json_decode(file_get_contents("php://input"));
	$password = sha1($data->password);
	$username = $data->username;

	$statement = "SELECT username FROM users WHERE username='$username' AND password ='$password'";

	$userInfo = $db->query($statement);
	$userInfo = $userInfo->fetchAll();

	$token;
	if (count($userInfo) == 1) {
		$token = $username . " | " . uniqid() . uniqid() . uniqid();
		$statement = "UPDATE users SET token=:token WHERE username=:username AND password=:password";
		$query = $db->prepare($statement);
		$execute = $query->execute(array(
			":token" => $token,
			":username" => $username,
			":password" => $password
		)); 
	    echo json_encode($token);
	} else {
	echo "ERROR";
	}

	

?>