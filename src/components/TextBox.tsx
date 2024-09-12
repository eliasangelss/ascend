import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
 
export function StoryBox({ text, glow }: { text: string, glow?: boolean }) {
  return (
    <TypeAnimation
      style={{ whiteSpace: 'pre-line', display: 'block', textShadow: glow ? '0 0 5px currentColor' : 'none' }}
      sequence={[
        text
      ]}
      cursor={false}
    />
  )
}

export function WelcomeBox() {
  const [cue, setCue] = useState(false);
  return (
    <div className="max-w-2xl min-h-[20vh] w-[calc(100vw_-_1.5rem)] border-4 border-sky-400 bg-slate-950 text-sky-400 backdrop-blur-sm p-6 md:p-12 monospace" style={{ textShadow: '0 0 5px currentColor'}}>
      <div className="text-slate-400 mb-2 italic">INCOMING TRANSMISSION:</div>
      <div className="flex gap-4 mb-4 items-center flex-nowrap">
        <div className="shrink-0">
          <img src="/orpheus.svg" alt="orpheus says:" className="h-[4ch] md:h-[5ch]" />
        </div>
        <div>
          <div className="text-sky-400 font-bold">Orpheus:</div>
          <div className='text-white/80'>
            <TypeAnimation
            style={{ whiteSpace: 'pre-line', display: 'inline' }}
            speed={70}
            sequence={[
              `Launch control, this is Los Angeles. Prepare for launch!\n`,
              1000,
              () => {
                setCue(true);
              }
            ]}
            cursor={false}
          />
          </div>
        </div>
      </div>
      <Transition show={cue}>
        <span className="block text-sm transition duration-300 ease-in data-[closed]:opacity-0">(scroll to continue)</span>
      </Transition>
    </div>
  );
}