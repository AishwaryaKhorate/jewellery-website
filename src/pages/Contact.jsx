function Contact() {
  return (
    <section className="section-layout contact-layout">
      <h2>Contact Us</h2>
      <p className="section-copy">Send your request and our exhibition team will reply quickly.</p>
      <form className="contact-form">
        <input type="text" placeholder="Your name" />
        <input type="email" placeholder="Email address" />
        <textarea rows="5" placeholder="Message"></textarea>
        <button type="submit" className="primary-btn">
          Send Message
        </button>
      </form>
    </section>
  );
}

export default Contact;
