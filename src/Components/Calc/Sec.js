import React, { useContext } from 'react';
import './GOW.css';
import { PageContext } from '../../PageContextProvider';
import LocalizedStrings from 'react-localization';
import ExpandCollapse from '../ExpandCollapse/ExpandCollapse.jsx';
import './sec.css'
import calsurplus from '../../images/Untitled Design_0.jpg';
import caldef from '../../images/Untitled Design_1.jpg';
import { withRouter } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import cross from '../../images/cross.png';

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
        stips: "Some Tips",
        lw: 'How to Lose Weight?',
        l1: "An effective way to lose weight is a calorie deficit.",
        l2: "Now, What is a calorie deficit? what is a calorie?",
        l3: "Calorie: it's a way of describing how much energy your body could get from eating or drinking it",
        l4: "One person's daily Calorie requirement is different from another person's. you can calculate your requirement in the same app by clicking here.",
        l5: "Ok, But How it is beneficial for me to weight loss?",
        l6: "Answer is",
        l7: "calorie deficit",
        l8: "Suppose tina is a 24-year girl based on her activity intensity daily Energy requirement is 2500 calories. so just by daily consuming 500 calories less than the required calories you can have great beneficial how? your body will try to consume this needed 500 calories from your fat. resulting in fat loss.",
        l9: "A calorie deficit of 500 calories per day is effective for healthy and sustainable weight loss. Don't try to go below 500 calories otherwise, you might end up doing  more harm than good",
        g1: "How to Gain Weight?",
        g2: "A calorie surplus involves consuming more calories than you burn, which can lead to weight gain in the form of muscle or fat. It is totally oposotie of calorie deficit.",
        g31: "One persone's daily Calorie requirement from another person. you can calculate your requirement in same app by clicking here.",
        g32: "Ok But How it is beneficial for me to weight gain ? Answer is",
        g4: "Calorie Surplus.",
        g5: "Suppose Ankit is a 24-year boy based on his activity intensity daily Energy requirement is 2500 calories. so just by daily adding +500 calories greater than the required calories you can have great beneficial how? your body will try to store these extra 500 calories in the form of muscle or fat or both.",
        c1: "Why is BMI not the best indicator of Overfat?",
        c2: "BMI is controversial because it doesn't actually take the amount of a person's body fat into account, just their total body weight and their height. This means that short, heavily muscled people can be classified as obese.",
        main: "Maintainance Calorie",
        whatbmi: "What is BMI Calculator ?",
        bmiAnswer: "The BMI is a convenient rule of thumb used to broadly categorize a person as underweight, normal weight, overweight, or obese based on tissue mass (muscle, fat, and bone) and height. Commonly accepted BMI ranges are underweight (under 18.5 kg/m2), normal weight (18.5 to 25), overweight (25 to 30), and obese (over 30)",
        bfiwhat: "What is Body Fat Calculator ?",
        bfianswer: "Body Fat Calculator helps you to find out your body fat percentage, body fat includes essential body fat and storage body fat. Essential body fat is needed for life and reproductive functions. The percentage of essential body fat for women is greater than that for men, due to the demands of childbearing and other hormonal functions.",
        protwhat: "What is Protein?",
        protanswer: "Proteins are large, complex molecules that play many critical roles in the body. They do most of the work in cells and are required for the structure, function, and regulation of the body’s tissues and organs.",
        how: "How to Use this app ?",
        howanswer: "First Suggesion is to check your BMI as it tell's you your weight is in healthy range or not. you can check your here."
    },
    marathi: {
        stips: "काही युक्त्या",
        lw: 'वजन कमी कसे करावे?',
        l1: "वजन कमी करण्याचा एक प्रभावी मार्ग म्हणजे कॅलरीची कमतरता.",
        l2: "आता, कॅलरीची कमतरता काय आहे? कॅलरी म्हणजे काय?",
        l3: "कॅलोरीः हे खाण्यापिण्यात किंवा पिण्यामुळे आपल्या शरीराला किती उर्जा मिळू शकते याचे वर्णन करण्याचा हा एक मार्ग आहे",
        l4: "एका व्यक्तीची दैनंदिन कॅलरीची आवश्यकता दुसर्‍या व्यक्तीपेक्षा वेगळी असते. आपण येथे क्लिक करुन आपल्या आवश्यकतेची गणना त्याच अ‍ॅपमध्ये करू शकता.",
        l5: "ठीक आहे, हे माझ्यासाठी फायदेशीर कसे आहे?",
        l6: "उत्तर आहे",
        l7: "कॅलरीची कमतरता",
        l8: "समजा टीना ही 24 वर्षाची मुलगी आहे जी तिच्या क्रियाकलाप तीव्रतेच्या आधारावर दररोज उर्जा आवश्यकता 2500 आहे.  दररोज आवश्यक कॅलरीजपेक्षा 500 कॅलरीज कमी घेतल्यास आपल्यास फायदा होतो. आपले शरीर राहिलेली 500 कॅलरी चरबीपासून घेन्याचा प्रयत्न करेल. परिणामी चरबी कमी होते.",
        l9: "दररोज 500 कॅलरीची तूट निरोगी आणि टिकाऊ वजन कमी करण्यासाठी प्रभावी आहे. अन्यथा 500 कॅलरीपेक्षा खाली जाण्याचा प्रयत्न करू नका, कदाचित हे आपल्यसाथी अधिक नुकसान दायक थरू शकेल",
        g1: "वजन कसे वाढवायचे?",
        g2: "उष्मांक अधिशेष: गरजे पेक्षा जास्त कॅलरी वापरणे, ज्यामुळे स्नायू किंवा चरबीचे वजन वाढू शकते. हे कॅलरीच्या कमतरतेच्या विरूद्ध आहे.",
        g31: "एका व्यक्तीची दैनंदिन कॅलरीची आवश्यकता दुसर्‍या व्यक्तीपेक्षा वेगळी असते. आपण येथे क्लिक करुन आपल्या आवश्यकतेची गणना त्याच अ‍ॅपमध्ये करू शकता.",
        g32: " ठीक आहे. परंतु हे माझ्यासाठी कसे फायदेशीर आहे? उत्तर आहे",
        g4: "कॅलरी अधिशेष",
        g5: "समजा अंकित हा 24 वर्षांचा मुलगा आहे त्याच्या दैनिक क्रियाकलाप तीव्रतेवर आधारित ऊर्जा आवश्यकतेनुसार 2500 कॅलरीज आहेत. तर फक्त आवश्यक कॅलरीपेक्षा दररोज +200 जास्त कॅलरी जोडून दररोज व्यायामासह आपल्यास हे फायदेशीर ठरेल. आपले शरीर हे अतिरिक्त 200 कॅलरी स्नायू किंवा चरबी किंवा दोन्ही स्वरूपात संचयित करण्याचा प्रयत्न करेल.",
        c1: "बीएमआय अतिलठपन्नाचा सर्वोत्तम निर्देशक का नाही?",
        c2: "बीएमआय वादग्रस्त आहे कारण एखाद्या व्यक्तीच्या शरीराच्या चरबीचे प्रमाण प्रत्यक्षात घेत नाही, फक्त त्यांचे एकूण शरीर वजन आणि उंची. याचा अर्थ असा की लहान, जोरदार स्नायू असलेल्या लोकांना लठ्ठपणा म्हणून वर्गीकृत केले जाऊ शकते.",
        main: "एकूण दैनंदिन उर्जा खर्च",
        whatbmi: "बीएमआय कॅल्क्युलेटर म्हणजे काय ?",
        bmiAnswer: "बीएमआय हा एक थंब हा एक सोयीचा नियम आहे जो एखाद्या व्यक्तीचे वजन कमी, सामान्य वजन, जास्त वजन किंवा ऊतकांच्या मास (स्नायू, चरबी आणि हाडे) आणि उंचीवर आधारित लठ्ठपणाचे विस्तृतपणे वर्गीकरण करण्यासाठी वापरला जातो. सामान्यपणे स्वीकारल्या गेलेल्या बीएमआय श्रेणींचे वजन कमी (18.5 किलो / एम 2 पेक्षा कमी), सामान्य वजन (18.5 ते 25), जादा वजन (25 ते 30) आणि लठ्ठपणा (30 पेक्षा जास्त) आहे.",
        bfiwhat: " शरीरातील चरबी म्हणजे काय ?",
        bfianswer: "बॉडी फॅट कॅल्क्युलेटर आपल्याला आपल्या शरीरातील चरबीची टक्केवारी शोधण्यात मदत करते, जीवन आणि पुनरुत्पादक कार्यासाठी शरीरातील आवश्यक चरबीची आवश्यकता असते. बाळंतपण आणि इतर हार्मोनल फंक्शन्सच्या मागण्यांमुळे स्त्रियांसाठी आवश्यक शरीराच्या चरबीची टक्केवारी पुरुषांपेक्षा जास्त आहे.",
        protwhat: " प्रथिने म्हणजे काय ?",
        protanswer: "प्रोटीन हे एक मोठे, जटिल रेणू आहेत जे शरीरात बरीच गंभीर भूमिका बजावतात. ते पेशींमध्ये बहुतेक काम करतात आणि शरीराच्या ऊती आणि अवयवांच्या रचना, कार्य आणि नियमन आवश्यक असतात.",
        how: "हा अ‍ॅप कसा वापरायचा?",
        howanswer: "पहिली सूचना तुमची बीएमआय तपासणे म्हणजे ती सांगते की तुमचे वजन निरोगी आहे की नाही. आपण आपले येथे तपासू शकता"            
    }
});



function GOW(props) {

    //strings.setLanguage('marathi')

    const { language } = useContext(PageContext);
    strings.setLanguage(language);

    /*
     Image Source: https://in.pinterest.com/pin/199565827226879673/
    */

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
                    <div className='GOW-main-container sec'>

                        <img src={cross} alt='cross' className='cross-icon  extra-icon'
                            onClick={() => {
                                console.log('props --> ', props);
                                //props.setModal(false)
                                //props.history.push('/')
                                props.history.push('/home')
                            }
                            }
                        />

                        <section>
                            <h1>

                                {strings.stips}
                                {/* Glass of Water you should Drink */}
                            </h1>


                            <ExpandCollapse
                                type='faq'
                                displayText={strings.how}
                                currentState={(currenState) => {
                                    //setCalcBtn(!currenState)
                                }}
                            >
                                <div className='answer'>
                                    <div>
                                        {strings.howanswer}                                        
                                        <span style={{ border: '1px solid black', color: 'yellow' }} onClick={() => props.history.push('/BMI')}>
                                            {' BMI'}
                                        </span>
                                    </div>





                                </div>
                            </ExpandCollapse>



                            <ExpandCollapse
                                type='faq'
                                displayText={strings.lw}
                                currentState={(currenState) => {
                                    //setCalcBtn(!currenState)
                                }}
                            >
                                <div className='answer'>
                                    {/* Protein is present in every body cell, and an adequate protein intake is important for keeping the muscles, bones, and tissues healthy. */}
                                    {strings.protOne}
                                    <div style={{ marginTop: '10px' }}>
                                        {/* Protein plays a role in many bodily processes, including: */}
                                        {strings.l1}
                                        <br />
                                        <div>
                                            {strings.l2}
                                        </div>

                                        <div>
                                            {strings.l3}

                                        </div>

                                        {strings.l4}

                                        <span style={{ border: '1px solid black', color: 'yellow' }} onClick={() => props.history.push('/BMR')}>
                                            {strings.main}
                                        </span>

                                        <div>

                                            {strings.l5}

                                        </div>


                                        {strings.l6}  <b> {strings.l7} </b>

                                        <div style={{ marginTop: '5px' }}>

                                            {strings.l8}

                                        </div>

                                        <div>

                                        </div>

                                        {strings.l9}

                                        <div className='cal-img'>
                                            <img height={'250px'} width={'300px'} src={caldef} alt='surplus' />
                                        </div>
                                    </div>



                                </div>
                            </ExpandCollapse>


                            <ExpandCollapse
                                type='faq'
                                displayText={strings.g1}
                                currentState={(currenState) => {
                                    //setCalcBtn(!currenState)
                                }}
                            >
                                <div className='answer'>
                                    {/* Protein is present in every body cell, and an adequate protein intake is important for keeping the muscles, bones, and tissues healthy. */}
                                    {strings.protOne}
                                    <div style={{ marginTop: '10px' }}>
                                        {/* Protein plays a role in many bodily processes, including: */}
                                        {strings.g2}



                                        <div>
                                            {strings.g31}

                                            <span style={{ border: '1px solid black', color: 'yellow' }} onClick={() => props.history.push('/BMR')}>
                                                {strings.main}
                                            </span>


                                            <div> {strings.g32} </div>

                                            <b> {strings.g4} </b>

                                            <div>
                                                {strings.g5}
                                            </div>

                                        </div>

                                        <div>

                                        </div>

                                        <div className='cal-img'>
                                            <img height={'250px'} width={'300px'} src={calsurplus} alt='surplus' />
                                        </div>



                                    </div>
                                </div>
                            </ExpandCollapse>

                            <div className='q-container'>
                                <ExpandCollapse
                                    type='faq'
                                    // /
                                    displayText={strings.whatbmi}
                                    //displayText={'What is BMI Calculator ?'}
                                    currentState={(currenState) => {
                                        //setCalcBtn(!currenState)
                                    }}
                                >
                                    <div className='answer'>
                                        {strings.bmiAnswer}
                                    </div>
                                </ExpandCollapse>
                            </div>

                            <ExpandCollapse
                                type='faq'
                                displayText={strings.c1}
                                currentState={(currenState) => {
                                    //setCalcBtn(!currenState)
                                }}
                            >
                                <div className='answer margindown'>
                                    {/* Protein is present in every body cell, and an adequate protein intake is important for keeping the muscles, bones, and tissues healthy. */}
                                    {strings.c2}

                                    <div style={{ marginTop: '10px' }}>
                                        {/* Protein plays a role in many bodily processes, including: */}
                                    </div>
                                </div>
                            </ExpandCollapse>


                            <div className='q-container'>
                                <ExpandCollapse
                                    type='faq'
                                    displayText={strings.bfiwhat}
                                    currentState={(currenState) => {
                                        //setCalcBtn(!currenState)
                                    }}
                                >
                                    <div className='answer'>
                                        {strings.bfianswer}
                                    </div>
                                </ExpandCollapse>
                            </div>

                            <div className='q-container'>
                                <ExpandCollapse
                                    type='faq'
                                    displayText={strings.protwhat}
                                    currentState={(currenState) => {
                                        //setCalcBtn(!currenState)
                                    }}
                                >
                                    <div className='answer'>
                                        {strings.protanswer}
                                    </div>
                                </ExpandCollapse>
                            </div>




                        </section>



                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default withRouter(GOW); 
