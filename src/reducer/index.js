let defaultState={
    memes:[],
    meme:null
}

const mainReducer=(state=defaultState,action)=>{
    switch (action.type) {
      case "GET_MEMES":
        return{
            ...state,
            memes:action.memes
        }

        case 'GET_MEME' :
          return {
            ...state,
            meme:action.meme
          }

      default:
        return{
            ...state
        }

    }
}

export default mainReducer;
