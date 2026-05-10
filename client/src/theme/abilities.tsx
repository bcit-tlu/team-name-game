import StarIcon from '@mui/icons-material/Star';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import { ReactNode } from 'react';
import { AbilityType } from '../contexts/GameContext';

/**
 * Ability presentation tokens. Colors are picked to keep a 4.5:1 ratio against
 * the paper surface (#FFFFFF) so the icon glyphs remain legible per WCAG 2.0
 * AA, while still feeling distinct from the taupe primary palette.
 */
export const ABILITIES: Record<
  AbilityType,
  { label: string; color: string; renderIcon: (size: number) => ReactNode }
> = {
  star: {
    label: 'Star',
    color: '#8A5A00',
    renderIcon: (size) => <StarIcon sx={{ fontSize: size }} />,
  },
  nuke: {
    label: 'Nuke',
    color: '#B71C1C',
    renderIcon: (size) => <CrisisAlertIcon sx={{ fontSize: size }} />,
  },
  interceptor: {
    label: 'Interceptor',
    color: '#2E7D32',
    renderIcon: (size) => <AutoFixNormalIcon sx={{ fontSize: size }} />,
  },
  meh: {
    label: 'Meh',
    color: '#5C5147',
    renderIcon: (size) => <SentimentNeutralIcon sx={{ fontSize: size }} />,
  },
};

export const ABILITY_ORDER: AbilityType[] = ['star', 'nuke', 'interceptor', 'meh'];
