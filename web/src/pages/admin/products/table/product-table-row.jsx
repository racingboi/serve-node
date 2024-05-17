import { useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../../../components/iconify';
import { deleteProduct } from '../../../../redux/slices/productReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function ProductTableRow({
  _id,
  selected,
  name,
  avatarUrl,
  price,
  brand,
  sold,
  quantity,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEditOpen = () => {
    handleCloseMenu();
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>{name}</Typography>
          </Stack>
        </TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{brand}</TableCell>
        <TableCell>{quantity}</TableCell>
        <TableCell>{sold}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 140 },
          },
        }}
      >
        <MenuItem onClick={handleEditOpen}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          <Link to={`/dashboard/products/${_id}`}>Edit</Link>
        </MenuItem>

        <MenuItem onClick={() => {
          handleDelete(_id);
          handleCloseMenu();
        }} sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

ProductTableRow.propTypes = {
  _id: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  brand: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired,
  sold: PropTypes.number.isRequired,
};
