import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
 export default class App extends Component {
  apikey=process.env.news_api
   render() {
     return (
       <div>
        <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={<News pageSize={9} apikey={this.apikey} country="in" category="general"/>} />
        <Route path="Business" element={<News key="business" pageSize={9} apikey={this.apikey} country="in" category="Business"/>}/>
        <Route path="Entertainment" element={<News key="entertainment" pageSize={9} apikey={this.apikey} country="in" category="Entertainment"/> }/>
        <Route path="Sports" element={<News key="sports" pageSize={9} apikey={this.apikey} country="in" category="Sports"/>}/>
        <Route path="Technology" element={<News key="technology" pageSize={9} apikey={this.apikey} country="in" category="Technology"/>}/>
        <Route path="Health" element={<News key="health"pageSize={9} apikey={this.apikey} country="in" category="Health" />}/>
        <Route path="Science" element={<News key="science" pageSize={9} apikey={this.apikey} country="in" category="science"/>}/>
        <Route path="About" element={<News pageSize={9} apikey={this.apikey} country="in" category="About"/>}/> 
        </Routes> 
        </Router>
       </div>
     )
   }
 }
 
