import React, { useContext } from 'react';
//import './GOW.css';
import { PageContext } from '../../PageContextProvider';
import LocalizedStrings from 'react-localization';
import { AnimatePresence, motion } from 'framer-motion';
import { withRouter } from 'react-router-dom';


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

let strings = new LocalizedStrings({
    en: {
        glassOfwater: "Glass of Water you should Drink",
        Years: "Years",
        year19: "Men, 19 years and older",
        women19: "Women, 19 years and older",
        preg: "Pregnant women",
        BreastfeedingWomen: "Breastfeeding women",
        Liter: "Liter",
        close: "Close",
        ageRange: "Age Range"
    },
    marathi: {
        glassOfwater: "आपण पाणी प्यावे त्या पाण्याची संख्या",
        Years: "वर्ष",
        year19: "पुरुष, 19 वर्षे व त्याहून मोठे",
        women19: "महिला, 19 वर्षे आणि त्यापेक्षा जास्त वयाची",
        preg: "गर्भवती महिला",
        BreastfeedingWomen: "स्तनपान करणार्‍या महिला",
        Liter: "लिटर",
        close: "बंद",
        ageRange: "वय श्रेणी"
    }
});



function GOW(props) {

    //strings.setLanguage('marathi')

    const { language } = useContext(PageContext);
    strings.setLanguage(language);


    return (
        <AnimatePresence>
            <motion.div className="backdrop"
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <motion.div
                    className={"modal"}
                    //type.name == 'SEC' ? "modal bmr-parent" : 
                    variants={modal}
                >


                    <div className='GOW-main-container'>

                        <section>
                            <h1>
                                {strings.glassOfwater}
                                {/* Glass of Water you should Drink */}
                            </h1>
                            <div className='tbl-container'>
                                <div className="tbl-header">
                                    <table cellPadding="0" cellSpacing="0" border="0">
                                        <thead>
                                            <tr>
                                                <th>{strings.ageRange}</th>
                                                <th>{strings.Liter} </th>

                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="tbl-content">
                                    <table cellPadding="0" cellSpacing="0" border="0">
                                        <tbody>
                                            <tr>
                                                <td>4–8 {strings.Years}</td>
                                                <td>1.18 {strings.Liter} </td>
                                            </tr>
                                            <tr>
                                                <td>9–13 {strings.Years} </td>
                                                <td>1.65 - 1.89 {strings.Liter}</td>

                                            </tr>
                                            <tr>
                                                <td>14–18 {strings.Years}</td>
                                                <td>1.89 - 2.60 {strings.Liter}</td>

                                            </tr>
                                            <tr>
                                                <td>{strings.year19}</td>
                                                <td> 3.07 {strings.Liter} </td>

                                            </tr>
                                            <tr>
                                                <td>{strings.women19}</td>
                                                <td>2.12 {strings.Liter}</td>

                                            </tr>
                                            <tr>
                                                <td>{strings.preg}</td>
                                                <td>2.36 {strings.Liter}</td>
                                            </tr>

                                            <tr>
                                                <td>{strings.BreastfeedingWomen}</td>
                                                <td>3.07 {strings.Liter}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>


                        <div
                            //style={{ height: '40px', width: '40px', background: 'red' }}
                            className='close-btn'

                            onClick={() => props.history.push('/')}
                        >
                            {strings.close}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default withRouter(GOW) 
