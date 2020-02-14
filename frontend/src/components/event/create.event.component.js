import React, { Component } from 'react';
import {
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
  Checkbox
} from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';

export default class CreateEvent extends Component {
  constructor(){
    super();
    this.state={
      title: '',
      description: '',
      category: '',
      owner: '',
      location: '',
      date: '14/02/2020',
      participantsNumber: '0',
      time: '15:00',
    }
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  };

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    });
  };

  handleCategoryChange = (e) => {
    this.setState({
      category: e.target.value
    });
  };

  handleChangeLocation = e => {
    this.setState({
      location: e.target.value
    });
  };

  handleDateChange = e => {
    this.setState({
      date: e.target.value
    });
  };

  handleParticipantsNumberChange = e => {
      this.setState({
        participantsNumber: e.target.value
      });
    };

  handleTimeChange = e => {
      this.setState({
        time: e.target.value
      });
    };

  handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title: this.state.title,
      description: this.state.description,
      category: this.state.category,
      owner: this.state.owner,
      location: this.state.location,
      date: this.state.date,
      participantsNumber: this.state.participantsNumber,
      time: this.state.time
    };
    console.log('submit');
    console.log(newEvent);
    fetch('http://localhost:5000/event/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  render() {
  return (
    <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
      <DialogContent>
        <div>
          <Typography component="h1" variant="h5">
            Create new Event
          </Typography>
          <form onSubmit={this.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              value={this.state.title}
              onChange={this.handletitleChange.bind(this)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              placeholder="Description"
              multiline
              label="Description"
              name="description"
              value={this.state.description}
              onChange={this.handleDescriptionChange.bind(this)}
              autoComplete="description"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="participantsNumber"
              label="participantsNumber"
              type="participantsNumber"
              id="participantsNumber"
              value={this.state.participantsNumber}
              onChange={this.handleparticipantsNumberChange.bind(this)}
            />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={this.state.date}
                onChange={this.handleDateChange.bind(this)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={this.state.time}
                onChange={this.handleTimeChange.bind(this)}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
            </MuiPickersUtilsProvider>

            <InputLabel id="demo-simple-select-filled-label">Location</InputLabel>
            <Select
              labelId="location"
              id="location"
              value={this.state.location}
              onChange={this.handleChangeLocation.bind(this)}
              required
            >
              <MenuItem value="">
                <em>Choisissez une ville</em>
              </MenuItem>
              <MenuItem value="Paris">Paris</MenuItem>
              <MenuItem value="Lyon">Lyon</MenuItem>
              <MenuItem value="Bordeaux">Bordeaux</MenuItem>
              <MenuItem value="Marseille">Marseille</MenuItem>
              <MenuItem value="Lille">Lille</MenuItem>
              <MenuItem value="Nice">Nice</MenuItem>
              <MenuItem value="Nantes">Nantes</MenuItem>
              <MenuItem value="Strasbourg">Strasbourg</MenuItem>
            </Select>

            <InputLabel id="demo-simple-select-filled-label">Location</InputLabel>
            <Select
              labelId="category"
              id="category"
              value={this.state.category}
              onChange={this.handleCategoryChange.bind(this)}
              required
            >
              <MenuItem value="">
                <em>Sélectionner une catégorie</em>
              </MenuItem>
              <MenuItem value="concert">Concert</MenuItem>
              <MenuItem value="sport">Sport</MenuItem>
              <MenuItem value="outdoor">Plein air</MenuItem>
              <MenuItem value="cinéma">Cinema</MenuItem>
              <MenuItem value="theater">Theater</MenuItem>
              <MenuItem value="museum">Musée</MenuItem>
              <MenuItem value="nautic">Nautique</MenuItem>
              <MenuItem value="shopping">Shopping</MenuItem>
              <MenuItem value="board games">Board Games</MenuItem>
            </Select>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Créer un événement
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}}
