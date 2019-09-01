import React from "react";
import clsx from "clsx";
// import "typeface-roboto";
import PropTypes from "prop-types";
import {connect} from 'react-redux'
import {postItem} from '../Redux/Actions/books'
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Corousel from "../Component/Corousel";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddBox from "@material-ui/icons/AddBox";
import Avatar from "../Component/Avatar";
import {compose} from "redux";
// import DefaultImage from "../../default.jpeg";
// import logo from "../../bookshelf.svg";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import "../App.css";
import "../Component/Login.css"
import Cards from "../Component/Cards";
// import Carousel from "./carousel";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import jwtDecode from "jwt-decode";
// import AddBook from "./addBook";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Swal from 'sweetalert2';
import {History} from '../Redux/Actions/books'
const jwtDecode = require('jwt-decode');

// eslint-disable-next-line
const drawerWidth = 340;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "white",
    color: "black"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  BigAvatar: {
    margin: 10,
    width: 150,
    height: 150
  },
  floatingRight: {
    height: "50px",
    margin: "8px"
  },
  input: {
    flex: 1,
    bottom: "15px"
  },
  iconButton: {
    padding: 10
  },
  carousel: {
    maxWidth: "1335px",
    display: "inline-block"
  },
  wrap: {
    margin: "1.00em 0",
    textAlign: "center"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "150px"
  },
  select: {
    marginTop: "10px"
  }
});

class HomePage extends React.Component {
  state = {
    drawerIsOpen: false,
    modalIsOpen: false,
    username: "",
    decode: [],
    ancholEl: null,
    hasil: [],
    histo: {data:"data",diti:"diti"},
  };

  handleLogout = () => {
    window.localStorage.clear();
    window.location='/';
  };

  handleClick = event => {
    this.setState({ ancholEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ ancholEl: null });
  };
  handleDrawerOpen = () => {
    this.setState({ drawerIsOpen: true });
  };
  handleDrawerClose = () => {
    this.setState({ drawerIsOpen: false });
  };

  handleModalOpen = () => {
    this.setState({ modalIsOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalIsOpen: false });
  };

  handleLogout = () => {
    window.localStorage.clear();
    window.location="/";
  }

  handleAddbook = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Multiple inputs',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Title">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Description">' +
        '<input id="swal-input3" class="swal2-input" placeholder="image">' +
        '<input type="date" id="swal-input4" class="swal2-input" placeholder="date_released">' +
        '<select id="swal-input5" class="swal2-input" placeholder="genre">'+
         '<option value="1">FIKSI</option>'+
         '<option value="2">ILMIAH</option>'+
         '<option value="3">TUTORIAL</option>'+
         '<option value="4">HOROR</option>'+
         '</select>',
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
        title:formValues[0],
        description:formValues[1],
        image:formValues[2],
        date_released:formValues[3],
        genre:formValues[4],
      })
      // this.setState({hasil: formValues})
      this.props.dispatch(postItem(this.state.hasil[0]))
      .then(()=>{
        const status =this.props.Books.Books.status
        if(status==200){
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Success Insert Book',
            showConfirmButton: false,
            timer: 2500
          })
         window.location='/' 
        }
        else{
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'Failure To Add Books',
            showConfirmButton: false,
            timer: 2000
          })
          window.location='/login' 
        }
      })
      .catch(()=>{
        console.log('xxxxxxxxxxxxxxxxxx')
      })
    }
  }

  handleBooks=()=>{
    window.location='/History'
  }

  
  render() {
    let decode= ''
    if(window.localStorage.length>0){
       decode = jwtDecode(window.localStorage.getItem('token'))
    }
    const { classes } = this.props;
      return (
        <div className={classes.root}>
          <div className="bg1"></div>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: this.state.drawerIsOpen
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className={clsx(
                  classes.menuButton,
                  this.state.drawerIsOpen && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
              <TextField
                id="standard-textarea"
                label="Search by Title"
                placeholder="Enter Keyword"
                multiline
                className={classes.input}
                margin="normal"
              />
              <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
              {/* <img className={classes.floatingRight} src={logo} alt="" /> */}
              <Typography component="p" variant="h6" noWrap>
                WORLD BOOK
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={this.state.drawerIsOpen}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <MenuIcon />
              </IconButton>
            </div>
            
              {window.localStorage.length>0
              ?<div>{decode.level=='ADMIN'
                ?<List>
                <ListItem style={{marginTop:50}}>
                <Avatar  />
                </ListItem >  
  
                 
  
                <ListItem >
                <ListItemText style={{ textAlign:'center'}} primary={decode.level} />
                </ListItem>                
                  
                <Divider/>

                <ListItem button onClick={this.handleAddbook} style={{cursor:'pointer'}}>
                <ListItemText  style={{ textAlign:'center'}}  primary="Add Book" />
                </ListItem>
                

                <ListItem button onClick={this.handleLogout} style={{cursor:'pointer'}}>
                <ListItemText  style={{ textAlign:'center'}}  primary="Log Out" />
                </ListItem>
                </List>
                
                :<List>
                <ListItem style={{marginTop:50}}>
                <Avatar  />
                </ListItem >  
  
                 
  
                <ListItem >
                <ListItemText style={{ textAlign:'center'}} primary={decode.name} />
                </ListItem>                
                  
                <Divider/>

                <ListItem button onClick={this.handleBooks} style={{cursor:'pointer'}}>
                <ListItemText  style={{ textAlign:'center'}}  primary="Books" />
                </ListItem>

                <ListItem button onClick={this.handleLogout} style={{cursor:'pointer'}}>
                <ListItemText  style={{ textAlign:'center'}}  primary="Log Out" />
                </ListItem>
                </List>
              }
              </div>
              
              
              
             :<List>
              <ListItem button component={RouterLink} to="/Register">
              <ListItemIcon>
                <AccountCircleIcon/>
              </ListItemIcon>
              <ListItemText primary="Register" />
              </ListItem>
              <ListItem button component={RouterLink} to="/Login">
                <ListItemIcon>
                <AccountCircleIcon/>
              </ListItemIcon>
              <ListItemText primary="Login"/>
              </ListItem>
              </List>}
              
            
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: this.state.drawerIsOpen
            })}
          >
            <div className={classes.drawerHeader} />
            <div className={classes.wrap}>
              <div className={classes.carousel}>
                <Corousel />
              </div>
            </div>
            <div>
              
            </div>
            <Cards/>
          </main>
        </div>
      );
    }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state =>{
  return{
    Books: state.books,
    Borrow: state.books,
  }
}
export default compose(withStyles(styles,{
  name:"HomePage"
}),connect(mapStateToProps))(HomePage)
// export default withStyles(styles)(HomePage);