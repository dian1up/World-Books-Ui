import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class Detail extends React.Component{
    render(){
        return(
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper 
                    style={{backgroundImage:('https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')}}
                />
                </Grid>
            </Grid>
        )
    }
}
export default Detail;