<?php
    $myFile = fopen('./Exports/'.$_POST['name'].'Export.php',"w");

    fwrite($myFile,$_POST["resultCode"]);
    fclose($myFile);
    header("Location:".$_SERVER['HTTP_REFERER']);
?>