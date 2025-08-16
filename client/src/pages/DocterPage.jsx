import React from 'react'

import DocterHroSection from '../components/DocterHroSection';
import HowTOcreateWrokSpace from '../components/DesignDocterPage/HowTOcreateWrokSpace';
import DocterService from '../components/DesignDocterPage/DocterService';
const DocterPage = () => {
    return (
       <div>
        <DocterHroSection/>
         <DocterService/>
        <HowTOcreateWrokSpace/>
       
       </div>
    )
}

export default DocterPage
