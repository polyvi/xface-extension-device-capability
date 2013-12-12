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

describe('Device-capability Information (window.device)', function () {
    if(isAndroid()) {
        it("device-capability.spec.1 should contain a imei specification that is a string or a number", function() {
            expect(window.device.imei).toBeDefined();
            if (typeof window.device.imei == 'string' || typeof window.device.imei == 'object') {
                expect((new String(window.device.imei)).length > 0).toBe(true);
            } else {
                expect(window.device.imei > 0).toBe(true);
            }
        });

        it("device-capability.spec.2 should contain a imsi specification that is a string or a number,this will error if has no simcard or on pad", function() {
            expect(window.device.imsi).toBeDefined();
            if (typeof window.device.imsi == 'string' || typeof window.device.imsi == 'object') {
                expect((new String(window.device.imsi)).length >= 0).toBe(true);
            } else {
                expect(window.device.imsi > 0).toBe(true);
            }
        });
    }

    it("device-capability.spec.3 should contain a isCameraAvailable specification that is a boolean", function() {
        expect(window.device.isCameraAvailable).toBeDefined();
        expect(typeof window.device.isCameraAvailable == 'boolean').toBe(true);
    });

    it("device-capability.spec.4 should contain a isFrontCameraAvailable specification that is a boolean", function() {
        expect(window.device.isFrontCameraAvailable).toBeDefined();
        expect(typeof window.device.isFrontCameraAvailable == 'boolean').toBe(true);
    });

    it("device-capability.spec.5 should contain a isCompassAvailable specification that is a boolean", function() {
        expect(window.device.isCompassAvailable).toBeDefined();
        expect(typeof window.device.isCompassAvailable == 'boolean').toBe(true);
    });

    it("device-capability.spec.6 should contain a isAccelerometerAvailable specification that is a boolean", function() {
        expect(window.device.isAccelerometerAvailable).toBeDefined();
        expect(typeof window.device.isAccelerometerAvailable == 'boolean').toBe(true);
    });

    it("device-capability.spec.7 should contain a isLocationAvailable specification that is a boolean", function() {
        expect(window.device.isLocationAvailable).toBeDefined();
        expect(typeof window.device.isLocationAvailable == 'boolean').toBe(true);
    });

    it("device-capability.spec.8 should contain a isWiFiAvailable specification that is a boolean", function() {
        expect(window.device.isAccelerometerAvailable).toBeDefined();
        expect(typeof window.device.isWiFiAvailable == 'boolean').toBe(true);
    });

    it("device-capability.spec.9 should contain a isTelephonyAvailable specification that is a boolean", function() {
        expect(window.device.isTelephonyAvailable).toBeDefined();
        expect(typeof window.device.isTelephonyAvailable == 'boolean').toBe(true);
    });

    it("device-capability.spec.10 should contain a isSmsAvailable specification that is a boolean", function() {
        expect(window.device.isSmsAvailable).toBeDefined();
        expect(typeof window.device.isSmsAvailable == 'boolean').toBe(true);
    });

});
