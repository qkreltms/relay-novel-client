import React from "react";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createMuiTheme();
// TODO: SFC로 바꾸기
interface IProps extends WithStyles<typeof styles> {
  offset: number;
  total?: number;
  handleClickEvent: (offset: number) => void;
}

const styles = (theme: Theme) => createStyles({});

class CustomPagination extends React.Component<IProps> {
  handleClick(offset) {
    console.log(offset);
    this.props.handleClickEvent(offset);
  }

  public render() {
    console.log(this.props)
    return (
      <MuiThemeProvider theme={theme}>
        
        <Pagination
          limit={1}
          offset={this.props.offset}
          total={this.props.total || 10} // 표시될 최대 숫자
          onClick={(e, offset) => this.handleClick(offset)}
        />
      </MuiThemeProvider>
    );
  }
}

(CustomPagination as React.ComponentClass<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomPagination);
