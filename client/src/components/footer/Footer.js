function Footer() {
  return (
    <>
      <div
        class="b-example-divider"
        style={{
          width: "100%",
          height: "3rem",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          border: "solid rgba(0, 0, 0, 0.15)",
          borderWidth: "1px 0",
          boxShadow:
            "inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1), inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15)",
        }}
      >
        <p
          className="my-2"
          style={{ textAlign: "center", fontWeight: "bolder" }}
        >
          2023 House Rent Service. All rights reserved.
        </p>
      </div>
      <div class="container">
        <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-2 my-2">
          <div class="col mb-3"></div>

          <div class="col mb-3">
            <h5>About Us</h5>
            We are dedicated to providing high-quality and reliable house rental
            services to our customers. Our goal is to help you find the perfect
            rental property that fits your needs and budget.
          </div>

          <div class="col mb-3">
            <h5>Contact Us</h5>
            <ul class="list-unstyled">
              <li>
                <i class="fas fa-phone"></i> Phone: (+91) 123-4567
              </li>
              <li>
                <i class="fas fa-envelope"></i> Email: info@houserentservice.com
              </li>
              <li>
                <i class="fas fa-map-marker-alt"></i> Address: 123 Main St.
                sunbeam, USA 12345
              </li>
            </ul>
          </div>

          <div class="col mb-3">
            <h5>Follow Us</h5>
            <ul class="list-unstyled">
              <li>
                <a href="https://www.facebook.com">
                  <i class="fab fa-facebook"></i> facebook
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com">
                  <i class="fab fa-twitter"></i> twitter
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com">
                  <i class="fab fa-instagram"></i> instagram
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
