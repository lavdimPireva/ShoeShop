import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartProvider";
import Navbar from "../Navbar/NavBar";
import Footer from "../HomePage/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductProvider";
import { PropagateLoader } from "react-spinners";

const CartPage = () => {
  const { cartItems, subtotal, removeFromCart } = useCart(); // Replace with how you get cart data
  const navigate = useNavigate(); // Initialize the navigate function
  const [delayedLoading, setDelayedLoading] = useState(true);
  const { isLoading } = useProduct();

  useEffect(() => {
    let timeout;
    if (!isLoading) {
      // Set a timeout to change the delayedLoading state after a certain period
      timeout = setTimeout(() => {
        setDelayedLoading(false);
      }, 1000); // 1000 ms delay
    }

    return () => {
      // Clear the timeout if the component is unmounted
      // to prevent a state update on an unmounted component
      clearTimeout(timeout);
    };
  }, [isLoading]); // Dependency on the isLoading state

  const formattedSubtotal =
    subtotal && !isNaN(subtotal) ? parseFloat(subtotal).toFixed(2) : "0.00";

  const handleContinueToCheckout = () => {
    navigate("/checkout"); // Navigate to the checkout page
  };

  return (
    <>
      <div style={{ background: "white" }}>
        <Navbar />

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
            <div
              class="columns  is-centered"
              style={{
                height: "80vh",
              }}
            >
              <div class="column is-half">
                {cartItems.length > 0 ? (
                  <div
                    class="box"
                    style={{
                      height: "auto",
                      maxHeight: "700px",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    {" "}
                    {/* Ensure the box background is white */}
                    <h2 className="title is-5">Shporta e blerjeve </h2>
                    {/* cartItems */}
                    <div
                      className="cart-content"
                      style={{
                        overflowY: "auto",
                        maxHeight: "400px",
                        marginRight: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      {" "}
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
                        <p
                          className="is-size-6"
                          style={{
                            borderTop: "1px solid #eaeaea",
                            paddingTop: "10px",
                          }}
                        >
                          <strong>Total:</strong>{" "}
                          <strong>{parseFloat(subtotal).toFixed(2)} €</strong>
                        </p>{" "}
                        {/* No shipping fees added for this example */}
                      </div>
                    </div>
                    <button
                      onClick={handleContinueToCheckout}
                      className="button  is-fullwidth" // is-primary for primary color, is-fullwidth to make the button full width
                      style={{
                        marginTop: "1rem",
                        background: "#1975B5",
                        color: "white   ",
                      }} // Add margin-top for spacing
                    >
                      Continue to Checkout
                    </button>
                  </div>
                ) : (
                  // The message displayed if cart is empty
                  <div className="message is-info" style={{ margin: "1rem" }}>
                    <div className="message-header">
                      <p>Your cart is empty</p>
                    </div>
                    <div className="message-body">
                      <p>
                        Please add some products to your cart before checking
                        out.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Footer />
          </div>
        )}
      </div>
    </>
  );
};
export default CartPage;
