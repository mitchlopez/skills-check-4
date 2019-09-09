const initialState = {
  favoritestWord: "Redux"
};

const GET_FAVORITEST = "GET_FAVORITEST";
const UPDATE_FAVORITEST = "UPDATE_FAVORITEST";

export function updateFavoritest(word) {
  return {
    type: UPDATE_FAVORITEST,
    payload: word
  };
}

export function getFavoritest() {
  return {
    type: GET_FAVORITEST
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FAVORITEST:
      return {
        ...state,
        favoritestWord: action.payload
      };
    case GET_FAVORITEST:
      return state;
    default:
      return state;
  }
}
