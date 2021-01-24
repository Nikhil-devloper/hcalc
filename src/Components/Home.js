import React, { useState, useEffect, useContext } from 'react';
import img1 from '../images/pic1.jpg';
import './Home.css'
import { motion, AnimatePresence } from 'framer-motion';
import { withRouter } from 'react-router-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import BMI from './Calc/BMICalc';
import NOS from './Calc/NOS'
import GOW from './Calc/GOW';
import BFC from './Calc/BFC';
import BMR from './Calc/BMR';
import SEC from "./Calc/Sec";

import LocalizedStrings from 'react-localization';
import { PageContext } from '../PageContextProvider';

//import createHistory from 'history/createBrowserHistory'




let strings = new LocalizedStrings({
    en: {
        bmiCalc: "BMI calculator",
        bficalc: "Body Fat Calculator",
        steps: "No Of Steps You should Take",
        glassOfwater: "Glass of Water you should Drink",
        amount: "Maintenance Calories / Amount of Protein Intake",
        stips: "Some Tips"
    },
    marathi: {
        bmiCalc: "बीएमआय गणना",
        bficalc: "शरीरातील चरबी गणना",
        steps: "आपण किती पावले उचलावीत याची संख्या",
        glassOfwater: "आपण पाणी प्यावे त्या पाण्याची संख्या",
        amount: "एकूण दैनंदिन उर्जा खर्च / प्रथिने घेण्याचे प्रमाण",
        stips: "काही युक्त्या"
    }
});

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

function Home(props) {

    const [isOpen, setModal] = useState(false);
    const [type, setType] = useState(null);

    const { language, setLanguage } = useContext(PageContext);
    strings.setLanguage(language);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("stop-scroll");
        }
        else {
            document.body.classList.remove("stop-scroll");
        }
    }, [isOpen])

    const renderCalc = () => {
        if (type.name == 'BMI')
            return <BMI
                setModal={(bool) => setModal(bool)}
            />
        if (type.name == 'NOS')
            return <NOS
                setModal={(bool) => setModal(bool)} {...props}
            />
        if (type.name == 'GOW') {
            return <GOW setModal={(bool) => setModal(bool)} />
        }
        if (type.name == 'BFC') {
            return <BFC setModal={(bool) => setModal(bool)} {...props} />
        }
        if (type.name == 'BMR') {
            return <BMR setModal={(bool) => setModal(bool)} />
        }
        if (type.name == 'SEC') {
            return <SEC setModal={(bool) => setModal(bool)} />
        }
    }


    useEffect(() => {


    }, [])



    return (
        <div className='homeMainContainer'>




            <div className='box-container'>

                <div className='twoBoxHolder'>


                    <motion.div
                        initial={{
                            x: '-50vw',
                            scale: [0.9]
                        }}
                        animate={{ x: 0, transition: { type: 'spring', delay: 0.5 } }}
                        className='box box1' onClick={() => {
                            setModal(!isOpen)
                            //setType({ name: 'BMI', text: 'BMI Calculator' })
                        }}
                        onClick={() => {
                            props.history.push('/BMI')
                        }}
                    >
                        {strings.bmiCalc}
                        {/* BMI calculator */}
                        {/* <img src={img1} alt={'picachu'} /> */}
                    </motion.div>


                    <motion.div
                        initial={{
                            x: '100vw',
                            scale: [0.9]
                        }}
                        animate={{ x: 0, transition: { type: 'spring', delay: 0.5 } }}
                        className='box box2'
                        // onClick={() => {
                        //     setModal(!isOpen)
                        //     setType({ name: 'BFC', text: 'Body Fat Calculator' })
                        // }}
                        onClick={() => {
                            props.history.push('/BFC')
                        }}
                    >
                        {strings.bficalc}
                    </motion.div >

                </div>

                <div className='twoBoxHolder'>

                    <motion.div
                        initial={{
                            x: '-100vw',
                            scale: [0.9]
                        }}
                        animate={{ x: 0, transition: { type: 'spring', delay: 0.5 } }}
                        className='box box5'
                        // onClick={() => {
                        //     setModal(!isOpen)
                        //     setType({ name: 'BMR', text: 'Amount of Protin Intake' })
                        // }}
                        onClick={() => {
                            props.history.push('/BMR')
                        }}
                    >
                        {strings.amount}
                        {/* No Of Steps You should Take */}
                    </motion.div >

                    <motion.div
                        initial={{
                            x: '100vw',
                            scale: [0.9]
                        }}
                        animate={{ x: 0, transition: { type: 'spring', delay: 0.5 } }}
                        className='box box4'
                        onClick={() => {
                            props.history.push('/SEC')

                        }}
                    >
                        {strings.stips}
                        {/* Secrets & Myths of Health Maintainance */}

                        {/* Glass of Water you should Drink */}
                    </motion.div >

                </div>


                <div className='twoBoxHolder'>

                    <motion.div
                        initial={{
                            x: '-100vw',
                            scale: [0.9]
                        }}
                        animate={{ x: 0, transition: { type: 'spring', delay: 0.5 } }}
                        className='box box3'
                        onClick={() => {
                            props.history.push('/STEPS')
                            // setModal(!isOpen)
                            // setType({ name: 'NOS', text: 'No Of Steps' })
                        }}
                    >
                        {strings.steps}
                        {/* No Of Steps You should Take */}
                    </motion.div >

                    <motion.div
                        initial={{
                            x: '100vw',
                            scale: [0.9]
                        }}
                        animate={{ x: 0, transition: { type: 'spring', delay: 0.5 } }}
                        className='box box6'
                        onClick={() => {
                            props.history.push('/GOW')
                            // setModal(!isOpen)
                            // setType({ name: 'GOW', text: 'Glass of Water' })
                        }}
                    >
                        {strings.glassOfwater}
                        {/* Glass of Water you should Drink */}
                    </motion.div >
               
                    
                </div>

            </div>
        </div>
    )
}

export default withRouter(Home);
