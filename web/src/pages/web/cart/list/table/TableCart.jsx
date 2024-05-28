import { Avatar, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import formatPrice from "../../../../../components/formatPrice/formatPrice";
import { useDispatch } from "react-redux";
import { deleteCart  } from "../../../../../redux/slices/cartReducer";

export default function TableCart({ data, handleUpdate, handleUpdateInput, handleDeleteSP }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ids = data.map(item => item.id);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(true);
  }, [data]);
  const handleDetele = (id) => {
    dispatch(deleteCart(id));
  };
  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell align="right">Hình</TableCell>
            <TableCell align="right">Số lượng</TableCell>
            <TableCell align="right">Giá</TableCell>
            <TableCell align="right">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.product.name}
              </TableCell>
              <TableCell align="right">
                <Avatar src={row.product.images[0]} alt={row.product.name} />
              </TableCell>
              <TableCell align="right">
                <Button onClick={() =>
                  handleUpdate(row.id, "-", row.quantity)}>-</Button>
                {!isDisabled ? (
                  <form onSubmit={(e) => handleUpdateInput(e, row.id)}>
                    <input name="quantity" type="text" placeholder={row.quantity} />
                    <input type="hidden" name="id" value={row.id} />
                    <input name="old_quantity" type="hidden" value={row.quantity} />
                  </form>
                ) : (
                  <Button onDoubleClick={() => setIsDisabled(!isDisabled)}>{row.quantity}</Button>
                )}
                <Button onClick={() => handleUpdate(row.id, "+", row.quantity)}>+</Button>
              </TableCell>
              <TableCell align="right">
                {formatPrice(row.product.price * row.quantity)}
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => handleDetele(row.id)} variant="contained" color="error">Xóa</Button>
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={4}>
              <Button variant="contained" onClick={() => navigate('/home')}>Tiếp tục mua sắm</Button>
            </TableCell>
            <TableCell align="right">
              <Button onClick={() => handleDeleteSP(ids)} variant="contained" color="error">Xóa giỏ hàng</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableCart.propTypes = {
  data: PropTypes.array.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleUpdateInput: PropTypes.func.isRequired,
  handleDeleteSP: PropTypes.func.isRequired,
};
