
/*
 Copyright 2012-2013, Polyvi Inc. (http://www.xface3.com)
 This program is distributed under the terms of the GNU General Public License.

 This file is part of xFace.

 xFace is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 xFace is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with xFace.  If not, see <http://www.gnu.org/licenses/>.
*/

var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    exec = require('cordova/exec');

channel.onCordovaReady.subscribe(function() {

    var me = window.device;
    me.getInfo(success);

    function success(info) {
        /**ios不支持获取IMEI*/
        me.imei = info.imei === undefined ? "not support" : info.imei;
        /**ios不支持获取IMSI*/
        me.imsi = info.imsi === undefined ? "not support" : info.imsi;
        /** 获取设备能力*/
        me.isCameraAvailable = info.isCameraAvailable;
        me.isFrontCameraAvailable = info.isFrontCameraAvailable;
        me.isCompassAvailable = info.isCompassAvailable;
        me.isAccelerometerAvailable = info.isAccelerometerAvailable;
        me.isLocationAvailable = info.isLocationAvailable;
        me.isWiFiAvailable = info.isWiFiAvailable;
        me.isTelephonyAvailable = info.isTelephonyAvailable;
        me.isSmsAvailable = info.isSmsAvailable;
    }
});
module.exports = {}
