import React, { useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';
import { RoundStatisticItem } from './RoundStatisticItem';
import { TOTAL_QUESTIONS_IN_ROUND, QUESTION_ANIMATION_TIMING } from '../utils/variables';
import Modal from 'react-native-modal';
import { StatisticsPopUp } from './popUp/StatisticsPopUp';


export const RoundStatistics = ({ route }) => {
  
  const { height } = useWindowDimensions();
  const { colors } = useTheme();
  const state = useSelector((state) => state.game.roundsData[route.params.categoryName].data);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRoundData, setSelectedRoundData] = useState(null);

  const preparedData = state?.map((item, index) => {
    return (
      {
        index: index,
        id: `${route.params.categoryName} ${index}`,
        title: `${route.params.categoryName} round ${index + 1}`,
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
        deviceHeight={height + 50}
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
  text: (textColor) => ({
    marginHorizontal: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: textColor
  }),
});