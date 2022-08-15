import { Box } from '@mui/material'
import { useRef } from 'react'
import { StlViewer } from 'react-stl-viewer'

export default function PreviewStl({ preview_stl_url }) {
  const ref = useRef()

  return (
    <>
      <Box sx={{ width: '300px', height: '300px' }}>
        Preview stl here
        <StlViewer
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          orbitControls
          shadows
          showAxes
          floorProps={{ gridWidth: 300 }}
          url={preview_stl_url}
          modelProps={{
            positionX: 150,
            positionY: 150,
            scale: 1,
            color: '#008675',
            ref,
          }}
          onFinishLoading={console.log}
        />
      </Box>
    </>
  )
}
