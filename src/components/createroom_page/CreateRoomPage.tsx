import React from "react";
import { FormattedMessage } from "react-intl";
import {
  Button,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import DefaultInput from "../common/DefaultInput";
import RadioButtons from "../common/RadioButtons";
import { RadioContents, Directions } from "../../models";

interface IProps extends WithStyles<typeof styles> {
  writerLimit: string;
  title: string;
  desc: string;
  setTitle: (title: string) => void;
  setDesc: (desc: string) => void;
  setWriterLimit: (writerLimit: string) => void;
  classes: any;
  match: any;
  location: any;
  history: any;
}

const styles = (theme: Theme) => createStyles({});

const CreateRoomPage: React.SFC<IProps> = props => {
  const handleOnClick = () => {
    return props.history.push("/");
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setTitle(event.target.value);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setDesc(event.target.value);
  };

  const handleWriterLimitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setWriterLimit(event.target.value);
  };

  const radioContents: Array<RadioContents> = [
    {
      value: "10",
      label: "10",
      labelPlacement: Directions.Start
    },
    {
      value: "20",
      label: "20",
      labelPlacement: Directions.Start
    },
    {
      value: "50",
      label: "50",
      labelPlacement: Directions.Start
    },
    {
      value: "100",
      label: "100",
      labelPlacement: Directions.Start
    }
  ];

  return (
    <div>
      <DefaultInput
        isError={false}
        value={props.title}
        handleChange={handleTitleChange}
        formattedMessageId="createroom_title"
        name="title"
      />

      <DefaultInput
        isError={false}
        value={props.desc}
        handleChange={handleDescChange}
        formattedMessageId="createroom_desc"
        name="desc"
      />

      <RadioButtons
        value={props.writerLimit}
        handleValueChange={handleWriterLimitChange}
        radioContents={radioContents}
        formattedMessageId="createroom_writerlimit"
      />
    </div>
  );
};

(CreateRoomPage as React.SFC<IProps>).propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(withRouter(CreateRoomPage));
