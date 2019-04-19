<?php
namespace app\admin\controller;

use think\Db;
use think\facade\Session;
use app\service\QrcodeServer;
use Zxing\QrReader;

class Index
{
    public function index()
    {
        return 'by:vone';
    }

    public function getReturn($code = 1,$msg = "成功",$data = null){
        return array("code"=>$code,"msg"=>$msg,"data"=>$data);
    }



    public function getMain(){
        if (!Session::has("admin")){
            return json($this->getReturn(-1,"没有登录"));
        }
        $today = strtotime(date("Y-m-d"),time());

        $todayOrder = Db::name("pay_order")
            ->where("create_date >=".$today)
            ->where("create_date <=".($today+86400))
            ->count();


        $todaySuccessOrder = Db::name("pay_order")
            ->where("state >=1")
            ->where("create_date >=".$today)
            ->where("create_date <=".($today+86400))
            ->count();



        $todayCloseOrder = Db::name("pay_order")
            ->where("state",-1)
            ->where("create_date >=".$today)
            ->where("create_date <=".($today+86400))
            ->count();

        $todayMoney = Db::name("pay_order")
            ->where("state >=1")
            ->where("create_date >=".$today)
            ->where("create_date <=".($today+86400))
            ->sum("price");


        $countOrder = Db::name("pay_order")
            ->count();
        $countMoney = Db::name("pay_order")
            ->where("state >=1")
            ->sum("price");


        return json($this->getReturn(1,"成功",array(
            "todayOrder"=>$todayOrder,
            "todaySuccessOrder"=>$todaySuccessOrder,
            "todayCloseOrder"=>$todayCloseOrder,
            "todayMoney"=>round($todayMoney,2),
            "countOrder"=>$countOrder,
            "countMoney"=>round($countMoney),
        )));

    }

    public function getSettings(){
        if (!Session::has("admin")){
            return json($this->getReturn(-1,"没有登录"));
        }
        $user = Db::name("setting")->where("vkey","user")->find();
        $pass = Db::name("setting")->where("vkey","pass")->find();
        $notifyUrl = Db::name("setting")->where("vkey","notifyUrl")->find();
        $returnUrl = Db::name("setting")->where("vkey","returnUrl")->find();
        $key = Db::name("setting")->where("vkey","key")->find();
        $lastheart = Db::name("setting")->where("vkey","lastheart")->find();
        $lastpay = Db::name("setting")->where("vkey","lastpay")->find();
        $jkstate = Db::name("setting")->where("vkey","jkstate")->find();
        $close = Db::name("setting")->where("vkey","close")->find();
        $payQf = Db::name("setting")->where("vkey","payQf")->find();
        $wxpay = Db::name("setting")->where("vkey","wxpay")->find();
        $zfbpay = Db::name("setting")->where("vkey","zfbpay")->find();


        return json($this->getReturn(1,"成功",array(
            "user"=>$user['vvalue'],
            "pass"=>$pass['vvalue'],
            "notifyUrl"=>$notifyUrl['vvalue'],
            "returnUrl"=>$returnUrl['vvalue'],
            "key"=>$key['vvalue'],
            "lastheart"=>$lastheart['vvalue'],
            "lastpay"=>$lastpay['vvalue'],
            "jkstate"=>$jkstate['vvalue'],
            "close"=>$close['vvalue'],
            "payQf"=>$payQf['vvalue'],
            "wxpay"=>$wxpay['vvalue'],
            "zfbpay"=>$zfbpay['vvalue'],

        )));


    }
    public function saveSetting(){
        if (!Session::has("admin")){
            return json($this->getReturn(-1,"没有登录"));
        }
        Db::name("setting")->where("vkey","user")->update(array("vvalue"=>input("user")));
        Db::name("setting")->where("vkey","pass")->update(array("vvalue"=>input("pass")));
        Db::name("setting")->where("vkey","notifyUrl")->update(array("vvalue"=>input("notifyUrl")));
        Db::name("setting")->where("vkey","returnUrl")->update(array("vvalue"=>input("returnUrl")));
        Db::name("setting")->where("vkey","key")->update(array("vvalue"=>input("key")));
        Db::name("setting")->where("vkey","close")->update(array("vvalue"=>input("close")));
        Db::name("setting")->where("vkey","payQf")->update(array("vvalue"=>input("payQf")));
        Db::name("setting")->where("vkey","wxpay")->update(array("vvalue"=>input("wxpay")));
        Db::name("setting")->where("vkey","zfbpay")->update(array("vvalue"=>input("zfbpay")));


        return json($this->getReturn());


    }


    public function addPayQrcode(){
        if (!Session::has("admin")){
            return json($this->getReturn(-1,"没有登录"));
        }
        $db = Db::name("pay_qrcode")->insert(array(
            "type"=>input("type"),
            "pay_url"=>input("pay_url"),
            "price"=>input("price"),
        ));
        return json($this->getReturn());

    }

    public function getPayQrcodes(){
        if (!Session::has("admin")){
            return json($this->getReturn(-1,"没有登录"));
        }
        $page = input("page");
        $size = input("limit");

        $obj = Db::table('pay_qrcode')->page($page,$size);

        $obj = $obj->where("type",input("type"));

        $array = $obj->order("id","desc")->select();

        //echo $obj->getLastSql();
        return json(array(
            "code"=>0,
            "msg"=>"获取成功",
            "data"=>$array,
            "count"=> $obj->count()
        ));
    }
    public function delPayQrcode(){
        if (!Session::has("admin")){
            return json($this->getReturn(-1,"没有登录"));
        }
        Db::name("pay_qrcode")->where("id",input("id"))->delete();
        return json($this->getReturn());

    }

    public function getOrders(){
        if (!Session::has("admin")){
            return json($this->getReturn(-1,"没有登录"));
        }
        $page = input("page");
        $size = input("limit");

        $obj = Db::table('pay_order')->page($page,$size);
        if (input("type")){
            $obj = $obj->where("type",input("type"));
        }
        if (input("state")){
            $obj = $obj->where("state",input("state"));
        }


        $array = $obj->order("id","desc")->select();

        //echo $obj->getLastSql();
        return json(array(
            "code"=>0,
            "msg"=>"获取成功",
            "data"=>$array,
            "count"=> $obj->count()
        ));
    }
    public function delOrder(){
        if (!Session::has("admin")){
            return json($this->getReturn(-1,"没有登录"));
        }
        Db::name("pay_order")->where("id",input("id"))->delete();
        return json($this->getReturn());

    }

    public function setBd(){
        if (!Session::has("admin")){
            return json($this->getReturn(-1,"没有登录"));
        }

        $res = Db::name("pay_order")->where("id",input("id"))->find();

        if ($res){

            $url = $res['notify_url'];

            $res2 = Db::name("setting")->where("vkey","key")->find();
            $key = $res2['vvalue'];

            $p = "payId=".$res['pay_id']."&param=".$res['param']."&type=".$res['type']."&price=".$res['price']."&reallyPrice=".$res['really_price'];

            $sign = $res['pay_id'].$res['param'].$res['type'].$res['price'].$res['really_price'].$key;
            $p = $p . "&sign=".md5($sign);


            $re = $this->getCurl($url."?".$p);
            if ($re=="success"){
                if ($res['state']==0){
                    Db::name("tmp_price")->where("price",($res['really_price']*100)."-".$res['type'])->delete();
                }

                Db::name("pay_order")->where("id",$res['id'])->update(array("state"=>1));

                return json($this->getReturn());
            }else{
                return json($this->getReturn(-2,"补单失败",$re));
            }
        }else{
            return json($this->getReturn(-1,"订单不存在"));

        }


    }

    public function delGqOrder(){
        if (!Session::has("admin")){
            return json($this->getReturn(-1,"没有登录"));
        }
        Db::name("pay_order")->where("state","-1")->delete();
        return json($this->getReturn());
    }
    public function delLastOrder(){
        if (!Session::has("admin")){
            return json($this->getReturn(-1,"没有登录"));
        }

        Db::name("pay_order")->where("create_date <".(time()-604800))->delete();
        return json($this->getReturn());
    }




    public function enQrcode($url){

        $qr_code = new QrcodeServer(['generate'=>"display","size",200]);
        $content = $qr_code->createServer($url);

        return response($content,200,['Content-Length'=>strlen($content)])->contentType('image/png');

    }


























    //获取客户IP
    public function ip() {

        return $_SERVER['REMOTE_ADDR'];
    }
    //发送Http请求
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
}
