import * as React from 'react'
import { Button, Box, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Stack from '@mui/material/Stack'
import { useFormik } from 'formik'

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default function UploadStl() {
  const [avatarPreview, setAvatarPreview] = React.useState(null)
  const [field_value, setFieldValue] = React.useState(null)

  let formik = useFormik({
    initialValues: { quantity: 1 },
    onSubmit: async values => {
      let response = await axios.post('/api/upload-stl-base64', values)
      console.log(response.data)
    },
  })

  const handleUploadStl = e => {
    formik.submitForm(e)
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <SignupForm />
    </Stack>
  )
}
