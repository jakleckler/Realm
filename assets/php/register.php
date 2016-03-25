<?php
	include("../../connection.php");
	$data = json_decode(file_get_contents("php://input"));
	$firstname = $data->firstName;
	$lastname = $data->lastName;
	$email = $data->email;
	$username = $data->username;
	$password = sha1($data->password);
	$access = $data->access;
	$token = $username . " | " . uniqid() . uniqid() . uniqid();

	$statement = "INSERT INTO users (FIRSTNAME, LASTNAME, EMAIL, username, password, token, ACCESS) VALUES (:firstname, :lastname, :email, :username, :password, :token, :access)";
	$query = $db->prepare($statement);
	$execute = $query->execute(array(
		":firstname" => $firstname,
		":lastname" => $lastname,
		":email" => $email,
		":username" => $username,
		":password" => $password,
		":token" => $token,
		":access" => $access,
	));

	echo json_encode($username);

?>