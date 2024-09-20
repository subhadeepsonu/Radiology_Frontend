import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // Function to handle file input change
  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Function to handle image upload
  const handleUpload = async () => {
    if (!image) {
      console.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'Radiology'); // Using the exact preset name

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/db86r4idv/image/upload', // Your cloud name in the URL
        formData
      );

      // Set the image URL from the Cloudinary response
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className='h-screen w-full flex justify-center items-center flex-col'>
      <h2>Upload Image to Cloudinary</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
