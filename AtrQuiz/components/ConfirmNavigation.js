import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const ConfirmNavigation = ({navigation}) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => {
    Alert.alert(
      'Transfer confirmation',
      'Are you sure you want to leave? All your progress will be lost!',
      [
        {
          text: 'Stay',
          onPress: () => {
            setIsAlertVisible(false);
          },
          style: 'cancel',
        },
        {
          text: 'Leave',
          onPress: () => {
            setIsAlertVisible(true);
            if (navigation.canGoBack()) navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const unsubscribeBeforeRemove = navigation.addListener('beforeRemove', (e) => {
      console.log(1)
      if (!isAlertVisible) {
        e.preventDefault();
        setIsAlertVisible(true);
        showAlert();
      }
    });

    const unsubscribeTabPress = navigation.addListener('tabPress', (e) => {
      console.log(2)

      if (!isAlertVisible) {
        e.preventDefault();
        setIsAlertVisible(false);
        showAlert();
      }
    });

    return () => {
      unsubscribeBeforeRemove();
      unsubscribeTabPress();
    };
  }, [navigation, isAlertVisible]);

  return null;
};