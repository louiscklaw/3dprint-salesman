import * as React from 'react';
import { Button, Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import axios from 'axios';

const UploadStlForm = ({ setPreviewStlUrl, stl_base64, setStlBase64 }) => {
  const handleUploadStl = async () => {
    let response = await axios.post('/api/upload-stl-base64', { stl_file: stl_base64 });
    console.log(response.data);
    setPreviewStlUrl(response.data.orphan_url);
  };
  return (
    <>
      <Stack direction="column">
        <Button variant="contained" component="label">
          <Typography variant="body2">Choose STL</Typography>

          <input
            name="avatar"
            accept="application/octet-stream"
            id="contained-button-file"
            type="file"
            hidden
            onChange={e => {
              const fileReader = new FileReader();
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  setStlBase64(fileReader.result.split(',')[1]);
                }
              };
              fileReader.readAsDataURL(e.target.files[0]);
            }}
          />
        </Button>

        <Typography variant="body1">/home/logic/_workspace/3dprint-salesman/test_stl/100_100_100.stl</Typography>

        {/* <Button onClick={handleUploadStl}>Upload</Button> */}
      </Stack>
    </>
  );
};

export default function UploadStl({ setPreviewStlUrl, stl_base64, setStlBase64 }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <UploadStlForm setPreviewStlUrl={setPreviewStlUrl} stl_base64={stl_base64} setStlBase64={setStlBase64} />
    </Stack>
  );
}
