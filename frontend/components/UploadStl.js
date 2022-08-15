import * as React from 'react'
import { Button, Box, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Stack from '@mui/material/Stack'

export default function UploadStl({ formik }) {
  const [avatarPreview, setAvatarPreview] = React.useState(null)
  const [field_value, setFieldValue] = React.useState(null)

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box display="flex" textAlign="center" justifyContent="center" flexDirection="column">
        {/* <ImageAvatar size='md' src={avatarPreview || user?.avatar} /> */}

        <Typography variant="body2">Max file size 50Mb</Typography>

        <Button variant="contained" component="label">
          Choose STL
          <input
            name="avatar"
            accept="image/*"
            id="contained-button-file"
            type="file"
            hidden
            onChange={e => {
              const fileReader = new FileReader()
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  formik.setFieldValue('stl_file', fileReader.result.split(',')[1])
                  setAvatarPreview(fileReader.result)
                }
              }
              fileReader.readAsDataURL(e.target.files[0])
            }}
          />
        </Button>
      </Box>
    </Stack>
  )
}
