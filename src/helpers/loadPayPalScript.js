export function loadPayPalScript() {
  const existingScript = document.getElementById("paypal-sdk");
  if (!existingScript) {
    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=EUR&intent=authorize`;
    script.defer = true; // Changed from async to defer

    // Error handling
    script.onerror = () => {
      console.error("The PayPal SDK script failed to load.");
    };

    // Optional: Confirmation of script load
    script.onload = () => {
      console.log("PayPal SDK script loaded successfully.");
    };

    document.body.appendChild(script);
  }
}
