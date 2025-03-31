import React from 'react'
import "../index.css"

const Navbar = () => {
  return (
    
        <>
            <section className='w-full fixed top-0'>
                <div className='flex justify-between items-center px-[3vw] bg-black/85 text-white/80'>
                    <div className='flex items-center justify-content gap-10'>
                        <img className='h-20 w-22' src='https://i.imgur.com/OpOueJv.png' alt='RankED Logo'></img>
                        <div className='w-15 font-medium  hover:bg-white/15 p-2 rounded-2xl flex items-center justify-center'>Play</div>
                        <div className='w-25 font-medium hover:bg-white/15 p-2 rounded-2xl flex items-center justify-center'>Problems</div>
                    </div>

                    <div className='flex items-center justify-content gap-10'>
                        <div className='w-10 hover:bg-white/15 p-2 rounded-2xl flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" class="hover:text-text-primary dark:hover:text-text-primary "><path fill-rule="evenodd" clip-rule="evenodd" d="M16.403 10.891C16.5768 12.8986 17.0682 14.5303 17.7963 15.8174C17.8182 15.8563 17.8403 15.8945 17.8623 15.9322H6.13771C6.15975 15.8945 6.18177 15.8563 6.20374 15.8174C7.12442 14.1898 7.66667 12.0111 7.66667 9.21794C7.66667 7.21279 9.16139 5.52994 11.1553 5.15365C11.2695 4.39084 11.556 3.68438 11.9739 3.07513C8.496 3.08878 5.66667 5.82552 5.66667 9.21794C5.66667 11.6748 5.20893 13.5139 4.46294 14.8327C4.0464 15.5691 3.66114 15.9613 3.45925 16.091C2.61971 16.6307 3.00196 17.9322 4.00001 17.9322H20C20.9981 17.9322 21.3803 16.6307 20.5408 16.091C20.3389 15.9613 19.9536 15.5691 19.5371 14.8327C18.9112 13.7263 18.4882 12.2536 18.3682 10.3571C17.7723 10.661 17.1073 10.8489 16.403 10.891ZM14.3096 18.9368C13.8363 18.6522 13.2219 18.805 12.9372 19.2783C12.7485 19.5919 12.3915 19.7902 12 19.7902C11.6085 19.7902 11.2515 19.5919 11.0628 19.2783C10.7781 18.805 10.1637 18.6522 9.69045 18.9368C9.2172 19.2215 9.06434 19.836 9.34903 20.3092C9.90245 21.2292 10.9125 21.7902 12 21.7902C13.0875 21.7902 14.0976 21.2292 14.651 20.3092C14.9357 19.836 14.7828 19.2215 14.3096 18.9368Z"></path><circle cx="16.1" cy="5.89999" r="3" fill="#F63636"></circle></svg>
                        </div>
                        <div className='w-15 hover:bg-white/15 p-2 rounded-2xl flex items-center justify-around'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" class="h-[20px] w-[20px]"><g filter="url(#hot-filled_svg__filter0_i_289_12318)"><path fill-rule="evenodd" d="M9.588 2.085a1 1 0 01.97.092c2.85 1.966 4.498 4.744 5.31 6.67l.854-.885a1 1 0 011.56.154c2.177 3.38 2.211 7.383.521 10.3C17.039 21.459 13.583 22 11.977 22c-1.569 0-4.905-.27-6.825-3.584-.832-1.435-1.27-3.053-1.125-4.704.146-1.66.876-3.284 2.264-4.721.86-.891 1.505-2.122 1.957-3.322.449-1.193.68-2.278.752-2.806a1 1 0 01.588-.778z" clip-rule="evenodd" fill="url(#hot-filled_svg__paint0_linear_289_12318)"></path></g><defs><linearGradient id="hot-filled_svg__paint0_linear_289_12318" x1="12" x2="12" y1="2" y2="22" gradientUnits="userSpaceOnUse"><stop stop-color="#FFA116"></stop><stop offset="1" stop-color="#F9772E"></stop></linearGradient><filter id="hot-filled_svg__filter0_i_289_12318" width="17.2" height="21.2" x="4" y="2" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dx="1.2" dy="1.2"></feOffset><feGaussianBlur stdDeviation="0.6"></feGaussianBlur><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite><feColorMatrix values="0 0 0 0 0.970833 0 0 0 0 0.05825 0 0 0 0 0 0 0 0 0.16 0"></feColorMatrix><feBlend in2="shape" result="effect1_innerShadow_289_12318"></feBlend></filter></defs></svg>
                            <p className='text-sm font-bold text-orange-400'>0</p>
                        </div>
                        <div className='w-16 hover:bg-white/15 font-medium p-2 rounded-2xl flex items-center justify-center'>Profile</div>
                    </div>
                </div>
            </section>
        </>


  )
}

export default Navbar