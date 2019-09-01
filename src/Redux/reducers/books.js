const initialState = {
  Books: [],
  Borrow: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const books = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ITEM_PENDING':
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'GET_ITEM_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_ITEM_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        Books: action.payload.data,
      };
      case 'POST_ITEM_PENDING':
        return {
          ...state,
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
        };
      case 'POST_ITEM_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
      case 'POST_ITEM_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          Books: action.payload.data,
        };
        case 'DEL_ITEM_PENDING':
          return {
            ...state,
            isLoading: true,
            isFulfilled: false,
            isRejected: false,
          };
        case 'DEL_ITEM_REJECTED':
          return {
            ...state,
            isLoading: false,
            isRejected: true,
          };
        case 'DEL_ITEM_FULFILLED':
          return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            Books: action.payload.data,
          };
          case 'UP_ITEM_PENDING':
            return {
              ...state,
              isLoading: true,
              isFulfilled: false,
              isRejected: false,
            };
          case 'UP_ITEM_REJECTED':
            return {
              ...state,
              isLoading: false,
              isRejected: true,
            };
          case 'UP_ITEM_FULFILLED':
            return {
              ...state,
              isLoading: false,
              isFulfilled: true,
              Books: action.payload.data,
            };
            case 'BORROW_ITEM_PENDING':
              return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
              };
            case 'BORROW_ITEM_REJECTED':
              return {
                ...state,
                isLoading: false,
                isRejected: true,
              };
            case 'BORROW_ITEM_FULFILLED':
              return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                Borrow: action.payload.data,
              };
              case 'BACK_ITEM_PENDING':
                return {
                  ...state,
                  isLoading: true,
                  isFulfilled: false,
                  isRejected: false,
                };
              case 'BACK_ITEM_REJECTED':
                return {
                  ...state,
                  isLoading: false,
                  isRejected: true,
                };
              case 'BACK_ITEM_FULFILLED':
                return {
                  ...state,
                  isLoading: false,
                  isFulfilled: true,
                  Books: action.payload.data,
                };
                case 'RETURN_ITEM_PENDING':
                  return {
                    ...state,
                    isLoading: true,
                    isFulfilled: false,
                    isRejected: false,
                  };
                case 'RETURN_ITEM_REJECTED':
                  return {
                    ...state,
                    isLoading: false,
                    isRejected: true,
                  };
                case 'RETURN_ITEM_FULFILLED':
                  return {
                    ...state,
                    isLoading: false,
                    isFulfilled: true,
                    Books: action.payload.data,
                  };
    default:
      return state;
  }
};

export default books;
