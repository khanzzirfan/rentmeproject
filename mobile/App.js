import React, { Component } from 'react';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
//redux store
import { Provider } from 'react-redux';
import configureStore from './config/store';
//landing component
import Main from './components';
//store config
const store = configureStore();

export default class App extends Component {
  constructor() {
    super();
    this.state = { assetsAreLoaded: false };
  }
  componentWillMount() {
    this._loadAssetsAsync();
  }
  async _loadAssetsAsync() {
    try {
      await Promise.all([
        Asset.loadAsync([
          require('./assets/images/app-icon.png'),
          require('./assets/images/loading-icon.png')
        ]),
        Font.loadAsync([
          // This is the font that we are using for our tab bar
          Ionicons.font,
          // We include SpaceMono because we use it in HomeScreen.js. Feel free
          // to remove this if you are not using it in your app
          { 
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
          },
        ]),
      ]);
    } catch (e) {
      // In this case, you might want to report the error to your error
      // reporting service, for example Sentry
      console.warn(
        'There was an error caching assets (see: App.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e);
    } finally {
      this.setState({ assetsAreLoaded: true });
    }
  }
  render() {
    if (!this.state.assetsAreLoaded) { return <AppLoading />; }
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}