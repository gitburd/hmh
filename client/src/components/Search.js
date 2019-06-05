import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Form}  from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import SkillsTypeahead from './SkillsTypeahead';
import EmotionsTypeahead from './EmotionsTypeahead';
import RecordUpdate from './RecordUpdate';
import MySlider from './MySlider';
import {Link} from 'react-router-dom';

 
export default class Search extends Component {
  constructor(props){
    super(props);
    this.state={
      key:'',
      emotion:'',
      emotion_id:'',
      skill:'',
      skill_id:'0',
      before_lvl:'5',
      after_lvl:'5',
      si:false,
      sh:false,
      message:'',
      startDate: new Date(),
      date:new Date().getTime() / 1000
    }
    this.handleBefore_lvlChange = this.handleBefore_lvlChange.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  onSelectRecord(record){
    this.props.handleSelectRecord(record)
  } 
  // componentDidMount() {

  //   if (this.props.key==='Action'){
  //     this.props.searchByQuery('Skill', this.state.skill_id);
  //   }

  //   if (this.props.propkey==='Thoughts of suicide or self harm'){
  //       this.props.searchByQuery('critical', true);
  //   }
  //   if(this.props.propkey==='Feeling'){
  //     this.props.searchByQuery('Feeling', this.state.query)
  //   }
  //   if(this.props.propkey==='Impact'){
  //     this.props.searchByQuery('Impact', this.state.query)
  //   }
  //   if(this.props.propkey==='Unfinished'){
  //     this.props.searchByQuery('Unfinished', true)
  //   }
  //   if(this.props.propkey==='Full List'){
  //     this.props.searchByQuery('FullList', true)
  //   }
  // }
 
  handleKeyChange(key) {
    this.setState({key: key.target.value})
    }

  handleQueryChange(query) {
    this.setState({query: query.target.value})
    }

  search=(e)=>{
    e.preventDefault();
   
    this.props.setKeyQueryCallback(this.state.key, this.state.query)
  
    if (this.state.key==='Action'){
        this.props.searchByQuery('Skill', this.state.skill_id);
    }

    if (this.state.key==='Thoughts of suicide or self harm'){
        this.props.searchByQuery('critical', true);
    }
    if(this.state.key==='Feeling'){
      this.props.searchByQuery('Feeling', this.state.query)
    }
    if(this.state.key==='Impact'){
      this.props.searchByQuery('Impact', this.state.query)
    }
    if(this.state.key==='Unfinished'){
      this.props.searchByQuery('Unfinished', true)
    }
    if(this.state.key==='Full List'){
      this.props.searchByQuery('FullList', true)
    }
  }

  
  setSkillCallback = (skill) =>{

    this.setState({skill})
    let url = `http://localhost:3001/api/skill_id?skill_title=${skill}`
    
    fetch(url, {
      method: 'get',
      headers: { 'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then(json => this.setState({query:json[0].skill_id, skill_id:json[0].skill_id}))
      .catch(function(e) {
      console.log(e); // “oh, no!”
     })

  }



  setEmotionCallback = (emotion)=>{
 
    this.setState({query:emotion})
    
    
  //   let url = `http://localhost:3001/api/emotion_id?emotion_text=${emotion}`
  // console.log(url)
  // fetch(url, {
  //   method: 'get',
  //   headers: { 'Content-Type': 'application/json'}
  //   })
  //   .then(res => res.json()).then(json => this.setState({emotion_id:json[0].emotion_id})).catch(function(e) {
  //   console.log(e); // “oh, no!”
  //  })
 
  }
 
  handleBefore_lvlChange(impact) {
    // let fieldName = event.target.name;
    // let fleldVal = event.target.value;
    this.setState({query:impact})
  }


  render() {

    let searchList  = this.props.recordsList.map((record)=>(           
      <RecordUpdate 
        key={record.record_id} 
        record={record} 
        onSelectRecord = {this.onSelectRecord.bind(this)}
        currentRecord = {record}
      />         
    ))
     
    return (
      <div style={{width:'100%', paddingTop:'20px'}}>
      <h1>Search Records  
      <Link className="navbar-brand" to="/records/list">
      <sup>  <i class="far fa-list-alt" style={{ fontSize: '1.9em', paddingLeft:'4px' }} > <span style={{fontFamily: 'Roboto' }}>  </span> </i> </sup>
      </Link>
      <Link className="navbar-brand" to="/records/add">
           <sup>  <i class="far fa-plus-square" style={{ fontSize: '1.9em', paddingLeft:'2px' }} > <span style={{fontFamily: 'Roboto' }}>  </span> </i> </sup>
      </Link>
      </h1>
      
        <div style={{width:'60%', margin:'0 auto'}}>
          <form>

            <div class="form-group">
              <label> </label>
              <Form.Control as="select" onChange={this.handleKeyChange.bind(this)}>    
                <option>Select one</option>
                <option>Feeling</option>
                <option>Action</option>
                <option>Impact</option>
                <option>Unfinished</option> 
                <option>Full List</option>
                <option>Thoughts of suicide or self harm</option>
              </Form.Control>
            </div>

            <div style={{padding:'10px'}} className= {this.state.key==='Feeling'? '':'hidden'}>
              <EmotionsTypeahead 
                setEmotionCallback= {this.setEmotionCallback} 
              />
            </div>
         
            <div style={{padding:'10px'}} className= {this.state.key==='Action'? '':'hidden'}>
              <SkillsTypeahead  
                skillsTypeahead = {this.props.skillsTypeahead}
                setSkillCallback = {this.setSkillCallback}
              />
            </div>
            
            <div className= {this.state.key==='Impact'? '':'hidden'}>
              <MySlider handleBefore_lvlChange = {this.handleBefore_lvlChange}/>           
            </div>
          </form>
        </div>
        <div >
          <button  style={{width:'40%', fontSize:'calc(12px + 1vmin)', margin:'10px auto'}} className='subBtn' onClick={this.search}>Search</button>              
        </div>
        {searchList}
      </div>  
       
    )
  }
}

