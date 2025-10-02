<?php
/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace Zxing\Qrcode\Decoder;

/**
 * <p>See ISO 18004:2006, 6.4.1, Tables 2 and 3. This enum encapsulates the various modes in which
 * data can be encoded to bits in the QR code standard.</p>
 *
 * @author Sean Owen
 */
class Mode {
    static  $TERMINATOR;
    static  $NUMERIC;
    static  $ALPHANUMERIC;
    static  $STRUCTURED_APPEND;
    static  $BYTE;
    static  $ECI;
    static  $KANJI;
    static  $FNC1_FIRST_POSITION;
    static  $FNC1_SECOND_POSITION;
    static  $HANZI;


    private  $characterCountBitsForVersions;
    private  $bits;

    function __construct($characterCountBitsForVersions, $bits) {
        $this->characterCountBitsForVersions = $characterCountBitsForVersions;
        $this->bits = $bits;
    }
    static function Init()
    {


        self::$TERMINATOR = new Mode(array(0, 0, 0), 0x00); // Not really a mode...
        self::$NUMERIC = new Mode(array(10, 12, 14), 0x01);
        self::$ALPHANUMERIC = new Mode(array(9, 11, 13), 0x02);
        self::$STRUCTURED_APPEND = new Mode(array(0, 0, 0), 0x03); // Not supported
        self::$BYTE = new Mode(array(8, 16, 16), 0x04);
        self::$ECI = new Mode(array(0, 0, 0), 0x07); // character counts don't apply
        self::$KANJI = new Mode(array(8, 10, 12), 0x08);
        self::$FNC1_FIRST_POSITION = new Mode(array(0, 0, 0), 0x05);
        self::$FNC1_SECOND_POSITION  =new Mode(array(0, 0, 0), 0x09);
        /** See GBT 18284-2000; "Hanzi" is a transliteration of this mode name. */
        self::$HANZI = new Mode(array(8, 10, 12), 0x0D);
    }
    /**
     * @param bits four bits encoding a QR Code data mode
     * @return Mode encoded by these bits
     * @throws IllegalArgumentException if bits do not correspond to a known mode
     */
    public static function forBits($bits) {
        switch ($bits) {
            case 0x0:
                return self::$TERMINATOR;
            case 0x1:
                return self::$NUMERIC;
            case 0x2:
                return self::$ALPHANUMERIC;
            case 0x3:
                return self::$STRUCTURED_APPEND;
            case 0x4:
                return self::$BYTE;
            case 0x5:
                return self::$FNC1_FIRST_POSITION;
            case 0x7:
                return self::$ECI;
            case 0x8:
                return self::$KANJI;
            case 0x9:
                return self::$FNC1_SECOND_POSITION;
            case 0xD:
                // 0xD is defined in GBT 18284-2000, may not be supported in foreign country
                return self::$HANZI;
            default:
                throw new \InvalidArgumentException();
        }
    }

    /**
     * @param version version in question
     * @return number of bits used, in this QR Code symbol {@link Version}, to encode the
     *         count of characters that will follow encoded in this Mode
     */
    public function getCharacterCountBits($version) {
        $number = $version->getVersionNumber();
        $offset = 0;
        if ($number <= 9) {
            $offset = 0;
        } else if ($number <= 26) {
            $offset = 1;
        } else {
            $offset = 2;
        }
        return $this->characterCountBitsForVersions[$offset];
    }

    public function getBits() {
        return $this->bits;
    }

}
Mode::Init();