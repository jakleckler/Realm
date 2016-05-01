<?php
	include("../../connection.php");
	$data = json_decode(file_get_contents("php://input"));
	$token = $data->token;
	$username = $data->username;
	$friend = $data->friend;
	
	$checkFriend = $db -> query("SELECT userID FROM users WHERE username='$friend'");

	if ($checkFriend) {
		$checkFriend = $checkFriend->fetchAll();
		if (count($checkFriend) == 1) {
			echo "found friend";
			$alreadyFriends = $db->query("SELECT friendUsername FROM friend WHERE username='$username' AND friendUsername = '$friend'");
			if ($alreadyFriends) {
				$alreadyFriends = $alreadyFriends->fetchAll();

				if (count($alreadyFriends) == 1) {
					echo "Already Friends";
				} else {
					echo "making friends";
					$statement = "INSERT INTO friend (username, friendUsername, status) VALUES (:username, :friendUsername, :status)";
					$query = $db->prepare($statement);
					$execute = $query->execute(array(
						":username" => $username,
						":friendUsername" => $friend,
						":status" => 0
						));
					$statement = "INSERT INTO friend (username, friendUsername, status) VALUES (:username, :friendUsername, :status)";
					$query = $db->prepare($statement);
					$execute = $query->execute(array(
						":username" => $friend,
						":friendUsername" => $username,
						":status" => 1
						));
					$statement = "INSERT INTO notifications (username, type, message, status) VALUES (:username, :type, :message, :status)";
					$query = $db->prepare($statement);
					$execute  =$query->execute(array(
						":username" => $friend,
						":type" => 0,
						":message" => "Friend Request",
						":status" => 0
					));
				}
			}
		} else {
		echo "username does not exist";
		}
	}

?>