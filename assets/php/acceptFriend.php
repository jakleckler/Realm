<?php
	include("../../connection.php");
	$data = json_decode(file_get_contents("php://input"));
	$username = $data->username;
	$friendUsername = $data->friendUsername;

	$statement = "UPDATE friend SET status=:status WHERE (username=:username AND friendUsername=:friendUsername) OR (username=:oppusername AND friendUsername=:oppfriendUsername)";
	$query = $db->prepare($statement);
	$execute = $query->execute(array(
		":status" => 2,
		":username" => $username,
		":friendUsername" => $friendUsername,
		":oppusername" => $friendUsername,
		":oppfriendUsername" =>$username
	)); 
    echo "updated";
	

?>