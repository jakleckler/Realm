<?php
	include("../../connection.php");
	$data = json_decode(file_get_contents("php://input"));
	$username = $data->username;
	$friendUsername = $data->friendUsername;
	$date = new DateTime("NOW"); 
	$date = $date->format('Y-m-d');

	$statement = "UPDATE friend SET status=:status, FriendDate=:fdate WHERE (username=:username AND friendUsername=:friendUsername) OR (username=:oppusername AND friendUsername=:oppfriendUsername)";
	$query = $db->prepare($statement);
	$execute = $query->execute(array(
		":status" => 2,
		":fdate" => $date,
		":username" => $username,
		":friendUsername" => $friendUsername,
		":oppusername" => $friendUsername,
		":oppfriendUsername" =>$username
	)); 
    echo "updated";
	

?>