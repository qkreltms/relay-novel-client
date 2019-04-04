import React from "react";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import CustomInput from "../common/CustomInput";
import RadioButtons from "../common/RadioButtons";
import { RadioContents, Directions } from "../../models";
import CustomButton from "../common/CustomButton";
import axios from "axios";
import config from "../../config";
import axiosConfig from "../../config/axios";

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
  const isEmpty = (): boolean => {
    if (props.desc.length <= 0) return true;
    if (props.title.length <= 0) return true;
    if (props.writerLimit.length <= 0) return true;
    return false;
  };

  const handleCreateRoomClick = () => {
    if (isEmpty()) return;

    const body = {
      writerLimit: props.writerLimit,
      title: props.title,
      desc: props.desc
    };

    return axios
      .post(`${config.REACT_APP_SERVER_URL}/rooms`, body, axiosConfig)
      .then(res => {
        const data = res.data;
        if (!data) return;
        const roomId = data.message.insertId;
        return props.history.push(`/room/${roomId}`);
      })
      .catch(err => {
        // 방 못 만든것 예외처리
        console.log(err.response);
        alert(`Cannot create more room: ${err.response.data.message}`);
      });
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
      <CustomInput
        value={props.title}
        handleChange={handleTitleChange}
        formattedMessageId="createroom_title"
        name="title"
      />

      <CustomInput
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

      <CustomButton
        onClick={handleCreateRoomClick}
        formattedMessageId="createroom_btn"
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
