import React from 'react'
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "motion/react"
import { useState } from 'react';
import { CiHospital1 } from "react-icons/ci";
import { RiParentFill } from "react-icons/ri";


const Navbar = () => {

const [showPanet,setPanel] = useState(false)

 const HoverCard = () =>{
    
    return(
      <div className='fixed'>
        
        {
            showPanet ?  <motion.div initial={{ opacity: 0, y: -40 }}            // Start below, invisible
      animate={{ opacity: 1, y: 0 }}    
        transition={{
            duration:0.4  ,
        }} 
        className=' absolute top-20  w-[200px] h-[150px] ml-170 z-50 rounded-[15px] bg-[#ffffff] text-black flex flex-col justify-center items-center  gap-5 p-5'>
            
            <motion.div className='w-full flex gap-1 '>
                <RiParentFill  className=' text-2xl text-[#908DD5] '/> For  Parents
            </motion.div>
            <div className='w-full flex gap-1 '>
                <CiHospital1 className=' text-2xl  text-[#908DD5] '/> For  Parents
            </div>
        </motion.div>:null
        }
      </div>
    )
 }
    return (
       <div>
        <HoverCard/>
         <div className='w-full flex  bg-[#E0EAFF] md:justify-between justify-between'>
            
            <div className=''>
                 <img src="/02logo.png" alt="" className='w-55 h-17' />
            </div>
            <div className='md:flex md:gap-10 p-5 md:mr-30 text-[#1057EC] hidden '>
                 <Link to={"/"} onMouseEnter={()=>setPanel(true)} onMouseLeave={()=>setPanel(false)} className=' relative flex justify-center items-center gap-2 hover:bg-[#4c3fb18a]  hover:text-white py-2 px-2 transition rounded-2xl'>
                    Home  <motion.span whileHover={{
                        y:5
                    }}  
                    transition={{
                        ease:"anticipate"
                    }}
                    w
                    >
                        <IoIosArrowDown className='text-xl'/>
                    </motion.span>
                 </Link>
                 <Link to={""} onMouseEnter={()=>setPanel(true)} onMouseLeave={()=>setPanel(false)} className='flex justify-center items-center gap-2 hover:bg-[#4c3fb18a]  hover:text-white py-2 px-2 transition rounded-2xl' >
                    About <motion.span whileHover={{
                        y:5
                    }}  
                    transition={{
                        ease:"anticipate"
                    }}
                    >
                        <IoIosArrowDown className='text-xl'/>
                    </motion.span>
                    
                 </Link>
                 <Link to={""} onMouseEnter={()=>setPanel(true)} onMouseLeave={()=>setPanel(false)} className='flex justify-center items-center gap-2 hover:bg-[#4c3fb18a]  hover:text-white py-2 px-2 transition rounded-2xl'>
                    Contact  <motion.span whileHover={{
                        y:5
                    }}  
                    transition={{
                        ease:"anticipate"
                    }}
                    >
                        <IoIosArrowDown className='text-xl'/>
                    </motion.span>
                 </Link>
                 <Link to={""}onMouseEnter={()=>setPanel(true)} onMouseLeave={()=>setPanel(false)} className='flex justify-center items-center gap-2 hover:bg-[#4c3fb18a]  hover:text-white py-2 px-2 transition rounded-2xl'>
                        Service  <motion.span whileHover={{
                        y:5
                    }}  
                    transition={{
                        ease:"anticipate"
                    }}
                    >
                        <IoIosArrowDown className='text-xl'/>
                    </motion.span>
                 </Link>
            </div>
          <div className='md:hidden flex justify-center items-center p-3'>
             <FaBars className='text-2xl text-[#1057EC]'/>
          </div>
        </div>
       </div>
    )
}

export default Navbar
