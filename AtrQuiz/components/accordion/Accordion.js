import { useTheme } from '../../theme/ThemeContext';
import { AccordionItem } from './AccordionItem';
import { GAMES_DATA } from '../../utils/variables';

export const Accordions = () => {
  const { colors } = useTheme();

  return (
    GAMES_DATA.map((item) => (
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