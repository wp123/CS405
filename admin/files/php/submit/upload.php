<?php
$destination_path = '../../images/productImages/'; //Change this to change the destination of product images on upload. 
                                                   //NOTE YOU MUST CHANGE THE LINES MARKED IN files/php/pages/homeContent.php to match this value

$result = 0;

$target_path = $destination_path . basename( $_FILES['myfile']['name']);

if(@move_uploaded_file($_FILES['myfile']['tmp_name'], $target_path)) {
  $result = 1;
}

sleep(1); //So that the upload progress bar show on fast upload
?>
<script language="javascript" type="text/javascript">
   window.top.window.stopUpload(<?php echo $result; ?>);
</script> 