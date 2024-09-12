import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Rocket from "./components/Rocket";
import { ReactLenis } from 'lenis/react';
import LandingWrapper from "./components/LandingWrapper";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { WelcomeBox } from "./components/TextBox";
import { TypeAnimation } from "react-type-animation";
import StarBackground from "./components/StarBackground";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollYProgress, setScrollYProgress] = useState(0);
  const [aboutSectionOpen, setAboutSectionOpen] = useState(false);
  const [faqsOpen, setFaqsOpen] = useState(false);
  const [maxAnimProgressEver, setMaxAnimProgressEver] = useState(0);

  const mapRange = (value: number, x1: number, y1: number, x2: number, y2: number) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
  
  const LANDING_TRANSITIONS: {
    planets: Variants,
    title: Variants,
    [key: string]: Variants,
  } = {
    planets: {
      hidden: {
        opacity: 0,
        scale: 0.7,
      },
      show: {
        opacity: 1,
        scale: 1,
        transition: {
          ease: "easeOut"
        }
      }
    },
    title: {
      hidden: {
        opacity: 0,
        translateY: 50,
      },
      show: {
        opacity: 1,
        translateY: 0,
        transition: {
          ease: "easeInOut",
          duration: 1,
          bounce: 0,
        }
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!aboutSectionOpen && !faqsOpen) {
        setScrollY(window.scrollY);
        setScrollYProgress(mapRange(scrollY / document.body.scrollHeight, 0, 0.8, 0, 1));
        if (scrollYProgress > maxAnimProgressEver) {
          setMaxAnimProgressEver(scrollYProgress);
        }
      } else {
        document.body.scrollTop = document.body.scrollHeight;
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY, scrollYProgress, aboutSectionOpen, faqsOpen, maxAnimProgressEver]);

  const FAQS = [
    // ['How long will we be in LA?', 'The event will be from November 15th to 17th.'],
    ['How long does the application take to complete?', 'The application should take about 25 minutes to complete.'],
    ['When do applications close?', 'Applications close on September 30th.'],
    ['Do attendees cover flight costs?', 'No, we cover flight costs for attendees that need to be flown out to LA (we help coordinate the flight too).'],
    ['What should I bring?', 'We\'ll send out a packing list closer to the event.'],
    ['My parents have concerns, who do I contact?', 'Contact Zenab at zenab@hackclub.com!'],
  ];

  return (
    <ReactLenis options={{
      syncTouch: true
    }} root>
    {/* ^^ this just adds a really smooth scroll effect, dont mind this wrapper */}
      <main className="w-screen h-[400vh] overflow-y-scroll">
        <div className="fixed" style={{
          bottom: -scrollY,
          background: 'linear-gradient(180deg, #150122 25%, #477AB6 75%)',
        }}>
          {/* this is the final landing page */}
          <motion.div className="w-screen h-screen relative flex justify-center items-center" >
            <LandingWrapper show={scrollYProgress >= 0.9}>
              <motion.div variants={LANDING_TRANSITIONS.title} className="">
                <img src="/logo.png" className="w-[80vw] h-auto md:w-auto md:h-[40vh]" alt="Ascend logo" />
              </motion.div>
              <motion.div variants={LANDING_TRANSITIONS.planets} className="absolute size-[5vh] bg-white bottom-6 rounded-full right-10"></motion.div>
              {/* FREQUENTLY ASKED QUESTIONS */}
              <motion.button onClick={() => setFaqsOpen(true)} variants={LANDING_TRANSITIONS.planets} className="absolute top-[25vh] left-6 p-4 text-center size-[17vh] bg-gradient-to-br from-emerald-500 to-green-700 rounded-full hover:!scale-105 transition flex justify-center items-center text-lg monospace glow text-white">FAQs</motion.button>
              <motion.div variants={LANDING_TRANSITIONS.planets} className="absolute size-[1vh] bg-white rounded-full left-4"></motion.div>

              <Dialog
                transition
                open={faqsOpen}
                onClose={() => setFaqsOpen(false)}
                className="relative z-50"
              >
                <DialogBackdrop
                  transition
                  className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
                />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="w-full max-h-[85vh] overflow-auto m-6 monospace max-w-2xl transition duration-300 delay-300 data-[closed]:delay-0 data-[closed]:opacity-0 space-y-4 bg-slate-950 text-white border-4 border-sky-400 p-8">
                    <div className="flex flex-nowrap gap-4 items-center">
                      <button onClick={() => setFaqsOpen(false)} className="size-6 text-white bg-red-400 inline-flex items-center justify-center rounded-full text-xl hover:bg-red-500 transition shrink-0">&times;</button>
                    <DialogTitle className="glow uppercase">Frequently Asked Questions</DialogTitle>
                    </div>
                    <div className="w-full">
                      {FAQS.map(([question, answer], i) => (
                        <Disclosure as="div" key={i} className="p-4">
                          <DisclosureButton className="group flex w-full items-center justify-between">
                            <span className="text-sm/6 font-medium text-left text-white group-data-[hover]:text-white/80">
                              {question}
                            </span>
                            <ChevronDownIcon className="shrink-0 size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                          </DisclosureButton>
                          <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                            {answer}
                          </DisclosurePanel>
                        </Disclosure>
                      ))}
                    </div>
                  </DialogPanel>
                </div>
              </Dialog>

              {/* REGISTRATION */}
              <motion.a href="https://forms.hackclub.com/ascend" variants={LANDING_TRANSITIONS.planets} className="absolute top-[5vh] -right-5 p-6 size-[30vh] sm:size-[35vh] bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full flex justify-center items-center text-center hover:!scale-105 transition" style={{
                backgroundImage: 'url(/blast-off.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}>
                <span className="text-white monospace text-xs md:text-base absolute w-1/2 glow">Ready to start your adventure?</span>
              </motion.a>
              <motion.div variants={LANDING_TRANSITIONS.planets} className="absolute size-[1vh] bg-white rounded-full right-7 bottom-[40vh]"></motion.div>

              {/* DATE */}
              <motion.div variants={LANDING_TRANSITIONS.planets} className="absolute bottom-[20vh] right-3 size-[12vh] bg-gradient-to-br from-violet-800 to-violet-800 rounded-full flex justify-center items-center text-white p-4 text-center glow monospace hover:!scale-95 transition">November<br/>15-17</motion.div>
              <motion.div variants={LANDING_TRANSITIONS.planets} className="absolute size-[3vh] bg-white rounded-full left-1/3 top-[17vh]"></motion.div>

              {/* ABOUT */}
              <motion.button onClick={() => setAboutSectionOpen(true)} variants={LANDING_TRANSITIONS.planets} className="absolute bottom-0 transition -left-4 size-[30vh] bg-gradient-to-bl hover:!scale-105 from-fuchsia-600 to-rose-700 rounded-full flex justify-center glow text-white items-center monospace text-xl" style={{
                backgroundImage: 'url(/about.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}>The mission</motion.button>


              <Dialog
                transition
                open={aboutSectionOpen}
                onClose={() => setAboutSectionOpen(false)}
                className="relative z-50"
              >
                <DialogBackdrop
                  transition
                  className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
                />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                  <DialogPanel
                  transition
                  className="w-full m-6 monospace max-w-2xl transition data-[closed]: duration-300 delay-300 data-[closed]:delay-0 data-[closed]:opacity-0 space-y-4 bg-slate-950 text-white border-4 border-sky-400 p-8">
                    <div className="flex flex-nowrap gap-4">
                      <button onClick={() => setAboutSectionOpen(false)} className="size-6 text-white bg-red-400 flex items-center justify-center rounded-full text-xl hover:bg-red-500 transition">&times;</button>
                    <DialogTitle className="glow uppercase">Your Mission</DialogTitle>
                    </div>
                    <div className="text-slate-400 mb-2 italic">INCOMING TRANSMISSION:</div>
                    <div className="flex gap-4 mb-4 items-start flex-nowrap glow">
                      <div className="shrink-0 md:block hidden">
                        <img src="/orpheus.svg" alt="orpheus says:" className="h-[5ch]" />
                      </div>
                      <div>
                        <div className="text-sky-400 font-bold">Orpheus:</div>
                        <div className='text-white/80'>
                          {maxAnimProgressEver >= 0.5 && (
                            <TypeAnimation
                              style={{ whiteSpace: 'pre-line', display: 'inline' }}
                              speed={70}
                              sequence={[
                                `We are searching for female and nonbinary mission specialists who are willing to join us for Athena Flight 15—you'll arrive at our spaceport in Los Angeles and spend the weekend experiencing technical masterclasses, professional and social development, and meeting women in computer science as you create coding projects that the world has never seen before!`
                              ]}
                              cursor={false}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </div>
              </Dialog>
            </LandingWrapper>
          </motion.div>

          {/* intermediate sections */}
          <div className="w-screen h-screen flex justify-center items-center relative">
            {/* <CloudReveal scrollYProgress={scrollYProgress}/> */}
            <Rocket scrollYProgress={scrollYProgress} />
            <div className="size-[40vh] md:size-[80vh] rounded-full bg-zinc-400 absolute top-[50vh] -right-[15vh]" style={{
              backgroundImage: 'url(/moon.png)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}></div>
            <div className="z-[50] absolute md:p-12 md:left-[8vw] top-[30vh] md:top-[50vh] md:w-[60vw] min-h-[20vh] max-w-2xl w-[calc(100vw_-_1.5rem)] border-4 border-sky-400 bg-slate-950 text-sky-400 backdrop-blur-sm p-6 monospace" style={{ textShadow: '0 0 5px currentColor'}}>
            <div className="flex gap-4 mb-4 items-start flex-nowrap">
              <div className="shrink-0">
                <img src="/orpheus.svg" alt="orpheus says:" className="h-[5ch]" />
              </div>
              <div>
                <div className="text-sky-400 font-bold">Orpheus:</div>
                <div className='text-white/80'>
                  {maxAnimProgressEver >= 0.4 && (
                    <TypeAnimation
                      style={{ whiteSpace: 'pre-line', display: 'inline' }}
                      speed={70}
                      sequence={[
                        `Something unthinkable. Something unimaginable. Something that's completely out of this world...`
                      ]}
                      cursor={false}
                    />
                  )}
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className="w-screen h-screen relative flex justify-center items-center">
            <div className="z-[50] absolute md:p-12 md:right-[8vw] bottom-[30vh] md:bottom-[10vh] md:w-[45vw] min-h-[25vh] max-w-2xl w-[calc(100vw_-_1.5rem)] border-4 border-sky-400 bg-slate-950 text-sky-400 backdrop-blur-sm p-6 monospace" style={{ textShadow: '0 0 5px currentColor'}}>
            <div className="absolute">
              <div className="h-[20vh] border-y-2"></div>
            </div>
            <div className="flex gap-4 mb-4 itemsstart flex-nowrap">
              <div className="shrink-0">
                <img src="/orpheus.svg" alt="orpheus says:" className="h-[5ch]" />
              </div>
              <div>
                <div className="text-sky-400 font-bold">Orpheus:</div>
                <div className='text-white/80'>
                  {maxAnimProgressEver >= 0.2 && (
                    <TypeAnimation
                      style={{ whiteSpace: 'pre-line', display: 'block', textShadow: '0 0 5px currentColor'}}
                      speed={70}
                      sequence={[
                        "This November, we're gearing up to launch one of the Athena program's most ambitious missions yet...",
                      ]}
                      cursor={false}
                    />
                  )}
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* earth section */}
          <div className="w-screen h-screen relative flex items-start justify-center">
            <div className="absolute bottom-[20vh]">
              <WelcomeBox />
            </div>
            <div className="z-[-1] absolute bottom-0 h-screen w-screen" style={{
              backgroundImage: 'url(/city.png)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}></div>
          </div>
          <StarBackground scrollYProgress={scrollYProgress} />
        </div>
      </main>
    </ReactLenis>
  )
}
