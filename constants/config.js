import Constants from "expo-constants";

export default function getEnvironment() {
  let manifest = Constants.manifest;
  let releaseChannel = undefined;
  if (manifest) {
    releaseChannel = manifest.releaseChannel;
  }

  if (releaseChannel === undefined) {
    // no releaseChannel (is undefined) in dev
    return {
      envName: "DEVELOPMENT",
      baseURL: "https://dcapi.dev.dev-cglcloud.com",
    }; // dev env settings
  }
  if (releaseChannel.indexOf("staging") !== -1) {
    // matches staging-v1, staging-v2
    return {
      envName: "STAGING",
      baseURL: "https://dcapppurina.stage.cglcloud.in",
    }; // stage env settings
  }
  if (releaseChannel.indexOf("prod") !== -1) {
    // matches prod-v1, prod-v2, prod-v3
    return {
      envName: "PRODUCTION",
      baseURL: "https://dcapi.dev.dev-cglcloud.com",
    }; // prod env settings
  }
}
