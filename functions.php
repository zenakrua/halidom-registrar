<?php

	require_once 'dbconnect.php';

	$query = $dbconnect->prepare("select name from adventurers");
	$query->execute();

	$jsonData = $query->fetchAll(PDO::FETCH_GROUP|PDO::FETCH_ASSOC);

	echo json_encode($jsonData);
//	echo $jsonData;

	$dbconnect = null;
	
?>
