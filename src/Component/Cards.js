import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux'; // higher order component HOC
import {getItem} from '../Redux/Actions/books';
import { Grid } from '@material-ui/core';
import{Link} from 'react-router-dom'
import Swal from 'sweetalert2'

class Cards extends React.Component {
  state = {
    getItem: [],
  };
  handleError=()=>{
    window.location='/login'
  }
  componentDidMount = async () => {
    await this.props.dispatch (getItem ())
    .then(()=>{
      this.setState ({
        getItem: this.props.Books.Books,
        
      });
    })
    .catch(()=>{
      Swal.fire({
        title: 'Wow something wrong',
        text: "Sing In Required !",
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Log In'
      }).then((result) => {
        if (result.value) {
          window.location='/login'
        }
      })
      
    })
  };
  render () {
    const {getItem} = this.state;
    //console.log("decode =",decode.email)
    return (
    
    <div style={{flexGrow:1}}>
      <Grid container spacing={3}>
      {getItem 
      ? getItem.map((data, index)=>{
        console.log (index,data.image)
          return(
     
      <Grid item xs={3} >
        <Link to={`/Details/${index}`}>  
        <Card style={{maxWidth:345}} key={index} >
          <CardActionArea>
            <CardMedia
              style={{height:140}}
              image={data.image}
              title={data.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              {data.title.substr(0,20)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              {data.description.substr(0,100)}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
          </CardActions>
        </Card>
        </Link>  
        </Grid>
         
          )
      })
      
    :<p>Facth</p>}
    </Grid> 
    </div>
  );
}
}
const mapStateToProps = state => {
  return {
    Books: state.books,
  };
};

export default connect (mapStateToProps) (Cards);