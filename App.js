import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const HomeStack = createStackNavigator()

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>HomeScreen</Text>
      <Button title="Go to Details Screen"
        onPress={() => navigation.navigate('Details')} />
    </View>
  )
}

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>SettingsScreen</Text>
    </View>
  )
}

const FeedScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>FeedScreen</Text>
    </View>
  )
}

const DetailsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>DetailsScreen</Text>
    </View>
  )
}

const HomeStackNavigator = ({navigation, routes})=> {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  )
}

function shouldHeaderBeShown(route){
  const routeName = route.state? route.state.routes[route.state.index].name : "Home";
  switch(routeName){
    case "Home":
      return false;
  }
}

const HomeTabNavigator = ({navigation, route}) => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName
          if (route.name == 'Home') {
            iconName = require('./src/images/home.png')
          }
          else if (route.name == 'Feed') {
            iconName = require('./src/images/feed.png')
          }
          else if (route.name == 'Settings') {
            iconName = require('./src/images/settings.png')
          }
          return <Image source={iconName} style={{ height: 17, width: 17, resizeMode: 'contain', tintColor: color }} />
        }
      })}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}


function getHeaderTitle(route) {
  const routeName = route.state ? route.state.routes[route.state.index].name : 'Home'
  switch (routeName) {
    case 'Home':
      return 'Home'
    case 'Feed':
      return 'Feed'
    case 'Settings':
      return 'Settings'
  }
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={({ route }) => ({
            title: getHeaderTitle(route),
            headerShown:shouldHeaderBeShown(route)
          })}
          name="Home" component={HomeTabNavigator} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
