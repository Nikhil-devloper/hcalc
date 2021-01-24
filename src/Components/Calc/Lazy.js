import React from 'react';
import { motion } from 'framer-motion';

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


function Lazy(props) {
    return (
        <motion.div className="backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <motion.div
                className={"modal center-mid"}
                //type.name == 'SEC' ? "modal bmr-parent" : 
                variants={modal}
            >
                <div>


                    Please Take Screenshot. Developer is  too lazy to implement this feature.
                                    <div>
                        😅
                                    </div>


                    {
                        <div
                            style={{ marginTop: '20px' }}
                            className={'calulate'}
                            onClick={() => props.showLazyPopup(false)}
                        >
                            Close
                                        </div>
                    }

                </div>


            </motion.div>
        </motion.div>
    )
}

export default Lazy
