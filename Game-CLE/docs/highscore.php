<?php
$servername = "localhost";
$username = "krygsok305_esolutions2";
$password = "RuKdggsCuX28";
$dbname = "krygsok305_esolutions2";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM score ORDER BY `score` DESC LIMIT 3";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "<img src='./images/medaille.png' style='width:20px; margin-left:-20px;'/>" .$row["name"]. " - Punten: " .$row["score"]. "<br>";
  }
} else {
  echo "0 results";
}
$conn->close();
?>