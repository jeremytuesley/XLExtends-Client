import axios from "axios";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { ButtonContainer, StyledForm, StyledTextField } from "./Styles";
import {
  CREATE_NEW_PRODUCT,
  SIGN_REQUEST
} from "../../../../../shared/utils/api";

const CreateNewProductForm = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [productAvailable, setProductAvailable] = useState(true);

  const history = useHistory();
  const [
    createNewProduct,
    { data: createNewProductData, loading: createNewProductLoading }
  ] = useMutation(CREATE_NEW_PRODUCT);
  const { data: signRequestData, loading: singRequestLoading } = useQuery(
    SIGN_REQUEST,
    {
      fetchPolicy: "no-cache"
    }
  );

  const formik = useFormik({
    initialValues: { name: "", description: "", price: 0, salePrice: 0 },
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

        createNewProduct({
          variables: {
            createNewProductData: {
              available: productAvailable,
              description,
              images,
              name,
              options,
              price,
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
    if (createNewProductData) {
      if (createNewProductData.createNewProduct._id) {
        history.push("/products");
      }
    }
  }, [createNewProductData]);

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
      <h2>Options</h2>
      <div>
        {["color", "theme", "text"].map((option) => (
          <FormControlLabel
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
        label="sale price"
        type="number"
        variant="outlined"
        {...formik.getFieldProps("salePrice")}
      />
      <ButtonContainer>
        <Button
          color="secondary"
          component="label"
          onChange={({ target: { files } }) => setFiles(() => files)}
          variant="contained"
        >
          Upload Images
          <input hidden multiple type="file" />
        </Button>
        <Button
          color="secondary"
          disabled={createNewProductLoading || singRequestLoading || loading}
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </ButtonContainer>
    </StyledForm>
  );
};

export default CreateNewProductForm;
