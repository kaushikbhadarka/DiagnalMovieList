import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import API from './services';
import {COLORS} from './constants';
import MovieListScreen from './screens/MovieListScreen';

API();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <MovieListScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
});

export default App;
