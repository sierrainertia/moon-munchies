import React from "react";
import "./index.scss";

export const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="wrapper">
        <h2>Contact</h2>
        <p>For business inquiries fill out the form below.</p>
        <form
          name="contact"
          className="contact-section__email-form"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="contact" />

          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
          />
          <textarea
            name="message"
            placeholder="Write your message here 😊"
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};
