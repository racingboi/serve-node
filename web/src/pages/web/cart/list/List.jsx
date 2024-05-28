import { Box, Container } from "@mui/material";
import TableCart from "./table/TableCart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, resetDeleteCartState, resetState, updateCart } from "../../../../redux/slices/cartReducer";
import Total from "./total/Total";
import { handleToast } from "../../../../config/ConfigToats";
export default function List() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const sattaus = useSelector((state) => state.cart.status);
  const cart = useSelector((state) => state.cart.data);
  const error = useSelector((state) => state.cart.error);
  const deleteCarts = useSelector((state) => state.cart.statusDeleteCart);
  const updateCarts = useSelector((state) => state.cart.statusUpdateCart);
  useEffect(() => {
    if (updateCarts === "success") {
      handleToast("success", "Cập nhật sản phẩm thành công")
      dispatch(getCart());
      dispatch(resetState())
    }
    if (updateCarts === "failed") {
      handleToast("error", error.message)
    }
  }, [dispatch, updateCarts, error]);
  useEffect(() => {
    if (deleteCarts === "success") {
      handleToast("success", "Xóa sản phẩm thành công")
      dispatch(getCart());
      dispatch(resetDeleteCartState())
    }
    if (deleteCarts === "failed") {
      handleToast("error", error.message)
    }
  }, [dispatch, deleteCarts, error]);
  useEffect(() => {
    if (sattaus === "failed") {
      console.log(error);
    }
    if (sattaus === "success") {
      setData(cart);
      dispatch(resetState()); 
    }
  }, [sattaus, error, cart,dispatch]);
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
 
  const handleUpdate = (id, sign, quantity) => {
    if (typeof quantity !== 'number') {
      console.error('Invalid quantity: Expected a number');
      return; // Exit the function if the quantity is not a number.
    }

    const newQuantity = sign === '+' ? quantity + 1 : quantity - 1;

    if (newQuantity < 0) {
      console.error('Quantity cannot be negative');
      return; // Prevent negative quantities.
    }

    dispatch(updateCart({ cartId: id, data: { quantity: newQuantity } }));
  };


  const handleUpdateInput = (e) => { 
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    const quantity = parseInt(value.quantity);
    dispatch(updateCart({ cartId: value.id, data: { quantity: quantity } }));
  };
  const handleDeleteSP = (ids) => {

   };
  return (
    <>
      <Container>
          <TableCart
            data={data}
            handleUpdate={handleUpdate}
            handleUpdateInput={handleUpdateInput}
          handleDeleteSP={handleDeleteSP}
        />
            <Box sx={{py:3 }} >
            <Total />
            </Box>
          
     </Container>
    </>
  )
}
