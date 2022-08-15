import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'

export default function Quantity({ formik }) {
  const handleChange = e => {
    if (parseInt(e.target.value) > 0) {
      formik.setFieldValue('quantity', e.target.value)
    }
  }

  return (
    <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
      <Typography variant="body2">Quantity</Typography>
      <TextField
        id="Quantity"
        type="number"
        InputLabelProps={{ shrink: true }}
        variant="standard"
        value={formik.values.quantity}
        onChange={handleChange}
      />
    </Box>
  )
}
