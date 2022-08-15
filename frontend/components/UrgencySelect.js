import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FormHelperText } from '@mui/material'

export default function UrgencySelect({ formik }) {
  const [age, setAge] = React.useState(0)

  const handleChange = event => {
    setAge(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={0}> 唔急 ( 7日 )</MenuItem>
          <MenuItem value={1}> 一般急 ( 4日 )</MenuItem>
          <MenuItem value={2}> 急到瀨 ( 3日 )</MenuItem>
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>
    </Box>
  )
}
