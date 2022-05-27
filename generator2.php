<?php
    $myFile = fopen('./Blades/'.$_POST['name'].'.blade.php',"w");

    fwrite($myFile,$_POST["resultCode"]);
    fclose($myFile);
    header("Location:".$_SERVER['HTTP_REFERER']);
?>