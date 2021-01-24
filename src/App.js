import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { motion, AnimatePresence } from 'framer-motion';
import Home from './Components/Home';
import Navbar from './Components/Navbar/Navbar';
import BMI from './Components/Calc/BMICalc';
import BFC from './Components/Calc/BFC';
import BMR from './Components/Calc/BMR';
import SEC from './Components/Calc/Sec';
import NOS from './Components/Calc/NOS';
import GOW from './Components/Calc/GOW';
import PageContextProvider from './PageContextProvider';
import './App.css';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0vh",
    opacity: 1,
    transition: { delay: 0.5 }
  },
}


export default function App() {

  // let deferredPrompt;
  // let addBtn;

  // const click = () => {
  //   deferredPrompt.prompt()
  //     .then(res => console.log(res))
  //     .catch(error => { console.log(`----> ${error}`) })
  //   // Wait for the user to respond to the prompt
  //   deferredPrompt.userChoice.then((choiceResult) => {
  //     if (choiceResult.outcome === 'accepted') {
  //       console.log('User accepted the A2HS prompt');
  //     } else {
  //       console.log('User dismissed the A2HS prompt');
  //     }
  //     deferredPrompt = null;
  //     if (addBtn && addBtn.style) {
  //       addBtn.style.display = 'none';
  //     }

  //   }).catch(err => {
  //     console.log('err', err);
  //   })
  // }

  // useEffect(() => {

  //   addBtn = document.querySelector('.add-button');
  //   addBtn.style.display = 'none';

  //   window.addEventListener('beforeinstallprompt', (e) => {
  //     // Prevent Chrome 67 and earlier from automatically showing the prompt
  //     //e.preventDefault();
  //     // Stash the event so it can be triggered later.
  //     deferredPrompt = e;
  //     // Update UI to notify the user they can add to home screen
  //     addBtn.style.display = 'block';

  //   }, [])
  // });

  //console.log('window.location.href', window.location.pathname);
  return (
    <PageContextProvider>

      <Navbar />

      <Router>
        <Switch>



          <div className='main-container'>
            <Route path="/BMI">
              <BMI />
            </Route>
            <Route path="/BFC">
              <BFC />
            </Route>

            <Route path="/BMR">
              <BMR />
            </Route>

            <Route path="/SEC">
              <SEC />
            </Route>

            <Route path="/GOW">
              <GOW />
            </Route>

            <Route path="/STEPS">
              <NOS />
            </Route>

            <Route path="/GOW">
              <GOW />
            </Route>



            <Route path="/">
              <Home />
            </Route>


            {/* <button class="add-button" onClick={() => { click() }} >Add to home screen</button> */}
          </div>

        </Switch>

      </Router>
    </PageContextProvider>
  );
}
