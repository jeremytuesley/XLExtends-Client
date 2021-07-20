import { useMutation, useQuery } from "@apollo/client";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { CREATE_NEW_PRODUCT, SIGN_REQUEST } from "../../../../shared/utils/api";

const Products = () => {
  const [files, setFiles] = useState([]);

  const history = useHistory();
  const [createNewProduct, { data: createNewProductData }] =
    useMutation(CREATE_NEW_PRODUCT);
  const { data: signRequestData } = useQuery(SIGN_REQUEST, {
    fetchPolicy: "no-cache"
  });

  const formik = useFormik({
    initialValues: { name: "", description: "", price: 0, salePrice: 0 },
    onSubmit: async ({ name, description, price, salePrice }) => {
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
              description,
              images,
              name,
              options: ["what are those"],
              price,
              ...(Boolean(salePrice) && { salePrice })
            }
          }
        });
      } catch {
        console.log("this is errors");
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required."),
      description: Yup.string().required("Product description is required."),
      price: Yup.number().required("Product price is required."),
      salePrice: Yup.number()
    })
  });

  useEffect(() => {
    if (createNewProductData) {
      console.log(createNewProductData.createNewProduct._id);
      if (createNewProductData.createNewProduct._id) {
        history.push("/products");
      }
    }
  }, [createNewProductData]);

  return (
    <div>
      <h1>Products</h1>
      <div>
        <h2>Create New Product</h2>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="name"
            variant="outlined"
            {...formik.getFieldProps("name")}
          />
          <TextField
            label="description"
            variant="outlined"
            {...formik.getFieldProps("description")}
          />
          <TextField
            label="price"
            type="number"
            variant="outlined"
            {...formik.getFieldProps("price")}
          />
          <TextField
            label="sale price"
            type="number"
            variant="outlined"
            {...formik.getFieldProps("salePrice")}
          />
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
