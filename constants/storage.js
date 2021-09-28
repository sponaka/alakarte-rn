import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.error("Error in saving in async storage");
    }
}

export const getStoredData = async (key) => {
    try {
      let data = await AsyncStorage.getItem(key);
      return data;
    } catch(e) {
      console.error("Error reading value");
    }
}

export const clearAllStoredData = async() => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error("Error while clearing storage data")
  }
}

export const removeStoredData = async (key) => {
  try {
    let data = await AsyncStorage.removeItem(key);
    return data
  } catch(e) {
    console.error("Error occurred while deleting local storage data")
  }
}

export async function secureSave(key, value) {
  if (SecureStore.isAvailableAsync()){
    await SecureStore.setItemAsync(key, value);
  } else {
    storeData(key, value);
  }
}

export async function getSecureData(key) {
  if (SecureStore.isAvailableAsync()){
    let data = await SecureStore.getItemAsync(key);
    return data;
  } else {
    return getStoredData(key);
  }
}

export async function deleteSecureData(key){
  if (SecureStore.isAvailableAsync()) {
    await SecureStore.deleteItemAsync(key);
  }
}
