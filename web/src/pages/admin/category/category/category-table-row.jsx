import { useState } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Checkbox, IconButton, MenuItem, Popover, Collapse, Box, Table, TableHead, TableBody } from '@mui/material';
import Iconify from '../../../../components/iconify';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../../../redux/slices/categoryReducer';
import EditCategory from './edit/EditCategory';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const CategoryTableRow = ({ category, selected, handleClick }) => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage popover anchor
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const dispatch = useDispatch();
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
    handleCloseMenu();
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteCategory(category._id));
    handleCloseMenu();
  };

  const renderMenuItems = () => (
    <>
      <MenuItem onClick={handleEditOpen}>
        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
        Edit
      </MenuItem>
      <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
        <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
        Delete
      </MenuItem>
    </>
  );

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={() => handleClick(category._id)} />
        </TableCell>
        <TableCell>
          {category.name}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setSelectedCategory(!selectedCategory)}
          >
            {selectedCategory ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{category.slug}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={selectedCategory} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Slug</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category.children.length > 0 ? category.children.map((child, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {child.name}
                      </TableCell>
                      <TableCell>{child.slug}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={handleOpenMenu}>
                          <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                      </TableCell>
                    </TableRow>)) :
                    <TableRow>
                      <TableCell colSpan={3} align="center">No children</TableCell>
                    </TableRow>}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* Popover menu */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {renderMenuItems()}
      </Popover>
      {/* EditCategory dialog */}
      <EditCategory open={editOpen} onClose={handleEditClose} category={category} />
    </>
  );
};

CategoryTableRow.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CategoryTableRow;
