import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {useSelector, useDispatch} from 'react-redux';
import {removeFavourite} from 'actions/favAction';

import TextDescription from 'components/textDescription';

const windowWidth = Dimensions.get('window').width;

const FavScreen = () => {
  const {data} = useSelector(state => state.favReducer);
  const dispatch = useDispatch();
  const removeFav = item => dispatch(removeFavourite(item));

  const [heightImageInScreen, setHeightImageInScreen] = useState(300);

  const removeFavItem = itemFav => {
    removeFav(itemFav);
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <View
          style={[
            styles.imageContainer,
            !item.image_id ? styles.nullImageContainer : null,
          ]}>
          {item.image_id ? (
            <Image
              style={[styles.imageGalleryStyle, {height: heightImageInScreen}]}
              source={{
                uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
              }}
            />
          ) : (
            <Text style={styles.textGalleryStyle}>No Image found.</Text>
          )}
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.heartContainer}
            onPress={() => removeFavItem(item)}>
            <Icon
              style={styles.iconStyle}
              name="heart"
              size={30}
              color="#900"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.descriptionContainer}>
          <TextDescription title={'Title'} description={item.title} />
          <TextDescription
            title={'Inscription'}
            description={item.inscriptions}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  imageContainer: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  nullImageContainer: {
    height: 300,
  },
  imageGalleryStyle: {
    width: windowWidth,
    resizeMode: 'cover',
  },
  textGalleryStyle: {
    textAlign: 'center',
  },
  descriptionContainer: {
    padding: 10,
  },
  actionContainer: {},
  heartContainer: {
    width: 50,
    height: 50,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {},
});

export default FavScreen;
