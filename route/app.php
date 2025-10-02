<?php
use think\facade\Route;

// 示例：通知/回调路由（按你的业务改）
Route::get('pay/notify', 'pay/notify');
Route::post('order', 'order/save');
Route::resource('order','order'); // REST 资源路由示例
