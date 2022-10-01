import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Switch,
  Badge,
  List,
  ListItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, NavLink } from "react-router-dom"; 
import { useAppSelector } from "../store/configureStore";
import SignedinMenu from "./SignedinMenu";

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

export default function Header(props: any) {
  const { user } = useAppSelector((state) => state.account);
  const {basket} = useAppSelector(state=>state.basket);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
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
            <IconButton component={NavLink} to="/" sx={navStyles}>
              <Typography variant="h6" component="div">
                Nobody Love
              </Typography>
            </IconButton>
          </Box>

          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem
                key={title}
                component={NavLink}
                to={path}
                sx={navStyles}
              >
                {title}
              </ListItem>
            ))}
          </List>

          <Box sx={{ display: "flex" }}>
            <IconButton
              component={Link}
              to="/basket"
              size="large"
              aria-label="cart"
            >
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {user ? (
              <SignedinMenu />
            ) : (
              <List sx={{ display: "flex" }}>
                {rightLinks.map(({ title, path }) => (
                  <ListItem
                    component={NavLink}
                    to={path}
                    key={path}
                    sx={{ color: "inherit", typography: "h6" }}
                  >
                    {title.toUpperCase()}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
