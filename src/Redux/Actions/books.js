import Axios from 'axios';

export const returnItem = (data) => {
  return{
    type: 'RETURN_ITEM',
    payload: Axios.patch('http://localhost:8080/api/rent',data)
  }
}

export const cekRentItem = (data) => {
  console.log('response = ',data.id_user);
  return {
    type: 'BACK_ITEM',
    payload: Axios.get ('http://localhost:8080/api/rent',{
      params:{
        id_user:data.id_user
      },
      headers:{
        token: window.localStorage.getItem('token')
      },
    }),
  };
  
};

export const getItem = () => {
  return {
    type: 'GET_ITEM',
    payload: Axios.get ('http://localhost:8080/api/book',{
      headers:{
        token: window.localStorage.getItem('token')
      }
    }),
  };
  
};

export const Borrow = (data) => {
  return {
    type: 'BORROW_ITEM',
    payload: Axios.post ('http://localhost:8080/api/rent',data,{
      headers:{
        token: window.localStorage.getItem('token')
      }
    }),
  };
  
};
export const postItem = (data) => {
  return {
    type: 'POST_ITEM',
    payload: Axios.post ('http://localhost:8080/api/books',data),
  };
  
};

export const deleteItem = (data) => {
  console.log("delete = ",data);
  
  return {
    type: 'DEL_ITEM',
    payload: Axios.delete ('http://localhost:8080/api/books/',{
      params:{
        id:data
      },
      headers:{
        token: window.localStorage.getItem('token')
      }
    })
  };
};

export const updateItem = (data) => {
  console.log("delete = ",data);
  
  return {
    type: 'UP_ITEM',
    payload: Axios.patch ('http://localhost:8080/api/books/',data,{
      headers:{
        token: window.localStorage.getItem('token')
      }
    })
  }
}