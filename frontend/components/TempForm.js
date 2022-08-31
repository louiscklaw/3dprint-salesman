<form onSubmit={formik.handleSubmit}>
  <Box display="flex" textAlign="center" justifyContent="center" flexDirection="column">
    {/* <ImageAvatar size='md' src={avatarPreview || user?.avatar} /> */}

    <Typography variant="body2">Max file size 50Mb</Typography>

    <Button variant="contained" component="label">
      Choose STL
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
              formik.setFieldValue('stl_file', fileReader.result.split(',')[1]);
              setAvatarPreview(fileReader.result);
            }
          };
          fileReader.readAsDataURL(e.target.files[0]);
        }}
      />
    </Button>

    <Button type="submit">Upload</Button>
  </Box>
</form>;
