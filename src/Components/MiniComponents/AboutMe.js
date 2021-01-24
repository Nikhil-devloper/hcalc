import React,{useContext} from 'react';
import './AboutMe.css';

import LocalizedStrings from 'react-localization';
import { PageContext } from '../../PageContextProvider';

let strings = new LocalizedStrings({
    en: {
        aboutme: "About Me:",
        desc: "Hello, My name is Nikhil D. Patil, I am web devloper. I love to build products which add some value to other peoples life.",
        bugs: "In case of any Bug's/Feedback catch me at.",
        name: "Nikhil Patil (Insta)",
        close: 'Close'
    },
    marathi: {
        aboutme: "माझ्याबद्दल: ",
        desc: "नमस्कार, माझे नाव निखिल डी. पाटील आहे, मी वेब डेव्हलपर आहे. मला अशी उत्पादने तयार करण्यास आवडतात जे इतर लोकांच्या जीवनाला काही किंमत देतात.",
        bugs: "कोणत्याही प्रतिक्रिया असल्यास मला येथे कळवा.",
        name: "निखिल पाटील (इंस्टा)",
        close: 'बंद'
    }
});

function AboutMe(props) {

    const { user, language, setLanguage } = useContext(PageContext);
    strings.setLanguage(language);

    return (
        <div className='formula-container about-me'>
            <div className='about-me'>
                <h1> {strings.aboutme}  </h1>
            </div>
            <br />
            <div className='my-desc'>
                {strings.desc}
                {/* Hello, My name is Nikhil D. Patil, I am web devloper.
                I love to build products which add some value to other peoples life. */}

                <br />
                <div className='feedback'>
                    {strings.bugs}


                    {/* In case of any Bug's/Feedback catch me at. */}
                </div>


                <br />

                <div className='my-link'>
                    <a target="_blank" href='https://www.instagram.com/nikhil.patil.647'>  {strings.name} </a>
                </div>



            </div>


            <div
                //style={{ height: '40px', width: '40px', background: 'red' }}
                className='close-btn'

                onClick={() => props.setModal(false)}
            >
                {strings.close}

            </div>

        </div>
    )
}

export default AboutMe
