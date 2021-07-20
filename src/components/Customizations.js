import React, { useImperativeHandle, forwardRef } from "react";

import { useFormik } from "formik";
import * as yup from "yup";

import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  TextField,
  Checkbox,
  ListItemText
} from "@material-ui/core";
import { COLOURS } from "../constants";

import "../assets/customization.scss";

const CustomizationsView = ({ options }, ref) => {
  const createValidationSchema = () => {
    let schema = {};
    for (let item of options) {
      switch (item) {
        case "color":
          schema.color = yup.array().min(1, "MUST CHOOSE 1");
          break;
        case "theme":
          schema.theme = yup
            .string("*Please enter an email address")
            .trim()
            .required("*This field is required");
          break;
        case "text":
          schema.text = yup
            .string("*Please enter your enquiry")
            .trim()
            .required("*This field is required");
          break;
        default:
      }
    }
    return schema;
  };

  const validationSchema = yup.object(createValidationSchema());

  const formik = useFormik({
    initialValues: {
      color: [],
      theme: "",
      text: ""
    },
    validationSchema: validationSchema,
    onSubmit: () => {}
  });

  useImperativeHandle(ref, () => ({
    submit: async () => {
      formik.submitForm();
      const err = await formik.validateForm();
      if (Object.keys(err).length === 0) return formik.values;
      return false;
    }
  }));

  return (
    <div className="productOptions">
      <form onSubmit={formik.handleSubmit}>
        {options.map((item, key) => {
          return (
            <div>
              {item === "color" && (
                <FormControl
                  variant="outlined"
                  error={formik.touched.color && Boolean(formik.errors.color)}
                >
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Colour
                  </InputLabel>
                  <Select
                    // native
                    multiple
                    label="colour"
                    inputProps={{
                      name: "color"
                    }}
                    value={formik.values.color}
                    renderValue={(selected) => selected.join(", ")}
                    onChange={formik.handleChange}
                  >
                    {COLOURS.map((color) => (
                      <MenuItem key={color} value={color}>
                        <Checkbox
                          checked={formik.values.color.indexOf(color) > -1}
                        />
                        <ListItemText primary={color} />
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {formik.touched.color && formik.errors.color}
                  </FormHelperText>
                </FormControl>
              )}
              {item === "theme" && (
                <TextField
                  name="theme"
                  label="Theme*"
                  variant="outlined"
                  value={formik.values.theme}
                  onChange={formik.handleChange}
                  error={formik.touched.theme && Boolean(formik.errors.theme)}
                  helperText={formik.touched.theme && formik.errors.theme}
                />
              )}
              {item === "text" && (
                <TextField
                  multiline
                  rows={6}
                  maxRows={6}
                  name="text"
                  label="Anything extra you'd like me to know?"
                  variant="outlined"
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  error={formik.touched.text && Boolean(formik.errors.text)}
                  helperText={formik.touched.text && formik.errors.text}
                />
              )}
            </div>
          );
        })}
      </form>
    </div>
  );
};

const Customizations = forwardRef(CustomizationsView);
export default Customizations;
