<?php

require_once 'dbconnect.php';
$query = $dbconnect->prepare("select * from adventurers join checklist on adventurers.id = checklist.id order by element asc, rarity desc, name asc, adventurers.variation asc");
$query->execute();
$adventurers = $query->fetchAll(PDO::FETCH_ASSOC);
$dbconnect = null;

foreach($adventurers as $adventurer){

	$image_url = 'https://storage.cloud.google.com/manasmith-221002.appspot.com/images/adventurers/icons/'.$adventurer['id'].'_'.$adventurer['variation'].'.png';

	echo '<table class="adventurer '.$adventurer['element'].' rank'.$adventurer['newrank'].' collected'.$adventurer['collected'].'"><tr class="header"><th>'.$adventurer['name'].'</th></tr><tr class="icon"><td style="background: url(\''.$image_url.'\') no-repeat center"></td></tr></table>';

}
	
?>
