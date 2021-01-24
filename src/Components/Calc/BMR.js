import React, { useEffect, useState, useContext } from 'react'
import ExpandCollapse from '../ExpandCollapse/ExpandCollapse.jsx';
import './BMICalc.css'
import cross from '../../images/cross.png';
import bmimage from '../../images/pp.png';
import { AnimatePresence, motion } from 'framer-motion';
import cmArray from './cmObj';
import upArrow from '../../images/up-arrow.png';
import fatForAge from './fatForAge';
import './BFC.css';
import './BMR.css';
import bfcMen from '../../images/body-fat-man-1.png';
import bfcWoomen from '../../images/body-fat-woman-1.png';
import LocalizedStrings from 'react-localization';
import { PageContext } from '../../PageContextProvider';
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
        bfcCalc: "Basal Metabolic Rate",
        GENDER: "Gender",
        Male: "Male",
        Female: "Female",
        weight: "Weight",
        AGE: "Age:",
        HEIGHT: "Height :",
        bmrwhat: "What is Protein?",
        bfianswer: "Protein gives tissues and organs their shape and also helps them work the way they should",
        ybfc: "YOUR BFC",
        bfce: "BFC = ",
        ideal: "Ideal Body Fat for Given Age & Gender:",
        Calculate: "Calculate",
        back: "Back",
        alevel: "Activity level :",
        inactive: "Inactive (little to no exercise)",
        low: "Low Exercise/ 1-3 times/week",
        med: "Medium (medium exercise/ 3-5 times/week)",
        high: "High (Intense Exercise/ 6-7 times/week)",
        intense: "Intense (Hard Exercise/Intense physical job)",
        genderError: "Please Select Gender :",
        cdc: "CDC's recommendation for daily protein intake:",
        ada: "ADA's recommendation for daily protein intake:",
        cal: "calories ",
        grams: "grams",
        protOne: "Protein is present in every body cell, and an adequate protein intake is important for keeping the muscles, bones, and tissues healthy.",
        protTwo: "Protein plays a role in many bodily processes, including:",
        td: "Maintenance Calories:",
        blood: "Blood clotting",
        Fluidbalance: "Fluid balance",
        immSys: "Immune system responses",
        Vision: "Vision",
        hormones: "hormones",
        enzymes: "enzymes"
        // glassOfwater: "Glass of Water you should Drink"
    },
    marathi: {
        bfcCalc: "प्रथिने घेण्याचे प्रमाण",
        GENDER: "लिंग",
        Male: "पुरूष",
        weight: "वजन",
        AGE: "वृद्ध :",
        Female: "स्त्री",
        height: " उंची : (सेमी) [148 - 213]",
        HEIGHT: "उंची",
        bmrwhat: " प्रथिने म्हणजे काय ?",
        bfianswer: "बॉडी फॅट कॅल्क्युलेटर आपल्याला आपल्या शरीरातील चरबीची टक्केवारी शोधण्यात मदत करते, जीवन आणि पुनरुत्पादक कार्यासाठी शरीरातील आवश्यक चरबीची आवश्यकता असते. बाळंतपण आणि इतर हार्मोनल फंक्शन्सच्या मागण्यांमुळे स्त्रियांसाठी आवश्यक शरीराच्या चरबीची टक्केवारी पुरुषांपेक्षा जास्त आहे.",
        ybfc: 'आपला बीएफसी',
        bfce: "बीएफसी =",
        ideal: "दिलेल्या वय आणि लिंगासाठी आदर्श शरीर चरबी:",
        Calculate: "गणना करा",
        back: "मागे",
        alevel: "क्रियाशील असण्याची स्थिती :",
        inactive: "निष्क्रिय (थोडेसे व्यायाम)",
        low: "कमी व्यायाम / आठवड्यात 1-3 वेळा",
        med: " मध्यम (मध्यम व्यायाम /  आठवड्यात 3-5 वेळा)",
        high: " उच्च (तीव्र व्यायाम / आठवड्यात 6-7 वेळा )",
        intense: " तीव्र ( कठोर व्यायाम )",
        genderError: "कृपया लिंग निवडा",
        td: "एकूण दैनंदिन उर्जा खर्चः",
        cdc: "दररोज प्रथिने घेण्याबाबत सीडीसीची शिफारसः",
        ada: "दररोज प्रथिने घेण्याची एडीएची शिफारसः",
        cal: "उष्मांक",
        grams: "ग्रॅम",
        protOne: "शरीरातील प्रत्येक पेशीमध्ये प्रथिने असतात आणि स्नायू, हाडे आणि उती निरोगी ठेवण्यासाठी आवश्यक प्रमाणात प्रोटीन घेणे आवश्यक असते.",
        protTwo: "बर्‍याच शारीरिक प्रक्रियांमध्ये प्रोटीनची भूमिका असते, यासह:",
        blood: "रक्त गोठणे",
        Fluidbalance: "द्रव शिल्लक",
        immSys: "प्रतिरक्षा प्रणालीस प्रतिसाद",
        Vision: "दृष्टी",
        hormones: "संप्रेरक",
        enzymes: "सजीवांच्या शरीरात निर्मार्ण होणारे द्रव्य"
    }
});

//https://www.gaiam.com/blogs/discover/how-to-calculate-your-ideal-body-fat-percentage
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

function BMR(props) {

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
    const [selectedGender, setGenderChange] = useState({ value: '', isDirty: false })
    const [showGenderErrorMessage, setGenderErrorMessage] = useState(null);
    const [bfpResult, setBFPResult] = useState();
    const [returnFatObj, setReturnFatObj] = useState(null);
    const [emo, setEmo] = useState(null);

    const [cal, setCal] = useState(0);

    const [healthyWeight, setHealthyWeight] = useState(null);
    const [selectValue, setSelectValue] = useState('Inactive');

    const [prot1, setProtinReq1] = useState('');
    const [prot2, setProtinReq2] = useState('');


    function bmrResFun(age, weight, height, gender, intensity) {

        let cal = '';
        if (gender == 'male') {
            let res = 66.5 + (13.75 * (weight)) + 5.003 * (height) - (6.775 * (age))
            cal = intensity * res;
        }
        else if (gender == 'female') {
            let res = 655.1 + (9.563 * (weight)) + (1.85 * (height)) - 4.676 * (age);
            cal = intensity * res;
        }
        return cal
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

    function handleCalClick() {

        if (mode == 'A') {
            setMode('Q')
        }
        else {

            if (selectedGender.value != '') {


                localStorage.setItem('weight', weight)
                localStorage.setItem('height', height);
                localStorage.setItem('age', age);

                let intensity = 1;

                if (selectValue == 'Inactive') {
                    intensity = 1.2;
                }
                else if (selectValue == 'Low') {
                    intensity = 1.375;
                }
                else if (selectValue == 'Medium') {
                    intensity = 1.55;
                }
                else if (selectValue == 'High') {
                    intensity = 1.725;
                }
                else if (selectValue == 'Intense') {
                    intensity = 1.9;
                }


                let bmrRes = bmrResFun(age, weight, height, selectedGender.value, intensity);

                setCal(bmrRes)

                let tenper = (bmrRes * 0.1) / 4;
                let threeFiveper = (bmrRes * 0.34) / 4;

                let w1 = 0.8 * weight;
                let w2 = 1 * weight;

                setProtinReq1(`${tenper.toFixed(0)} - ${threeFiveper.toFixed(0)}`)
                setProtinReq2(`${w1.toFixed(2)} - ${w2.toFixed(2)}`)
                setMode('A')

            }
            else {
                //setGenderChange({...selectedGender,isDirty: true})
                setGenderErrorMessage(true)
            }
        }
    }

    const onGenderChange = (e) => {
        setGenderChange({ value: e.target.value, isDirty: true })
        setGenderErrorMessage(false)
    }

    const handleChange = (e) => {
        //this.setState({ value: e.target.value });
        setSelectValue(e.target.value)
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


                    <div className='bmi-calc-container bmr'>
                        <div className='heading'>
                            {strings.td}
                            {/* Body Fat Calculator */}
                        </div>
                        <img src={cross} alt='cross' className='cross-icon'
                            onClick={() => props.history.push('/')}
                        />


                        <div className='actual-cal bmr-actual'>
                            <AnimatePresence >
                                {mode == 'Q' && <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className='form-container'>

                                    <div className="contact-us bfc">

                                        <form action="#">


                                            {/* <p>Please select your gender:</p>
                             <input type="radio" id="male" name="gender" value="male" />
                            <label for="male">Male</label><br /> */}
                                            {/*<input type="radio" id="female" name="gender" value="female" />
                            <label for="female">Female</label><br />
                            <input type="radio" id="other" name="gender" value="other" /> */}
                                            {/* <input id="customerName" name="customerName" required="" type="number" /> */}

                                            <div className='radio-box-bfc'>
                                                <label>
                                                    {strings.GENDER}:
                                        {/* {strings.bfcCalc} */}
                                                </label>
                                                <input
                                                    type="radio"
                                                    id="male"
                                                    name="gender"
                                                    value="male"
                                                    checked={selectedGender ? selectedGender.value === "male" : false}
                                                    onChange={onGenderChange}
                                                //
                                                />
                                                <label htmlFor="male">{strings.Male}</label>

                                                <input
                                                    type="radio"
                                                    id="female"
                                                    name="gender"
                                                    value="female"
                                                    checked={selectedGender ? selectedGender.value === "female" : false}
                                                    onChange={onGenderChange}
                                                />
                                                <label htmlFor="female">{strings.Female}</label>

                                            </div>



                                            <label htmlFor="customerName">{strings.AGE} &nbsp;&nbsp;(20-55) <em>&#x2a;</em></label>
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

                                            <label htmlFor="height" type="number">
                                                {strings.HEIGHT} (Cm) [148 - 213]
                                <em>&#x2a;</em></label>
                                            <input id="height" name="height" required="" type="number"
                                                onChange={(e) => setHeight(e.target.value)}
                                                value={height}
                                            />

                                            <label htmlFor="customerPhone"> {strings.weight} (Kg)<em>&#x2a;</em></label>
                                            <input id="customerPhone"
                                                onChange={(e) => setWeight(e.target.value)}
                                                type="number"
                                                value={weight}
                                            />

                                            <label htmlFor="alevel">{strings.alevel} </label>
                                            <select name="alevel" id="alevel" className='bmr-alevel' onChange={handleChange} value={selectValue}>
                                                <option value="Inactive"> {strings.inactive} </option>
                                                <option value="Low"> {strings.low} </option>
                                                <option value="Medium">  {strings.med} </option>
                                                <option value="High"> {strings.high} </option>
                                                <option value="Intense">{strings.intense} </option>
                                            </select>

                                            {/* 
                                
                                <input id="customerPhone"
                                    onChange={(e) => setWeight(e.target.value)}                                    
                                    type="number"
                                    value={weight}
                                /> */}
                                            {/* <label for="orderNumber">ORDER NUMBER</label>
                            <input id="orderNumber" name="orderNumber" type="text" /> */}
                                            {/* <label for="customerNote">YOUR MESSAGE <em>&#x2a;</em></label>
        <textarea id="customerNote" name="customerNote" required="" rows="4">        
        </textarea> */}

                                        </form>
                                    </div>

                                    {showGenderErrorMessage && <div style={{ color: 'red', textAlign: 'center' }}> {strings.genderError} </div>}

                                    {calcBtn && <div className={isDisableCalcBtn ? 'calulate disable' : 'calulate'} onClick={handleCalClick}>
                                        {mode == 'A' ? strings.back : strings.Calculate}
                                    </div>}
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

                                    <div className='bmr-result-container'>

                                        <div className='flex-table'>

                                            <div className='flex-row'>

                                                <div className='col1'>
                                                    <div className='bmr-cal'>
                                                        {strings.td}

                                                    </div>

                                                </div>

                                                <div className='col2 '>
                                                    <span className=''>
                                                        <b> {cal && cal.toFixed(2)} {strings.cal} </b>&nbsp;
                                        </span>
                                                </div>

                                            </div>

                                        </div>





                                        <div className='flex-table'>
                                            <div className='flex-row'>
                                                <div className='col1'>
                                                    {strings.cdc}

                                                </div>
                                                <div className='col2 aligncenterV'>
                                                    <span className=''> <b> {prot1} {strings.grams} </b> </span>
                                                </div>
                                            </div>
                                        </div>

                                        <br />

                                        <div className='flex-table'>

                                            <div className='flex-row'>
                                                <div className='col1'>
                                                    {strings.ada}

                                                </div>
                                                <div className='col2 aligncenterV'>
                                                    <span className=''> <b> {prot2} {strings.grams} </b> </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className='q-container bmr-q-cont'>
                                            <ExpandCollapse
                                                type='faq'
                                                displayText={strings.bmrwhat}
                                                currentState={(currenState) => {
                                                    setCalcBtn(!currenState)
                                                }}
                                            >
                                                <div className='answer'>                                                 
                                                    {strings.protOne}
                                                    <div style={{ marginTop: '10px' }}>                                                        
                                                        {strings.protTwo}
                                                    </div>
                                                    <ul style={{ textAlign: 'left' }}>
                                                        <li>
                                                            {strings.blood}
                                                        </li>
                                                        <li>
                                                            {strings.Fluidbalance}
                                                        </li>
                                                        <li>
                                                            {strings.Vision}
                                                        </li>
                                                        <li>
                                                            {strings.hormones}
                                                        </li>
                                                        <li>
                                                            {strings.enzymes}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </ExpandCollapse>
                                        </div> */}

                                        {/* <div> {strings.ybfc} </div>

                            <div> {strings.bfce} <span className='no-cal'> {''} </span> </div> */}

                                        {/* <div> {cat.emo} </div> */}

                                        {/* <span className='bmi-img-container' >

                                <img src={selectedGender.value == 'male' ? bfcMen : bfcWoomen} alt='bmi-image' />

                                {bfpResult && bfpResult < 40 && <div className='up-weight-arrow' style={{ left: `${percentage - 11}%` }}>
                                    
                                    <img src={upArrow} alt='upArrow' />
                                </div>}

                                <div className='min0'>
                                    0
                                </div>
                                <div className='max40'>
                                    40
                                f</div>
                            </span>
                         */}
                                        <div style={{ marginTop: '10px' }}>
                                            {/* <span> {strings.ideal}  </span>
                                <span className='no-cal'> {selectedGender.value == 'male' ? returnFatObj.male : returnFatObj.female} % </span> */}
                                        </div>


                                        {/* {cat && (cat.cat == 'Overweight' || cat.cat == 'Obesity') ?
                                <div style={{ lineHeight: 1, marginBottom: '15px', fontSize: '21px', marginTop: '16px', marginBottom: '5px' }}> Lose  <span className='no-cal'> {lweight} Kgs</span>  to reach a BMI of <span className='no-cal'>25 Kg/m<sup>2</sup></span> </div>
                                : cat && cat.cat == 'Underweight' ?
                                    <div style={{ lineHeight: 1, fontSize: '21px', marginTop: '16px' }}> Gain {gweight} Kgs to reach a BMI of <span className='no-cal'> 18.5 Kg/m<sup>2</sup> </span>  </div> : null} */}

                                        {/* {cat && (cat.cat == 'Normal') ? <div style={{ marginBottom: '15px' }} > </div> : null} */}


                                        {/* {healthyWeight && <div style={{ lineHeight: 1, marginBottom: '15px', fontSize: '21px' }}> Healthy weight for your height: <span className='no-cal'> {healthyWeight[0]} Kgs - {healthyWeight[1]} Kgs  </span></div>}
                            <div style={{ lineHeight: 1, marginBottom: '15px', fontSize: '21px' }}> Healthy BMI range: <span className='no-cal'> 18.5 Kg/m2 - 25 Kg/m<sup>2</sup> </span> </div> */}

                                        {calcBtn && <div className={isDisableCalcBtn ? 'calulate disable' : 'calulate'} onClick={handleCalClick}>
                                            {mode == 'A' ? strings.back : strings.Calculate}
                                        </div>}

                                    </div>

                                </motion.div>
                                }
                            </AnimatePresence>



                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default withRouter(BMR);

// Reducing Your Body Fat
// When it comes to losing weight, the key is to eat fewer calories than you expend. If you do this, AND exercise, you will lose body fat. Your body was designed to store fat so it would have reserves of energy during famine. When you take in fewer calories than you expend, during exercise and rest, your body burns these fat reserves. Be sensible, however—if you eat too few calories or cut out all carbohydrates, the weight you lose will likely be fluids and muscle, not fat. In this case the scale will go down, but your body fat percentage will go up, rendering you less healthy. The Academy of Nutrition and Dietetics recommends losing weight slowly—½ to 1 pound per week—and continue exercising to maximize fat loss and minimize muscle loss.


