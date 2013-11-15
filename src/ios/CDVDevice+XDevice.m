/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

#import <Cordova/CDV.h>
#import "CDVDevice.h"
#import <CoreLocation/CoreLocation.h>
#import <CoreMotion/CoreMotion.h>

@interface CDVDevice ()
- (NSDictionary*)deviceProperties;
@end

@implementation CDVDevice (XDevice)

- (void)getDeviceInfo:(CDVInvokedUrlCommand*)command
{
    NSMutableDictionary* devProps =  [NSMutableDictionary dictionaryWithDictionary:[self deviceProperties]];

    [devProps setObject:@([self isCameraAvailable]) forKey:@"isCameraAvailable"];
    [devProps setObject:@([self isFrontCameraAvailable]) forKey:@"isFrontCameraAvailable"];
    [devProps setObject:@([self isCompassAvailable]) forKey:@"isCompassAvailable"];
    [devProps setObject:@([self isAccelerometerAvailable]) forKey:@"isAccelerometerAvailable"];
    [devProps setObject:@([self isLocationAvailable]) forKey:@"isLocationAvailable"];
    [devProps setObject:@([self isWiFiAvailable]) forKey:@"isWiFiAvailable"];
    [devProps setObject:@([self isTelephonyAvailable]) forKey:@"isTelephonyAvailable"];
    [devProps setObject:@([self isSmsAvailable]) forKey:@"isSmsAvailable"];

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:devProps];

    /* Settings.plist
     * Read the optional Settings.plist file and push these user-defined settings down into the web application.
     * This can be useful for supplying build-time configuration variables down to the app to change its behavior,
     * such as specifying Full / Lite version, or localization (English vs German, for instance).
     */
    // TODO: turn this into an iOS only plugin
    NSDictionary* temp = [CDVViewController getBundlePlist:@"Settings"];

    if ([temp respondsToSelector:@selector(JSONString)]) {
        NSLog(@"Deprecation warning: window.Setting will be removed Aug 2013. Refer to https://issues.apache.org/jira/browse/CB-2433");
        NSString* js = [NSString stringWithFormat:@"window.Settings = %@;", [temp JSONString]];
        [self.commandDelegate evalJs:js];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


//Returns the current version of product as read from the info.plist
- (NSString*) productVersion
{
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];//get product version
}

- (BOOL) isCameraAvailable
{
    return [UIImagePickerController isSourceTypeAvailable: UIImagePickerControllerSourceTypeCamera];
}

- (BOOL) isFrontCameraAvailable
{
    return [UIImagePickerController isCameraDeviceAvailable: UIImagePickerControllerCameraDeviceFront];
}

- (BOOL) isLocationAvailable
{
    return [CLLocationManager regionMonitoringAvailable];
}

- (BOOL) isWiFiAvailable
{
    /*XNetworkReachability *reachability = [XNetworkReachability reachabilityForInternetConnection];
     [reachability startNotifier];

     NetworkStatus status = [reachability currentReachabilityStatus];
     [reachability stopNotifier];

     return (status == ReachableViaWiFi);*/
    return YES;
}

- (BOOL) isCompassAvailable
{
    return [CLLocationManager headingAvailable];
}

-(BOOL) isAccelerometerAvailable
{
    CMMotionManager *manager = [[CMMotionManager alloc] init];
    return manager.accelerometerAvailable;
}

-(BOOL) isTelephonyAvailable
{
    NSURL* tel = [NSURL URLWithString:@"tel://1"];
    return ([[UIApplication sharedApplication] canOpenURL:tel]);
}

-(BOOL) isSmsAvailable
{
    NSURL* sms = [NSURL URLWithString:@"sms://1"];
    return ([[UIApplication sharedApplication] canOpenURL:sms]);
}


@end
