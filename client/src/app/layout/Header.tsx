import { Box, AppBar, Toolbar, IconButton, Typography, Button, Switch } from '@mui/material';
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';

export default function Header(props : any) {
  return (
    <Box sx={{ flexGrow: 1,mb:3 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          
          <Switch defaultChecked onChange={props.handlemode} color="secondary" />
          
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nobody Love
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
