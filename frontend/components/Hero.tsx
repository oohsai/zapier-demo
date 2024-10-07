"use client"
import Image from 'next/image'
import { PrimaryButton } from './buttons/PrimaryButton'
import { useRouter } from 'next/navigation';
import { LinkButton } from './buttons/LinkButtons';
import { GoogleButton } from './buttons/GoogleButton';

export const Hero = () => {
    const router = useRouter();
    return <div className="grid grid-cols-2 p-4">
        <div className='flex flex-col p-5'>
            <div>
                <div className=' text-6xl tracking-tighter font-extrabold pb-3'>
                Automate without limits
                </div>
                <div className='text-2xl font-bold pb-3'>
                Turn chaos into smooth operations by automating workflows yourself—no developers, no IT tickets, no delays. The only limit is your imagination.
                </div>
                <div className='flex flex-col gap-2 max-w-64'>
                    <PrimaryButton onClick={() => {
                        router.push("/signup");
                    }}>Start free with email</PrimaryButton>
                    <GoogleButton onClick={() => {}} >Start free with Google</GoogleButton>
                </div>
            </div>
        </div>
        <div className='flex justify-center items-center'>
        <Image
            src='https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png'
            width={500}
            height={500}
            alt="Picture of the author"/>
        </div>
    </div>
}