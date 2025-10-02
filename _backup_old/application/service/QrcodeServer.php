<?php
/**
 * Created by PhpStorm.
 * User: vone
 * Date: 2019/4/16
 * Time: 22:13
 */

namespace app\service;


use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\LabelAlignment;
use Endroid\QrCode\QrCode;

class QrcodeServer
{
    protected $_qr;
    protected $_encoding        = 'UTF-8';              // 编码类型
    protected $_size            = 180;                  // 二维码大小
    protected $_logo            = false;                // 是否需要带logo的二维码
    protected $_logo_url        = '';                   // logo图片路径
    protected $_logo_size       = 80;                   // logo大小
    protected $_title           = false;                // 是否需要二维码title
    protected $_title_content   = '';                   // title内容
    protected $_generate        = 'display';            // display-直接显示  writefile-写入文件
    protected $_file_name       = './static/qrcode';    // 写入文件路径
    const MARGIN           = 10;                        // 二维码内容相对于整张图片的外边距
    const WRITE_NAME       = 'png';                     // 写入文件的后缀名
    const FOREGROUND_COLOR = ['r' => 0, 'g' => 0, 'b' => 0, 'a' => 0];          // 前景色
    const BACKGROUND_COLOR = ['r' => 255, 'g' => 255, 'b' => 255, 'a' => 0];    // 背景色

    public function __construct($config) {
        isset($config['generate'])      &&  $this->_generate        = $config['generate'];
        isset($config['encoding'])      &&  $this->_encoding        = $config['encoding'];
        isset($config['size'])          &&  $this->_size            = $config['size'];
        isset($config['logo'])          &&  $this->_logo            = $config['logo'];
        isset($config['logo_url'])      &&  $this->_logo_url        = $config['logo_url'];
        isset($config['logo_size'])     &&  $this->_logo_size       = $config['logo_size'];
        isset($config['title'])         &&  $this->_title           = $config['title'];
        isset($config['title_content']) &&  $this->_title_content   = $config['title_content'];
        isset($config['file_name'])     &&  $this->_file_name       = $config['file_name'];
    }

    /**
     * 生成二维码
     * @param $content //需要写入的内容
     * @return array | page input
     */
    public function createServer($content) {
        $this->_qr = new QrCode($content);
        $this->_qr->setSize($this->_size);
        $this->_qr->setWriterByName(self::WRITE_NAME);
        $this->_qr->setMargin(self::MARGIN);
        $this->_qr->setEncoding($this->_encoding);
        $this->_qr->setErrorCorrectionLevel(ErrorCorrectionLevel::HIGH);   // 容错率
        $this->_qr->setForegroundColor(self::FOREGROUND_COLOR);
        $this->_qr->setBackgroundColor(self::BACKGROUND_COLOR);
        // 是否需要title
        if ($this->_title) {
            $this->_qr->setLabel($this->_title_content, 16, null, LabelAlignment::CENTER);
        }
        // 是否需要logo
        if ($this->_logo) {
            $this->_qr->setLogoPath($this->_logo_url);
            $this->_qr->setLogoWidth($this->_logo_size);
        }

        $this->_qr->setValidateResult(false);

        if ($this->_generate == 'display') {
            // 展示二维码
            // 前端调用 例：<img src="http://localhost/qr.php?url=base64_url_string">
            header('Content-Type: ' . $this->_qr->getContentType());
            return $this->_qr->writeString();
        } else if ($this->_generate == 'writefile') {
            // 写入文件
            $file_name = $this->_file_name;
            return $this->generateImg($file_name);
        } else {
            return ['success' => false, 'message' => 'the generate type not found', 'data' => ''];
        }
    }

    /**
     * 生成文件
     * @param $file_name //目录文件 例: /tmp
     * @return array
     */
    public function generateImg($file_name) {
        $file_path = $file_name . DIRECTORY_SEPARATOR . uniqid() . '.' . self::WRITE_NAME;

        if (!file_exists($file_name)) {
            mkdir($file_name, 0777, true);
        }

        try {
            $this->_qr->writeFile($file_path);
            $data = [
                'url' => $file_path,
                'ext' => self::WRITE_NAME,
            ];
            return ['success' => true, 'message' => 'write qrimg success', 'data' => $data];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => $e->getMessage(), 'data' => ''];
        }
    }

}