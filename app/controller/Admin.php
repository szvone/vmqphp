<?php
declare(strict_types=1);
namespace app\controller;

use think\Request;
use think\facade\Db;
use think\Response;

class Admin
{
    public function login(Request $request): Response
    {
        $u = trim((string)($request->post('username') ?? ''));
        $p = (string)($request->post('password') ?? '');
        if ($u === '' || $p === '') {
            return json(['ok'=>false, 'msg'=>'missing params']);
        }
        // 使用查询构造器 + 绑定参数，避免 SQL 注入
        $row = Db::name('admin')->where('username', $u)->find();
        if (!$row) {
            return json(['ok'=>false, 'msg'=>'user not found']);
        }
        // 建议切换到 password_hash/password_verify
        $ok = password_verify($p, (string)($row['password'] ?? ''));
        if (!$ok) {
            return json(['ok'=>false, 'msg'=>'invalid password']);
        }
        // TODO: 生成会话/令牌，写入安全 cookie
        return json(['ok'=>true]);
    }
}
