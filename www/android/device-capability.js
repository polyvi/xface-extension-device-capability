
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
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

function DeviceCapability() {
    this.imei = null;
    this.imsi = null;
    this.isCameraAvailable = null;
    this.isFrontCameraAvailable = null;
    this.isCompassAvailable = null;
    this.isAccelerometerAvailable = null;
    this.isLocationAvailable = null;
    this.isWiFiAvailable = null;
    this.isTelephonyAvailable = null;
    this.isSmsAvailable = null;

    var me = this;

    channel.onCordovaReady.subscribe(function() {
        me.getInfo(function(info) {
            device.imei = info.imei;
            device.imsi = info.imsi;
            /** 获取设备能力*/
            device.isCameraAvailable = info.isCameraAvailable;
            device.isFrontCameraAvailable = info.isFrontCameraAvailable;
            device.isCompassAvailable = info.isCompassAvailable;
            device.isAccelerometerAvailable = info.isAccelerometerAvailable;
            device.isLocationAvailable = info.isLocationAvailable;
            device.isWiFiAvailable = info.isWiFiAvailable;
            device.isTelephonyAvailable = info.isTelephonyAvailable;
            device.isSmsAvailable = info.isSmsAvailable;
        },function(e) {
            utils.alert("[ERROR] Error initializing xFace: " + e);
        });
    });
};

/**
 * Get Device Capability info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
DeviceCapability.prototype.getInfo = function(successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'DeviceCapability.getInfo', arguments);
    exec(successCallback, errorCallback, "DeviceCapability", "getDeviceInfo", []);
};

module.exports = new DeviceCapability();
