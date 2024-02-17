import { useTheme } from '../../theme/ThemeContext';
import { AccordionItem } from './AccordionItem';
import { GAMES_DATA } from '../../utils/variables';
import { useSelector } from 'react-redux';

export const Accordions = () => {
  const { colors } = useTheme();
  const localization = useSelector((state) => state.game.settings.localization);
  console.log(localization)

  if (!GAMES_DATA[localization]) {
    console.log('error')
  }

  return (
    GAMES_DATA[localization].map((item) => (
      <AccordionItem
        key={item.roundName}
        title={item.roundName}
        content={item.roundDescription}
        backgroundColor={colors.accordionHeader}
        iconColor={colors.accordionIcon}
      />
    ))
  );
};