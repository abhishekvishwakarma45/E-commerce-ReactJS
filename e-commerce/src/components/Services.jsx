export const Services = () => {
  const services = [
    {
      id: 1,
      title: "Fast Shipping",
      description: "Get your products delivered at lightning speed, anywhere.",
      icon: "🚚",
    },
    {
      id: 2,
      title: "24/7 Support",
      description: "Our customer service is always available to help you.",
      icon: "💬",
    },
    {
      id: 3,
      title: "Secure Payment",
      description:
        "We provide secure payment methods for a worry-free experience.",
      icon: "🔒",
    },
    {
      id: 4,
      title: "Easy Returns",
      description: "Hassle-free returns and exchanges for your satisfaction.",
      icon: "🔄",
    },
  ];

  return (
    <section className="services-section">
      <h2>Our Services</h2>
      <div className="services-container">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
