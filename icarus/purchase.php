<?php 

$price = $_POST['price'];
if (strpos($price, "."))
{
  $zeros = strlen($price) - strpos($price, ".") - 1;
  if ($zeros == 0)
  {
    $price .= "00";
  }
  else if ($zeros == 1)
  {
    $price .= "0";
  }
  $formatted = str_replace(".", "", $price);
}
else
{
  $formatted = $price."00";
}

header("Location: https://sites.fastspring.com/jvscott/instant/icarus?tags=price=".$formatted);

?>

<html>
<body>
Processing, please wait...
</body>
</html>