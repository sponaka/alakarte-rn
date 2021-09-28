import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Snackbar } from "react-native-paper";
import { Appbar } from "react-native-paper";
import * as RootNavigation from "./../../RootNavigation";
import { connect } from "react-redux";
import { userActions } from "./../../actions";
import { Card, Paragraph } from "react-native-paper";
import { TextInput } from "react-native-paper";
// import * as Permissions from "expo";
// import * as Location from "expo-location";
// import * as Constants from "expo-constants";
import { ActivityIndicator, Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      address: null,
      errorMessage: null,
      submitted: false,
      visible: false,
      customer_email: "",
      customer_name: "",
      taxID: "",
      phone_number: "",
      errorMessageSnackbar: false
    };
  }


  async componentDidUpdate(prevProps) {
    if (prevProps.userRegistered !== this.props.userRegistered) {
      if (this.props.userRegistered === true) {
        await this.setUserDetails();
        RootNavigation.navigate("Cart");
      }
    }
    if(prevProps.errorMessageOnRegister !== this.props.errorMessageOnRegister) {
      this.setState({
        errorMessageSnackbar: true
      })
    }
  }

  async setUserDetails() {
    await AsyncStorage.setItem("user", JSON.stringify(this.props.userDetails));
  }

  registerUser() {
    this.setState({
      submitted: true,
    });
    const { customer_email, customer_name, taxID, phone_number } = this.state;
    if (customer_name && customer_email && taxID && phone_number) {
      this.props.registerUser({
        name: customer_name,
        description: JSON.stringify(this.state.address),
        tax_id: taxID,
        phone_number: phone_number + "",
        contact_name: customer_name,
        contact_email: customer_email,
        contact_phone_number: phone_number + "",
        country: "IN",
        active: true,
      });
    }
  }

  async componentDidMount() {
    // if (Platform.OS === "android" && !Constants.default.isDevice) {
    //   this.setState({
    //     errorMessage:
    //       "Oops, this will not work on Sketch in an Android emulator. Try it on your device!",
    //   });
    // } else {
    //   await this._getLocationAsync();
    // }
  }

  navigateTo = () => {
    RootNavigation.navigate("Browser");
  };

  // _getLocationAsync = async () => {
  //   try {
  //     let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //     if (status !== "granted") {
  //       this.setState({
  //         errorMessage: "Permission to access location was denied",
  //       });
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     let lat = await location.coords.latitude;
  //     let lng = await location.coords.longitude;
  //     let address = await Location.reverseGeocodeAsync({
  //       latitude: lat,
  //       longitude: lng,
  //     });

  //     this.setState({ address });
  //   } catch (error) {
  //     let status = Location.getProviderStatusAsync();
  //     if (!status.locationServicesEnabled) {
  //       this.setState({ isLocationModalVisible: true });
  //     }
  //   }
  // };

  render() {
    const styles = StyleSheet.create({
      appHeaderStyle: {
        backgroundColor: "#fff",
        color: "#424242",
        elevation: 1,
      },
    });

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Appbar.Header style={styles.appHeaderStyle}>
          <Appbar.BackAction
            onPress={() => {
              this.navigateTo();
            }}
            style={{ marginTop: 10, backgroundColor: "#fff" }}
          />

          <Appbar.Content
            title="Register yourself"
            style={{ marginLeft: -13 }}
          />
        </Appbar.Header>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ backgroundColor: "#fff" }}>
            <View style={{ position: "relative" }}>
              {this.props.isRegistering ? (
                <View
                  style={{
                    backgroundColor: "transparent",
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    height: Dimensions.get("window").height,
                    width: Dimensions.get("window").width,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                >
                  <ActivityIndicator
                    size="large"
                    animating={true}
                    color={Colors.red800}
                  />
                </View>
              ) : (
                <View></View>
              )}

              <ScrollView showsVerticalScrollIndicator={false}>
                <Card style={{ paddingHorizontal: 8 }}>
                  <Card.Content>
                    <Paragraph> Name </Paragraph>
                    <TextInput
                      style={{
                        backgroundColor: "#fff",
                        height: 50,
                        paddingHorizontal: 3,
                      }}
                      value={this.state.customer_name}
                      onChangeText={(text) =>
                        this.setState({ customer_name: text })
                      }
                    />
                    {this.state.submitted && !this.state.customer_name && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                          marginHorizontal: 0,
                        }}
                      >
                        Please mention your name.{" "}
                      </Text>
                    )}
                    <Paragraph style={{ marginTop: 15 }}>Tax ID</Paragraph>
                    <View>
                      <TextInput
                        style={{
                          backgroundColor: "#fff",
                          height: 50,
                          paddingRight: 20,
                          paddingHorizontal: 3,
                        }}
                        value={this.state.taxID}
                        onChangeText={(text) => this.setState({ taxID: text })}
                      />
                    </View>
                    {this.state.submitted && !this.state.taxID && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                          marginHorizontal: 0,
                        }}
                      >
                        Please mention your TaxID.{" "}
                      </Text>
                    )}

                    <Paragraph style={{ marginTop: 15 }}>
                      Phone Number
                    </Paragraph>
                    <TextInput
                      keyboardType="numeric"
                      style={{
                        backgroundColor: "#fff",
                        height: 50,
                        paddingHorizontal: 3,
                      }}
                      value={this.state.phone_number}
                      onChangeText={(text) =>
                        this.setState({ phone_number: text })
                      }
                    />

                    {this.state.submitted && !this.state.phone_number && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                          marginHorizontal: 0,
                        }}
                      >
                        Please add your phone number
                      </Text>
                    )}

                    <Paragraph style={{ marginTop: 15 }}> Email </Paragraph>
                    <TextInput
                      style={{
                        backgroundColor: "#fff",
                        height: 50,
                        paddingHorizontal: 3,
                      }}
                      value={this.state.customer_email}
                      onChangeText={(text) =>
                        this.setState({ customer_email: text })
                      }
                    />
                    {this.state.submitted && !this.state.customer_email && (
                      <Text
                        style={{
                          color: "red",
                          marginVertical: 10,
                          marginHorizontal: 0,
                        }}
                      >
                        Please mention your email.{" "}
                      </Text>
                    )}

                    <Button
                      mode="contained"
                      labelStyle={{ fontWeight: "bold" }}
                      style={{ marginTop: 20, borderRadius: 20 }}
                      onPress={(e) => this.registerUser()}
                    >
                      {!this.props.isRegistering
                        ? "Register"
                        : "Registering ..."}
                    </Button>
                  </Card.Content>
                </Card>

                <View style={{ height: 150 }}></View>
              </ScrollView>
            </View>
            <Snackbar
              visible={this.state.errorMessageSnackbar}
              onDismiss={() => this.setState({ errorMessageSnackbar: false })}
              duration={2000}
            >
              Please check errors
            </Snackbar>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

function mapState(state) {
  const { user } = state;
  const { userDetails, isRegistering, userRegistered, errorMessageOnRegister } = user;
  return {
    userDetails,
    isRegistering,
    userRegistered,
    errorMessageOnRegister
  };
}

const actionCreators = {
  registerUser: userActions.registerUser,
};
const connectedApp = connect(mapState, actionCreators)(Register);
export { connectedApp as Register };
