import { router } from "@inertiajs/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useEffect, useState } from "react";

const PaypalButton = () => {
  const [clientID, setClientID] = useState("");
  useEffect(() => {
    axios.get("/api/paypal-config").then((res) => {
      setClientID(res.data.client_id);
    });
  }, []);

  if (!clientID) return <p>Loading PayPal...</p>;

  return (
    <PayPalScriptProvider options={{ "client-id": clientID }}>
      <PayPalButtons
        createOrder={async () => {
          try {
            const res = await axios.post("/process-transaction");
            if (res.data.orderID) {
              return res.data.orderID;
            } 
          } catch (error) {
            return null;
          }
        }}
        onApprove={async (data) => {
          router.get(`/success-transaction?token=${data.orderID}`);
        }}
        onCancel={ (data) => {
          console.log(data);
          router.get(`/cancel-transaction`);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
