import * as React from 'react'
import { Button, Box, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Stack from '@mui/material/Stack'
import { useFormik } from 'formik'
import axios from 'axios'

const UploadStlForm = ({ setPreviewStlUrl }) => {
  const formik = useFormik({
    initialValues: { stl_file: '' },
    onSubmit: async values => {
      let response = await axios.post('/api/upload-stl-base64', values)
      console.log(response.data)
      setPreviewStlUrl(response.data.orphan_url)
    },
  })
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="body2">
          /home/logic/_workspace/3dprint-salesman/test_stl/100_100_100.stl
        </Typography>
        <Button variant="contained" component="label">
          <Typography variant="body2">Choose STL</Typography>

          <input
            name="avatar"
            accept="application/octet-stream"
            id="contained-button-file"
            type="file"
            hidden
            onChange={e => {
              const fileReader = new FileReader()
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  formik.setFieldValue('stl_file', fileReader.result.split(',')[1])
                }
              }
              fileReader.readAsDataURL(e.target.files[0])
            }}
          />
        </Button>

        <Button type="submit">Upload</Button>
      </form>
      <pre>{JSON.stringify(formik.values, null, 2)}</pre>
    </>
  )
}

export default function UploadStl({ setPreviewStlUrl }) {
  const [avatarPreview, setAvatarPreview] = React.useState(null)
  const [field_value, setFieldValue] = React.useState(null)

  const handleUploadStl = e => {
    formik.submitForm(e)
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <UploadStlForm setPreviewStlUrl={setPreviewStlUrl} />
    </Stack>
  )
}
