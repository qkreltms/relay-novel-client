import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark
  }
});

interface IProps {
  classes: any;
  isOpen: boolean;
  message: string;
  handleClose: () => void;
}
const CustomSnackbar: React.SFC<IProps> = props => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.isOpen}
        onClose={props.handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{props.message}</span>}
      />
    </div>
  );
};

CustomSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomSnackbar);
