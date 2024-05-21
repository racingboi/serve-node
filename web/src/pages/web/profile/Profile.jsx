import { Footer, Navbar } from "../../../layout/web";
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Info from "./Info";
import Product from "./Product";
import { Container } from "@mui/material";

export default function Profile() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Navbar/>
      <Container>
        <Box sx={{
          width: '100%',
          typography: 'body1',
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
        }}>
          <TabContext value={value}>
            <Box sx={{
              borderColor: 'divider',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'center',
            }}>
              <TabList
                variant="scrollable"
                onChange={handleChange} aria-label="lab API tabs example">
                <Tab
                  sx={{
                   fontSize: '18px',
                  }}
                  label="info" value="1" />
                <Tab
                  sx={{
                    fontSize: '18px',
                  }}
                  label="sản phẩm đã mua" value="2" />
                <Tab
                  sx={{
                    fontSize: '18px',
                  }}
                  label="a" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box sx={{ p: 2 }}>
                <Info />
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Box sx={{ p: 2 }}>
                <Product />
              </Box>
            </TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
        </Container>
      <Footer/>
    </>
  )
}
