import React from 'react';
import './LandingPage.css'
import LandingNav from '../LandingNav/LandingNav';
import EastIcon from '@mui/icons-material/East';
import FeatureBanner from '../FeatureBanner/FeatureBanner';
import AboutUs from '../AboutUs/AboutUs';
import Services from '../Services/Services';
import CustomerCare from '../CustomerCare/CustomerCare';
import Footer from '../Footer/Footer';

const LandingPage = () => {

  const featureBannerWordsOne = ["At our Ayoola, safeguarding your ", "privacy and security ", " is paramount."];
  const featureBannerWordsTwo = ["Say goodbye to tedious manual tracking and hello to ", "Streamlined efficiency.", ""];
  const featureBannerWordsThree = ["Designed with ", "Usability at its core. ", "We understand the importance of simplicity."];

  return (
    <div>
      <LandingNav />
      <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
        <div className="row banner d-flex align-items-center">
            <div className="static-img"></div>
            <div className="overlay"></div>
            <div className="col static-text px-5">
              <h1 className='d-block' style={{lineHeight:1.5}}>Experience the convenience of centralizing & streamlining <br/>
                  your <b className='fs-lr'>financial management.</b> <br/>
                  Get started by Signing up
              </h1>
              <a className="nav-link" href="/signup">
                <button className='btn btn-primary exp-btn-primary'>Register and check out <EastIcon /></button>
              </a>
            </div>
        </div>
        <div className='row justify-content-center align-items-center feature-title'>
          <h2>Why Ayoola</h2>
        </div>
        <FeatureBanner words={featureBannerWordsOne} image={"safepanel1.png"} fromLeft={true}/>
        <div className='height-gap'></div>
        <FeatureBanner words={featureBannerWordsTwo} image={"safepanel2.png"} fromLeft={false}/>
        <div className='height-gap'></div>
        <FeatureBanner words={featureBannerWordsThree} image={"safepanel3.png"} fromLeft={true}/>
        <AboutUs /> 
        <Services />
        <CustomerCare />
        <Footer />
      </div>     
    </div>
  )
}

export default LandingPage
