import React, { useState, useEffect } from "react"
import "./App.css"
import APIHelper from "./api-helper"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './home';
import { Task } from './task';
import { CompletedTask } from './task-completed';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Priority } from './priority';
import {Footer} from './components/footer'

function App() {
 
  return (
    <React.Fragment>
      
      {/* <Layout>
       
    <Router>
    <NavigationBar/>
    <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/task" component={Task} />
          <Route path="/task-completed" component={CompletedTask} />
          <Route path="/priority" component={Priority} />
         
        </Switch>
  
    </Router>
    </Layout> */}
    <Footer/>
   
  </React.Fragment>
   
   
  )
}

export default App
