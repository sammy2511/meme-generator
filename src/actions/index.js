const username = 'Sammy2511';
const password = 's@mar2511';
const baseUri = 'https://api.imgflip.com/get_memes';



export function loadMemes(){

  return(dispatch) =>{
    return fetch(baseUri)
           .then( response => response.json())
           .then( json => {
             dispatch(getMemes(json.data.memes));
           })
  }

}

export function loadMeme(memeId){
  return(dispatch) => {
    return fetch(baseUri)
           .then( response => response.json())
           .then( json => {
             const memes = json.data.memes;
             const memeArr = memes.filter( meme => meme.id === memeId);
             const meme = memeArr[0];
             dispatch(getMeme(meme));
           })
  }
}

export function getMeme(meme){
  return {
    type:"GET_MEME",
    meme:meme
  }
}

export function getMemes(memes){
  return {
    type:"GET_MEMES",
    memes:memes
  }
}
