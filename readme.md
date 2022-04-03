# This is the description for Assessment

### Installation

Clone project and install the dependencies.

```sh
$ git clone https://github.com/azkahi/AssessmentProject.git
$ cd AssessmentProject
$ npm install
```

### Assumption

- Every API always return some kind of data
- Every item in the response of the API has an image that can be accessed via API

### Dependencies

This assessment project uses several dependencies to support its functionality.

| Plugin                                    |
| ----------------------------------------- |
| @react-native-async-storage/async-storage | 
| @react-navigation/bottom-tabs             | 
| @react-navigation/native                  | 
| @react-navigation/stack                   | 
| react-native-screens                      | 
| react-native-safe-area-context            | 
| react-native-vector-icons                 | 
| react-redux                               | 
| redux                                     | 
| redux-devtools-extension                  | 
| redux-flipper                             | 
| redux-promise-middleware                  | 
| redux-thunk                               | 
| redux-logger                              | 
| react-native-dotenv                       | 

#### Running for iOS

```sh
$ npx react-native run-ios
```

#### Running for Android

```sh
$ npx react-native run-android
```

### Android Build Guide
https://reactnative.dev/docs/signed-apk-android

### User Guide

- On the home screen, scroll to bottom to get more data
- Search through the input field given to search for data
- Pull to refresh data
- Tap an image to see the details of the data
- On the detail page, tap on the heart icon to add to favourite or to remove from favourite
- On the favourite tab, tap the heart icon to remove from favourite
- Filled heart icon means that the item is already added to favourite
- Empty heart icon means that the item is not added to favourite yet

### Suggestion

- Add check for image functionality if image doesn't exist (currently only check if image id exists)
- Add parallel function to iterate in redux for search functionality (because search does not give image id)
- Move favourite functions to backend such that users can change device and still retains favourites

### Build download link
```sh
https://drive.google.com/file/d/1S3Mhu5Pp3hbbsiKh8l878G3a9Mn4TR5p/view?usp=sharing
```
