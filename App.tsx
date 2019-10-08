/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */


import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider as ApolloProviderHooks } from '@apollo/react-hooks'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { Theme } from "@artsy/palette"
import { Search } from './src/pages/search';
import { SafeAreaView } from 'react-native';
import { PlaceDetail } from './src/pages/placeDetail';
// import { createGlobalStyle } from 'styled-components';


// const GlobalStyles = createGlobalStyle`
//   @import url("https://webfonts.artsy.net/all-webfonts.css");
// `

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://dobar.herokuapp.com/api',
  }),
  cache: new InMemoryCache()
})

const MainNavigator = createStackNavigator({
  Search: {screen: Search},
  PlaceDetail: {screen: PlaceDetail}
});

const MainApp = createAppContainer(MainNavigator)
const App = () => {
  return (
    <ApolloProviderHooks client={client}>
      <Theme>
        <MainApp/>
      </Theme>
    </ApolloProviderHooks>
  );
};

export default App;
