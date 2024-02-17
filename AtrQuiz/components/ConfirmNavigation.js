import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState, setCategoryName } from '../store/roundSlice';
import { useTranslation } from 'react-i18next';

export const ConfirmNavigation = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const categoryName = useSelector((state) => state.round.categoryName);
  const isCorrectEnd = useSelector((state) => state.round.isCorrectEnd);

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => {
      Alert.alert(
        t('transferConfirmation.title'),
        t('transferConfirmation.description'),
        [
          {
            text: t('transferConfirmation.stay'),
            onPress: () => {
              setIsAlertVisible(false);
            },
            style: 'cancel',
          },
          {
            text: t('transferConfirmation.leave'),
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