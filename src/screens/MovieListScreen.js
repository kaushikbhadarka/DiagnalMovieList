import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Navbar from '../components/Navbar';
import axios from 'axios';
import {FONTS, IMAGES} from '../constants';

const MovieListScreen = () => {
  const [page, setPage] = useState(1);
  const [haveNext, setHaveNext] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Get Movie Data From API
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/movies/${page}`)
      .then(({data}) => {
        setMovieList(prev => [...prev, ...data?.['content-items']?.content]);
        if (
          data?.['total-content-items'] >
          data?.['page-num-requested'] * data?.['page-size-requested']
        ) {
          setHaveNext(true);
        } else {
          setHaveNext(false);
        }
      })
      .catch(e => {
        return Snackbar.show({
          text: e?.message || 'Something Went Wrong',
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setIsLoading(false));
  }, [page]);

  // Select Image From Asset With
  const getImage = useCallback(key => {
    switch (key) {
      case 'poster1.jpg':
        return IMAGES.imagePoster1;
      case 'poster2.jpg':
        return IMAGES.imagePoster2;
      case 'poster3.jpg':
        return IMAGES.imagePoster3;
      case 'poster4.jpg':
        return IMAGES.imagePoster4;
      case 'poster5.jpg':
        return IMAGES.imagePoster5;
      case 'poster6.jpg':
        return IMAGES.imagePoster6;
      case 'poster7.jpg':
        return IMAGES.imagePoster7;
      case 'poster8.jpg':
        return IMAGES.imagePoster8;
      case 'poster9.jpg':
        return IMAGES.imagePoster9;
      default:
        return IMAGES.missingPlaceHolder;
    }
  }, []);

  const imageSize = useMemo(() => {
    const width = (Dimensions.get('window').width - 24) / 3;
    const ratio = width / 182;
    const height = ratio * 272;
    return {width, height};
  }, []);

  const renderItem = ({item}) => (
    <MovieCard
      image={getImage(item['poster-image'])}
      name={item.name}
      imageSize={imageSize}
    />
  );

  const loadMore = useCallback(() => {
    if (haveNext && !isLoading) {
      setPage(prev => prev + 1);
    }
  }, [haveNext, isLoading]);

  return (
    <View style={styles.container}>
      <Navbar search={search} setSearch={setSearch} />
      <FlatList
        style={styles.movieList}
        contentContainerStyle={styles.movieListIn}
        numColumns={3}
        horizontal={false}
        data={movieList.filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        )}
        renderItem={renderItem}
        keyExtractor={(item, i) => `${i}${item.name}`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponentStyle={styles.listFooterComponentStyle}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="small" color="#fff" /> : null
        }
      />
    </View>
  );
};

const MovieCard = ({image, name, imageSize}) => {
  return (
    <View style={[styles.movieCard, {width: imageSize.width}]}>
      <Image
        source={image}
        style={[
          styles.image,
          {
            height: imageSize.height,
          },
        ]}
      />
      <Text style={styles.movieName}>{name}</Text>
    </View>
  );
};

export default MovieListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  movieList: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 3,
  },
  movieListIn: {
    paddingBottom: 30,
  },
  movieCard: {
    marginHorizontal: 3,
    marginTop: 3,
    marginBottom: 27,
  },
  image: {
    width: '100%',
    marginBottom: 8,
  },
  movieName: {
    fontSize: 15,
    color: 'white',
    fontFamily: FONTS.FONT_REGULAR,
  },
  listFooterComponentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
});
