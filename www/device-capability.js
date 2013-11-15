/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
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
