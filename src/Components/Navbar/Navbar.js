import * as React from "react";
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import './Navbar.css';
import logo from './Img/healthCalc2.png';
import pi from '../../images/pi2.svg';
import lang from '../../images/global.svg';
import mobApp from '../../images/mobile-app.svg';
import me from '../../images/superhero.svg';
import home from '../../images/web-house-.svg';

import Formula from '../MiniComponents/Formula';
import Language from '../MiniComponents/Language';
import AboutApp from '../MiniComponents/AboutApp';
import AboutMe from '../MiniComponents/AboutMe';


import LocalizedStrings from 'react-localization';
import { PageContext } from '../../PageContextProvider';


let strings = new LocalizedStrings({
    en: {
        hcalc: "Health Calculators",
        formula: "Formula's",
        Language: "Language",
        aboutApp: "About App",
        aboutMe: 'About me'
    },
    marathi: {
        hcalc: "आरोग्य कॅल्क्युलेटर",
        formula: "सुत्र",
        Language: "भाषा निवडा",
        aboutApp: "अ‍ॅप बद्दल",
        aboutMe: 'माझ्याबद्दल'
    }
});



const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 5,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(24px at 258px 48px)",
        transition: {
            delay: 0,
            type: "spring",
            stiffness: 500,
            damping: 50
        }
    }
};

let shouldHide = true;
let deferredPrompt;

export const Example = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);
    const [openMiniComponent, setMiniComponent] = useState(null)
    const { language, setLanguage } = useContext(PageContext);
    strings.setLanguage(language);

    
    let addBtn;
    


    const click = () => {

        console.log('cleoo',deferredPrompt);



        if (deferredPrompt && deferredPrompt.prompt) {

            deferredPrompt.prompt()
                .then(res => console.log(res))
                .catch(error => { console.log(`----> ${error}`) })
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {

                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }

                deferredPrompt = null;
                shouldHide = true;
                if (addBtn && addBtn.style) {
                    addBtn.style.display = 'none';
                }

            }).catch(err => {
                console.log('err', err);
            })

        }


    }

    useEffect(() => {

        console.log('came ?');

        window.addEventListener('beforeinstallprompt', (e) => {

            console.log('here ',e);
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            shouldHide = false;

            console.log('shouldHide',shouldHide);
            // Update UI to notify the user they can add to home screen           

        })

    }, []);




    useEffect(() => {
        if (isOpen) {
            document.querySelector('body').classList.add('stop-scroll')
        }
        else {
            document.querySelector('body').classList.remove('stop-scroll');
        }
    }, [isOpen])

    console.log('shouldHide render--->',shouldHide);

    return (
        <div className='Navbar-parent'>

            <div className='NavbarContainer'>
                <img src={logo} alt={'calc logo'} />
                <div className='tag-line'>
                    {strings.hcalc}
                    {/* {strings.} */}

                </div>
            </div>

            {openMiniComponent &&
                <div className='mini-component-container'>
                    {openMiniComponent == 'Formula' && <Formula setModal={() => setMiniComponent(null)} />}
                    {openMiniComponent == 'Language' && <Language setModal={() => setMiniComponent(null)} />}
                    {openMiniComponent == 'AboutApp' && <AboutApp setModal={() => setMiniComponent(null)} />}
                    {openMiniComponent == 'AboutMe' && <AboutMe setModal={() => setMiniComponent(null)} />}
                </div>
            }

            { <motion.nav
                initial={"closed"}
                animate={isOpen ? "open" : "closed"}
                custom={height}
                ref={containerRef}
                style={isOpen ? { zIndex: '10' } : {}}
            >
                <motion.div className="background" variants={sidebar} />

                {isOpen && <div className='navbar-detail-container'>

                    <div className='field' onClick={() => { setMiniComponent('Formula') }}>
                        <img src={pi} alt='formula' />
                        {/* Formula's */}
                        {strings.formula}
                    </div>

                    <div className='field' onClick={() => { setMiniComponent('Language') }}>
                        <img src={lang} alt='formula' className="filter-green" />
                        {/* Language */}
                        {strings.Language}
                    </div>

                    <div className='field' onClick={() => { setMiniComponent('AboutApp') }}>
                        <img src={mobApp} alt='formula' className="filter-green" />
                        {/* About App */}
                        {strings.aboutApp}
                    </div>

                    <div className='field' onClick={() => { setMiniComponent('AboutMe') }}>
                        <img src={me} alt='formula' className="filter-green" />
                        {strings.aboutMe}
                        {/* About Me */}
                    </div>

                    {!shouldHide && <div className='field' onClick={() => { click() }}>
                        <img src={home} alt='formula' className="filter-green" />
                        Add to Home Screen
                    </div>}

                </div>}


                {isOpen && <div onClick={() => toggleOpen()} className='navbar-blackdrop'> </div>}
                {/* <Navigation /> */}

                <MenuToggle toggle={() => toggleOpen()} />
            </motion.nav>}
        </div>
    );
};

export default Example;