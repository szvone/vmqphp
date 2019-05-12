<?php
namespace app\index\controller;

use think\Db;
use think\facade\Session;

class Index
{
    public function index()
    {
        return 'by:vone';
    }

    public function getReturn($code = 1, $msg = "成功", $data = null)
    {
        return array("code" => $code, "msg" => $msg, "data" => $data);
    }

    //后台用户登录
    public function login()
    {
        $user = input("user");
        $pass = input("pass");

        $_user = Db::name("setting")->where("vkey", "user")->find();
        if ($user != $_user["vvalue"]) {
            return json($this->getReturn(-1, "账号或密码错误"));
        }

        $_pass = Db::name("setting")->where("vkey", "pass")->find();
        if ($pass != $_pass["vvalue"]) {
            return json($this->getReturn(-1, "账号或密码错误"));
        }

        Session::set("admin", 1);

        return json($this->getReturn());
    }


    //后台菜单
    public function getMenu()
    {
        if (!Session::has("admin")) {
            return json($this->getReturn(-1, "没有登录"));
        }


        $menu = array(
            array(
                "name" => "系统设置",
                "type" => "url",
                "url" => "admin/setting.html?t=" . time(),
            ),
            array(
                "name" => "监控端设置",
                "type" => "url",
                "url" => "admin/jk.html?t=" . time(),
            ),
            array(
                "name" => "微信二维码",
                "type" => "menu",
                "node" => array(
                    array(
                        "name" => "添加",
                        "type" => "url",
                        "url" => "admin/addwxqrcode.html?t=" . time(),
                    ),
                    array(
                        "name" => "管理",
                        "type" => "url",
                        "url" => "admin/wxqrcodelist.html?t=" . time(),
                    )
                ),
            ), array(
                "name" => "支付宝二维码",
                "type" => "menu",
                "node" => array(
                    array(
                        "name" => "添加",
                        "type" => "url",
                        "url" => "admin/addzfbqrcode.html?t=" . time(),
                    ),
                    array(
                        "name" => "管理",
                        "type" => "url",
                        "url" => "admin/zfbqrcodelist.html?t=" . time(),
                    )
                ),
            ), array(
                "name" => "订单列表",
                "type" => "url",
                "url" => "admin/orderlist.html?t=" . time(),
            ), array(
                "name" => "Api说明",
                "type" => "url",
                "url" => "api.html?t=" . time(),
            )
        );

        return json($menu);

    }

    //创建订单
    public function createOrder()
    {
        $this->closeEndOrder();

        $payId = input("payId");
        if (!$payId || $payId == "") {
            return json($this->getReturn(-1, "请传入商户订单号"));
        }
        $type = input("type");
        if (!$type || $type == "") {
            return json($this->getReturn(-1, "请传入支付方式=>1|微信 2|支付宝"));
        }
        if ($type != 1 && $type != 2) {
            return json($this->getReturn(-1, "支付方式错误=>1|微信 2|支付宝"));
        }

        $price = input("price");
        if (!$price || $price == "") {
            return json($this->getReturn(-1, "请传入订单金额"));
        }
        if ($price <= 0) {
            return json($this->getReturn(-1, "订单金额必须大于0"));
        }

        $sign = input("sign");
        if (!$sign || $sign == "") {
            return json($this->getReturn(-1, "请传入签名"));
        }

        $isHtml = input("isHtml");
        if (!$isHtml || $isHtml == "") {
            $isHtml = 0;
        }
        $param = input("param");
        if (!$param) {
            $param = "";
        }

        $res = Db::name("setting")->where("vkey", "key")->find();
        $key = $res['vvalue'];

        if (input("notifyUrl")) {
            $notify_url = input("notifyUrl");
        } else {
            $res = Db::name("setting")->where("vkey", "notifyUrl")->find();
            $notify_url = $res['vvalue'];
        }

        if (input("returnUrl")) {
            $return_url = input("returnUrl");
        } else {
            $res = Db::name("setting")->where("vkey", "returnUrl")->find();
            $return_url = $res['vvalue'];
        }


        $_sign = md5($payId . $param . $type . $price . $key);
        if ($sign != $_sign) {
            return json($this->getReturn(-1, "签名错误"));
        }

        $jkstate = Db::name("setting")->where("vkey", "jkstate")->find();
        $jkstate = $jkstate['vvalue'];
        if ($jkstate!="1"){
            return json($this->getReturn(-1, "监控端状态异常，请检查"));

        }



        $reallyPrice = bcmul($price ,100);

        $payQf = Db::name("setting")->where("vkey", "payQf")->find();
        $payQf = $payQf['vvalue'];


        $orderId = date("YmdHms") . rand(1, 9) . rand(1, 9) . rand(1, 9) . rand(1, 9);

        $ok = false;
        for ($i = 0; $i < 10; $i++) {
            $tmpPrice = $reallyPrice . "-" . $type;

            $row = Db::execute("INSERT IGNORE INTO tmp_price (price,oid) VALUES ('" . $tmpPrice . "','".$orderId."')");
            if ($row) {
                $ok = true;
                break;
            }
            if ($payQf == 1) {
                $reallyPrice++;
            } else if ($payQf == 2) {
                $reallyPrice--;
            }
        }

        if (!$ok) {
            return json($this->getReturn(-1, "订单超出负荷，请稍后重试"));
        }
        //echo $reallyPrice;

        $reallyPrice = bcdiv($reallyPrice, 100,2);

        if ($type == 1) {
            $payUrl = Db::name("setting")->where("vkey", "wxpay")->find();
            $payUrl = $payUrl['vvalue'];

        } else if ($type == 2) {
            $payUrl = Db::name("setting")->where("vkey", "zfbpay")->find();
            $payUrl = $payUrl['vvalue'];
        }

        if ($payUrl == "") {
            return json($this->getReturn(-1, "请您先进入后台配置程序"));
        }
        $isAuto = 1;
        $_payUrl = Db::name("pay_qrcode")
            ->where("price", $reallyPrice)
            ->where("type", $type)
            ->find();
        if ($_payUrl) {
            $payUrl = $_payUrl['pay_url'];
            $isAuto = 0;
        }


        $res = Db::name("pay_order")->where("pay_id", $payId)->find();
        if ($res) {
            return json($this->getReturn(-1, "商户订单号已存在"));
        }




        $createDate = time();
        $data = array(
            "close_date" => 0,
            "create_date" => $createDate,
            "is_auto" => $isAuto,
            "notify_url" => $notify_url,
            "order_id" => $orderId,
            "param" => $param,
            "pay_date" => 0,
            "pay_id" => $payId,
            "pay_url" => $payUrl,
            "price" => $price,
            "really_price" => $reallyPrice,
            "return_url" => $return_url,
            "state" => 0,
            "type" => $type

        );


        Db::name("pay_order")->insert($data);


        //return "<script>window.location.href = '/payPage/pay.html?orderId=" + c.getOrderId() + "'</script>";

        if ($isHtml == 1) {

            echo "<script>window.location.href = 'payPage/pay.html?orderId=" . $orderId . "'</script>";

        } else {
            $time = Db::name("setting")->where("vkey", "close")->find();
            $data = array(
                "payId" => $payId,
                "orderId" => $orderId,
                "payType" => $type,
                "price" => $price,
                "reallyPrice" => $reallyPrice,
                "payUrl" => $payUrl,
                "isAuto" => $isAuto,
                "state" => 0,
                "timeOut" => $time['vvalue'],
                "date" => $createDate
            );
            return json($this->getReturn(1, "成功", $data));

        }


    }
    //获取订单信息
    public function getOrder()
    {

        $res = Db::name("pay_order")->where("order_id", input("orderId"))->find();
        if ($res){
            $time = Db::name("setting")->where("vkey", "close")->find();

            $data = array(
                "payId" => $res['pay_id'],
                "orderId" => $res['order_id'],
                "payType" => $res['type'],
                "price" => $res['price'],
                "reallyPrice" => $res['really_price'],
                "payUrl" => $res['pay_url'],
                "isAuto" => $res['is_auto'],
                "state" => $res['state'],
                "timeOut" => $time['vvalue'],
                "date" => $res['create_date']
            );
            return json($this->getReturn(1, "成功", $data));
        }else{
            return json($this->getReturn(-1, "云端订单编号不存在"));
        }
    }
    //查询订单状态
    public function checkOrder()
    {
        $res = Db::name("pay_order")->where("order_id", input("orderId"))->find();
        if ($res){
            if ($res['state']==0){
                return json($this->getReturn(-1, "订单未支付"));
            }
            if ($res['state']==-1){
                return json($this->getReturn(-1, "订单已过期"));
            }

            $res2 = Db::name("setting")->where("vkey","key")->find();
            $key = $res2['vvalue'];

            $res['price'] = number_format($res['price'],2,".","");
            $res['really_price'] = number_format($res['really_price'],2,".","");


            $p = "payId=".$res['pay_id']."&param=".$res['param']."&type=".$res['type']."&price=".$res['price']."&reallyPrice=".$res['really_price'];

            $sign = $res['pay_id'].$res['param'].$res['type'].$res['price'].$res['really_price'].$key;
            $p = $p . "&sign=".md5($sign);

            $url = $res['return_url'];



            if (strpos($url,"?")===false){
                $url = $url."?".$p;
            }else{
                $url = $url.$p;
            }

            return json($this->getReturn(1, "成功", $url));
        }else{
            return json($this->getReturn(-1, "云端订单编号不存在"));
        }

    }
    //关闭订单
    public function closeOrder(){
        $res2 = Db::name("setting")->where("vkey","key")->find();
        $key = $res2['vvalue'];
        $orderId = input("orderId");

        $_sign = $orderId.$key;

        if (md5($_sign)!=input("sign")){
            return json($this->getReturn(-1, "签名校验不通过"));
        }

        $res = Db::name("pay_order")->where("order_id",$orderId)->find();

        if ($res){
            if ($res['state']!=0){
                return json($this->getReturn(-1, "订单状态不允许关闭"));
            }
            Db::name("pay_order")->where("order_id",$orderId)->update(array("state"=>-1,"close_date"=>time()));
            Db::name("tmp_price")
                ->where("oid",$res['order_id'])
                ->delete();
            return json($this->getReturn(1, "成功"));
        }else{
            return json($this->getReturn(-1, "云端订单编号不存在"));

        }

    }
    //获取监控端状态
    public function getState(){
        $res2 = Db::name("setting")->where("vkey","key")->find();
        $key = $res2['vvalue'];
        $t = input("t");

        $_sign = $t.$key;

        if (md5($_sign)!=input("sign")){
            return json($this->getReturn(-1, "签名校验不通过"));
        }

        $res = Db::name("setting")->where("vkey","lastheart")->find();
        $lastheart = $res['vvalue'];
        $res = Db::name("setting")->where("vkey","lastpay")->find();
        $lastpay = $res['vvalue'];
        $res = Db::name("setting")->where("vkey","jkstate")->find();
        $jkstate = $res['vvalue'];

        return json($this->getReturn(1, "成功",array("lastheart"=>$lastheart,"lastpay"=>$lastpay,"jkstate"=>$jkstate)));

    }

    //App心跳接口
    public function appHeart(){
        $this->closeEndOrder();

        $res2 = Db::name("setting")->where("vkey","key")->find();
        $key = $res2['vvalue'];
        $t = input("t");

        $_sign = $t.$key;

        if (md5($_sign)!=input("sign")){
            return json($this->getReturn(-1, "签名校验不通过"));
        }

        $jg = time()*1000 - $t;
        if ($jg>50000 || $jg<-50000){
            return json($this->getReturn(-1, "客户端时间错误"));
        }

        Db::name("setting")->where("vkey","lastheart")->update(array("vvalue"=>time()));
        Db::name("setting")->where("vkey","jkstate")->update(array("vvalue"=>1));
        return json($this->getReturn());
    }
    //App推送付款数据接口
    public function appPush(){
        $this->closeEndOrder();

        $res2 = Db::name("setting")->where("vkey","key")->find();
        $key = $res2['vvalue'];
        $t = input("t");
        $type = input("type");
        $price = input("price");

        $_sign = $type.$price.$t.$key;

        if (md5($_sign)!=input("sign")){
            return json($this->getReturn(-1, "签名校验不通过"));
        }

        $jg = time()*1000 - $t;
        if ($jg>50000 || $jg<-50000){
            return json($this->getReturn(-1, "客户端时间错误"));
        }

        Db::name("setting")
            ->where("vkey","lastpay")
            ->update(
                array(
                    "vvalue"=>time()
                )
            );

        $res = Db::name("pay_order")
            ->where("really_price",$price)
            ->where("state",0)
            ->where("type",$type)
            ->find();



        if ($res){

            Db::name("tmp_price")
                ->where("oid",$res['order_id'])
                ->delete();

            Db::name("pay_order")->where("id",$res['id'])->update(array("state"=>1,"pay_date"=>time(),"close_date"=>time()));

            $url = $res['notify_url'];

            $res2 = Db::name("setting")->where("vkey","key")->find();
            $key = $res2['vvalue'];

            $p = "payId=".$res['pay_id']."&param=".$res['param']."&type=".$res['type']."&price=".$res['price']."&reallyPrice=".$res['really_price'];

            $sign = $res['pay_id'].$res['param'].$res['type'].$res['price'].$res['really_price'].$key;
            $p = $p . "&sign=".md5($sign);

            if (strpos($url,"?")===false){
                $url = $url."?".$p;
            }else{
                $url = $url.$p;
            }


            $re = $this->getCurl($url);
            if ($re=="success"){
                return json($this->getReturn());
            }else{
                Db::name("pay_order")->where("id",$res['id'])->update(array("state"=>2));

                return json($this->getReturn(-1,"异步通知失败"));
            }


        }else{
            $data = array(
                "close_date" => 0,
                "create_date" => time(),
                "is_auto" => 0,
                "notify_url" => "",
                "order_id" => "无订单转账",
                "param" => "无订单转账",
                "pay_date" => 0,
                "pay_id" => "无订单转账",
                "pay_url" => "",
                "price" => $price,
                "really_price" => $price,
                "return_url" => "",
                "state" => 1,
                "type" => $type

            );

            Db::name("pay_order")->insert($data);
            return json($this->getReturn());

        }


    }


    //关闭过期订单接口(请用定时器至少1分钟调用一次)
    public function closeEndOrder(){
        $res = Db::name("setting")->where("vkey","lastheart")->find();
        $lastheart = $res['vvalue'];
        if ((time()-$lastheart)>60){
            Db::name("setting")->where("vkey","jkstate")->update(array("vvalue"=>0));
        }



        $time = Db::name("setting")->where("vkey", "close")->find();

        $closeTime = time()-60*$time['vvalue'];
        $close_date = time();

        $res = Db::name("pay_order")
            ->where("create_date <=".$closeTime)
            ->where("state",0)
            ->update(array("state"=>-1,"close_date"=>$close_date));

        if ($res){
            $rows = Db::name("pay_order")->where("close_date",$close_date)->select();
            foreach ($rows as $row){
                Db::name("tmp_price")
                    ->where("oid",$row['order_id'])
                    ->delete();
            }
            return json($this->getReturn(1,"成功清理".$res."条订单"));
        }else{
            return json($this->getReturn(1,"没有等待清理的订单"));
        }



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