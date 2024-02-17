import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { TOTAL_QUESTIONS_IN_ROUND, QUESTION_ANIMATION_TIMING } from '../utils/variables';
import { RoundStatisticItem } from './RoundStatisticItem';
import { StatisticsPopUp } from './popUp/StatisticsPopUp';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export const RoundStatistics = () => {
  const { height } = useWindowDimensions();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const route = useRoute();

  const categoryName = route.params.categoryName;
  const roundName = route.params.roundName;

  const state = useSelector((state) => state.game.roundsData[categoryName].data);
  const localization = useSelector((state) => state.game.settings.localization);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRoundData, setSelectedRoundData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${roundName} ${t('stats.statistics')}`,
    });
  }, []);

  const preparedData = state?.map((item, index) => {
    return (
      {
        index: index,
        id: `${categoryName} ${index}`,
        title: `${roundName} ${t('stats.round')} ${index + 1}`,
        progress: item.answers ? item.answers.reduce((accum, current) => current === true ? accum += 1 : accum, 0) * 100 / TOTAL_QUESTIONS_IN_ROUND : 0,
        attempts: item.attempts,
        attemptsToBestResult: item.attemptsToBestResult,
        bestTime: item.bestTime
      }
    )
  });

  const handelSelectStatistics = (item) => {
    setSelectedRoundData(item);
    setModalVisible(true);
  };

  const renderItems = preparedData.map((item) => {
    return (<RoundStatisticItem roundName={item.title} progress={item.progress} handelSelectStatistics={() => handelSelectStatistics(item)} key={item.id}/>);
  });

  return (
    <>
      <ScrollView style={styles.container(colors.roundBackground)}>
        {renderItems}
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        statusBarTranslucent
        deviceHeight={height + 55}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={QUESTION_ANIMATION_TIMING}
        animationOutTiming={QUESTION_ANIMATION_TIMING}
        backdropTransition={QUESTION_ANIMATION_TIMING}
        backdropTransitionOutTiming={QUESTION_ANIMATION_TIMING}
        onBackdropPress={() => setModalVisible(false)}
      >
        <StatisticsPopUp selectedRoundData={selectedRoundData} setModalVisible={setModalVisible}/>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor,
  }),
});