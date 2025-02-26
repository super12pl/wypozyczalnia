<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$connect = mysqli_connect("localhost","root","","wypozyczalnia");
$query = mysqli_query($connect,"SELECT rezerwacje.id,samochody.model,data_odbioru,data_zwrotu FROM `rezerwacje` JOIN samochody ON samochody.id = rezerwacje.id_auta WHERE id_klienta='".$_REQUEST["klient"]."'");
echo json_encode(mysqli_fetch_all($query,MYSQLI_ASSOC));
?>