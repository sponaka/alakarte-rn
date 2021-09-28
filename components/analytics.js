import * as Device from 'expo-device';
import Constants from "expo-constants"
import * as Cellular from 'expo-cellular';
import fetch from './fetch';
import getEnvironment from '../constants/config';

export default async(eventName, data) => {
    let version, manifest = Constants.manifest;
    if (manifest) {
        version = manifest.version;
    }
    let deviceInfo = {
        "manufacturer": Device.manufacturer,
        "brand": Device.brand,
        "model": Device.modelName,
        "ram": Device.totalMemory,
        "deviceYear": Device.deviceYearClass,
        "os_name": Device.osName,
        "os_version": Device.osVersion,
        "os_release": Device.platformApiLevel,
        "app_version": version}

    let networkMapping = {0: 'WIFI', 1: 'CELLULAR_2G', 2: 'CELLULAR_3G', 3: 'CELLULAR_4G', 4: 'CELLULAR_5G'};
    let networkType = await Cellular.getCellularGenerationAsync()
    let networkInfo = {
        "carrier": Cellular.carrier,
        "country": Cellular.isoCountryCode,
        "networkType": networkMapping[networkType]
    };

    let formData = {
        "event_name": eventName,
        "user_data": data,
        "device_info": deviceInfo,
        "network_info": networkInfo
    }

    let config = getEnvironment();
    let response = await fetch(config["apiURL"] + `/analytics`, {
      method: 'POST', body: JSON.stringify(formData)}, true);
}
