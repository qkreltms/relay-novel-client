import React from "react";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createMuiTheme();

interface IProps extends WithStyles<typeof styles> {
  offset: number;
  total?: number;
  handleClickEvent: (offset: number) => void;
}

const styles = (theme: Theme) => createStyles({});

const CustomPagination: React.SFC<IProps> = props => {
  const handleClick = (offset: number) => {
    props.handleClickEvent(offset);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Pagination
        limit={1}
        offset={props.offset}
        total={props.total || 1} // 표시될 최대 숫자
        onClick={(e, offset) => handleClick(offset)}
      />
    </MuiThemeProvider>
  );
};

(CustomPagination as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomPagination);
