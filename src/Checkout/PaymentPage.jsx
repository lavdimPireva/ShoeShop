import React, { useEffect, useState } from "react";
import CheckoutNavBar from "./CheckoutNavBar";
import CheckoutFooter from "./CheckoutFooter";
import { useProduct } from "../context/ProductProvider";
import { PropagateLoader } from "react-spinners";
import ProgressStepBar from "./ProgressStepBar";
import { useCart } from "../context/CartProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";

const PaymentPage = () => {
  const [delayedLoading, setDelayedLoading] = useState(true);
  const [transportCost, setTransportCost] = useState(0);
  const { cartItems, subtotal, removeFromCart } = useCart();
  const { isLoading } = useProduct();
  const location = useLocation();
  const checkoutFormData = location.state?.checkoutFormData;

  console.log("CheckoutFormData", checkoutFormData);

  const userDetails = {
    fullName: checkoutFormData.name + " " + checkoutFormData.surname,
    address: checkoutFormData.address,
    city: checkoutFormData.city,
    country: checkoutFormData.country,
  };

  useEffect(() => {
    // Check the selected country and set the transport cost
    if (
      checkoutFormData?.country === "Shqiperia" ||
      checkoutFormData?.country === "Maqedonia"
    ) {
      setTransportCost(5);
    } else if (checkoutFormData?.country === "Kosova") {
      setTransportCost(0); // Free
    }
  }, [checkoutFormData]);

  // Now you can use the `transportCost` state wherever you need it, for example in the calculation of the total or to display it to the user.

  console.log("user details", userDetails);

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

  const createOrder = (data, actions) => {
    return actions.order.create({
      intent: "AUTHORIZE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: (parseFloat(subtotal) + transportCost).toFixed(2),
          },
        },
      ],
    });
  };

  const handlePaymentSuccess = async (details, data) => {
    console.log("Payment Success:", details, data);

    console.log("Information");

    console.log("Details >>", details);
    console.log("Data >>", data);

    // Extract the necessary data from the payment details
    const orderID = details.orderID;

    console.log("orderID>>>", orderID);

    const captureOrderEndpoint = "http://localhost:8081/api/capture-order";
    // const captureOrderEndpoint = "https://api.atletjaime.com/api/capture-order";

    try {
      const response = await axios.post(captureOrderEndpoint, {
        orderId: orderID,
      });

      console.log("Response from backend:", response); // To inspect the structure

      if (response.status === 200) {
        console.log("Payment verified by backend:", response.data);
        // Display the important details in the alert
        alert(
          "Payment Success: ID - " +
            response.data.id +
            ", Status - " +
            response.data.status
        );
      } else {
        console.error("Payment verification failed:", response.data);
        alert("Payment verification failed.");
      }
    } catch (error) {
      console.error("Error during payment verification:", error);
      alert(
        "Error during payment verification: " +
          (error.response?.data || error.message)
      );
    }
  };

  return (
    <>
      <CheckoutNavBar />

      {/* ... Loading logic ... */}

      {!delayedLoading && (
        <div>
          <section className="section" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="container">
              <div className="columns">
                {/* User Details Box */}
                <div className="column is-half">
                  <ProgressStepBar activeStep={1} />

                  <div className="message is-info" style={{ margin: "1rem" }}>
                    <div className="message-header">
                      <p className="title is-6">Address Details</p>
                    </div>
                    <div
                      className="message-body is-6"
                      style={{ padding: "1rem" }}
                    >
                      {/* Iterate over userDetails to display them */}
                      {Object.entries(userDetails).map(([key, value]) => (
                        <div key={key}>
                          <span>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </span>{" "}
                          <strong>{value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cart Items Box */}
                <div className="column is-half">
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
                        <p className="is-size-6">
                          <span>Transporti:</span>{" "}
                          {transportCost === 0
                            ? "Free"
                            : `${transportCost.toFixed(2)} €`}
                        </p>
                        {/* Assuming shipping is a constant value; replace with appropriate variable if needed */}
                        <p
                          className="is-size-6"
                          style={{
                            borderTop: "1px solid #eaeaea",
                            paddingTop: "10px",
                          }}
                        >
                          <strong>Total:</strong>
                          <strong>
                            {" "}
                            {(parseFloat(subtotal) + transportCost).toFixed(
                              2
                            )}{" "}
                            €
                          </strong>
                        </p>

                        {/* No shipping fees added for this example */}
                      </div>
                      <div className="field mt-4">
                        <div>
                          <PayPalButton
                            createOrder={createOrder}
                            onApprove={handlePaymentSuccess}
                            options={{
                              clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
                              currency: "EUR",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
export default PaymentPage;
