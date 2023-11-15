import { useTheme } from '../../theme/ThemeContext';
import { AccordionItem } from './AccordionItem';
import { ABOUT_ROUNDS_DATA } from '../../utils/variables';

export const Accordions = () => {
  const { colors } = useTheme();

  return (
    ABOUT_ROUNDS_DATA.map((item) => (
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