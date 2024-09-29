import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./Form.module.css";

export default function BookingForm() {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    bookingDate: Yup.date().required("Booking date is required"),
    comment: Yup.string(),
  });

  const initialValues = {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  };

  const onSubmit = (values, { resetForm }) => {
    console.log("Form submitted:", values);
    alert("Your booking has been successful!");
    resetForm();
  };

  return (
    <div className={css.formWrap}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Name*"
                className={css.input}
              />
              <ErrorMessage name="name" component="p" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email*"
                className={css.input}
              />
              <ErrorMessage name="email" component="p" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <Field
                type="text"
                id="bookingDate"
                name="bookingDate"
                placeholder="Booking Date*"
                className={css.input}
              />
              <ErrorMessage
                name="bookingDate"
                component="p"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <Field
                as="textarea"
                id="comment"
                name="comment"
                placeholder="Comment"
                className={css.inputComent}
              />
              <ErrorMessage
                name="comment"
                component="p"
                className={css.error}
              />
            </div>

            <button type="submit" className={css.btn} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
