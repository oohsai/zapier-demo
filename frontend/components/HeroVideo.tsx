import { Feature } from "./Feature"
import { Input } from "./Input"

export const HeroVideo = () => {
    return <div className="bg-[#E6F1ED]">
        <div className="flex flex-col items-center justify-center p-4 gap-3">
            <div className="text-3xl font-extrabold pt-10">Build powerful workflows incredibly fast</div>
            <div className="font-semibold max-w-3xl pt-5">Whether you're a team of one or a thousand, Zapier puts the power of automation in your hands—no coding required. Take your workflows to the next level with our suite of automation tools.</div>
        </div>
        <div className="flex flex-col items-center">
            <video src="https://res.cloudinary.com/zapier-media/video/upload/q_auto:best/f_auto/v1726860621/Homepage%20%E2%80%94%20Sept%202024/sc01_HP_240917_Connect_v01_edm2pd.mp4" className="max-w-screen pt-4 pl-4 pr-4" controls={false} muted autoPlay loop></video>
                <Feature title={"Connect"} subtitle={"Start an automation by connecting two apps — a trigger and an action. Zapier integrates instantly with over 7,000 different apps."}></Feature>
        </div>
    </div>
}