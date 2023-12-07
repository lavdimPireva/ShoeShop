import React, { useEffect, useState } from "react";
import CheckoutNavBar from "./CheckoutNavBar";
import CheckoutFooter from "./CheckoutFooter";
import { useProduct } from "../context/ProductProvider";
import { PropagateLoader } from "react-spinners";
import ProgressStepBar from "./ProgressStepBar";
import { useCart } from "../context/CartProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const PaymentPage = () => {
  const [delayedLoading, setDelayedLoading] = useState(true);
  const { cartItems, subtotal, removeFromCart } = useCart();

  const { isLoading } = useProduct();

  useEffect(() => {
    let timeout;
    if (!isLoading) {
      timeout = setTimeout(() => {
        setDelayedLoading(false);
      }, 1000); // 1000 ms delay
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  const formattedSubtotal =
    subtotal && !isNaN(subtotal) ? parseFloat(subtotal).toFixed(2) : "0.00";

  const handleNextStep = () => {
    console.log("hello");
  };

  return (
    <>
      <CheckoutNavBar />

      {delayedLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 60px)",
          }}
        >
          {/* Adjust the height as per your Navbar's height, here assumed 60px */}
          <PropagateLoader color={"#1975B5"} />
        </div>
      ) : (
        <div>
          <section className="section" style={{ backgroundColor: "#f5f5f5" }}>
            {/* Light gray background for the entire section */}
            <div className="container">
              <div className="columns" style={{ gap: "30px" }}>
                <div className="column is-half" style={{ padding: "15px" }}>
                  <ProgressStepBar activeStep={1} />
                </div>

                <div className="column is-half" style={{ padding: "15px" }}>
                  <div className="box " style={{ backgroundColor: "white" }}>
                    {" "}
                    {/* Ensure the box background is white */}
                    <h2 className="title is-5" style={{ padding: "5px" }}>
                      Shporta e blerjeve{" "}
                    </h2>
                    {/* cartItems */}
                    <div
                      className="cart-content"
                      style={{
                        overflowY: "auto",
                        maxHeight: "300px",
                        marginBottom: "20px",
                      }}
                    >
                      {" "}
                      {/* Set a max-height and overflowY to create a scrollable area */}
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="box cart-item "
                          style={{
                            backgroundColor: "white",
                            marginBottom: "10px",
                            position: "relative",
                          }}
                        >
                          <article
                            className="media"
                            style={{
                              backgroundColor: "white",
                              marginBottom: "10px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div className="media-left">
                              <figure className="image is-96x96">
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="cart-item-image"
                                />
                              </figure>
                            </div>
                            <div className="media-content cart-item-details ">
                              <div className="content">
                                <p className="cart-item-name has-text-weight-bold is-size-7-mobile is-size-7-tablet is-size-7-fullhd">
                                  {item.name}
                                </p>
                                <p className="cart-item-price">
                                  <span className="has-text-weight-semibold is-size-7-mobile is-size-7-tablet is-size-7-fullhd">
                                    Çmimi:
                                  </span>{" "}
                                  <span className="has-text-weight-bold is-size-7-mobile is-size-7-tablet is-size-7-fullhd">
                                    {item.discountPrice
                                      ? `${item.discountPrice}`
                                      : item.originalPrice}
                                    €
                                  </span>
                                </p>
                                <p className="cart-item-sizes has-text-weight-bold is-size-7-mobile is-size-7-tablet is-size-7-fullhd	">
                                  Madhesia e zgjedhur:{" "}
                                  {item.selectedSizes.join(", ")}
                                </p>
                              </div>
                            </div>

                            <div
                              className="media-right"
                              style={{
                                position: "absolute", // Absolute position for the delete button
                                top: "50%", // Position at the top half to vertically center
                                right: "0.75rem", // Right position with some padding
                                transform: "translateY(-50%)",
                              }}
                            >
                              <button
                                className="button is-light" // Use 'is-light' for a button that blends into the background
                                onClick={() => removeFromCart(item.cartItemId)}
                                style={{
                                  border: "none",
                                  background: "transparent",
                                  marginLeft: "auto", // This will push the button to the far right
                                }} // Remove border and background for a cleaner look
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>
                    {/* Calculation of the Total*/}
                    <div
                      className="price-summary"
                      style={{ paddingTop: "0px" }}
                    >
                      {/* Summary Heading */}
                      <h3 className="title is-5 has-text-left">Permbledhje</h3>

                      <div
                        className="content has-text-left"
                        style={{ marginTop: "20px" }}
                      >
                        <p className="is-size-6">
                          <span>Subtotal:</span> {formattedSubtotal} €
                        </p>
                        {/* Assuming shipping is a constant value; replace with appropriate variable if needed */}
                        <p className="is-size-6">
                          <span>Transporti:</span> <span>€</span>
                        </p>
                        <p
                          className="is-size-6"
                          style={{
                            borderTop: "1px solid #eaeaea",
                            paddingTop: "10px",
                          }}
                        >
                          <strong>Total:</strong>{" "}
                        </p>{" "}
                        {/* No shipping fees added for this example */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <CheckoutFooter total={subtotal} onNextStepClick={handleNextStep} />
        </div>
      )}
    </>
  );
};

export default PaymentPage;
