import React from 'react';
import './ExpandCollapse.css';
import ardown from '../../images/arrow-down-transp.png'

export default class ExpandCollapse extends React.Component {

    state = {
        openState: false
    }

    handleClick = () => {
        this.setState({ openState: !this.state.openState },() => {
            this.props.currentState(this.state.openState);
        });
        
    }

    render() {
        let type = this.props.type;
        return (
            <div className={this.props.parentClass ? this.props.parentClass : ''}>
                <div className={type === 'travellers' ? 'ard-expand-collapse travellers' : 'ard-expand-collapse paxconfig'}>
                    <div onClick={this.handleClick} className={type === 'travellers' ? 'ard-expcol-label travel' : 'ard-expcol-label pax'}>
                        {
                            type === 'travellers' &&
                            <div className='ard-collapse-text travller-type'>
                                <span className='ard-displayText'> {this.props.displayText} </span> {this.props.noOfTraveller ? <span className='ard-no-of-traveller'>{this.props.noOfTraveller} </span> : null}
                            </div>
                        }
                        {
                            type === 'paxconfig' &&
                            <div className='ard-collapse-text pax-type'>
                                Room {this.props.roomNo}
                                {this.props.roomType && <span className='ard-collapse-room-type'> {this.props.roomType} </span>}
                            </div>
                        }
                        {
                            type == "faq" &&
                            <div className='ard-collapse-text pax-type'>
                                {this.props.displayText}
                            </div>
                        }
                        <span className='ard-arrow-icon'>
                            <img src={ardown} alt='arrow' />
                        </span>
                    </div>
                    {this.state.openState ? <div className='collpase-body'>
                        {this.props.children}
                    </div> : null}

                </div>
            </div>
        )
    }
};
