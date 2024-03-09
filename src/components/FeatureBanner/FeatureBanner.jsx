import React from 'react';
import './FeatureBanner.css'

const FeatureBanner = (props) => {
    const leftAlignCode = <div className='row align-items-center bg-light bg-gradient feature-banner left'>
                            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1'></div>
                            <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3'>
                                <img src={props.image} alt="Safe" style={{height: 160}}/>
                            </div>
                            <div className='col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 col-xxl-7'>
                                <h3>{props.words[0]}<b>{props.words[1]}</b>{props.words[2]}</h3>
                            </div>
                            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1'></div>
                        </div>
    const rightAlignCode = <div className='row align-items-center bg-light bg-gradient feature-banner right'>
                                <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1'></div>
                                <div className='col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 col-xxl-7 px-5'>
                                    <h3>{props.words[0]}<b>{props.words[1]}</b>{props.words[2]}</h3>
                                </div>
                                <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3'>
                                    <img src={props.image} alt="Safe" style={{height: 160}}/>
                                </div>
                                <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 col-xxl-1'></div>
                            </div>

    let renderCode;

    if(props.fromLeft)
        renderCode = leftAlignCode;
    else
        renderCode = rightAlignCode;

    return (
        <div className='container-fluid f-banner d-flex align-items-center'>
            {renderCode}
        </div>
    )
}

export default FeatureBanner
