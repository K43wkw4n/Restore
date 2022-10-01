import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { FieldValues, useForm } from "react-hook-form";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../app/store/configureStore";
import { signInUser } from "./accountSlice";
import { history } from "../..";

export default function Login() {
  const dispatch = useAppDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<{ username: ""; password: "" }>({ mode: "all" }); 

  //FieldValues คือ ค่าทั้งหมดภายใน Form
  async function submitForm(data: FieldValues) {
    try {
    await dispatch(signInUser(data)); 
    history.push("/catalog"); //มาจาก index.tsx
    } catch (error) {
    console.log(error)
    }
  }
 
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}  
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(handleSubmit(submitForm))}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="username"
              autoFocus
              {...register("username", { required: "Username is required" })}
            error={!!errors.username} //!! = boolean
            helperText={errors?.username?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors?.password?.message}
            />
            <LoadingButton type="submit"
              disabled={!isValid}
              loading={isSubmitting} 
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
                >
                Sign In
            </LoadingButton> 
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
