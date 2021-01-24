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
import bfcMen from '../../images/body-fat-man-1.png';
import bfcWoomen from '../../images/body-fat-woman-1.png';
import LocalizedStrings from 'react-localization';
import { PageContext } from '../../PageContextProvider';
import { withRouter } from 'react-router-dom';
import Lazy from './Lazy';

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
        bfcCalc: "Body Fat Calculator",
        GENDER: "Gender",
        Male: "Male",
        Female: "Female",
        weight: "Weight",
        AGE: "Age:",
        HEIGHT: "Height :",
        bfiwhat: "What is Body Fat Calculator ?",
        bfianswer: "Body Fat Calculator helps you to find out your body fat percentage, body fat includes essential body fat and storage body fat. Essential body fat is needed for life and reproductive functions. The percentage of essential body fat for women is greater than that for men, due to the demands of childbearing and other hormonal functions.",
        ybfc: "YOUR BFC",
        bfce: "Body Fat Percentage = ",
        ideal: "Ideal Body Fat for Given Age & Gender:",
        Calculate: "Calculate",
        back: "Back",
        share: "Share"
        
        // glassOfwater: "Glass of Water you should Drink"
    },
    marathi: {
        bfcCalc: "शरीरातील चरबीची गणना करा",
        GENDER: "लिंग",
        Male: "पुरूष",
        weight: "वजन",
        AGE: "वृद्ध :",
        Female: "स्त्री",
        height: " उंची : (सेमी) [148 - 213]",
        HEIGHT: "उंची",
        bfiwhat: " शरीरातील चरबी म्हणजे काय ?",
        bfianswer: "बॉडी फॅट कॅल्क्युलेटर आपल्याला आपल्या शरीरातील चरबीची टक्केवारी शोधण्यात मदत करते, जीवन आणि पुनरुत्पादक कार्यासाठी शरीरातील आवश्यक चरबीची आवश्यकता असते. बाळंतपण आणि इतर हार्मोनल फंक्शन्सच्या मागण्यांमुळे स्त्रियांसाठी आवश्यक शरीराच्या चरबीची टक्केवारी पुरुषांपेक्षा जास्त आहे.",
        ybfc: 'आपला बीएफसी',
        bfce: "बीएफसी =",
        ideal: "दिलेल्या वय आणि लिंगासाठी आदर्श शरीर चरबी:",
        Calculate: "गणना करा",
        back: "मागे",
        share: "सामायिक करा"
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

function BFC(props) {

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
    const [lazyPop, showLazyPopup] = useState(false);

    const [healthyWeight, setHealthyWeight] = useState(null);


    function bmiFun(weight, height) {

        weight = parseFloat(weight);
        height = parseFloat(height);

        let bmi = weight / ((height / 100) ** 2);


        let cat = '';
        if (bmi < 18.5) {
            cat = { cat: 'Underweight', emo: '😒' };
        } else if (bmi < 25) {
            cat = { cat: 'Normal', emo: '😋' };
        } else if (bmi < 30) {
            cat = { cat: 'Overweight', emo: '😅' };
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

    const lazyPopup = () => {
        showLazyPopup(true);
    }



    // useEffect(() => {
    //     // //const { history } = props;
    //     // const history = createHistory();
    //     // //console.log('createHistory', history.listen);
    //     // //console.log('props.hist', props.history);
    //     // let currentPathname = props.history.location.pathname;
    //     // let currentSearch = props.history.location.search;
    //     // props.history.listen((newLocation, action) => {
    //     //     if (action === "PUSH") {
    //     //         if (
    //     //             newLocation.pathname !== currentPathname ||
    //     //             newLocation.search !== currentSearch
    //     //         ) {
    //     //             // Save new location
    //     //             currentPathname = newLocation.pathname;
    //     //             currentSearch = newLocation.search;

    //     //             // Clone location object and push it to history
    //     //             history.push({
    //     //                 pathname: newLocation.pathname,
    //     //                 search: newLocation.search
    //     //             });

    //     //             //props.setModal(false)


    //     //         }
    //     //     } else {

    //     //         //props.setModal(false)

    //     //         console.log('exe -->1');
    //     //         // Send user back if they try to navigate back
    //     //         history.go(1);
    //     //     }
    //     // })




    //     //window.history.pushState(null, document.title, window.location.href);

    //     window.addEventListener('beforeunload', function (e) {

    //         let myPageIsDirty = true;
    //         if (myPageIsDirty) {

    //             props.setModal(false)

    //             e.preventDefault();
    //             e.returnValue = ''

    //             //window.history.pushState(null, document.title, window.location.href);
    //             //following two lines will cause the browser to ask the user if they
    //             //want to leave. The text of this dialog is controlled by the browser.
    //             //   e.preventDefault(); //per the standard
    //             //   e.returnValue = ''; //required for Chrome
    //         }
    //         //else: user is allowed to leave without a warning dialog
    //     });

    //     window.addEventListener('popstate', function (event) {
    //         console.log('came -------------> ABCD');

    //     });

    // }, [])




    useEffect(() => {

        setHeight(localStorage.getItem('height') ? localStorage.getItem('height') : '');
        setWeight(localStorage.getItem('weight') ? localStorage.getItem('weight') : '');
        setAge(localStorage.getItem('age') ? localStorage.getItem('age') : '');

    }, []);

    let isDisableCalcBtn = age != '' && height != '' && weight != '' ? false : true
    if (mode == 'A') {
        isDisableCalcBtn = false
    }
    let percentage = (bfpResult / 40) * 100;

    function handleCalClick() {

        if (mode == 'A') {
            setMode('Q')
        }
        else {

            if (selectedGender.value != '') {


                localStorage.setItem('weight', weight)
                localStorage.setItem('height', height);
                localStorage.setItem('age', age);

                //console.log('selectedGender',selectedGender);

                let bmiRes = bmiFun(weight, height);

                let bfpResult = 0;
                console.log('bmiRes', bmiRes);
                if (selectedGender.value == 'male') {
                    bfpResult = 1.20 * bmiRes + 0.23 * age - 16.2
                }
                else if (selectedGender.value == 'female') {
                    bfpResult = 1.20 * bmiRes + 0.23 * age - 5.4
                }

                let returnFatObj = {}
                for (let i = 0; i < fatForAge.length; i++) {
                    if (Number.parseInt(fatForAge[i].age) >= Number.parseInt(age)) {
                        returnFatObj = fatForAge[i - 1];
                        if (returnFatObj == undefined) {
                            returnFatObj = fatForAge[0];
                        }
                        break
                    }
                }
                //fatForAge
                // console.log('fatForAge',fatForAge);
                // console.log('fatForAge',returnFatObj);

                setBFPResult(bfpResult)
                setReturnFatObj(returnFatObj)
                setMode('A')


                if (bfpResult < 8) {
                    setEmo('😒')
                } else if (bfpResult < 25) {
                    setEmo('😋')
                } else if (bfpResult < 30) {
                    setEmo('😅')
                } else {
                    setEmo('😱😡')
                }
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
                            {strings.bfcCalc}
                            {/* Body Fat Calculator */}
                        </div>
                        <img src={cross} alt='cross' className='cross-icon'
                            onClick={() => props.history.push('/')}
                        />


                        <div className='actual-cal'>
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
                                                <label for="male">{strings.Male}</label>

                                                <input
                                                    type="radio"
                                                    id="female"
                                                    name="gender"
                                                    value="female"
                                                    checked={selectedGender ? selectedGender.value === "female" : false}
                                                    onChange={onGenderChange}
                                                />
                                                <label for="female">{strings.Female}</label>

                                            </div>



                                            <label for="customerName">{strings.AGE} &nbsp;&nbsp;(20-55) <em>&#x2a;</em></label>
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
                                                {strings.HEIGHT} (Cm) [148 - 213]
                                <em>&#x2a;</em></label>
                                            <input id="height" name="height" required="" type="number"
                                                onChange={(e) => setHeight(e.target.value)}
                                                value={height}
                                            />

                                            <label for="customerPhone"> {strings.weight} (Kg)<em>&#x2a;</em></label>
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

                                    {/* <div className='q-container'>
                                        <ExpandCollapse
                                            type='faq'
                                            displayText={strings.bfiwhat}
                                            currentState={(currenState) => {
                                                setCalcBtn(!currenState)
                                            }}
                                        >
                                            <div className='answer'>
                                                {strings.bfianswer}                                                
                                            </div>
                                        </ExpandCollapse>
                                    </div> */}
                                    {showGenderErrorMessage && <div style={{ color: 'red', textAlign: 'center' }}> Please Select Gender </div>}

                                    {calcBtn && <div className={isDisableCalcBtn ? 'calulate disable' : 'calulate'}
                                        onClick={handleCalClick}
                                    //onClick={() => props.history.push('/home')}
                                    >
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

                                    <div className='bmi-result-container'>

                                        <div> {strings.ybfc} </div>

                                        <div> {strings.bfce} <span className='no-cal'> {bfpResult.toFixed(2)} % </span> </div>

                                        <div> {cat.emo} </div>

                                        <span className='bmi-img-container' >
                                            <img src={selectedGender.value == 'male' ? bfcMen : bfcWoomen} alt='bmi-image' />

                                            {bfpResult && bfpResult < 40 && <div className='up-weight-arrow' style={{ left: `${percentage - 11}%` }}>
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

                                        {/* <div>
                                <span> Fat mass (FM) formula: </span>
                                <span> {(bfpResult * weight).toFixed(2)} Kgs </span>
                            </div> */}

                                        <div style={{ marginTop: '20px' }}>
                                            <span> {strings.ideal}  </span>
                                            <span className='no-cal'> {selectedGender.value == 'male' ? returnFatObj.male : returnFatObj.female} % </span>
                                        </div>


                                        {/* {cat && (cat.cat == 'Overweight' || cat.cat == 'Obesity') ?
                                <div style={{ lineHeight: 1, marginBottom: '15px', fontSize: '21px', marginTop: '16px', marginBottom: '5px' }}> Lose  <span className='no-cal'> {lweight} Kgs</span>  to reach a BMI of <span className='no-cal'>25 Kg/m<sup>2</sup></span> </div>
                                : cat && cat.cat == 'Underweight' ?
                                    <div style={{ lineHeight: 1, fontSize: '21px', marginTop: '16px' }}> Gain {gweight} Kgs to reach a BMI of <span className='no-cal'> 18.5 Kg/m<sup>2</sup> </span>  </div> : null} */}

                                        {/* {cat && (cat.cat == 'Normal') ? <div style={{ marginBottom: '15px' }} > </div> : null} */}
                                        {/* {healthyWeight && <div style={{ lineHeight: 1, marginBottom: '15px', fontSize: '21px' }}> Healthy weight for your height: <span className='no-cal'> {healthyWeight[0]} Kgs - {healthyWeight[1]} Kgs  </span></div>}
                            <div style={{ lineHeight: 1, marginBottom: '15px', fontSize: '21px' }}> Healthy BMI range: <span className='no-cal'> 18.5 Kg/m2 - 25 Kg/m<sup>2</sup> </span> </div> */}

                                        <div className='flex-row btn-containers'>
                                            {calcBtn && <div className={isDisableCalcBtn ? 'calulate disable' : 'calulate'}
                                                onClick={handleCalClick}
                                            //onClick={() => props.history.push('/home')}
                                            >
                                                {mode == 'A' ? strings.back : strings.Calculate}
                                            </div>}

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

                                </motion.div>
                                }
                            </AnimatePresence>

                        </div>

                        <AnimatePresence>

                            {lazyPop && <Lazy showLazyPopup={(bool) => { showLazyPopup(bool) }} />}
                        </AnimatePresence>



                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

//export default ;
export default withRouter(BFC);

// Reducing Your Body Fat
// When it comes to losing weight, the key is to eat fewer calories than you expend. If you do this, AND exercise, you will lose body fat. Your body was designed to store fat so it would have reserves of energy during famine. When you take in fewer calories than you expend, during exercise and rest, your body burns these fat reserves. Be sensible, however—if you eat too few calories or cut out all carbohydrates, the weight you lose will likely be fluids and muscle, not fat. In this case the scale will go down, but your body fat percentage will go up, rendering you less healthy. The Academy of Nutrition and Dietetics recommends losing weight slowly—½ to 1 pound per week—and continue exercising to maximize fat loss and minimize muscle loss.


