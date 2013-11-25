
/*
 Copyright 2012-2013, Polyvi Inc. (http://polyvi.github.io/openxface)
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

package com.polyvi.xface.extension.devicecapability;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.polyvi.xface.util.XStringUtils;

import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.telephony.TelephonyManager;

public class XDeviceCapabilityExt extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args,
            CallbackContext callbackContext) throws JSONException {
        if (action.equals("getDeviceInfo")) {
            JSONObject r = new JSONObject();
            Context context = this.cordova.getActivity();
            r.put("imei", this.getImei(context));
            r.put("imsi", this.getImsi(context));
            r.put("isCameraAvailable", this.isCameraAvailable(context));
            r.put("isFrontCameraAvailable",
                    this.isFrontCameraAvailable(context));
            r.put("isCompassAvailable", this.isCompassAvailable(context));
            r.put("isAccelerometerAvailable",
                    this.isAccelerometerAvailable(context));
            r.put("isLocationAvailable", this.isLocationAvailable(context));
            r.put("isWiFiAvailable", this.isWiFiAvailable(context));
            r.put("isTelephonyAvailable", this.isTelephonyAvailable(context));
            r.put("isSmsAvailable", this.isSmsAvailable(context));
            callbackContext.success(r);
        } else {
            return false;
        }
        return true;
    }

    /**
     * 获取device的International Mobile Equipment Identity(IMEI)
     *
     * @param context
     * @return
     */
    private String getImei(Context context) {
        TelephonyManager tm = (TelephonyManager) context
                .getSystemService(Context.TELEPHONY_SERVICE);
        return tm.getDeviceId();
    }

    /**
     * 获取device的国际移动用户识别码(IMSI)
     *
     * @param context
     * @return
     */
    private String getImsi(Context context) {
        TelephonyManager tm = (TelephonyManager) context
                .getSystemService(Context.TELEPHONY_SERVICE);
        return XStringUtils.isEmptyString(tm.getSubscriberId()) ? "" : tm
                .getSubscriberId();
    }

    /**
     * 判断照相机功能是否可用
     *
     * @param context
     * @return true:可用，false：不可用
     */
    private boolean isCameraAvailable(Context context) {
        return context.getPackageManager().hasSystemFeature(
                PackageManager.FEATURE_CAMERA);
    }

    /**
     * 判断前置摄像头功能是否可用
     *
     * @param context
     * @return true:可用，false：不可用
     */
    private boolean isFrontCameraAvailable(Context context) {
        // 低于2.3的原生系统都不支持前置摄像头
        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.FROYO) {
            return false;
        }
        return context.getPackageManager().hasSystemFeature(
                PackageManager.FEATURE_CAMERA_FRONT);
    }

    /**
     * 判断指南针功能是否可用
     *
     * @param context
     * @return true:可用，false：不可用
     */
    private boolean isCompassAvailable(Context context) {
        return context.getPackageManager().hasSystemFeature(
                PackageManager.FEATURE_SENSOR_COMPASS);
    }

    /**
     * 判断加速度计功能是否可用
     *
     * @param context
     * @return true:可用，false：不可用
     */
    private boolean isAccelerometerAvailable(Context context) {
        return context.getPackageManager().hasSystemFeature(
                PackageManager.FEATURE_SENSOR_ACCELEROMETER);
    }

    /**
     * 判断定位功能是否可用
     *
     * @param context
     * @return true:可用，false：不可用
     */
    private boolean isLocationAvailable(Context context) {
        return context.getPackageManager().hasSystemFeature(
                PackageManager.FEATURE_LOCATION);
    }

    /**
     * 判断WIFI功能是否可用
     *
     * @param context
     * @return true:可用，false：不可用
     */
    private boolean isWiFiAvailable(Context context) {
        return context.getPackageManager().hasSystemFeature(
                PackageManager.FEATURE_WIFI);
    }

    /**
     * 判断电话功能是否可用
     *
     * @param context
     * @return true:可用，false：不可用
     */
    private boolean isTelephonyAvailable(Context context) {
        return context.getPackageManager().hasSystemFeature(
                PackageManager.FEATURE_TELEPHONY);
    }

    /**
     * 判断短信功能是否可用
     *
     * @param context
     * @return true:可用，false：不可用
     */
    private boolean isSmsAvailable(Context context) {
        return isTelephonyAvailable(context);
    }

}
