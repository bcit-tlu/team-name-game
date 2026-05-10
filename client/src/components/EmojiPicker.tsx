import { Box, IconButton } from '@mui/material';

interface Props {
  emojis: string[];
  selected: string;
  onSelect: (emoji: string) => void;
  size?: number;
  fontSize?: string;
}

function EmojiPicker({ emojis, selected, onSelect, size = 56, fontSize = '1.875rem' }: Props) {
  return (
    <Box
      role="radiogroup"
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${size + 4}px, 1fr))`,
        gap: 1,
      }}
    >
      {emojis.map((emoji) => {
        const isSelected = emoji === selected;
        return (
          <IconButton
            key={emoji}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(emoji)}
            sx={{
              fontSize,
              width: size,
              height: size,
              borderRadius: 2,
              border: '2px solid',
              borderColor: isSelected ? 'primary.dark' : 'divider',
              backgroundColor: isSelected ? 'action.selected' : 'background.paper',
              color: 'text.primary',
              '&:hover': {
                borderColor: isSelected ? 'primary.dark' : 'primary.light',
                backgroundColor: 'action.hover',
              },
            }}
          >
            {emoji}
          </IconButton>
        );
      })}
    </Box>
  );
}

export default EmojiPicker;
