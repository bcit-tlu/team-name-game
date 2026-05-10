import { Box, Typography } from '@mui/material';
import Breadcrumbs from './Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface Props {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}

function PageHeader({ title, description, breadcrumbs }: Props) {
  return (
    <Box sx={{ mb: 3 }}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <Typography variant="h1" component="h1" sx={{ mb: description ? 0.5 : 0 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </Box>
  );
}

export default PageHeader;
