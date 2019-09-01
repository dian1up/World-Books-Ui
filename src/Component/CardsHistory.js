import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux'; // higher order component HOC
import {cekRentItem,returnItem} from '../Redux/Actions/books';
import { Grid } from '@material-ui/core';
import{Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import jwt from 'jwt-decode'
import Button from '@material-ui/core/Button';

class CardsHistory extends React.Component {
  state = {
    getItem: [],
    data:[],
    akun:'',
    id_book:'',
  };
  handleNull=()=>{
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
  }

  handleError=()=>{
    window.location='/login'
  }
  componentDidMount = async () => {
    const decode=jwt(window.localStorage.getItem('token'))
    this.state.data.push({
      id_user:decode.id,
    })
    console.log('datanya = ',this.state.data[0]);
    
    await this.props.dispatch (cekRentItem(this.state.data[0]))
    .then(()=>{
      if(this.props.Books.Books.length>0){
        this.setState ({
          getItem: this.props.Books.Books,
          
        });
        console.log('hasil get = ',this.state.getItem);
      }else{
        Swal.fire({
          title: 'Wow something wrong',
          text: "No Item Found!",
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Back'
        }).then((result) => {
          if (result.value) {
            window.location='/'
          }
        })
      }

      
    })
    .catch(()=>{
      Swal.fire({
        title: 'Wow something wrong',
        text: "Sing In Required !",
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Back'
      }).then((result) => {
        if (result.value) {
          window.location='/'
        }
      })
    })
  };

  handleReturn=()=>{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    this.props.dispatch(returnItem())
  }
  render () {
    const {getItem} = this.state;
    console.log("decode =",getItem  )
    return (
    
    <div style={{flexGrow:1}}>
      <Grid container spacing={3}>
      {getItem.length>0
      ? getItem.map((data, index)=>{
          return(
     
      <Grid item xs={3} >
        
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
              <Button
                  variant='contained'
                  color='secondary'
                  className='button'
                  size='large'
                  fullWidth={true}
                >
                   Return 
                </Button>   
            </CardContent>
          </CardActionArea>
          <CardActions>
          </CardActions>
        </Card> 
        </Grid>
         
          )
      })
      
    :<p></p>}
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

export default connect (mapStateToProps) (CardsHistory);