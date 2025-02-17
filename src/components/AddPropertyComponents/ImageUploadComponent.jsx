import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

import style from "./ImageUploadComponent.module.css";

function ImageUpload({ onFilesSelected }) {
  const [images, setImages] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...acceptedFiles];

        onFilesSelected(updatedImages);

        return updatedImages;
      });
    },
  });

  const removeImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);

      onFilesSelected(updatedImages);

      return updatedImages;
    });
  };

  useEffect(() => {
    return () => {
      // Revoca gli oggetti URL quando il componente viene smontato
      images.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [images]);

  return (
    <div className="py-3">
      <div {...getRootProps()} className={style.dropzone}>
        <input {...getInputProps()} />
        <div>
          <FaCloudUploadAlt className={style.icon} />
          <p>Trascina qui le immagini o clicca per selezionarle</p>
        </div>
      </div>

      <div className="row">
        {images.map((file, index) => (
          <div
            key={index}
            className="col-md-6 col-12 d-flex align-items-center py-2"
          >
            <div className="image-item w-100 d-flex align-items-center justify-content-between">
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="img-thumbnail me-3"
                style={{
                  maxWidth: "70px",
                  height: "70px",
                  objectFit: "cover",
                }}
              />
              <span className="flex-grow-1">{file.name}</span>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
              >
                Elimina
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
