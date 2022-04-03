import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import TextDescription from 'components/textDescription';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useSelector, useDispatch} from 'react-redux';
import {addFavourite, removeFavourite} from 'actions/favAction';

const windowWidth = Dimensions.get('window').width;

const DetailScreen = ({route}) => {
  const {data} = useSelector(state => state.favReducer);
  const dispatch = useDispatch();
  const addFav = item => dispatch(addFavourite(item));
  const removeFav = item => dispatch(removeFavourite(item));

  const {item} = route.params;

  const [heightImageInScreen, setHeightImageInScreen] = useState(300);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    let tempFav = false;
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === item.id) {
          tempFav = true;
        }
      }
    }

    setIsFav(tempFav);
  }, [data]);

  const addOrRemoveFav = itemFav => {
    if (isFav) {
      removeFav(itemFav);
      setIsFav(false);
    } else {
      addFav(itemFav);
      setIsFav(true);
    }
  };

  if (item.image_id) {
    Image.getSize(
      `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
      (width, height) => {
        let temp = (height / width) * windowWidth;
        setHeightImageInScreen(temp);
      },
    );
  }

  return (
    <SafeAreaView style={styles.containerStyle}>
      <ScrollView>
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
            onPress={() => addOrRemoveFav(item)}>
            {isFav ? (
              <Icon
                style={styles.iconStyle}
                name="heart"
                size={30}
                color="#900"
              />
            ) : (
              <Icon
                style={styles.iconStyle}
                name="heart-o"
                size={30}
                color="#900"
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.descriptionContainer}>
          <TextDescription title={'Title'} description={item.title} />
          <TextDescription
            title={'Inscription'}
            description={item.inscriptions}
          />
          <TextDescription
            title={'Provenance Text'}
            description={item.provenance_text}
          />
          <TextDescription
            title={'Publication History'}
            description={item.publication_history}
          />
          <TextDescription
            title={'Exhibition History'}
            description={item.exhibition_history}
          />
        </View>
      </ScrollView>
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

export default DetailScreen;
