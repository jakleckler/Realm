<?php 
	include('../../connection.php');
	$data = json_decode(file_get_contents("php://input"));
	$token = $data->token;
	$infoID = $data->infoID;
	$db->query("DELETE FROM data WHERE infoID='$infoID'");
?>	