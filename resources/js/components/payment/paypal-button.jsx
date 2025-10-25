import { router } from "@inertiajs/react";
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PaypalButton = ({coupon,reservations}) => {
  const [clientID, setClientID] = useState("");
  useEffect(() => {
    axios.get("/api/paypal-config").then((res) => {
      setClientID(res.data.client_id);
    });
  }, []);
  const reservationsIds = reservations.map(r => r.id);
  if (!clientID) return <LoaderCircle className="animate-spin"/>;
  return (
    <PayPalScriptProvider options={{ "client-id": clientID }}>
      <PayPalButtons
        fundingSource={FUNDING.PAYPAL}
        createOrder={async () => {
          try {
            const res = await axios.post("/process-transaction",{
              couponId: coupon?.id || null,
              reservationsIds : reservationsIds
            });
            
            if (res.data.orderID) {
              return res.data.orderID;
            } 
          } catch (error) {
            if (error.response?.status === 422) {
              const msg = error.response.data.errors.error?.[0]
              toast.error(msg,{
                descriptionClassName: "text-white/90", 
                duration: 5000,
                position: "top-center",
                style: {
                  backgroundColor: "hsl(var(--destructive))",
                  color: "#fff",
                }
              })
            }
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
