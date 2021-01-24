import React, { useContext } from 'react';
import './Language.css';
import { PageContext } from '../../PageContextProvider';


function Language(props) {


    const { language, setLanguage } = useContext(PageContext);

    return (
        <div className='formula-container lang-wrapper'>

            <div>
                <div className='sel-lang'> Select Language: </div>
                <div>

                    <ul className='lang marathi'>
                        <li onClick={() => {
                            setLanguage('marathi');
                            props.setModal(false)
                        }} >
                            मराठी {language == 'marathi' && <span> (निवडलेले) </span>}
                        </li>

                        <li onClick={() => {
                            setLanguage('en');
                            props.setModal(false)
                        }} className='lang english'>
                            English {language == 'en' && <span> (Selected) </span>}
                        </li>
                    </ul>
                </div>

                <div
                    //style={{ height: '40px', width: '40px', background: 'red' }}
                    className='close-btn'

                    onClick={() => props.setModal(false)}
                >
                    Close
            </div>

            </div>

        </div>
    )
}

export default Language;
