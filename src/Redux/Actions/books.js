import Axios from 'axios';

export const returnItem = (data) => {
  return{
    type: 'RETURN_ITEM',
    payload: Axios.patch('https://salty-lake-72952.herokuapp.com/api/rent',data)
  }
}

export const cekRentItem = (data) => {
  console.log('response = ',data.id_user);
  return {
    type: 'BACK_ITEM',
    payload: Axios.get ('https://salty-lake-72952.herokuapp.com/api/rent',{
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
    payload: Axios.get ('https://salty-lake-72952.herokuapp.com/api/book',{
      headers:{
        token: window.localStorage.getItem('token')
      }
    }),
  };
  
};

export const Borrow = (data) => {
  return {
    type: 'BORROW_ITEM',
    payload: Axios.post ('https://salty-lake-72952.herokuapp.com/api/rent',data,{
      headers:{
        token: window.localStorage.getItem('token')
      }
    }),
  };
  
};
export const postItem = (data) => {
  return {
    type: 'POST_ITEM',
    payload: Axios.post ('https://salty-lake-72952.herokuapp.com/api/books',data),
  };
  
};

export const deleteItem = (data) => {
  console.log("delete = ",data);
  
  return {
    type: 'DEL_ITEM',
    payload: Axios.delete ('https://salty-lake-72952.herokuapp.com/api/books/',{
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
    payload: Axios.patch ('https://salty-lake-72952.herokuapp.com/api/books/',data,{
      headers:{
        token: window.localStorage.getItem('token')
      }
    })
  }
}