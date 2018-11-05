import React, { useState, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import { api } from '../utils/api'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 20,
    overflowX: 'auto',
  },
  table: {
    maxWidth: 700,
  },
  snackbar: {
    margin: theme.spacing.unit,
  },
});

function useFormInput() {
  const [value, setValue] = useState('');
  function handleChange(e) {
    setValue(e.target.value)
  }

  return {
    value,
    onChange: handleChange
  }
}



function PasswordForgot(props) {
  const { classes } = props;
  const email = useFormInput()
  const [message, setMessage] = useState(null);

  const forgotRequest = (email) => {
    api.forgot({ email })
      .then(() => {
        setMessage('Password successfully reset')
      })
      .catch((err) => {
        console.log({ err });
        setMessage(err.response.data.error.message)
      })
  }

  return (

    <Fragment>
      <Typography variant="h5" component="h3">
        Forgot Password
    </Typography>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          {...email}
          margin="normal"
        />
        <Button component="span" color="secondary" onClick={() => forgotRequest(email.value)}>
          Send email reset link
        </Button>
        {message && <SnackbarContent className={classes.snackbar} message={message} />}
      </form>
    </Fragment>
  );
}

export default withStyles(styles)(PasswordForgot);