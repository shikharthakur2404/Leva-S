module.exports = {
  dependencies: {
    'react-native-wheel-pick': {
      platforms: {
        android: {
          packageImportPath: 'import com.tron.ReactNativeWheelPickerPackage;',
          packageInstance: 'new ReactNativeWheelPickerPackage()',
        },
      },
    },
  },
};
