<?php

namespace Zxing;

require_once('qrcode/QRCodeReader.php');

interface Reader {

    public function decode($image);


    public  function reset();


}