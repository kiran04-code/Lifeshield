import React from 'react'
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "motion/react"
import { useState } from 'react';
import { CiHospital1 } from "react-icons/ci";
import { RiParentFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [opne, isopne] = useState(false)
    const [showPanet, setPanel] = useState(false)
    const [driop1, setfirsdrop] = useState(false)
    const [driop2, setfirsdrop2] = useState(false)
    const [driop3, setfirsdrop3] = useState(false)
    const [driop4, setfirsdrop4] = useState(false)
    const naviaget = useNavigate()
    const HoverCard = () => {

        return (
            <div className='fixed'>

                {
                    showPanet ? <motion.div initial={{ opacity: 0, y: -40 }}            // Start below, invisible
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                        }}
                        className=' absolute top-20 left-95 w-[200px] h-[150px] ml-170 z-50 rounded-[15px] bg-[#ffffff] text-black flex flex-col justify-center items-center  gap-5 p-5'>

                        <motion.div onClick={()=>{naviaget("/parent");setPanel(false)}}   className='w-full flex gap-4 justify-center items-center hover:bg-[#d2e1ff] transition py-2 rounded-xl cursor-pointer '>
                            <RiParentFill className=' text-3xl bg-[#dad9f8] text-[#1057EC] p-1 rounded-[5px] ' /> For  Parents
                        </motion.div>
                        <div   onClick={()=>{naviaget("/docter");setPanel(false)}}  className='w-full flex gap-4 justify-center items-center hover:bg-[#d2e1ff] transition py-2 rounded-xl cursor-pointer '>
                            <CiHospital1 className=' text-3xl bg-[#dad9f8] text-[#1057EC] p-1 rounded-[5px] '
                            /> For  Hospital
                        </div>
                    </motion.div> : null
                }
            </div>
        )
    }
    return (
        <div>
            <HoverCard />
            <div className='w-full flex relative bg-[#E0EAFF] md:justify-between justify-between'>

                <div className=''>

                    <img src="/02logo.png" alt="" className='w-55 h-17 cursor-pointer' onClick={()=>naviaget("/")}/>
                </div>
                <div className='md:flex md:gap-10 p-5 md:mr-30 text-[#1057EC] hidden '>
                    <Link to={"/"} onMouseEnter={()=>setPanel(false)}  className='  flex justify-center items-center gap-2 hover:bg-[#1057EC]  hover:text-white py-2 px-2 transition rounded-2xl'>
                        Home  <motion.span whileHover={{
                            y: 5
                        }}
                            transition={{
                                ease: "anticipate"
                            }}
                            w
                        >
                            <IoIosArrowDown className='text-xl' />
                        </motion.span>
                    </Link>
                    <Link to={"#aboute"} onMouseEnter={() => setPanel(false)} onClick={{}} className='flex justify-center items-center gap-2 hover:bg-[#4c3fb18a]  hover:text-white py-2 px-2 transition rounded-2xl' >
                        About <motion.span whileHover={{
                            y: 5
                        }}
                            transition={{
                                ease: "anticipate"
                            }}
                        >
                            <IoIosArrowDown className='text-xl' />
                        </motion.span>

                    </Link>
                    <Link to={""} onMouseEnter={() => setPanel(false)}className='flex justify-center items-center gap-2 hover:bg-[#4c3fb18a]  hover:text-white py-2 px-2 transition rounded-2xl'>
                        Contact  <motion.span whileHover={{
                            y: 5
                        }}
                            transition={{
                                ease: "anticipate"
                            }}
                        >
                            <IoIosArrowDown className='text-xl' />
                        </motion.span>
                    </Link>
                    <Link  onClick={()=>setPanel(!showPanet)}  className=' relative flex justify-center items-center gap-2 hover:bg-[#4c3fb18a]  hover:text-white py-2 px-2 transition rounded-2xl'>
                        Service  <motion.span whileHover={{
                            y: 5
                        }}
                            transition={{
                                ease: "anticipate"
                            }}
                        >
                            <IoIosArrowDown className='text-xl' />
                        </motion.span>
                    </Link>
                </div>
                <div className='md:hidden flex justify-center items-center p-3'>
                    <FaBars onClick={() => isopne(!opne)} className={` ${opne ? "bg-[#4575dbcc] text-white" : null}  rounded-sm transition  p-1  text-4xl  text-[#1057EC] `} />
                </div>

            </div>
            {
                opne ? <motion.div   animate={{
                    y: [-250, 0]
                }}

                    transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                    }}

                    className='z-50 bg-[#4575dbcc] text-white backdrop-blur-[2px] absolute w-full flex-col flex gap-5 justify-center rounded-bl-[10px]   rounded-br-[10px] '>
                    <div className='ml-2  flex-col flex gap-5 justify-center px-2 py-3 '>
                        <div className=''>
                            <div className='flex justify-between'>
                                <Link>Home</Link> <motion.span  onClick={()=>setfirsdrop(!driop1)}   onMouseEnter={()=>(setfirsdrop(true))} onMouseLeave={()=>setfirsdrop(false)} whileHover={{
                                y: 5
                            }}
                                transition={{
                                    ease: "anticipate"
                                }}
                                w
                            >
                                <IoIosArrowDown className='text-xl' />
                            </motion.span>
                            </div>
                            {
                                driop1 ?<motion.div animate={{
                                    y:[-7,0]
                                }}  className='w-full  rounded-[5px] px-2 py-5 flex flex-col justify-evenly  bg-[#b7ceffa2]'>
        
                          <div className='flex gap-2 mb-5'>
                              <RiParentFill className=' rounded-[5px] bg-white p-1 text-3xl text-[#1057EC]  ' /> For  Parents
                          </div>
                 
                            <div className='flex gap-2'>
                                <CiHospital1 className=' rounded-[5px] bg-white p-1 text-3xl text-[#1057EC] ' /> For  Parents
                            </div>
                      
                            </motion.div>:null
                            }
                        </div>
                        <div className=''>
                            <div className='flex justify-between'>
                                <Link>About</Link> <motion.span  onClick={()=>setfirsdrop2(!driop2)}   onMouseEnter={()=>(setfirsdrop2(true))} onMouseLeave={()=>setfirsdrop2(false)} whileHover={{
                                y: 5
                            }}
                                transition={{
                                    ease: "anticipate"
                                }}
                                w
                            >
                                <IoIosArrowDown className='text-xl' />
                            </motion.span>
                            </div>
                            {
                                driop2 ?<motion.div animate={{
                                    y:[-7,0]
                                }}   className='w-full rounded-[5px] px-2 py-5 flex flex-col justify-evenly  bg-[#b7ceffa2]'>
        
                          <div className='flex gap-2 mb-5'>
                              <RiParentFill className=' rounded-[5px] bg-white p-1 text-3xl text-[#1057EC]  ' /> For  Parents
                          </div>
                 
                            <div className='flex gap-2'>
                                <CiHospital1 className=' rounded-[5px] bg-white p-1 text-3xl text-[#1057EC] ' /> For  Parents
                            </div>
                      
                            </motion.div>:null
                            }
                        </div>
                        <div className=''>
                            <div className='flex justify-between'>
                                <Link>Contact</Link> <motion.span  onClick={()=>setfirsdrop3(!driop3)}   onMouseEnter={()=>(setfirsdrop3(true))} onMouseLeave={()=>setfirsdrop3(false)} whileHover={{
                                y: 5
                            }}
                                transition={{
                                    ease: "anticipate"
                                }}
                                w
                            >
                                <IoIosArrowDown className='text-xl' />
                            </motion.span>
                            </div>
                            {
                                driop3 ?<motion.div animate={{
                                    y:[-7,0]
                                }}  className='w-full rounded-[5px] px-2 py-5 flex flex-col justify-evenly  bg-[#b7ceffa2]'>
        
                          <div className='flex gap-2 mb-5 '>
                              <RiParentFill className='  rounded-[5px] bg-white p-1 text-3xl text-[#1057EC] ' /> For  Parents
                          </div>
                 
                            <div className='flex gap-2'>
                                <CiHospital1 className='   rounded-[5px] bg-white p-1 text-3xl text-[#1057EC]  ' /> For  Parents
                            </div>
                      
                            </motion.div>:null
                            }
                        </div>
                        <div className=''>
                            <div className='flex justify-between'>
                                <Link>Services</Link> <motion.span  onClick={()=>setfirsdrop4(!driop4)}   onMouseEnter={()=>(setfirsdrop4(true))} onMouseLeave={()=>setfirsdrop4(false)} whileHover={{
                                y: 5
                            }}
                                transition={{
                                    ease: "anticipate"
                                }}
                                w
                            >
                                <IoIosArrowDown className='text-xl' />
                            </motion.span>
                            </div>
                            {
                                driop4 ?<motion.div animate={{
                                    y:[-7,0]
                                }} className='w-full rounded-[5px] px-2 py-5 flex flex-col justify-evenly  bg-[#b7ceffa2]'>
        
                          <div className='flex gap-2 mb-5'onClick={()=>{setfirsdrop4(false);naviaget("/parent");isopne(false)}}  >
                              <RiParentFill className=' rounded-[5px] bg-white p-1 text-3xl text-[#1057EC] ' /> For  Parents
                          </div>
                 
                            <div className='flex gap-2' onClick={()=>{setfirsdrop4(false);naviaget("/docter");isopne(false)}} >
                                <CiHospital1 className=' rounded-[5px] bg-white p-1 text-3xl text-[#1057EC]  ' /> For  Hospital
                            </div>
                      
                            </motion.div>:null
                            }
                        </div>
                        
                    </div>
                </motion.div> : null
            }
        </div>
    )
}

export default Navbar
