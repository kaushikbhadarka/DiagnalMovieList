import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {IMAGES, FONTS} from '../constants';

const Navbar = ({search, setSearch}) => {
  const [searchOn, setSearchOn] = useState(false);
  return (
    <ImageBackground
      source={IMAGES.imageNavBar}
      resizeMode="cover"
      style={styles.navbar}>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => setSearchOn(false)}>
        <Image source={IMAGES.iconBack} style={styles.actionIcon} />
      </TouchableOpacity>
      {searchOn ? (
        <TextInput
          style={styles.searchInput}
          placeholder="Search Movies..."
          placeholderTextColor={'#fff8'}
          value={search}
          onChangeText={setSearch}
        />
      ) : (
        <Text style={styles.title}>{'Romantic Comedy'}</Text>
      )}
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => setSearchOn(prev => !prev)}>
        <Image source={IMAGES.iconSearch} style={styles.actionIcon} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  actionBtn: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  title: {
    flex: 1,
    fontSize: 24,
    color: 'white',
    fontFamily: FONTS.FONT_BOLD,
  },
  searchInput: {
    flex: 1,
    fontSize: 24,
    color: 'white',
    fontFamily: FONTS.FONT_BOLD,
  },
});
