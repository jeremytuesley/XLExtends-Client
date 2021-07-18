import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CONTACT } from "../shared/utils";
import Loading from "../components/Loading";

import { useFormik } from "formik";
import * as yup from "yup";

import "../assets/contact.scss";
import { TextField, Button, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

const Contact = () => {
  const [errorBar, setErrorBar] = useState(false);
  const [submitForm, { loading, error, data }] = useMutation(CONTACT);

  const handleSubmit = async (values) => {
    try {
      await submitForm({ variables: values });
    } catch (err) {
      setErrorBar(true);
    }
  };

  const validationSchema = yup.object({
    name: yup
      .string("*Please enter your name")
      .trim()
      .required("*This field is required"),
    contact: yup
      .string("*Please enter an email address")
      .email(
        "Please enter a valid email address, for example: example@gmail.com"
      )
      .trim()
      .required("*This field is required"),
    comments: yup
      .string("*Please enter your enquiry")
      .trim()
      .required("*This field is required")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      comments: "",
      files: null
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  useEffect(() => {
    if (error || (data && !data.contact)) {
      setErrorBar(true);
    } else {
      setErrorBar(false);
    }
  }, [error, data]);

  return (
    <div className="content">
      <Snackbar
        open={errorBar}
        autoHideDuration={4000}
        onClose={() => setErrorBar(false)}
      >
        <Alert severity="error" onClose={() => setErrorBar(false)}>
          Something went wrong! Form did not send.
        </Alert>
      </Snackbar>
      <div className="contactPage">
        <div className="sideDecoration"></div>
        <div className="contactFormContainer">
          <div className="contactTitle">Contact Me</div>
          <div className="contactSubtitle">
            Have an enquiry? Something you'd like me to make?
          </div>
          {loading ? (
            <Loading />
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                name="name"
                label="Full Name*"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                name="contact"
                label="Email Address*"
                variant="outlined"
                value={formik.values.contact}
                onChange={formik.handleChange}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
              />
              <TextField
                multiline
                rows={6}
                maxRows={6}
                name="comments"
                label="Message*"
                variant="outlined"
                value={formik.values.comments}
                onChange={formik.handleChange}
                error={
                  formik.touched.comments && Boolean(formik.errors.comments)
                }
                helperText={formik.touched.comments && formik.errors.comments}
              />
              <div className="buttonContainer">
                <Button
                  variant="contained"
                  color="primary"
                  className="sendButton"
                  startIcon={<SendIcon />}
                  type="submit"
                >
                  Send
                </Button>
                <div className="attachImage">
                  <input
                    accept="image/*"
                    type="file"
                    multiple
                    onChange={(event) =>
                      formik.setFieldValue("files", event.currentTarget.files)
                    }
                    name="files"
                    id="contained-button-file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      component="span"
                      className="attachButton"
                      startIcon={<AttachFileIcon />}
                      color="primary"
                    >
                      Attach a picture?
                    </Button>
                  </label>
                  {formik.values.files && (
                    <div className="imageAttached">
                      {formik.values.files?.length} picture
                      {formik.values.files?.length > 1 && "s"} attached
                    </div>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
        <div className="socials">
          <div className="socialsTitle">Contact Infomation </div>
          <p>
            If you have a question regarding your online order or any other
            queries, please contact me via the form on the left and I will get
            back to you as soon as possible!
            <br />
            <br />
            You can also contact me via email or the social links below:
          </p>
          <b>
            <a
              href="mailto:xlextends@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="email"
            >
              Email: xlextends@gmail.com
            </a>
            <br />
          </b>
          <br />
          <a
            href="https://www.facebook.com/XL-Extends-104815671697497"
            target="_blank"
            rel="noreferrer"
            className="smLinks"
          >
            <FacebookIcon />
            Facebook
          </a>
          <a
            href="https://www.instagram.com/xlextends"
            target="_blank"
            rel="noreferrer"
            className="smLinks"
          >
            <InstagramIcon />
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
