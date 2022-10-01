import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutPage from "../../features/about/AboutPage";
import BasketPage from "../../features/basket/BasketPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import agent from "../api/agent";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import { getCookie } from "../util/util";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchBasketAsync, setBasket } from "../../features/basket/basketSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { PrivateLogin, PrivateRoute } from "./PrivateRoute";

export default function App() {
  //const { setBasket } = useStoreContext(); //ควบคุมสเตทด้วย React context to Centralize
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { fullscreen } = useAppSelector((state) => state.screen);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
 
  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);
 
  const [mode, setMode] = useState(true);
  const displayMode = mode ? "light" : "dark";

  const darkTheme = createTheme({
    palette: {
      mode: displayMode,
    },
  });

  const handlemode = () => setMode(!mode);

  if (loading) return <LoadingComponent message="Initilize App....." />;

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <ToastContainer
          position="bottom-right"
          theme="colored"
          autoClose={1000}
        />
        <CssBaseline />
        <Header handlemode={handlemode} />
        {fullscreen ? (
          <>{mainroute}</>
        ) : (
          <Container sx={{ mt: 3 }}> {mainroute} </Container>
        )}
      </ThemeProvider>
    </>
  );
}

const mainroute = (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/catalog" element={<Catalog />} />
    <Route path="/basket" element={<BasketPage />} />
    <Route path="/catalog/:id" element={<ProductDetails />} />
    <Route path="/server-error" element={<ServerError />} />
    <Route path="/register" element={<Register />} /> 
    <Route path="*" element={<NotFound />} />
    <Route
      path="/login"
      element={
        <PrivateLogin>
          <Login />
        </PrivateLogin>
      }
    />
    <Route element={<PrivateRoute />}>
      <Route path="/checkout" element={<CheckoutPage />} />
    </Route>
  </Routes>
);
