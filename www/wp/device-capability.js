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
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

channel.createSticky('onxCordovaInfoReady');
// Tell cordova channel to wait on the CordovaInfoReady event
channel.waitForInitialization('onxCordovaInfoReady');

/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
function DeviceCapability() {
    this.imei = null;
    this.imsi = null;
    this.isCameraAvailable = false;
    this.isFrontCameraAvailable = false;
    this.isCompassAvailable = false;
    this.isAccelerometerAvailable = false;
    this.isLocationAvailable = false;
    this.isWiFiAvailable = false;
    this.isTelephonyAvailable = false;
    this.isSmsAvailable = false;

    var me = this;

    channel.onCordovaReady.subscribe(function() {
        me.getInfo(function (info) {
            /** 获取设备能力*/
            device.isCameraAvailable = info.isCameraAvailable;
            device.isFrontCameraAvailable = info.isFrontCameraAvailable;
            device.isCompassAvailable = info.isCompassAvailable;
            device.isAccelerometerAvailable = info.isAccelerometerAvailable;
            device.isLocationAvailable = info.isLocationAvailable;
            device.isWiFiAvailable = info.isWiFiAvailable;
            device.isTelephonyAvailable = info.isTelephonyAvailable;
            device.isSmsAvailable = info.isSmsAvailable;
            channel.onxCordovaInfoReady.fire();
        },function(e) {
            utils.alert("[ERROR] Error initializing XDevice : " + e);
        });
    });
}

/**
 * Get device info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
DeviceCapability.prototype.getInfo = function (successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'DeviceCapability.getInfo', arguments);
    exec(successCallback, errorCallback, "DeviceCapability", "getDeviceInfo", []);
};

module.exports = new DeviceCapability();