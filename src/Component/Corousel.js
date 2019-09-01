import React from 'react';
import Coverflow from 'react-coverflow';
import Axios from 'axios';

class Corousel extends React.Component{
  state={
    books: []
  }
  componentDidMount=()=>{
    Axios.get('http://localhost:8080/api/books')
    .then(res => {
      this.setState({books: res.data})
      console.log('api = ', this.state.books)
    })
    .catch(err => console.log(err))
  }
  render(){
    const { books } = this.state;
    return(

      <Coverflow
      displayQuantityOfSide={2}
      navigation={true}
      enableHeading={true}
      active={0}
      media={{
        '@media (max-width: 900px)': {
          width: '600px',
          height: '300px'
        },
        '@media (min-width: 900px)': {
          width: '960px',
          height: '600px'
        }
      }}
      >
       {books.map((value)=>(
         <img src={value.image} />
      ))}

    </Coverflow>

    );
  }
}
export default Corousel;