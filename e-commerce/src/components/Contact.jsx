import { Fragment } from "react";
import { Footer } from "./Footer";

export default function Contact() {
  return (
    <Fragment>
      <div className="contact-container grid md:grid lg:flex xl:flex">
        <div className="contact-container-item contact-map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1995.161507028669!2d73.76091348488306!3d18.633579939302024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1733816315492!5m2!1sen!2sin"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="contact-container-item contact-form-container">
          <input type="text" placeholder="Enter Your Name" />
          <input type="Number" placeholder="Enter Phone Number" />
          <input type="Email" placeholder="Enter Email" />
          <input
            type="textbox"
            className="messagebox"
            placeholder="Enter Your Message"
          />

          <button>Submit</button>
        </div>
      </div>
      <Footer /> {/* Render the Footer component here */}
    </Fragment>
  );
}
