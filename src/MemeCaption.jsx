import React , { Component } from 'react';
import {connect} from "react-redux";
import * as actionCreators from "./actions/index.js"
import {withRouter} from 'react-router-dom';
import {FormGroup , FormControl, InputGroup, Glyphicon } from 'react-bootstrap'

class MemeCaption extends Component{
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      text1:'',
      text2:'',
      url:null,
      generate:false
    }
  }


  componentWillMount() {
    this.props.loadMeme(this.props.match.params.memeId);

 }

  componentDidMount(){
    setTimeout(() => this.setState({ loading: false }), 800);

 }

 generateMeme(){
   const username = 'Sammy2511';
   const password = 's@mar2511';
   const baseUri = `https://api.imgflip.com/caption_image?template_id=${this.props.meme.id}&text0=${this.state.text1}&text1=${this.state.text2}&username=${username}&password=${password}`;

   fetch(baseUri,{
    method: 'POST',
  }).then( response => response.json())
    .then( json => {
      if (json.success) {
        const data = json.data;
          this.redirectToMeme(data);
      }
    })
 }

 redirectToMeme(data){
   this.setState({url:data.url,generate:true});
 }

 download(){
      const link = document.createElement('a');
      link.href = this.state.url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
 }


  render(){
    const meme = this.props.meme;
    if(meme !== null){

    }

    return(
      meme !== null  ?
      <div className = "App">
        <div className='imageWrapper'>
        <img className="img-thumbnail"
              alt='dish'
              src = {this.props.meme.url}/>
      </div>

      <div className ="textWrapper">
      <FormGroup>
      <InputGroup>
        Text 1 :
        <FormControl
          type = "text"
          placeholder = "Text 1"
          value = {this.state.text1}
          onChange = {event => {this.setState({text1:event.target.value})}}
        />
      </InputGroup>

      <InputGroup>
        Text 2 :
        <FormControl
          type = "text"
          placeholder = "Text 2"
          value = {this.state.text2}
          onChange = {event => {this.setState({text2:event.target.value})}}
      />
      </InputGroup>
    </FormGroup>
      <button className = "btn btn-success"
       onClick = {() => {
         this.generateMeme()
       }}>Go </button>
        {
          this.state.generate ?
          <button className = "btn btn-primary"
           onClick = {() => {
             this.download()
           }}>Download Meme </button> : <div></div>
        }


      </div>
      </div> : <div>Loading Meme ......</div>
    )
  }
}

const mapStateToProps=(state)=>{
    console.log('maptostate',state);
    return state
};

export default withRouter(connect(mapStateToProps,actionCreators)(MemeCaption));
