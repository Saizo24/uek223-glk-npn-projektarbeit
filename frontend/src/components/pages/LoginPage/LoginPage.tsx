import {
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';
import React, { useContext } from 'react';

import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';

const validationSchema = Yup.object().shape({
  email: Yup.string(),
  password: Yup.string(),
});

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 280,
    margin: '20px auto',
  };
  const btnstyle = { margin: '8px 0' };
  const navigate = useNavigate();
  const { login } = useContext(ActiveUserContext);

  const handleSubmit = (values: { email: string; password: string }) => {
    login(values.email.toLowerCase(), values.password)
      .then(() => {
        console.log(values);

        navigate('/');
      })
      .catch((error) => {
        if (
          (typeof error.response !== 'undefined' &&
            error.response.status === 401) ||
          error.response.status === 403
        ) {
          alert('invalid login');
        } else {
          alert('login Error');
        }
      });
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <h2>Sign In</h2>
        </Grid>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange
          isInitialValid
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <TextField
                label='email'
                id='email'
                placeholder='Enter username'
                fullWidth
                required
                autoFocus
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
              />
              {props.errors.email && (
                <div id='feedback'>{props.errors.email}</div>
              )}

              <TextField
                id='password'
                label='password'
                placeholder='Enter password'
                type='password'
                fullWidth
                required
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
              />
              {props.errors.password && (
                <div id='feedback'>{props.errors.password}</div>
              )}

              <Button
                type='submit'
                color='primary'
                variant='contained'
                style={btnstyle}
                fullWidth
              >
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          <Link href='#'>Forgot password ?</Link>
        </Typography>
        <Typography>
          {' '}
          Do you have an account ?<Link href='#'>Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
