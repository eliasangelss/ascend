import '../stars.css';

export default function StarBackground({ scrollYProgress }:{ scrollYProgress: number }) {
  return (
    <div id='star-bg' className='w-screen h-screen fixed z-[-1] top-0' style={{
      opacity: scrollYProgress + 0.1,
    }}>
      <div className='absolute top-0 opacity-60' style={{
        transform: `scale(${scrollYProgress * -0.2 + 1})`
      }}>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>
    </div>
  )
}