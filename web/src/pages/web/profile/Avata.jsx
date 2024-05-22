import { Box, Button, Container } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { imageDb } from '../../../config/firebase'; // Ensure this is the correct path
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slices/authReducer";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

export default function AvatarUploader() {
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const filePreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(filePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const imgRef = ref(imageDb, `users/${uuidv4()}`);
        const snapshot = await uploadBytes(imgRef, file);
        return getDownloadURL(snapshot.ref);
      });

      const imageUrls = await Promise.all(uploadPromises);

      dispatch(updateUser({ img: imageUrls }));
    } catch (error) {
      console.error('Error uploading files: ', error);
    }
  };

  return (
    <Container>
      <h1>cập nhật avata</h1>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 4,
      }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            multiple // Allows multiple file selections
            onChange={handleFileChange}
          />
        </Button>
        {imagePreviews.map((url, index) => (
          <img key={index} src={url} alt="Preview" style={{ width: 100, height: 100 }} />
        ))}
        <Button
          onClick={handleSubmit}
          variant="contained"
        >
          cập nhật
        </Button>
      </Box>
    </Container>
  );
}
