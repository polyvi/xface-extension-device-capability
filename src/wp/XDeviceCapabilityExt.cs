using System;
using System.IO;

using xFaceLib.Log;
using xFaceLib.runtime;
using xFaceLib.Util;
using xFaceLib.extensions.advancedFileTransfer;

namespace WPCordovaClassLib.Cordova.Commands
{
    public class DeviceCapability : BaseCommand
    {
        public void getDeviceInfo(string options)
        {
            string res = String.Format("\"isCameraAvailable\":{0},\"isCompassAvailable\":{1},\"isAccelerometerAvailable\":{2},\"isTelephonyAvailable\":{3},\"isSmsAvailable\":{4},\"isFrontCameraAvailable\":{5},\"isWiFiAvailable\":{6},\"isLocationAvailable\":{7}",
                                        this.isCameraAvailable.ToString().ToLower(),
                                        this.isCompassAvailable.ToString().ToLower(),
                                        this.isAccelerometerAvailable.ToString().ToLower(),
                                        this.isTelephonyAvailable.ToString().ToLower(),
                                        this.isSmsAvailable.ToString().ToLower(),
                                        this.isFrontCameraAvailable.ToString().ToLower(),
                                        this.isWifiAvailable.ToString().ToLower(),
                                        this.isLocationAvailable.ToString().ToLower());

            res = "{" + res + "}";
            DispatchCommandResult(new PluginResult(PluginResult.Status.OK, res));
        }

        public bool isCameraAvailable
        {
            get
            {
                return Microsoft.Devices.Camera.IsCameraTypeSupported(Microsoft.Devices.CameraType.Primary);
            }
        }

        public bool isFrontCameraAvailable
        {
            get
            {
                return Microsoft.Devices.Camera.IsCameraTypeSupported(Microsoft.Devices.CameraType.FrontFacing);
            }
        }

        public bool isAccelerometerAvailable
        {
            get
            {
                return Microsoft.Devices.Sensors.Accelerometer.IsSupported;
            }
        }

        public bool isCompassAvailable
        {
            get
            {
                return Microsoft.Devices.Sensors.Compass.IsSupported;
            }
        }

        public bool isWifiAvailable
        {
            get
            {
                return Microsoft.Phone.Net.NetworkInformation.DeviceNetworkInformation.IsWiFiEnabled;
            }
        }

        //不存在相应的 判断API isLocationAvailable
        public bool isLocationAvailable
        {
            get
            {
                //FIXME: 考虑到wp的手机都支持定位故直接返回true值
                return true;
            }
        }

        public bool isSmsAvailable
        {
            get
            {
                //不存在相应的 判断API FIXME: 采用判断是否支持celldata
                return Microsoft.Phone.Net.NetworkInformation.DeviceNetworkInformation.IsCellularDataEnabled;
            }
        }

        public bool isTelephonyAvailable
        {
            get
            {
                //不存在相应的 判断API FIXME: 采用判断是否支持celldata
                return Microsoft.Phone.Net.NetworkInformation.DeviceNetworkInformation.IsCellularDataEnabled;
            }
        }
    }
}
