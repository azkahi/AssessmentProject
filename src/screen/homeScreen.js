/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import {fetchHome, search, homeClear} from 'actions/homeAction';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
  const {data, isLoading} = useSelector(state => state.homeReducer);
  const dispatch = useDispatch();
  const fetchHomeData = (pageNumber, limit) =>
    dispatch(fetchHome(pageNumber, limit));
  const searchData = (query, pageNumber, limit) =>
    dispatch(search(query, pageNumber, limit));
  const clearData = () => dispatch(homeClear());

  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(15);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [query, setQuery] = useState('');

  useEffect(() => {
    clearData();
    fetchHomeData(1, limit);
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    clearData();

    if (query !== '') {
      searchData(query, 1, limit);
    } else {
      fetchHomeData(1, limit);
    }

    setPageNumber(1);
    setIsRefreshing(false);
  };

  const renderItem = ({item}) => {
    if (item.image_id) {
      return (
        <TouchableOpacity
          style={styles.itemStyle}
          onPress={() =>
            navigation.navigate('Detail', {
              item,
            })
          }>
          <Image
            style={styles.imageGalleryStyle}
            source={{
              uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
            }}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.itemStyleNull}
          onPress={() =>
            navigation.navigate('Detail', {
              item,
            })
          }>
          <Text style={styles.textGalleryStyle}>No Image found.</Text>
        </TouchableOpacity>
      );
    }
  };

  const onEndReached = () => {
    // Sometimes pageNumber is not updated, so force the process then update page number
    if (!isLoading) {
      if (query) {
        searchData(query, pageNumber + 1, limit);
      } else {
        fetchHomeData(pageNumber + 1, limit);
      }

      setPageNumber(pageNumber + 1);
    }
  };

  const onChangeText = text => {
    clearData();
    setPageNumber(1);
    setQuery(text);

    if (text !== '') {
      searchData(text, 1, limit);
    } else {
      fetchHomeData(1, limit);
    }
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : null}
      <TextInput
        style={styles.textInput}
        value={query}
        placeholder="Search..."
        onChangeText={text => onChangeText(text)}
      />
      <FlatList
        numColumns={3}
        data={data.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onRefresh={() => onRefresh()}
        refreshing={isRefreshing}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  itemStyle: {
    width: windowWidth / 3,
    height: windowHeight / 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemStyleNull: {
    width: windowWidth / 3,
    height: windowHeight / 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  imageGalleryStyle: {
    width: windowWidth / 3,
    height: windowHeight / 5,
    resizeMode: 'cover',
  },
  textGalleryStyle: {
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
    padding: 10,
  },
  loadingContainer: {
    padding: 10,
  },
});

export default HomeScreen;
