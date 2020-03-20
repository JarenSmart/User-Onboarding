import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const userForm = props => {
  console.log("error", props.errors, "touched", props.touched);
  console.log(props.status);

  return (
    <Form>
      <Field name="name" placeholder="Enter name here..." />
      {props.touched.name && props.errors.name ? (
        <span className="error">{props.erros.name}</span>
      ) : null}

      <Field name="email" placeholder="Enter E-mail here..." />
      {props.touched.email && props.errors.email ? (
        <span className="error">{props.errors.email}</span>
      ) : null}

      <Field name="password" placeholder="Please create a password" />
      {props.touched.password && props.errors.password ? (
        <span className="error">{props.errors.password}</span>
      ) : null}

      <label htmlFor="tos">Have you read Terms of Service?</label>
      <Field type="checkbox" name="tos" />
      {props.touched.tos && props.errors.tos ? (
        <span className="error">{props.erros.tos}</span>
      ) : null}
      <button type="submit">Create Profile!</button>
    </Form>
  );
};

export default withFormik({
  mapPropsToValues: props => {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      tos: props.tos || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter a name"),
    email: Yup.string()
      .required("Please enter a valid e-mail")
      .email("Must be a valid e-mail"),
    password: Yup.string()
      .required("Please enter a name")
      .min(8, "Your password must be at least 8 characters long"),
    tos: Yup.boolean().oneOf([true], "Please accept out Terms of Service")
  }),
  handleSubmit: (values, formikBag) => {
    formikBag.props.submitUser({
      ...values
    });
    formikBag.setStatus("Submitting...");
    formikBag.resetForm();
  }
})(userForm);
