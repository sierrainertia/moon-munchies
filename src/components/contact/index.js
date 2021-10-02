import React, { useCallback, useRef, useState } from "react";
import "./index.scss";

export const ContactSection = () => {
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const submitForm = useCallback((e) => {
    e.preventDefault();
    console.log(formRef.current);

    let formData = new FormData(formRef.current);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        setSubmitted(true);
        formRef.current.reset();
      })
      .catch(() => setError(true));
  }, []);

  return (
    <section className="contact-section" id="contact">
      <div className="wrapper">
        <h2>Contact</h2>
        <p>For business inquiries fill out the form below.</p>
        <form
          name="contact"
          className="contact-section__email-form"
          onSubmit={submitForm}
          ref={formRef}
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="contact" />
          <label className="visually-hidden" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="your@email.com"
            required
          />
          <label className="visually-hidden" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Write your message here 😊"
            required
          ></textarea>
          <button type="submit" disabled={submitted}>
            Submit
          </button>
          {error && (
            <p style={{ color: "red" }}>
              There was an error submitting the form, please try again.
            </p>
          )}
          {submitted && <p>Your message was successfully sent!</p>}
        </form>
      </div>
    </section>
  );
};
