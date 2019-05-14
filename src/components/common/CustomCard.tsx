import React from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Theme,
  withStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton
} from "@material-ui/core";
import image from "../../static/images/test.jpg";
import { Favorite } from "@material-ui/icons";

interface IProps {
  classes: any;
  title: string;
  genre: string;
  author: string;
  tags: string;
  like: number;
  writerLimit: number;
  onClick?: () => void;
  isFavoriteOn?: boolean;
}

const styles = (theme: Theme) => createStyles({});

const CustomCard: React.SFC<IProps> = props => {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.card} onClick={props.onClick}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={image}
            component="img"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography component="p">{props.genre}</Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography component="p">
              {props.author ? props.author : ""}
            </Typography>
            <Typography component="p">{props.tags}</Typography>
            <Typography component="p">{props.writerLimit}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography component="p">{props.like}</Typography>
          {props.isFavoriteOn ? (
            <IconButton aria-label="favorite">
              <Favorite color="secondary" fontSize="small" />
            </IconButton>
          ) : (
            <Favorite color="secondary" fontSize="small" />
          )}
        </CardActions>
      </Card>
    </div>
  );
};

(CustomCard as React.SFC<IProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CustomCard);
