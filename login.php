<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$connect = mysqli_connect("localhost","root","","wypozyczalnia");
$query = "SELECT * FROM `klienci` WHERE email ='".$_REQUEST["email"]."' AND haslo ='".$_REQUEST["password"]."'";
$result = mysqli_query($connect,$query);
if(mysqli_num_rows($result)>0) {
    echo json_encode(true);
}
else{
    echo json_encode(false);
}

?>