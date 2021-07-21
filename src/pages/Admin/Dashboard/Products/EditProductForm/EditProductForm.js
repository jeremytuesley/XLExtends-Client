import axios from "axios";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import {
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  SIGN_REQUEST
} from "../../../../../shared/utils/api";
import { ButtonContainer, StyledForm, StyledTextField } from "./Styles";

const EditProductForm = ({ product, refetch }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(product.options);
  const [productAvailable, setProductAvailable] = useState(product.available);

  const { data: signRequestData, loading: signRequestLoading } =
    useQuery(SIGN_REQUEST);
  const [
    deleteProduct,
    { data: deleteProductData, loading: deleteProductLoading }
  ] = useMutation(DELETE_PRODUCT);
  const [editProduct, { loading: editProductLoading }] =
    useMutation(EDIT_PRODUCT);

  const formik = useFormik({
    initialValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      salePrice: product?.salePrice || 0
    },
    onSubmit: async ({ name, description, price, salePrice }) => {
      setLoading(() => true);
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

        editProduct({
          variables: {
            editProductData: {
              available: productAvailable,
              description,
              images: files.length ? images : product.images,
              name,
              options,
              price,
              productId: product._id,
              ...(Boolean(salePrice) && { salePrice })
            }
          }
        });
        setLoading(() => false);
      } catch {
        setLoading(() => false);
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
    if (deleteProductData) {
      if (deleteProductData.deleteProduct) refetch();
    }
  }, [deleteProductData]);

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={productAvailable}
              onChange={({ target: { checked } }) =>
                setProductAvailable(() => checked)
              }
            />
          }
          label="Available"
        />
      </div>
      <StyledTextField
        label="name"
        variant="outlined"
        {...formik.getFieldProps("name")}
      />
      <StyledTextField
        label="description"
        multiline
        minRows={6}
        maxRows={6}
        variant="outlined"
        {...formik.getFieldProps("description")}
      />
      <h2>Images</h2>
      <div style={{ display: "flex" }}>
        {product.images.map((image, index) => (
          <div key={index}>
            <img alt="product" src={image} width="200" />
          </div>
        ))}
      </div>
      <h2>Options</h2>
      <div>
        {["color", "theme", "text"].map((option) => (
          <FormControlLabel
            checked={options.includes(option)}
            control={<Checkbox />}
            key={option}
            label={option}
            onChange={({ target: { checked } }) =>
              setOptions((options) =>
                checked
                  ? [...options, option]
                  : options.filter((currentOption) => currentOption !== option)
              )
            }
          />
        ))}
      </div>
      <StyledTextField
        label="price"
        type="number"
        variant="outlined"
        {...formik.getFieldProps("price")}
      />
      <StyledTextField
        label="salePrice"
        type="number"
        variant="outlined"
        {...formik.getFieldProps("salePrice")}
      />
      <ButtonContainer>
        <Button
          color="secondary"
          disabled={
            deleteProductLoading ||
            editProductLoading ||
            loading ||
            signRequestLoading
          }
          onClick={async () => {
            deleteProduct({
              variables: { deleteProductData: { productId: product._id } }
            });
          }}
          variant="contained"
        >
          DELETE
        </Button>
        <Button
          color="secondary"
          component="label"
          disabled={
            deleteProductLoading ||
            editProductLoading ||
            loading ||
            signRequestLoading
          }
          variant="contained"
        >
          Upload Images
          <input
            hidden
            multiple
            onChange={({ target: { files } }) => setFiles(() => files)}
            type="file"
          />
        </Button>
        <Button
          color="secondary"
          disabled={
            deleteProductLoading ||
            editProductLoading ||
            loading ||
            signRequestLoading
          }
          type="submit "
          variant="contained"
        >
          Save
        </Button>
      </ButtonContainer>
    </StyledForm>
  );
};

export default EditProductForm;
