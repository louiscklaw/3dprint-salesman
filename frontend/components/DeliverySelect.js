import { FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import DELIVERY_OPTIONS from '../constants/delivery_options';

export default function DeliverySelect({ formik }) {
  const handleChange = event => {
    formik.setFieldValue('delivery', event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
        <Select value={delivery} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value={DELIVERY_OPTIONS.KWUN_TONG_MTR}>觀塘站</MenuItem>
          <MenuItem value={DELIVERY_OPTIONS.GREEN_LINE}>地鐵綠色線交收</MenuItem>
          <MenuItem value={DELIVERY_OPTIONS.ANYWHERE_ELSE}>其他地點</MenuItem>
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>
    </Box>
  );
}
