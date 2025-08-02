import React from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
const Index = () => {
    const  {roomId} = useParams()
    const MyMeetinsgs = async(element)=>{
        const appID = 765812682
        const serverSecret = "469e1aa3b97e911f3dd1bb853681261e" 
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "Test-User");
        const zc = ZegoUIKitPrebuilt.create(kitToken)
         zc.joinRoom({
            container: element,
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall
            },
        })
    }
  return (
   <div className="flex justify-center items-center h-screen w-full bg-gradient-to-r from-blue-100 to-purple-200">
  <div
    className="w-[90%] h-[90%] bg-white shadow-xl rounded-2xl p-6 overflow-hidden"
    ref={MyMeetinsgs}
  >
    {/* Your meeting component or iframe will render here */}
  </div>
</div>

  )
}

export default Index
