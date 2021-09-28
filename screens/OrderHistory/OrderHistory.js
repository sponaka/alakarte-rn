import React, { Component } from "react";
import { itemsActions, cartActions, addressActions, userActions, orderActions } from "./../../actions";
import { connect } from "react-redux";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Paragraph, Button, Appbar, Text } from "react-native-paper";
import * as RootNavigation from "./../../RootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckUserAccess from "../CheckUserAccess/CheckUserAccess";

class OrderHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      data: [],
    };
  }

  async componentDidMount() {
    let user = await AsyncStorage.getItem("user");
    let userObj = JSON.parse(user);
    let userId = userObj?.id;
    if (userId) {
      this.props.getUserDetails(userId);
      this.props.getOrders(userId);
    }
  }

  navigateTo = () => {
    RootNavigation.navigate("Browser");
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        position: "relative",
      },
      content: {
        padding: 0,
      },
      imageHeight: {
        height: 350,
      },

      productCard: {
        marginBottom: 1,
        elevation: 0,
        backgroundColor: "#fff",
      },
      productTitleText: {
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 20,
        paddingTop: 10,
        color: "#424242",
      },
      productAboutText: {
        fontSize: 17,
        lineHeight: 20,
        paddingTop: 10,
        color: "#382c1d",
        marginBottom: 20,
      },
      appHeaderStyle: {
        backgroundColor: "#fff",
        color: "#424242",
        elevation: 1,
      },
    });

    return (
      <>
       <CheckUserAccess>
        <View style={styles.container}>
          <View>
            <Appbar.Header style={styles.appHeaderStyle}>
              <Appbar.Content
                title="Order History"
                titleStyle={{
                  color: "#424242",
                  fontSize: 20,
                }}
              />
            </Appbar.Header>
          </View>

          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {this.props.orderList?.map((ele, index) => {
              return(
                <Card style={{ marginTop: 5, marginHorizontal: 10, elevation: 2, borderRadius: 15 }} key={index}>
              <Card.Content
                style={{
                  paddingTop: 10,
                  borderBottomWidth: 1,
                  borderColor: "#eee",
                  paddingBottom: 10,
                  marginBottom: 10,
                }}
              >
                <Paragraph style={{ fontSize: 14 }}>
                  Order Id: ALK-ORDER-ID-{ele.id}
                </Paragraph>
              </Card.Content>
              <Card.Content>
                {
                  ele?.order_items?.map((el, ind) => {
                    return(
                      <View
                      key={ind}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#424242",
                      }}
                      numberOfLines={1}
                      ellipsizeMode={"tail"}
                    >
                     {this.props.itemList?.filter(item => item.id === el.id)[0].product_details.filter(details => details.language === this.props.selectedLanguage)[0].name}
                    </Text>
                  </View>

                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "gray" }}>{el?.quantity} x ₱ {this.props.itemList?.filter(item => item.id === el.id)[0].product_details.filter(details => details.language === this.props.selectedLanguage)[0].price}</Text>
                  </View>
                </View>
                    )
                  })
                }
                
                
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                    alignItems: "center",
                    borderTopWidth: 1,
                    borderColor: "#eee",
                    paddingTop: 5,
                    marginTop: 15,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#424242",
                      }}
                      numberOfLines={1}
                      ellipsizeMode={"tail"}
                    >
                      Total
                    </Text>
                  </View>

                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#26988A",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      ₱ 10181
                    </Text>
                  </View>
                </View>
              </Card.Content>
              <View style={{ marginHorizontal: 15 }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    paddingLeft: 10,
                    paddingBottom: 10,
                    borderRadius: 1,
                    marginTop: 10,
                  }}
                >
                  <Paragraph
                    style={{
                      fontSize: 14,
                      marginTop: 0,
                      color: "gray",
                      marginTop: 5,
                    }}
                  >
                    Currently your order details
                  </Paragraph>
                  <Paragraph
                    style={{
                      fontSize: 16,
                      marginTop: 0,
                      color: "#26988A",
                      fontWeight: "bold",
                    }}
                  >
                    {ele?.order_status[0]?.status}
                  </Paragraph>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: "#eee",
                  marginTop: 10,
                }}
              >
                <View style={{ flex: 0.5 }}>
                  <Button
                    mode="contained"
                    icon={ele?.payment_image === null ? "credit-card" : "timeline"}
                    style={{ backgroundColor: "#fff", elevation: 0, borderBottomLeftRadius: 15 }}
                    onPress={() => this.navigateToCart()}
                    labelStyle={{
                      fontSize: 12,
                      paddingVertical: 2,
                      color: "#424242",
                      fontWeight: "bold",
                    }}
                  >
                   {ele?.payment_image === null ? "MAKE PAYMENT" : "TRACK"}
                  </Button>
                </View>
                <View style={{ flex: 0.5 }}>
                  <Button
                    mode="contained"
                    icon="delete"
                    onPress={() => console.log("Pressed")}
                    style={{
                      elevation: 0,
                      borderBottomRightRadius: 15 
                    }}
                    labelStyle={{
                      fontSize: 12,
                      paddingVertical: 2,
                      fontWeight: "bold",
                    }}
                  >
                    CANCEL
                  </Button>
                </View>
              </View>
            </Card>

              )
            })}
           

            <View style={{ height: 300 }}></View>
          </ScrollView>
        </View>
        </CheckUserAccess>
      </>
    );
  }
}

function mapState(state) {
  const { appLanguage, cart, address, user, order, items } = state;
  const { userDetails, isRegistering, userRegistered } = user;
  const { 
    isLoadingItems,
    itemList,
  } = items;
  const {
    orderList,
    isOrderListLoading,
    orderListLoaded,
    isOrdering,
    orderingSuccessful,
    specialInstruction,
  } = order;
  const { cartList } = cart;
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
    orderList,
    isOrderListLoading,
    orderListLoaded,
    isOrdering,
    orderingSuccessful,
    specialInstruction,
    isLoadingItems,
    itemList,
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
  getOrders: orderActions.getOrders
};
const connectedApp = connect(mapState, actionCreators)(OrderHistory);
export { connectedApp as OrderHistory };
