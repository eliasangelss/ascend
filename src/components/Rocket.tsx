interface Point {
  x: number;
  y: number;
}

function bezierCurveSlope(t: number, controlPoints: Point[]) {
  const n = controlPoints.length - 1;

  const bernsteinBasisDerivative = (i: number, n: number, t: number) => {
    if (i === 0) {
      return -n * Math.pow(1 - t, n - 1);
    } else if (i === n) {
      return n * Math.pow(t, n - 1);
    } else {
      const coeff1 = binomialCoefficient(n - 1, i - 1);
      const coeff2 = binomialCoefficient(n - 1, i);
      return n * (coeff1 * Math.pow(t, i - 1) * Math.pow(1 - t, n - i) - coeff2 * Math.pow(t, i) * Math.pow(1 - t, n - i - 1));
    }
  }

  const binomialCoefficient = (n: number, k: number) => {
    let coeff = 1;
    for (let i = 1; i <= k; i++) {
      coeff *= (n - i + 1) / i;
    }
    return coeff;
  }

  let dx_dt = 0;
  let dy_dt = 0;

  for (let i = 0; i <= n; i++) {
    const basisDerivative = bernsteinBasisDerivative(i, n, t);
    dx_dt += basisDerivative * controlPoints[i].x;
    dy_dt += basisDerivative * controlPoints[i].y;
  }

  return dy_dt / dx_dt;
}

export default function Rocket({ scrollYProgress } : { scrollYProgress: number }) { // 0-100
  const mapToCurve = (t: number, P0: Point, P1: Point, P2: Point, P3: Point) => {
    // clamp t (the value on the scroll progress) to be between 0 and 1
    t = Math.max(0, Math.min(1, t));
  
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const ttt = tt * t;
    const uuu = uu * u;
  
    // calculates the point on the bezier curve
    const x = uuu * P0.x + 3 * uu * t * P1.x + 3 * u * tt * P2.x + ttt * P3.x;
    const y = uuu * P0.y + 3 * uu * t * P1.y + 3 * u * tt * P2.y + ttt * P3.y;
  
    return { x, y }; // a point that can be used in the context of the curve's points below
  }

  const ANCHOR_POINTS: [Point, Point, Point, Point] = [
    // in vw (viewport width) and vh (viewport height), respectively
    { x: -20, y: -20 },
    { x: -20, y: 40 },
    { x: 70, y: 0 },
    { x: 95, y: 110 },
  ];

  const controlPoints = ANCHOR_POINTS.map(({ x, y }) => ({ x: (x / 100) * innerWidth, y: (y / 100) * innerHeight }));

  // map scroll progress to the section's progress from 0 to 1
  const mapScrollToSection = (p: number) => {
    const start = 0.1;
    const end = 0.5;
    return (p - start) / (end - start);
  }

  
  const slope = bezierCurveSlope(mapScrollToSection(scrollYProgress), controlPoints);
  /* DEBUGGING ⬇️ */
  // if (scrollYProgress >= 0.4 && scrollYProgress <= 0.9) { // meaning that the rocket's animation should be playing
  //   console.log(`slope: ${slope} at ${mapScrollToSection(scrollYProgress)}`);
  //   console.log(`angle: ${Math.atan(slope) * (180 / Math.PI)}deg`);
  // }

  const animationProgress = mapScrollToSection(scrollYProgress);
  const scale = 1 - animationProgress + 0.3;

  return (
    <div className="fixed z-40 size-40" style={{
      // top and left are offset from the original position
      bottom: `${mapToCurve(animationProgress, ...ANCHOR_POINTS).y}vh`,
      left: `${mapToCurve(animationProgress, ...ANCHOR_POINTS).x}vw`,
      // rotate the rocket to match the slope of the curve
      transform: `rotate(${Math.atan(slope) * -(180 / Math.PI) + 270}deg) scale(${scale})`,
    }}>
      <img src="/rocket.svg" alt=" " className="size-40 md:size-52 rotate-[135deg] " />
    </div>
  )
}