import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom'
import CategoryIcon from '@mui/icons-material/Category';
import { FaToolbox } from "react-icons/fa";
export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/products">
      <ListItemIcon>
        <FaToolbox />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/user">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/category">
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/order">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemIcon>
      <ListItemText primary="ducpro" />
    </ListItemButton>
  </React.Fragment>
);