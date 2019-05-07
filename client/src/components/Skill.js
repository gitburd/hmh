import React, { Component } from 'react'
import PropTypes from 'prop-types';
import '../App.css';
import { ButtonToolbar, Button }  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SkillsGrid from './SkillsGrid';
import { MDBRow, MDBCol, MDBIcon } from "mdbreact";


export default class Skill extends Component {
  state={
    skill_id:'skill.js state', 
    skill_icon:'skill.js state', 
    skill_details:'skill.js state', 
    skill_title:'skill.js state'
  }


  render() {
    const { skill_id, skill_title, skill_details, skill_icon, is_critical} = this.props.skill;
           
    return (
      <div className="topSkill">

          <div className= {this.props.skill.is_critical ? "criticalSkill" : "skill"} onClick = {()=>{this.props.skillClicked(skill_id, skill_icon, skill_details, skill_title)}}>
            <div className= {this.props.skill.is_heart ? '':'hidden'}>
            
            
            <MDBIcon style={{float:'right'}}icon="heart" size="2x" className="pink-text pr-3" />
            </div>
            {/* <MDBIcon far icon="heart" /> */}

            <div className= {this.props.skill.is_star ? '':'hidden'}>
            <MDBIcon icon="star" size="2x" className="yellow-text pr-3"/>
            </div>
          {skill_title}
          <br/>
                <img  src={skill_icon} className="skill_icon" />    
                
          </div>
        
      </div>
    )
  }
}


  