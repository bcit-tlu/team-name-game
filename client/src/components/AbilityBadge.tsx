import { Box } from '@mui/material';
import { ABILITIES } from '../theme/abilities';
import { AbilityType } from '../contexts/GameContext';

interface Props {
  ability: AbilityType;
  size?: number;
  iconSize?: number;
  variant?: 'filled' | 'outlined';
}

function AbilityBadge({ ability, size = 56, iconSize = 32, variant = 'outlined' }: Props) {
  const def = ABILITIES[ability];
  return (
    <Box
      aria-label={def.label}
      sx={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        bgcolor: variant === 'filled' ? 'background.paper' : 'background.default',
        border: '1.5px solid',
        borderColor: 'divider',
        color: def.color,
      }}
    >
      {def.renderIcon(iconSize)}
    </Box>
  );
}

export default AbilityBadge;
