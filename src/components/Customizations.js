import React from "react";

import { TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import "../assets/customization.scss";

const Customizations = ({ options }) => {
  const handleSubmit = (values) => {
    console.log("submitted", values);
  };

  const createValidationSchema = () => {
    let schema = {};
    for (let item of options) {
      switch (item) {
        case "color":
          schema.color = yup
            .string("*Please enter your name")
            .required("*This field is required");
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
      color: "",
      theme: "",
      text: ""
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

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
                    native
                    label="colour"
                    inputProps={{
                      name: "color"
                    }}
                    value={formik.values.color}
                    onChange={formik.handleChange}
                  >
                    <option aria-label="None" value="" />
                    <option value="Blue">Blue</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
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

export default Customizations;
