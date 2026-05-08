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
      sx={{ mb: 1, pb: 1, borderBottom: '1px solid #eee' }}
    >
      {items.map((item, idx) =>
        item.path && idx < items.length - 1 ? (
          <Link
            key={idx}
            component="button"
            variant="body2"
            onClick={() => navigate(item.path!)}
            sx={{ color: 'primary.main', textDecoration: 'none', cursor: 'pointer', fontSize: '1rem' }}
          >
            {item.label}
          </Link>
        ) : (
          <Typography key={idx} variant="body2" sx={{ color: 'text.primary', fontSize: '1rem' }}>
            {item.label}
          </Typography>
        ),
      )}
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
