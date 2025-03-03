<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$connect = mysqli_connect("localhost","root","","wypozyczalnia");
$query = "INSERT INTO `rezerwacje` (`id_auta`,`data_odbioru`,`data_zwrotu`,`id_klienta`) VALUES ('".$_REQUEST["auto"]."','".$_REQUEST["start"].",'".$_REQUEST["end"].",'".$_REQUEST["klient"]."')";
$result = mysqli_query($connect,$query);
echo json_encode($result);

?>