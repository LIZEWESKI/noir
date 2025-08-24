import { router } from "@inertiajs/react";
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

const PaypalButton = () => {
  const [clientID, setClientID] = useState("");
  useEffect(() => {
    axios.get("/api/paypal-config").then((res) => {
      setClientID(res.data.client_id);
    });
  }, []);

  if (!clientID) return <LoaderCircle className="animate-spin"/>;

  return (
    <PayPalScriptProvider options={{ "client-id": clientID }}>
      <PayPalButtons
        fundingSource={FUNDING.PAYPAL}
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
        onCancel={ () => {
          router.get(`/cancel-transaction`);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
