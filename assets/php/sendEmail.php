<?php
   include("../../connection.php");
   $data = json_decode(file_get_contents("php://input"));

   $to = $data->to;
   $subject = $data->subject;   
   $message = $data->message;   
   $header = $data->headers;
   
   $retval = mail ($to,$subject,$message,$header);
   
   if( $retval == true ) {
      echo "success";
   }else {
      echo "Failed to send mail";
   }