<?php 
	include('../../connection.php');
	$data = json_decode(file_get_contents("php://input"));
	$username = $data->username;
	$friendUsername = $data->friendUsername;
	$db->query("DELETE FROM friend WHERE (username='$username' AND friendUsername='$friendUsername') OR (username='$friendUsername' AND friendUsername='$username')");
	echo "deleted";
?>	