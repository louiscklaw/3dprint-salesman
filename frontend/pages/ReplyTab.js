import { Typography } from '@mui/material';

export default function ReplyTab({ quote_reply }) {
  return (
    <>
      <Typography variant="h6">Reply Tab</Typography>
      <pre>{JSON.stringify(quote_reply, null, 2)}</pre>
    </>
  );
}
