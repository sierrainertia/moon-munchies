import React from "react";
import "./index.scss";

export const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="wrapper">
        <h2>Contact</h2>
        <p>Fill out the form below to chat with us!</p>
        <form
          name="contact"
          className="contact-section__email-form"
          data-netlify="true"
        >
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
          />
          <textarea
            name="message"
            placeholder="Your message here..."
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};
