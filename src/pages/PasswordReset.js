import React, { useState, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { parse } from 'querystring';

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


function PasswordReset(props) {
  const { classes, match: { params: { token } }, location: { search } } = props;

  const passwordState = useFormInput()
  const passwordConfirmState = useFormInput()
  const [{ value: password }, { value: passwordConfirm }] = [passwordState, passwordConfirmState]

  const [message, setMessage] = useState(null);

  const { email } = parse(search.replace('?', ''))


  function sendReset(form) {
    api.reset(form)
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
        Reset Password
    </Typography>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="password"
          label="Password"
          className={classes.textField}
          {...passwordState}
          margin="normal"
          type='password'
        />
        <TextField
          id="passwordConfirm"
          label="Confirm Password"
          className={classes.textField}
          {...passwordConfirmState}
          margin="normal"
          type='password'
        />
        <Button component="span" color="secondary" onClick={() => sendReset({ token, email, password, passwordConfirm })}>
          Reset Password
        </Button>
      </form>
      {message && <SnackbarContent className={classes.snackbar} message={message} />}
    </Fragment >
  );
}

export default withStyles(styles)(PasswordReset);