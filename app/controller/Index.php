<?php
declare(strict_types=1);
namespace app\controller;

use think\facade\View;
use think\Request;

class Index
{
    public function index(Request $request)
    {
        $name = (string)($request->get('name') ?? 'vmqphp');
        View::assign('name', $name);
        return View::fetch('index'); // 对应 app/view/index/index.html
    }
}
