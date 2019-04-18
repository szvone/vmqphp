<?php

namespace Zxing;

interface Reader {

    public function decode($image);


    public  function reset();


}