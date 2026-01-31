import api from "./api";

export const placeOrder = (data) => api.post("/place-order.php", data);
export const getOrders = () => api.get("/get-orders.php");
