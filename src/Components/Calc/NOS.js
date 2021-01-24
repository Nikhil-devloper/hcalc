import React, { useContext } from 'react'
import './NOS.css';
import { PageContext } from '../../PageContextProvider';
import LocalizedStrings from 'react-localization';
import { withRouter } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';


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
        steps: "No Of Steps You should Take",
        eightthousand: "Taking 8,000 steps a day is a basic requirement for optimal health, like drinking adequate amounts of water each day.",
        twelvelThousand: "If you are looking for weight loss walking 10,000 to 12,000 steps is good number.",
        close: "close"
    },
    marathi: {
        steps: "आपण किती पावले उचलावीत याची संख्या",
        eightthousand: "दिवसातून 8,000 पावले घेणे इष्टतम आरोग्यासाठी मूलभूत आवश्यकता आहे, जसे दररोज पुरेसे पाणी पिणे.",
        twelvelThousand: "आपण वजन कमी करण्याचा विचार करीत असल्यास 10,000 ते 12,000 पायर्या चालणे चांगले आहे.",
        close: "बंद"
    }
});


function NOS(props) {

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
                    <div className='NOS-main-container'>

                        <section>
                            <h1>
                                {strings.steps}
                                {/* No Of Steps You should Take. */}
                            </h1>

                            <div className='NOS-white-text'>
                                <div className='par1'>
                                    {strings.eightthousand}
                                    {/* Taking 8,000 steps a day is a basic requirement for optimal health, like drinking adequate amounts of water each day. */}
                                </div>

                                <div className='par2'>
                                    {strings.twelvelThousand}
                                    {/* If you are looking for weight loss walking 10,000 to 12,000 steps is good number. */}

                                </div>
                            </div>



                        </section>

                        <div
                            //style={{ height: '40px', width: '40px', background: 'red' }}
                            className='close-btn'

                            onClick={
                                () => props.history.push('/')
                            }
                        >
                            Close
        </div>
                    </div >
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default withRouter(NOS)
