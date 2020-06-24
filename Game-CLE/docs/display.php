<?php
$servername = "localhost";
$username = "krygsok305_esolutions2";
$password = "RuKdggsCuX28";
$db = "krygsok305_esolutions2";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

$score = $_POST['score'];

$name = $_POST['name'];

$insert = "insert into score values('','$name','$score')";// Do Your Insert Query
  if(mysqli_query($conn, $insert)) {
//    echo "Success";
  } else {
   echo "Cannot Insert";
  }
?>