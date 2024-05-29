import React, { useState } from 'react';
import axios from 'axios';
import './style.scss';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

function UploadPost() {
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');
    const [previewImages, setPreviewImages] = useState([]);
    const alert = useAlert();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 4) {
            alert.error('Chỉ có thể tải lên tối đa 4 ảnh');
            return;
        }

        setImages(files);
        setPreviewImages(files.map(file => URL.createObjectURL(file)));
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append('images[]', image);
        });
        formData.append('description', description);

        try {
            const response = await axios.post('https://hdbasicpro.000webhostapp.com/newmedia/api/uploadImage.php', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            if (response.data.status === 200) {
                alert.success(response.data.message);
                navigate('/');
            } else if (response.data.status === 400) {
                alert.error(response.data.message);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log('Lỗi khi tải ảnh lên');
        }
    };

    return (
        <div className="upload-image-container">
            <h4>Tải lên bài viết</h4>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder="Hôm nay bạn thế nào ?"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                <div className={`preview-images layout-${previewImages.length}`}>
                    {previewImages.map((src, index) => (
                        <div key={index} className="preview-image">
                            <img src={src} alt={`Preview ${index}`} />
                        </div>
                    ))}
                </div>
                <button type="submit"><i className="fa-solid fa-cloud-arrow-up"></i> Tải ảnh lên</button>
            </form>
        </div>
    );
}

export default UploadPost;
