<?php
ini_set ('memory_limit', '256M');

session_start();

if(!isset($_SESSION['think'])){
    echo "error";
    exit();
}


include_once('./lib/QrReader.php');
header("Content-type:text/html;charset=utf-8");

if (isset($_POST['base64'])){
    $b64 = $_POST['base64'];
}else{
    $file = file_get_contents($_FILES["file"]["tmp_name"]);
    $b64 = base64_encode($file);
}


//echo $b64;
//$qrcode = new QrReader('./qr.png');  //图片路径

$qrcode = new QrReader(base64_decode($b64),QrReader::SOURCE_TYPE_BLOB);  //图片路径
$text = $qrcode->text(); //返回识别后的文本
if ($text){
    echo json_encode(array("code"=>1,"msg"=>"成功","data"=>$text));

}else{
    echo json_encode(array("code"=>-1,"msg"=>"未识别到二维码","data"=>"二维码识别失败，请删除本张图片"));

}
