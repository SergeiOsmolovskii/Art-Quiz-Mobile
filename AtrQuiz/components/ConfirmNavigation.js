import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState, setCategoryName } from '../store/roundSlice';

export const ConfirmNavigation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categoryName = useSelector((state) => state.round.categoryName);
  const isCorrectEnd = useSelector((state) => state.round.isCorrectEnd);

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
              if (navigation.canGoBack()) {
                navigation.addListener('transitionEnd', () => {
                  dispatch(setInitialState());
                  dispatch(setCategoryName(categoryName));
                });
                navigation.goBack();
              }
            },
          },
        ],
        { cancelable: false }
      );
  };

  useEffect(() => {
    const unsubscribeBeforeRemove = navigation.addListener('beforeRemove', (e) => {
      if (!isAlertVisible && !isCorrectEnd) {
        e.preventDefault();
        setIsAlertVisible(true);
        showAlert();
      }
    });

    return () => {
      unsubscribeBeforeRemove();
    };
  }, [navigation, isAlertVisible, isCorrectEnd]);

  return null;
};