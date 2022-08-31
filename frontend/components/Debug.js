import { Box } from '@mui/material';

export default function Debug({ children }) {
  if (window.location.href.search(/localhost/) > 0) return <Box sx={{ backgroundColor: 'gold' }}>{children}</Box>;

  return <></>;
}
