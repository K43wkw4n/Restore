import { Box, AppBar, Toolbar, IconButton, Typography,Switch, Badge, List,ListItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
  ];
const rightLinks = [
{ title: "login", path: "/login" },
{ title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
  color: "grey.500",
  },
  "&.active": {
  color: "text.secondary",
  },
  };

export default function Header(props : any) {
  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            direction: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Switch
              defaultChecked
              onChange={props.handlemode}
              color="secondary"
            />
            <Typography variant="h6" component="div">
              Nobody Love
            </Typography>
          </Box>

          <List sx={{display:'flex'}}>
            {midLinks.map(({title,path})=> (
              <ListItem key={title} component={NavLink} to={path} sx={navStyles}>{title}</ListItem>
            ))}
          </List>

          <Box sx={{display:'flex'}}>
            <IconButton size="large" aria-label="cart" >
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <List sx={{display:'flex'}}>
            {rightLinks.map(({title,path})=> (
              <ListItem component={NavLink} to={path} sx={navStyles}>{title}</ListItem>
            ))}
          </List>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
