import React, { useContext } from 'react'
import './Formula.css';
import LocalizedStrings from 'react-localization';
import { PageContext } from '../../PageContextProvider';

let strings = new LocalizedStrings({
    en: {
        formula: "Formula's",
        bmiformula: "BMI Formula:    weight / ((height / 100) x 2)",
        source: "source:",
        bfpformula: "BFP Formula:",
        women: "Women: (1.20 x BMI) + (0.23 x Age) - 5.4",
        men: "Men: (1.20 x BMI) + (0.23 x Age) - 16.2",
        bmrformula: "BMR Formula:",
        bmrmen: "Men: 66.5 + (13.75 × W) + (5.003 × H) – (6.755 × A)",
        bmrwomen: "Women: 665.1 + (9.563 × W) + (1.850 × H) – (4.676 × A )",
        close: 'Close'
    },
    marathi: {
        formula: "सुत्र:",
        bmiformula: "बीएमआय सुत्र:     वजन / ((उंची / 100) x 2)",
        source: "स्रोत:",
        bfpformula: "बीएफपी सुत्र:",
        women: "महिलाः (1.20 x बीएमआय) + (0.23 x वय) - 5.4",
        men: "पुरुषः (1.20 x बीएमआय) + (0.23 x वय) - 16.2",
        bmrformula: "बीएमआर सूत्र:",
        bmrmen: "पुरुषः  66.5 + (13.75 × वजन + (5.003 × उंची) – (6.755 × वय)",
        bmrwomen: "महिलाः 665.1 + (9.563 × weight in kg) + (1.850 × height in cm) – (4.676 × age in years)",
        close: 'बंद'
    }
});

function Formula(props) {

    const { user, language, setLanguage } = useContext(PageContext);
    strings.setLanguage(language);

    return (
        <div className='formula-container'>

            <h1>
                {/* Formula: */}
                {strings.formula}
            </h1>

            <div className='form-div-parent'>

                <div className='formula-1'>
                    {strings.bmiformula}
                    {/* BMI Formula: weight / ((height / 100) x 2) */}
                </div>

                <div className='form-src'>
                    <span> Source: </span> <span style={{ marginRight: '10px' }}> https://en.wikipedia.org/wiki/Body_mass_index </span>
                </div>

            </div>

            <div className='form-div-parent'>

                <div>
                    {strings.bfpformula}
                    {/* BFP Formula: */}
                </div>

                <div className='formula-1'>
                    {strings.women}
                    {/* Women: (1.20 x BMI) + (0.23 x Age) - 5.4 */}
                </div>

                <div className='formula-1'>
                    {strings.men}
                    {/* Men: (1.20 x BMI) + (0.23 x Age) - 16.2 */}
                </div>

                <div className='form-src'>
                    <span> Source: </span> https://www.gaiam.com/blogs/discover/how-to-calculate-your-ideal-body-fat-percentage
                </div>


                <div>
                    {strings.bmrformula}
                    {/* BFP Formula: */}
                </div>

                <div className='formula-1'>
                    {strings.bmrwomen}
                    {/* Women: (1.20 x BMI) + (0.23 x Age) - 5.4 */}
                </div>

                <div className='formula-1'>
                    {strings.bmrmen}
                    {/* Men: (1.20 x BMI) + (0.23 x Age) - 16.2 */}
                </div>

                <div className='form-src'>
                    <span> Source: </span> https://www.youtube.com/watch?v=8jhUU2YKX58
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


        </div>
    )
}

export default Formula
