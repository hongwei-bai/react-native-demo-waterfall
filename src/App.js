/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  Image,
  FlatList,
  SectionList,
  RefreshControl
} from "react-native";
import Waterfall from "react-native-waterfall";
import resolveAssetSource from "resolveAssetSource";
// import image1 from "./images/1.jpg";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

// type Props = {};
export default class App extends React.Component {
  static navigationOptions = {
    title: "WaterfallListExample"
  };

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      isLoadingMore: false,
      myText: "My Original Text",
      imgUrl: [
        "https://www.adorama.com/alc/wp-content/uploads/2018/11/shutterstock_100419445-825x465@2x.jpg",
        "http://img.fireflytrip.com/images/routeImg/1702221028321875.jpg",
        "https://www.adorama.com/alc/wp-content/uploads/2018/11/shutterstock_1033306540-1.jpg",
        "https://media.bloomsbury.com/rep/bj/9781472590626.jpg",
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/10C3A/production/_103866686_adultclassclassicviewwinner.johnfinney'blizzardinthesnow'derbyshire.jpg",
        "https://cdn.cnn.com/cnnnext/dam/assets/190512164106-game-thrones-season-8-jon-davos-exlarge-169.jpg",
        "https://manage.sicas.cn/SchoolCarousel/20190122174537.jpg",
        "http://blogs.oregonstate.edu/engineering/files/2014/06/DTU_sign.jpg",
        "http://img2.zol.com.cn/product/14_500x2000/510/ces1G2NPcuMyI.jpg",
        "http://www.dongdao.net/upload/news/140527174251_big4.jpg",
        "https://tx3.cdn.caijing.com.cn/2018/1112/1542006722602.png",
        "https://tx1.cdn.caijing.com.cn/2018/1112/1542006732703.jpg",
        "https://www.imfree.com.au/wp-content/uploads/2019/05/Artboard-1-100.jpg",
        "https://images.arcadis.com/media/A/F/D/%7BAFDCAEB3-7314-48FC-B624-D209EC987F35%7DSydney-Harbour-Bridge-header.jpg?width=1920&height=0&mode=crop&anchor=top"
      ],
      imgWidth: [],
      imgHeight: []
    };
  }

  componentWillMount() {
    this.data = [];
    this.loadMore();

    this.state.imgUrl.map(url => {
      Image.getSize(url, (width, height) => {
        this.state.imgWidth.push(width);
        this.state.imgHeight.push(height);
      });
    });
  }

  addMoreDatas() {
    for (var i = 0; i < 50; ++i) {
      this.data.push({
        height: 50 + Math.floor(Math.random() * 200),
        imgResIndex: Math.floor(Math.random() * 14) + 1
      });
    }
  }
  refresh = () => {
    if (this.state.isRefreshing || this.state.isLoadingMore) {
      return;
    }
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      this.data = [];
      this.addMoreDatas();
      this.setState({ isRefreshing: false });
    }, 500);
  };
  loadMore = () => {
    if (this.state.isRefreshing || this.state.isLoadingMore) {
      return;
    }
    this.setState({ isLoadingMore: true });
    setTimeout(() => {
      this.addMoreDatas();
      this.setState({ isLoadingMore: false });
    }, 500);
  };

  renderItem = (itemData, itemIdx, itemContainer) => {
    let imgSrcSize = this.state.imgUrl.length;
    let index = itemIdx % imgSrcSize;
    // console.log("index: " + index + ", imgWidth.len: " + this.state.imgWidth.length
    // + ", imgHeight.len: " + this.state.imgHeight.length);
    
    let imgSrcWidth = this.state.imgWidth[index];

    let imgSrcHeight = this.state.imgHeight[index];

    let imgHeightAda = (itemContainer.width * imgSrcHeight) / imgSrcWidth;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          width: itemContainer.width,
          // height: itemData.height
          height: imgHeightAda
        }}
      >
        <View>
          <Image
            source={{
              uri: this.state.imgUrl[index]
            }}
            style={{ width: itemContainer.width, height: imgHeightAda }}
            resizeMode="cover"
          />
        </View>
        {/* <Text style={{ color: "white" }}>{imgDesc[itemData.imgResIndex]}</Text>
        <Text style={{ color: "white" }}>index: {itemIdx}</Text>
        <Text style={{ color: "white" }}>height:{itemData.height}</Text> */}
      </TouchableOpacity>
    );
  };

  updateText(msg) {
    console.warn("updateText called.");

    this.setState({ myText: msg });
  }

  // @flow
  test() {
    console.warn("test called.");
    return fetch("http://47.52.40.23:8080/tudictserver/dictver/1", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("fetch called. responseJson.code: " + responseJson.code);
        console.log("fetch called. responseJson,msg: " + responseJson.msg);
        var data = responseJson.data;
        var version = data.version;
        var upgradeType = data.upgradeType;
        console.log("fetch called. data.version: " + version);
        console.log("fetch called. data.upgradeType: " + upgradeType);
        var filelist = data.filelist;
        for (var i = 0; i < filelist.length; i++) {
          console.log("fetch called. filelist.item: " + filelist[i]);
        }
        this.updateText(responseJson.json);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text>{this.state.myText}</Text>
        <TouchableOpacity onPress={() => this.test()}>
          <Text>Button</Text>
        </TouchableOpacity> */}
        <Waterfall
          style={styles.waterfall}
          data={this.data}
          gap={6}
          numberOfColumns={2}
          expansionOfScope={100}
          onEndReachedThreshold={1000}
          onEndReached={this.loadMore}
          renderItem={this.renderItem}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.refresh}
            />
          }
        />
        {/* <Button
          onClick={onButtonPress}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        /> */}
        {/* <View style={styles.mainStyle}>
          <Image source={require("./images/cctv2.jpg")} />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 22
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
