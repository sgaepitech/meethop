import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar, 
  Button, 
  CssBaseline, 
  TextField, 
  Grid, 
  Link, 
  Typography,
  Container,
  Dialog,
  DialogContent,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core/';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        MeetHop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#45DBBE",
  },
  form: {
    width: '75%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#45DBBE"
    }
  },
  btnLp: {
    background: '#F2917E',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    "&:hover": {
      background: '#45DBBE',
    },
  }
}));

export default function Register() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [city, setCity] = React.useState('');
  const [interests, setInterests] = React.useState(false);

  const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  const { concert, sport, outdoor, movie_theater, theater, museum, nautic, shopping, board_games } = interests;

  const handleChangeCity = e => {
    setCity(e.target.value);
  };

  const handleChangeInterests = name => event => {
    setInterests({ ...interests, [name]: event.target.checked });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container justify = "center">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid container justify = "center">
          <Button className={classes.btnLp} size="large" variant="outlined" color="#45DBBE" onClick={handleClickOpen}>
            Register
          </Button>
        </Grid>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  className={classes.input}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  className={classes.input}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <TextField
                  className={classes.input}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <TextField
                  className={classes.input}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="passwordconfirmation"
                  label="Password Confimation"
                  type="password"
                  id="passwordconfirmation"
                  autoComplete="current-password-confirmation"
                />
                <TextField
                  className={classes.input}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="birthdate"
                  type="date"
                  id="birthdate"
                  autoComplete="current-password-confirmation"
                />
                <InputLabel id="demo-simple-select-filled-label">City</InputLabel>
                <Select
                  labelId="city"
                  id="city"
                  value={city}
                 onChange={handleChangeCity}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Paris</MenuItem>
                  <MenuItem value={2}>Lyon</MenuItem>
                  <MenuItem value={3}>Bordeaux</MenuItem>
                  <MenuItem value={4}>Marseille</MenuItem>
                  <MenuItem value={5}>Lille</MenuItem>
                  <MenuItem value={6}>Nice</MenuItem>
                  <MenuItem value={7}>Nantes</MenuItem>
                  <MenuItem value={8}>Strasbourg</MenuItem>
                </Select>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeInterests('theater')} value="theater" />}
                    label="Theater"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeInterests('museum')} value="museum" />}
                    label="Museum"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeInterests('nautic')} value="nautic" />}
                    label="Nautic"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeInterests('museum')} value="museum" />}
                    label="Museum"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeInterests('shopping')} value="shopping" />}
                    label="Shopping"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeInterests('board_games')} value="board_games" />}
                    label="Board games"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeInterests('concert')} value="concert" />}
                    label="Concert"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleChangeInterests('sport')} value="sport" />}
                    label="Sport"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleChangeInterests('outdoor')} value="outdoor" />}
                      label="Outdoor"
                  />
                </FormGroup>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.btnLp}
                >
                  Register
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Already registered? Log in"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </DialogContent>
        </Dialog>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Grid>
    
  );
}