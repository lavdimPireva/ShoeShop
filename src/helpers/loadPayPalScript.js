import { useEffect } from "react";

export function loadPayPalScript() {
  const existingScript = document.getElementById("paypal-sdk");
  if (!existingScript) {
    const script = document.createElement("script");
    script.id = "paypal-sdk";
    // Include the intent=authorize parameter in the script URL
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=EUR&intent=authorize`;
    script.async = true;
    document.body.appendChild(script);
  }
}
