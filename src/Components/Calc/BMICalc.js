import React, { useEffect, useState, useContext } from 'react'
//import ExpandCollapse from '../ExpandCollapse/ExpandCollapse.jsx';
//import './BMICalc.css'
import cross from '../../images/cross.png';
import bmimage from '../../images/pp.png';
import { AnimatePresence, motion } from 'framer-motion';
import cmArray from './cmObj';
import upArrow from '../../images/up-arrow.png';
import { PageContext } from '../../PageContextProvider';
import LocalizedStrings from 'react-localization';
import { withRouter } from 'react-router-dom';
import Lazy from './Lazy.js';


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
        bmiCalc: "BMI calculator",
        age: "AGE (17-99)",
        height: "HEIGHT (Cm) [148 - 213]",
        weight: "WEIGHT (Kg)",
        whatbmi: "What is BMI Calculator ?",
        bmiAnswer: "The BMI is a convenient rule of thumb used to broadly categorize a person as underweight, normal weight, overweight, or obese based on tissue mass (muscle, fat, and bone) and height. Commonly accepted BMI ranges are underweight (under 18.5 kg/m2), normal weight (18.5 to 25), overweight (25 to 30), and obese (over 30)",
        yourBmi: "YOUR BMI",
        bmi: "bmi",
        Overweight: "Overweight",
        Underweight: "Underweight",
        Normal: "Normal",
        heaweight: "Healthy weight for your height:",
        healthyBMI: "Healthy BMI range:",
        Calculate: "Calculate",
        back: "Back",
        share: "Share"

        // glassOfwater: "Glass of Water you should Drink"
    },
    marathi: {
        bmiCalc: "बीएमआय कॅल्क्युलेटर",
        age: "वय (17-99)",
        height: " उंची (सेमी) [148 - 213]",
        weight: "वजन (किलोग्राम)",
        whatbmi: "बीएमआय कॅल्क्युलेटर म्हणजे काय ?",
        bmiAnswer: "बीएमआय हा एक थंब हा एक सोयीचा नियम आहे जो एखाद्या व्यक्तीचे वजन कमी, सामान्य वजन, जास्त वजन किंवा ऊतकांच्या मास (स्नायू, चरबी आणि हाडे) आणि उंचीवर आधारित लठ्ठपणाचे विस्तृतपणे वर्गीकरण करण्यासाठी वापरला जातो. सामान्यपणे स्वीकारल्या गेलेल्या बीएमआय श्रेणींचे वजन कमी (18.5 किलो / एम 2 पेक्षा कमी), सामान्य वजन (18.5 ते 25), जादा वजन (25 ते 30) आणि लठ्ठपणा (30 पेक्षा जास्त) आहे.",
        yourBmi: "आपला बीएमआय",
        bmi: "बीएमआय",
        Overweight: "जास्त वजन",
        Underweight: "कमी वजन",
        Normal: "सामान्य",
        heaweight: "आपल्या उंचीसाठी निरोगी वजन",
        healthyBMI: "स्वस्थ बीएमआय श्रेणी:",
        Calculate: "गणना करा",
        back: "मागे",
        share: "सामायिक करा"
    }
});



const containerVariants = {
    hidden: {
        opacity: 0,
        x: '-100vh',
        transition: { type: 'spring', delay: 0.2 }
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', delay: 0.2 }
    },
    exit: {
        x: "-100vh",
        transition: { ease: 'easeInOut', delay: 0.2 }
    }
};




function BMICalc(props) {

    const [age, setAge] = useState('');
    const [ageError, setAgeError] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [mode, setMode] = useState('Q')
    const [bmiResult, setBmiResult] = useState(null);
    const [cat, setCat] = useState(null);
    const [lweight, setLooseWeight] = useState(0);
    const [gweight, setGainWeight] = useState(0);
    const [calcBtn, setCalcBtn] = useState(true);
    const [lazyPop, showLazyPopup] = useState(false);

    const [healthyWeight, setHealthyWeight] = useState(null);


    function bmiFun(weight, height) {

        weight = parseFloat(weight);
        height = parseFloat(height);

        let bmi = weight / ((height / 100) ** 2);


        let cat = '';
        if (bmi < 18.5) {
            cat = { cat: "Underweight", emo: '😒', display: strings.Underweight };
        } else if (bmi < 25) {
            cat = { cat: "Normal", emo: '😋', display: strings.Normal };
        } else if (bmi < 30) {
            cat = { cat: "Overweight", emo: '😅', display: strings.Overweight };
        } else {
            cat = { cat: 'Obesity', emo: '😱😡' };
        }

        if (cat.cat != 'Normal') {
            //Formula to calc weight.
            if (cat.cat == 'Overweight' || cat.cat == 'Obesity') {
                let looseWeight = 25 * ((height / 100) ** 2)
                setLooseWeight((weight - looseWeight).toFixed(1))
                setGainWeight(0);
            }
            else if (cat.cat == 'Underweight') {
                let gainWeight = 18.5 * ((height / 100) ** 2);
                setLooseWeight(0)
                setGainWeight((gainWeight - weight).toFixed(1))
            }
        }

        let roundedHeight = Math.floor(height);
        for (let i = 0; i < cmArray.length; i++) {
            if (Number.parseInt(cmArray[i].cm) >= Number.parseInt(roundedHeight)) {
                setHealthyWeight(cmArray[i].kg.split('-'))
                break;
            }
        }
        setCat(cat)
        return bmi.toFixed(2);
    }

    function handleCalClick() {

        if (mode == 'A') {
            setMode('Q')
        }
        else {

            localStorage.setItem('weight', weight)
            localStorage.setItem('height', height);
            localStorage.setItem('age', age);

            setBmiResult(bmiFun(weight, height))
            setMode('A')

        }
    }

    useEffect(() => {

        setHeight(localStorage.getItem('height') ? localStorage.getItem('height') : '');
        setWeight(localStorage.getItem('weight') ? localStorage.getItem('weight') : '');
        setAge(localStorage.getItem('age') ? localStorage.getItem('age') : '');

    }, []);



    let isDisableCalcBtn = age != '' && height != '' && weight != '' ? false : true
    if (mode == 'A') {
        isDisableCalcBtn = false
    }
    let percentage = (bmiResult / 50) * 100;

    const lazyPopup = () => {
        showLazyPopup(true);
    }



    const { user, language, setLanguage } = useContext(PageContext);
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


                    <div className='bmi-calc-container'>

                        <div className='heading'>
                            {/* BMI Calculator */}
                            {strings.bmiCalc}
                        </div>
                        <img src={cross} alt='cross' className='cross-icon'
                            onClick={() => {
                                console.log('props --> ', props);
                                //props.setModal(false)
                                //props.history.push('/')
                                props.history.push('/')
                            }
                            }
                        />

                        <div className='actual-cal'>

                            <AnimatePresence >
                                {mode == 'Q' && <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className='form-container'>

                                    <div className="contact-us">

                                        <form action="#">


                                            {/* <p>Please select your gender:</p>
                             <input type="radio" id="male" name="gender" value="male" />
                            <label for="male">Male</label><br /> */}
                                            {/*<input type="radio" id="female" name="gender" value="female" />
                            <label for="female">Female</label><br />
                            <input type="radio" id="other" name="gender" value="other" /> */}


                                            {/* <input id="customerName" name="customerName" required="" type="number" /> */}

                                            <label for="customerName">
                                                {strings.age}

                                                {/* AGE &nbsp;&nbsp;(17-99) <em>&#x2a;</em>*/}
                                            </label>
                                            <input
                                                id="age"
                                                name="age"
                                                required=""
                                                type="number"
                                                value={age}
                                                onChange={(e) => {
                                                    if (e.target.value.length < 3) {
                                                        setAge(e.target.value)
                                                    }
                                                }}
                                            />
                                            <div>

                                            </div>

                                            <label for="height" type="number">
                                                {/* HEIGHT (Cm) [148 - 213] */}
                                                {strings.height}
                                                <em>&#x2a;</em></label>
                                            <input id="height" name="height" required="" type="number"
                                                onChange={(e) => setHeight(e.target.value)}
                                                value={height}
                                            />

                                            <label for="customerPhone">
                                                {/* WEIGHT (Kg) */}
                                                {strings.weight}
                                                <em>&#x2a;</em></label>
                                            <input id="customerPhone"
                                                onChange={(e) => setWeight(e.target.value)}
                                                //name="customerPhone"
                                                type="number"
                                                value={weight}
                                            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                            //type="tel"
                                            />

                                            {/* <label for="orderNumber">ORDER NUMBER</label>
                            <input id="orderNumber" name="orderNumber" type="text" /> */}
                                            {/* <label for="customerNote">YOUR MESSAGE <em>&#x2a;</em></label>
        <textarea id="customerNote" name="customerNote" required="" rows="4">
        </textarea> */}
                                        </form>
                                    </div>

                                    {calcBtn && <div className={isDisableCalcBtn ? 'calulate disable' : 'calulate'} onClick={handleCalClick}>
                                        {mode == 'A' ? strings.back : strings.Calculate}
                                    </div>}

                                    {/* <div className='q-container'>
                                        <ExpandCollapse
                                            type='faq'
                                            // /
                                            displayText={strings.whatbmi}
                                            //displayText={'What is BMI Calculator ?'}
                                            currentState={(currenState) => { setCalcBtn(!currenState) }}
                                        >
                                            <div className='answer'>
                                                {strings.bmiAnswer}                                                
                                            </div>
                                        </ExpandCollapse>
                                    </div> */}

                                </motion.div>
                                }
                            </AnimatePresence>

                            <AnimatePresence >
                                {mode == 'A' && <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"

                                >

                                    <div className='bmi-result-container'>

                                        <div> {strings.yourBmi}  </div>

                                        <div> {strings.bmi} = <span className='no-cal'> {bmiResult} Kg/m<sup>2</sup> </span>  ({cat && `${cat.display}`}) </div>

                                        <div> {cat.emo} </div>

                                        <span className='bmi-img-container' >
                                            <img src={bmimage} alt='bmi-image' />

                                            {bmiResult && bmiResult < 40 && <div className='up-weight-arrow' style={{ left: `${percentage - 12}%` }}>
                                                {/*  ${}*/}
                                                <img src={upArrow} alt='upArrow' />
                                            </div>}

                                            <div className='min0'>
                                                0
                                </div>
                                            <div className='max40'>
                                                40
                                </div>
                                        </span>


                                        <div className='flex-table'>


                                            {cat && (cat.cat == 'Overweight' || cat.cat == 'Obesity') ?
                                                <div className='flex-row' style={{ lineHeight: 1, marginBottom: '15px', fontSize: '21px', marginTop: '16px', marginBottom: '5px', padding: '10px' }}>
                                                    {language == 'en' && <>Lose &nbsp; <span className='no-cal'> {lweight} Kgs</span> &nbsp;  to reach a BMI of &nbsp; <span className='no-cal'>25 Kg/m<sup>2</sup></span></>}
                                                    {language == 'marathi' && <> <span className='no-cal'>&nbsp;25 Kg/m<sup>2</sup></span> &nbsp; च्या बीएमआयवर पोहोचण्यासाठी &nbsp; <span className='no-cal'> {lweight} Kgs</span> वजन कमी करा </>}
                                                </div>
                                                :
                                                cat && cat.cat == 'Underweight' ?
                                                    <>
                                                        {language == 'en' && <> <div style={{ lineHeight: 1, fontSize: '21px', marginTop: '16px' }}> Gain {gweight} Kgs to reach a BMI of &nbsp; <span className='no-cal'> 18.5 Kg/m<sup>2</sup> </span>  </div> </>}
                                                        {language == 'marathi' && <> <span className='no-cal'> 18.5 Kg/m<sup>2</sup> </span> &nbsp; च्या बीएमआयवर पोहोचण्यासाठी &nbsp; <span className='no-cal'> {gweight} Kgs</span> वजन वाढवा </>}
                                                    </>
                                                    : null}

                                            {cat && (cat.cat == 'Normal') ? <div style={{ marginBottom: '15px' }} > </div> : null}


                                            <div className='flex-row' style={{ marginTop: '20px' }}>
                                                {healthyWeight && <> <div className='col1' style={{ lineHeight: 1, marginBottom: '15px', fontSize: '21px', alignSelf: 'center' }}> {strings.heaweight} </div>
                                                    <div className='col2' style={{ fontSize: '19px' }}> <span className='no-cal'> {healthyWeight[0]} Kgs - {healthyWeight[1]} Kgs  </span> </div>
                                                </>}
                                            </div>

                                            <div className='flex-row'>
                                                <div className='col1' style={{ lineHeight: 1, marginBottom: '15px', fontSize: '19px', alignSelf: 'center' }}> {strings.healthyBMI} </div>
                                                <div className='col2'> <div className='no-cal' style={{ fontSize: '21px', alignSelf: 'center', lineHeight: '1' }}> 18.5 Kg/m2 - 25 Kg/m<sup>2</sup> </div> </div>
                                            </div>

                                            <div className='flex-row btn-containers'>

                                                {
                                                    calcBtn && <div style={{ marginTop: '20px' }} className={isDisableCalcBtn ? 'calulate disable' : 'calulate'} onClick={handleCalClick}>
                                                        {mode == 'A' ? strings.back : strings.Calculate}
                                                    </div>
                                                }

                                                {
                                                    <div
                                                        style={{ marginTop: '20px' }}
                                                        className={isDisableCalcBtn ? 'calulate disable' : 'calulate'}
                                                        onClick={lazyPopup}
                                                    >
                                                        {strings.share}
                                                    </div>
                                                }


                                            </div>


                                        </div>




                                    </div>

                                </motion.div>
                                }
                            </AnimatePresence>

                        </div>

                    </div>

                    <AnimatePresence>

                        {lazyPop && <Lazy showLazyPopup={(bool) => { showLazyPopup(bool) }} />}
                    </AnimatePresence>

                </motion.div>
            </motion.div>
        </AnimatePresence>

    )
}

export default withRouter(BMICalc);
