<?php
	include("../connection.php");
	$data = json_decode(file_get_contents("php://input"));
	$password = $data->password;
	$username = $data->username;

	$statement = "SELECT username FROM users WHERE username='$username' AND password ='$password'";

	$userInfo = $db->query($statement);
	$userInfo = $userInfo->fetchAll();

	echo json_encode($userInfo);

?>