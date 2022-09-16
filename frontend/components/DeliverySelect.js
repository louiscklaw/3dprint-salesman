import { FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';

export default function DeliverySelect({ formik }) {
  const [age, setAge] = React.useState(0);

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
        <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value={0}>觀塘站／地鐵綠色線交收</MenuItem>
          <MenuItem value={1}>其他地點</MenuItem>
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>
    </Box>
  );
}
