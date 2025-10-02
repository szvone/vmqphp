<?php
error_reporting(0);

ini_set ('memory_limit', '256M');
header("Content-type:text/html;charset=utf-8");

session_start();

if(!isset($_SESSION['think'])){
    echo "error";
    exit();
}


function getCurl($url, $post = 0, $cookie = 0, $header = 0, $nobaody = 0)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $klsf[] = 'Accept:*/*';
    $klsf[] = 'Accept-Language:zh-cn';
    //$klsf[] = 'Content-Type:application/json';
    $klsf[] = 'User-Agent:Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_1 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C153 MicroMessenger/6.6.1 NetType/WIFI Language/zh_CN';
    $klsf[] = 'Referer:https://servicewechat.com/wx7c8d593b2c3a7703/5/page-frame.html';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $klsf);
    if ($post) {
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    }
    if ($header) {
        curl_setopt($ch, CURLOPT_HEADER, true);
    }
    if ($cookie) {
        curl_setopt($ch, CURLOPT_COOKIE, $cookie);
    }
    if ($nobaody) {
        curl_setopt($ch, CURLOPT_NOBODY, 1);
    }
    curl_setopt($ch, CURLOPT_TIMEOUT,60);
    curl_setopt($ch, CURLOPT_ENCODING, 'gzip');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $ret = curl_exec($ch);
    curl_close($ch);
    return $ret;
}



try{
    if (isset($_POST['base64'])){
        $b64 = $_POST['base64'];
        $s = base64_decode($b64);
        $img_path = './image/'.md5($s).'.jpg';
        file_put_contents($img_path, $s,LOCK_EX);
    }else{
        $s = file_get_contents($_FILES["file"]["tmp_name"]);
        $img_path = './image/'.md5($s).'.jpg';
        file_put_contents($img_path, $s,LOCK_EX);
    }
    $url='http://'.$_SERVER['SERVER_NAME'].str_replace("/test.php","",$_SERVER["REQUEST_URI"]).str_replace("./","/",$img_path);


    $res = getCurl("https://cli.im/apis/up/deqrimg","img=".urlencode($url));
    $obj = json_decode($res);
    $text = $obj->info->data[0];

    if ($text==null || $text == ""){
        throw new Exception('远程识别失败');
    }
    echo json_encode(array("code"=>1,"msg"=>"识别成功","data"=>$text));

}catch (Exception $e){
    include_once('./lib/QrReader.php');

    if (isset($_POST['base64'])){
        $b64 = $_POST['base64'];
    }else{
        $file = file_get_contents($_FILES["file"]["tmp_name"]);
        $b64 = base64_encode($file);
    }

    try{
        $qrcode = new QrReader(base64_decode($b64),QrReader::SOURCE_TYPE_BLOB);  //图片路径
        $text = $qrcode->text(); //返回识别后的文本
        if ($text){
            echo json_encode(array("code"=>1,"msg"=>"成功","data"=>$text));
        }else{
            echo json_encode(array("code"=>-1,"msg"=>"未识别到二维码","data"=>"二维码识别失败，请删除本张图片"));
        }
    }catch (Exception $e){

        echo json_encode(array("code"=>-1,"msg"=>"二维码识别出错，请在其他网站（草料二维码识别）识别二维码内容后，将内容重新生成成二维码图片上传"));
    }

}finally{
    unlink($img_path);
}

