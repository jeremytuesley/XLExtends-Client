import { useMutation, useQuery } from "@apollo/client";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";

import { CREATE_NEW_PRODUCT, SIGN_REQUEST } from "../../../../shared/utils/api";

const Products = () => {
  const [files, setFiles] = useState([]);

  const [createNewProduct] = useMutation(CREATE_NEW_PRODUCT);
  const { data: signRequestData } = useQuery(SIGN_REQUEST, {
    fetchPolicy: "no-cache"
  });

  const handleUpload = async (e) => {
    e.preventDefault();

    const createForm = (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signRequestData.signRequest.signature);
      formData.append("timestamp", signRequestData.signRequest.timestamp);
      formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
      return formData;
    };

    let responses;

    try {
      responses = await Promise.all(
        [...files].map((file) =>
          axios.post(
            process.env.REACT_APP_CLOUDINARY_API_ENDPOINT,
            createForm(file)
          )
        )
      );

      const images = responses.map(({ data: { url } }) => url);

      createNewProduct({
        variables: {
          createNewProductData: {
            available: true,
            description: "New Product Description - 911",
            images,
            name: "New Product - 911",
            options: ["what are those"],
            price: 9.99,
            salePrice: 8.65
          }
        }
      });
    } catch {
      console.log("this is errors");
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <div>
        <h2>Create New Product</h2>
        <form onSubmit={handleUpload}>
          <TextField label="name" variant="outlined" />
          <TextField label="description" variant="outlined" />
          <TextField label="price" type="number" variant="outlined" />
          <TextField label="sale price" type="number" variant="outlined" />
          <Button
            color="secondary"
            component="label"
            onChange={({ target: { files } }) => setFiles(() => files)}
            variant="contained"
          >
            Upload Images
            <input hidden multiple type="file" />
          </Button>
          <Button color="secondary" type="submit" variant="contained">
            Save
          </Button>
        </form>
      </div>
      <pre>{JSON.stringify({ signRequestData }, null, 2)}</pre>
    </div>
  );
};

export default Products;
