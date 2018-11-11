import React, {Component } from 'react';
import {connect} from "react-redux";
import * as actionCreators from "./actions/index.js"
import {withRouter} from 'react-router-dom';
import './App.css'

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      memes : null
    }
  }

  getMemes(){
    const username = 'Sammy2511';
    const password = 's@mar2511';
    const baseUri = 'https://api.imgflip.com/get_memes';

    fetch(baseUri)
    .then( response => response.json())
    .then( json => {
      const { memes } = json.data;
      this.setState({ memes });
    });
  }

    componentWillMount(){
      this.props.loadMemes();
    }

    navigateToMeme(memeId){
      this.props.history.push(`/Meme/${memeId}`);
    }



  render(){
    const memes = this.props.memes;
    return(
      memes !== null ?
      <div>
      {
        memes.map((meme,key) => {
          const imgUrl = meme.url;
          return(
            <div
              key = {key}
              className = "recipe"
              onClick = {this.navigateToMeme.bind(this,meme.id)}
              >
                <img
                  src = {imgUrl}
                  className = "recipe-img"
                  alt = "reciepe"
                />
                <p className="recipe-text">
                  {meme.name}
                </p>
              </div>
          )
        })
      }
      </div>: <div>Loading memes .....</div>
    )
  }
}

const mapStateToProps=(state)=>{
    return state
};

export default withRouter(connect(mapStateToProps,actionCreators)(App));
