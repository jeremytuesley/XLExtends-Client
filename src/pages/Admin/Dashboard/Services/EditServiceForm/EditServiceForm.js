import axios from "axios";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import {
  DELETE_SERVICE,
  EDIT_SERVICE,
  SIGN_REQUEST
} from "../../../../../shared/utils/api";
import { ButtonContainer, StyledForm, StyledTextField } from "./Styles";

const EditServiceForm = ({ refetch, service }) => {
  const [duration, setDuration] = useState(service.duration);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(service.options);
  const [serviceAvailable, setServiceAvailable] = useState(service.available);

  const { data: signRequestData, loading: signRequestLoading } =
    useQuery(SIGN_REQUEST);
  const [
    deleteService,
    { data: deleteServiceData, loading: deleteServiceLoading }
  ] = useMutation(DELETE_SERVICE);
  const [editService, { loading: editServiceLoading }] =
    useMutation(EDIT_SERVICE);

  const formik = useFormik({
    initialValues: {
      name: service.name,
      description: service.description,
      price: service.price,
      salePrice: service?.salePrice || 0
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

        editService({
          variables: {
            editServiceData: {
              available: serviceAvailable,
              description,
              duration,
              images: files.length ? images : service.images,
              name,
              options,
              price,
              serviceId: service._id,
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
    if (deleteServiceData) {
      if (deleteServiceData.deleteService) refetch();
    }
  }, [deleteServiceData]);

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={serviceAvailable}
              onChange={({ target: { checked } }) =>
                setServiceAvailable(() => checked)
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
      <FormControl variant="outlined">
        <InputLabel id="duration">Duration (minutes)</InputLabel>
        <Select
          label="Duration (minutes)"
          labelId="duration"
          onChange={({ target: { value } }) =>
            setDuration(() => parseInt(value))
          }
          value={duration}
        >
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={45}>45</MenuItem>
          <MenuItem value={60}>60</MenuItem>
          <MenuItem value={75}>75</MenuItem>
          <MenuItem value={90}>90</MenuItem>
        </Select>
      </FormControl>
      <h3>Images</h3>
      <div style={{ display: "flex" }}>
        {service.images.map((image, index) => (
          <div key={index}>
            <img alt="product" src={image} width="200" />
          </div>
        ))}
      </div>
      <h3>Options</h3>
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
            deleteServiceLoading ||
            editServiceLoading ||
            loading ||
            signRequestLoading
          }
          onClick={() =>
            deleteService({
              variables: { deleteServiceData: { serviceId: service._id } }
            })
          }
          variant="contained"
        >
          Delete
        </Button>
        <Button
          color="secondary"
          component="label"
          disabled={
            deleteServiceLoading ||
            editServiceLoading ||
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
            deleteServiceLoading ||
            editServiceLoading ||
            loading ||
            signRequestLoading
          }
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </ButtonContainer>
    </StyledForm>
  );
};

export default EditServiceForm;
