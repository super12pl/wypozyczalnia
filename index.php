<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$connect = mysqli_connect("localhost","root","","wypozyczalnia");
$query = mysqli_query($connect,"SELECT * FROM `samochody`");
echo json_encode(mysqli_fetch_all($query,MYSQLI_ASSOC));
?>