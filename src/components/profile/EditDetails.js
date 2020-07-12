import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userAction';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import MyButton from '../../util/MyButton';

const styles = () => ({
    button: {
        float: "right"
    }
});


class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    mapUserDetails = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        });
    };

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetails(credentials);
    };

    handleOpen = () => {
        this.setState({
            open: true
        })
        this.mapUserDetails(this.props.credentials);
    };

    handleClose = () => {
        this.setState ({
            open: false
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        };

        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
    
        return (
            <Fragment>
                <MyButton tip="Edit Details" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary"/>
                </MyButton>
                <Dialog open={this.state.open} 
                onClose={this.handleClose} 
                fullWidth maxWidth="sm">
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField 
                            name="bio" 
                            type="text" 
                            label="Bio" 
                            multiline 
                            rows="3" 
                            placeholder="Tell us more!" 
                            className={classes.textField}
                            value={this.state.bio}
                            onChange={this.handleChange}
                            fullWidth/>

                            <TextField 
                            name="website" 
                            type="text" 
                            label="Website" 
                            placeholder="website" 
                            className={classes.textField}
                            value={this.state.website}
                            onChange={this.handleChange}
                            fullWidth/>

                            <TextField 
                            name="location" 
                            type="text" 
                            label="Location" 
                            placeholder="Where are you?" 
                            className={classes.textField}
                            value={this.state.location}
                            onChange={this.handleChange}
                            fullWidth/>

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>

                    </DialogActions>
                </Dialog>

            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails))
