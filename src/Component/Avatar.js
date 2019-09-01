import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
   
    width: 100,
    height: 100,
  },
});

export default function ImageAvatars() {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      
      <Avatar alt="Remy Sharp" src="https://images.all-free-download.com/images/graphiclarge/harry_potter_icon_6825007.jpg" className={classes.bigAvatar} />
    </Grid>
  );
}