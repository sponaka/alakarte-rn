import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import {
  itemsActions,
  cartActions,
  addressActions,
  userActions,
  orderActions,
} from "./../../actions";
import { connect } from "react-redux";
import { Card, Paragraph, Title, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Appbar } from "react-native-paper";
import * as RootNavigation from "./../../RootNavigation";
import { List } from "react-native-paper";
import { Camera } from "expo-camera";
import { IconButton } from "react-native-paper";
import * as Constants from "expo-constants";
import { Colors } from "react-native-paper";
import CheckUserAccess from "../CheckUserAccess/CheckUserAccess";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      image: null,
      submitted: false,
      userDetails: null,
      isDisplayModal: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      openCamera: false,
      recording: undefined,
      mediaType: "image",
    };
  }

  async componentDidMount() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
    if (status === "granted") {
    } else {
      Alert.alert("Access denied");
    }
  }

  handleAudioPlayPause = async () => {
    if (this.state.playbackStatus) {
      const status = await this.state.playbackObject.pauseAsync();
      this.setState({ isPlaying: false, playbackStatus: status });
    }

    // It will resume our audio
    if (!this.state.playbackStatus) {
      const status = await this.state.playbackObject.playAsync();
      this.setState({ isPlaying: false, playbackStatus: status });

      return this.state.playbackStatus;
    }

    if (!this.state.playbackStatus) {
      const status = await playbackObject.playAsync();
      this.setState({ isPlaying: true, playbackStatus: status });
      return this.state.playbackStatus;
    }
  };

  componentDidUpdate(prevProps) {}

  navigateTo = () => {
    RootNavigation.navigate("Browser");
  };

  totalAmount() {
    if (this.props.cartList.length > 0) {
      let price = this.props.cartList.map(
        (ele) =>
          ele.product_details.filter(
            (el) => el.language === this.props.selectedLanguage
          )[0].price * ele.orderQuantity
      );
      let sub_total = price.reduce((x, y) => x + y, 0);
      return sub_total;
    } else {
      return 0;
    }
  }

  closeCamera() {
    this.setState({
      openCamera: false,
    });
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  onPictureSaved = (photo) => {
    this.setState({
      image: photo.uri,
      openCamera: false,
      audioUri: null,
    });
  };

  _imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri, mediaType: "image" });
    }
    this.setState({ audioUri: null });
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        position: "relative",
      },
      inverted: {
        transform: [{ scaleY: -1 }],
      },
      content: {
        padding: 0,
      },
      input: {
        alignItems: "flex-start",
        paddingVertical: 10,
        paddingHorizontal: 24,
      },
      postImageHeight: {
        height: 280,
      },
      userNameText: {
        fontSize: 14,

        marginTop: -5,
      },
      locationText: {
        marginTop: -8,
      },
      labelText: {
        fontSize: 14,
        marginTop: -2,
      },
      forumCard: {
        marginTop: 2,
        elevation: 0,
        backgroundColor: "#fff",
      },
      postTitleText: {
        fontSize: 14,
        fontWeight: "bold",
        lineHeight: 20,
        paddingTop: 10,
        color: "#424242",
      },
      postImageHeight: {
        height: 300,
      },
      userNameText: {
        fontSize: 14,

        marginTop: -5,
      },
      locationText: {
        marginTop: -8,
      },
      appHeaderStyle: {
        backgroundColor: "#fff",
        color: "#424242",
        elevation: 1,
        position: "relative",
      },
    });
    const { hasCameraPermission } = this.state;
    return (
      <CheckUserAccess>
        <View style={styles.container}>
          <View>
            {this.state.openCamera === false ? (
              <Appbar.Header style={styles.appHeaderStyle}>
                <Appbar.BackAction
                  onPress={() => {
                    this.navigateTo();
                  }}
                  style={{ marginTop: 10 }}
                />
                <Appbar.Content
                  title="Upload your payment details"
                  style={{ marginLeft: -15 }}
                />
              </Appbar.Header>
            ) : (
              <View
                style={{
                  height: Constants.default.statusBarHeight + 2,
                  backgroundColor: "#fff",
                }}
              ></View>
            )}
          </View>

          {this.state.openCamera === false ? (
            <ScrollView
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <Card style={{ backgroundColor: "#26988A" }}>
                <Card.Content>
                  <Paragraph
                    style={{ fontWeight: "bold", color: "#fff", fontSize: 20 }}
                  >
                    Hello {this.props.userDetails?.name}
                  </Paragraph>
                  <Paragraph style={{ color: "#fff", fontSize: 14 }}>
                    You have successfully ordered from us. Please make a payment
                    using below mentioned àlakarte account number using any of
                    the payment system.
                  </Paragraph>
                  <Paragraph
                    style={{
                      fontWeight: "bold",
                      color: "#fff",
                      fontSize: 15,
                      marginTop: 10,
                    }}
                  >
                    After your payment of ₱ {this.totalAmount()} only we will
                    verify & start initiating the shipment of your purchased
                    items. you will also receive a notification once shipment
                    started from us.
                  </Paragraph>
                </Card.Content>
              </Card>

              <Card style={{}}>
                <Card.Content>
                  <Paragraph
                    style={{
                      fontWeight: "bold",
                      color: "#26988A",
                      fontSize: 22,
                    }}
                  >
                    àlakarte
                  </Paragraph>
                  <Paragraph
                    style={{
                      color: "gray",
                      fontSize: 14,
                      marginTop: -3,
                      marginBottom: 15,
                    }}
                  >
                    Account Number
                  </Paragraph>
                  <Title
                    style={{
                      fontWeight: "bold",
                      color: "#26988A",
                      fontSize: 28,
                    }}
                  >
                    1209-8908-9089-0989
                  </Title>
                  <Paragraph
                    style={{ color: "gray", fontSize: 15, marginTop: 10 }}
                  >
                    Please upload only the transaction bill that you got after
                    you made the payment using above mentioned account number
                  </Paragraph>
                </Card.Content>
              </Card>

              {this.state.image ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#112A54",
                        fontWeight: "bold",
                        margin: 10,
                      }}
                    >
                      {" "}
                      Selected Image
                    </Text>

                    <View
                      style={{
                        borderRadius: 10,
                        height: 120,
                        backgroundColor: "#fff",
                        elevation: 1,
                      }}
                    >
                      <Image
                        source={{ uri: this.state.image }}
                        style={{ height: 120, width: 120, borderRadius: 10 }}
                      ></Image>
                    </View>
                  </View>
                </View>
              ) : (
                <View></View>
              )}

              <List.Section style={{ backgroundColor: "#fff", marginTop: 2 }}>
                <List.Subheader
                  style={{ fontWeight: "bold", color: "#424242", fontSize: 16 }}
                >
                  Upload Proof
                </List.Subheader>
                <List.Item
                  style={{ marginVertical: -5 }}
                  title="Take a picture"
                  left={() => (
                    <List.Icon
                      icon="camera"
                      color={Colors.white}
                      style={{ backgroundColor: "#028F77", borderRadius: 50 }}
                    />
                  )}
                  onPress={() => this.setState({ openCamera: true })}
                  right={() => (
                    <List.Icon icon="chevron-right" color={"#d4d4d4"} />
                  )}
                />
                <List.Item
                  style={{ marginVertical: -5 }}
                  title="Select from gallery"
                  left={() => (
                    <List.Icon
                      color={Colors.white}
                      style={{ backgroundColor: "#028F77", borderRadius: 50 }}
                      icon="image"
                    />
                  )}
                  right={() => (
                    <List.Icon icon="chevron-right" color={"#d4d4d4"} />
                  )}
                  onPress={() => this._imagePicker()}
                />
              </List.Section>

              <Button
                mode="contained"
                labelStyle={{ fontSize: 16 }}
                uppercase={true}
                style={{ marginHorizontal: 10, borderRadius: 3, marginTop: 5 }}
                onPress={() => console.log("")}
              >
                Upload
              </Button>
              <View style={{ height: 300 }}></View>
            </ScrollView>
          ) : (
            <View />
          )}

          {this.state.openCamera === true ? (
            <View>
              {hasCameraPermission === null ? (
                <View />
              ) : hasCameraPermission === false ? (
                <View style={{ flex: 1 }}>
                  <Text> No access to camera</Text>
                </View>
              ) : (
                <View style={{ flex: 1 }}>
                  <Camera
                    style={{
                      width: "100%",
                      height: Dimensions.get("window").height,
                    }}
                    type={this.state.type}
                    ref={(ref) => {
                      this.camera = ref;
                    }}
                  >
                    <View
                      style={{
                        display: "flex",

                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        height: "100%",
                      }}
                    >
                      <IconButton
                        icon="close"
                        color={"#c9c9c9"}
                        size={50}
                        onPress={() => {
                          this.closeCamera();
                        }}
                        style={{
                          marginBottom: 75,
                          backgroundColor: "#fff",
                          marginRight: 10,
                        }}
                      />
                      <IconButton
                        icon="circle"
                        color={"#c9c9c9"}
                        size={50}
                        onPress={this.takePicture}
                        style={{
                          marginBottom: 75,
                          backgroundColor: "#fff",
                        }}
                      />
                    </View>
                  </Camera>
                </View>
              )}
            </View>
          ) : (
            <View />
          )}
        </View>
      </CheckUserAccess>
    );
  }
}

function mapState(state) {
  const { appLanguage, cart, address, user, order } = state;
  const { userDetails, isRegistering, userRegistered, isLoadingUserDetails } =
    user;
  const { cartList } = cart;
  const {
    orderList,
    isOrderListLoading,
    orderListLoaded,
    isOrdering,
    orderingSuccessful,
    specialInstruction,
  } = order;
  const {
    addressList,
    isLoadingAddress,
    isAddingAddress,
    addressAdded,
    selectedAddress,
    isDeletingAddress,
  } = address;
  const { selectedLanguage } = appLanguage;
  return {
    selectedLanguage,
    cartList,
    addressList,
    isLoadingAddress,
    isAddingAddress,
    addressAdded,
    selectedAddress,
    isDeletingAddress,
    userDetails,
    isRegistering,
    userRegistered,
    isLoadingUserDetails,
    orderList,
    isOrderListLoading,
    orderListLoaded,
    isOrdering,
    orderingSuccessful,
    specialInstruction,
  };
}

const actionCreators = {
  getItems: itemsActions.getItems,
  addItemToUserCart: cartActions.addItemToUserCart,
  increaseOrderQuantity: cartActions.increaseOrderQuantity,
  decreaseOrderQuantity: cartActions.decreaseOrderQuantity,
  removeItemFromCart: cartActions.removeItemFromCart,
  addAddress: addressActions.addAddress,
  setAddress: addressActions.setAddress,
  getAddress: addressActions.getAddress,
  deleteAddress: addressActions.deleteAddress,
  getUserDetails: userActions.getUserDetails,
  setSpecialInstruction: orderActions.setSpecialInstruction,
  makeOrder: orderActions.makeOrder,
  clearCart: cartActions.clearCart,
};
const connectedApp = connect(mapState, actionCreators)(Payment);
export { connectedApp as Payment };
