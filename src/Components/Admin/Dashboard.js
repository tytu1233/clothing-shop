import React, { useState, useMemo } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DrawerComponent from './DrawerComponent';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BarComponent from './BarComponent';
import { ListItem } from '@mui/material';
import Admin from './Admin';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminUsers from './Users/AdminUsers';
import AdminProducts from './Products/AdminProducts';
import AdminOrders from './Orders/AdminOrders';
  
const mdTheme = createTheme();
  
const Dashboard = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
      setOpen(!open);
    };


    const list = useMemo(
      () => [
        {
          title: 'Panel',
          icon: <DashboardIcon />,
          link: '',
          component: <Admin />,
        },
        {
          title: 'Użytkownicy',
          icon: <PeopleIcon />,
          link: 'users',
          component: <AdminUsers />,
        },
        {
          title: 'Produkty',
          icon: <InventoryIcon />,
          link: 'products',
          component: <AdminProducts />,
        },
        {
          title: 'Zamówienia',
          icon: <LocalShippingIcon />,
          link: 'orders',
          component: <AdminOrders />,
        },
      ],
      []
    );

  
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <BarComponent position="absolute" open={open}>
            <Toolbar
              sx={{
                bgcolor: "rgb(17, 17, 17)",
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Panel Administratora
              </Typography>
              <IconButton>
                <Badge>
                  <a href='/'><ArrowBackIcon sx={{color: 'white'}}/></a>
                </Badge>
              </IconButton>
            </Toolbar>
          </BarComponent>
          <DrawerComponent variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
            {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
            </List>
          </DrawerComponent>
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '60px' }}>
          <Routes>
              {list.map((item) => (
                <Route key={item.title} path={item.link} element={item.component} />
              ))}
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    );
}

export default Dashboard;