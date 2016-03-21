<?php
	include("../connection.php");
	$data = json_decode(file_get_contents("php://input"));
	$firstname = $data->firstName;
	$lastname = $data->lastName;
	$email = $data->email;
	$username = $data->username;
	$password = $data->password;
	$access = $data->access;

	$statement = "INSERT INTO users (FIRSTNAME, LASTNAME, EMAIL, username, password, ACCESS) VALUES (:firstname, :lastname, :email, :username, :password, :access)";
	$query = $db->prepare($statement);
	$execute = $query->execute(array(
		":firstname" => $firstname,
		":lastname" => $lastname,
		":email" => $email,
		":username" => $username,
		":password" => $password,
		":access" => $access,
	));

	echo json_encode($username);

?>