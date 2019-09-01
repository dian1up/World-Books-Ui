import React from 'react';
import {connect} from 'react-redux'; // higher order component HOC

import {getItem} from '../Redux/Actions/books';

class Coba extends React.Component {
  state = {
    getItem: [],
  };
  componentDidMount = async () => {
    await this.props.dispatch (getItem ());
    console.log("haloo11 =",this.props.Books.Books)
    this.setState ({
      getItem: this.props.Books.Books,
      
    });
    
  };
  render () {
    const {getItem} = this.state;
    console.log("haloo11 =",getItem)
    return (
      <div style={{backgroundColor: 'lightgreen'}}>
        <h1>Mamanx Garox</h1>
        <h2>Semarang, 19 Agustus 1990</h2>
        <ul style={{display: 'flex', flexDirection: 'column-reverse'}}>
          {/* {console.log (!getItem.isLoading)} */}
          {/* {getItem.itemList
            ? getItem.itemList.map ((item, index) => {
                // console.log (index, item.item.name);
                return (
                  <li key={index} style={{fontSize: 30, fontWeight: 'bold'}}>
                    <p>{item.item.name}</p>
                    <img src={item.item.images.icon} alt="item" />
                  </li>
                );
              })
            : <p style={{fontSize: 100}}>Loading Fetch...</p>} */}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Books: state.books,
  };
};

export default connect (mapStateToProps) (Coba);
