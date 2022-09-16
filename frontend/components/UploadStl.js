import { Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import * as React from 'react';
import DebugShow from './DebugShow';

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
            type="file"
            name="avatar"
            id="contained-button-file"
            accept=".stl"
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
        <DebugShow>
          <Typography variant="body1">/home/logic/_workspace/3dprint-salesman/test_stl</Typography>
        </DebugShow>

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
