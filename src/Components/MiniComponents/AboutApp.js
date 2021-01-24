import React,{useContext} from 'react';
import logo from '../Navbar/Img/healthCalc2.png';
import './AboutApp.css'

import LocalizedStrings from 'react-localization';
import { PageContext } from '../../PageContextProvider';


let strings = new LocalizedStrings({
    en: {
        hcalc: "Health Calculators:",
        version: "Vesion: 1.0.0",
        copyright: "© 2021 Health Calculators",
        close: 'Close'
    },
    marathi: {
        hcalc: "आरोग्य कॅल्क्युलेटर",
        version: "आवृत्ती: 1.0.0",
        copyright: "© 2021 आरोग्य कॅल्क्युलेटर",
        close: 'बंद'
    }
});


function AboutApp(props) {

    const { user, language, setLanguage } = useContext(PageContext);

    strings.setLanguage(language);

    return (
        <div className='formula-container about-app'>

            <div className='tag-name'>
                <h1 style={{ textTransform: 'unset' }}>
                    {strings.hcalc}
                    {/* Health Calculators */}
                </h1>
            </div>

            <div className='version'>
                {strings.version}
                {/* Vesion: 1.0.0 */}
            </div>

            <div className='img-logo-src'>
                <img src={logo} alt={'logo'} />
            </div>

            <div className='copyrights'>
                {strings.copyright}
                {/* © 2021 Health Calculators */}
            </div>

            <div>
                Made With <span className='heart-symbol'>  ♥ </span>
            </div>

            <div
                //style={{ height: '40px', width: '40px', background: 'red' }}
                className='close-btn'

                onClick={() => props.setModal(false)}
            >
                {strings.close}
                {/* Close */}
            </div>

        </div>
    )
}

export default AboutApp
