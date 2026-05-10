import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

function Breadcrumbs({ items }: Props) {
  const navigate = useNavigate();

  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 2 }}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        if (item.path && !isLast) {
          return (
            <Link
              key={idx}
              component="button"
              onClick={() => navigate(item.path!)}
              underline="hover"
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                p: 0,
              }}
            >
              {item.label}
            </Link>
          );
        }
        return (
          <Typography
            key={idx}
            component="span"
            sx={{
              color: 'text.primary',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {item.label}
          </Typography>
        );
      })}
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
