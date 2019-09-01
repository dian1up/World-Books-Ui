import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Swal from 'sweetalert2'
import './style.css';
import jwtDecode from 'jwt-decode'
import {deleteItem,updateItem,Borrow} from '../Redux/Actions/books'
import { decode } from 'querystring';
class Details extends Component {
  state = {
    getItem: [],
    hasil: [],
  };
  handleBack=()=>{
    window.location='/'
  }

  handleBorrow = () =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      animation: false,
      customClass: {
        popup: 'animated tada'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Borrow it!'
    }).then(()=>{
      
      let decode = jwtDecode(window.localStorage.getItem('token'))
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
  
      today = mm + '/' + dd + '/' + yyyy;
      this.state.hasil.push({
        id_user:decode.id,
        id_book: this.state.getItem.id,
        title: this.state.getItem.title,
        date_borrow: today,
        user: decode.email,
      })
      this.props.dispatch(Borrow(this.state.hasil[0]))
        .then(()=>{
          Swal.fire({
            position: 'center',
            type: 'success',
            title: "don't forget to return the book on time",
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            window.location='/'
          })
        })
      console.log('hasil borrow = ',this.state.hasil[0]);
      
    })
  }

  handleEditbook = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Form',
      html:
        '<input id="swal-input1" class="swal2-input"placeholder="Title">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Description">' +
        '<input id="swal-input3" class="swal2-input" placeholder="image">' +
        '<input type="date" id="swal-input4" class="swal2-input" placeholder="date_released">' +
        '<input id="swal-input5" class="swal2-input" placeholder="genre">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value,
          document.getElementById('swal-input4').value,
          document.getElementById('swal-input5').value
         
        ]
      }
    })
    
    if (formValues) {
      this.state.hasil.push({
        id: this.state.getItem.id,
        title:formValues[0] || this.state.getItem.title,
        description:formValues[1] || this.state.getItem.description,
        image:formValues[2] || this.state.getItem.image,
        date_released:formValues[3] || this.state.getItem.date_released,
        genre:formValues[4] || this.state.getItem.genre1,
      })
      console.log('hais tayo ooo = ',this.state.hasil);
      
      // this.setState({hasil: formValues})
      this.props.dispatch(updateItem(this.state.hasil[0]))
      .then(()=>{
        const status =this.props.Books.Books.status
        if(status==200){
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Success Insert Book',
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            window.location='/' 
          })
         
        }
        else{
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Failure To Add Books',
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            window.location='/login'
          })
           
        }
      })
      .catch(()=>{
 
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href>I am Not Admin</a>'
        })
        
      })
    }
  }

  handleDelete = () =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      animation: false,
      customClass: {
        popup: 'animated tada'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.props.dispatch(deleteItem(this.state.getItem.id))
        .then(()=>{
          const status =this.props.Books.Books.status
          if(status==200){
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Success Delete Book',
              showConfirmButton: false,
              timer: 2500
            }).then(()=>{
              window.location='/' 
            })
           
          }
          else{
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href>I am Not Admin</a>'
            }).then(()=>{
              window.location='/' 
            })
            
          }
        })
        .catch(()=>{
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
      }
    })
  };

  render() {

    const {Books} = this.props
    const id_book = this.props.match.params.id
    console.log("awdasdawd = ",Books.Books[id_book]);
    this.state.getItem=Books.Books[id_book]
    console.log("12124213 = ",this.state.getItem);
    return (
      <div>
        {Books.Books.length>0
        ?<Fragment>
        <CssBaseline />
        <Container maxWidth='lg'>
          <Toolbar className='toolbar'>
            <Grid
              container
              direction='row'
              justify='flex-start'
              alignItems='baseline'
            >
              <Grid item sm={9}>
                <IconButton onClick={this.handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
              <Grid item sm={1}>
                <Button
                  href='#text-buttons'
                  color='secondary'
                  className='button'
                  onClick={this.handleEditbook}
                >
                  Edit
                </Button>
              </Grid>
              <Grid item sm={1}>
                <Button
                  href='#text-buttons'
                  color='secondary'
                  className='button'
                  onClick={this.handleDelete}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
          <main>
            {/* Main featured post */}
            <Paper
              className='mainFeaturedPost'
              style={{
                backgroundImage: `url(${Books.Books[id_book].image})`
              }}
            >
              {/* Increase the priority of the hero background image */}
              {
                <img
                  style={{ display: 'none' }}
                  src={Books.Books[id_book].image}
                  alt='background'
                />
              }
              <div className='overlay' />
              <Grid container>
                <Grid item>
                  <div className='mainFeaturedPostContent' />
                </Grid>
              </Grid>
            </Paper>
            {/* End main featured post */}
            {/* Sub featured posts */}
            <Grid
              container
              spacing={4}
              className='cardGrid'
              justify='flex-end'
              xs={12}
            >
              {/* {featuredPosts.map(post => ( */}
              <Grid item xs={2}>
                <CardActionArea component='a'>
                  <Card className='card'>
                    <Hidden smDown>
                      <CardMedia
                        className='cardMedia'
                        image={Books.Books[id_book].image}
                        title='Image title'
                      />
                    </Hidden>
                  </Card>
                </CardActionArea>
              </Grid>
              {/* ))} */}
            </Grid>
            {/* End sub featured posts */}
            <Grid container spacing={5} className='mainGrid'>
              {/* Main content */}
              <Grid item xs={12} md={8}>
                <Chip
                  label={Books.Books[id_book].genre}
                  component='a'
                  href='/genre'
                  clickable
                  color='primary'
                />
                <Grid
                  container
                  direction='row'
                  justify='flex-start'
                  alignItems='center'
                  item
                  xs={12}
                >
                  <Grid item sm={8} spacing={4}>
                    <Typography variant='h4'>{Books.Books[id_book].title}</Typography>
                  </Grid>
                  <Grid item sm={4} align='right'>
                    <Typography variant='h6' color='secondary'>
                      {Books.Books[id_book].status}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography
                  variant='subtitle1'
                  color='textSecondary'
                  gutterBottom
                >
                  {Books.Books[id_book].date_released}
                </Typography>
                <Divider />
                <Typography align='justify' variant='body1'>
                {Books.Books[id_book].description}
                </Typography>
              </Grid>
              {/* End main content */}
              {/* Sidebar */}
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
                item
                xs={12}
                md={4}
              >
                <Grid item>
                {Books.Books[id_book].status === "AVAILABLE" ?
                  <Button
                    variant='contained'
                    color='secondary'
                    className='button'
                    size='large'
                    fullWidth={true}
                    onClick={this.handleBorrow}
                  >
                     Borrow 
                  </Button>
                  :                   <Button
                  variant='contained'
                  color='secondary'
                  className='button'
                  size='large'
                  fullWidth={true}
                >
                   Return 
                </Button>}
                </Grid>
              </Grid>
              {/* End sidebar */}
            </Grid>
          </main>
        </Container>
        </Fragment>
        : <div>{
          this.state.getItem>0
          ?null
          :window.location='/'
        }
        </div>
        }
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    Books: state.books,
    Borrow: state.books,
  };
};

export default connect (mapStateToProps) (Details);