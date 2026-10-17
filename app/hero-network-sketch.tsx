'use client';

import { useEffect, useRef, useState } from 'react';

const bonds = [
  { label: 'the left boundary bond', points: [16, 68, 28, 64, 38, 63, 53, 66], position: 0, vertical: false },
  { label: 'the bond between A₀ and A₁', points: [53, 66, 72, 74, 88, 55, 109, 64], position: 1, vertical: false },
  { label: 'the bond between A₁ and A₂', points: [109, 64, 126, 55, 145, 61, 164, 66], position: 2, vertical: false },
  { label: 'the right boundary bond', points: [164, 66, 174, 65, 185, 67, 191, 69], position: 3, vertical: false },
  { label: 'the physical leg of A₀', points: [52, 66, 48, 91, 63, 104, 60, 123], position: .5, vertical: true },
  { label: 'the physical leg of A₁', points: [108, 64, 105, 38, 118, 23, 116, 7], position: 1.5, vertical: true },
  { label: 'the physical leg of A₂', points: [163, 66, 169, 88, 155, 103, 162, 124], position: 2.5, vertical: true },
];
const tensors = [{ x: 53, y: 66 }, { x: 109, y: 64 }, { x: 164, y: 66 }];
const still = () => ({ bends: bonds.map(() => 0), glow: bonds.map(() => 0), angles: tensors.map(() => 0) });
type Kick = { index: number; start: number };

function curve(index: number, bend: number) {
  const { points: p, vertical } = bonds[index];
  const dx = vertical ? bend : 0;
  const dy = vertical ? 0 : bend;
  return `M${p[0]} ${p[1]} C${p[2] + dx} ${p[3] + dy} ${p[4] - dx} ${p[5] - dy} ${p[6]} ${p[7]}`;
}

export function HeroNetworkSketch() {
  const [shape, setShape] = useState(still);
  const motion = useRef<{ hover: Kick | null; wave: Kick | null }>({ hover: null, wave: null });
  const frame = useRef<number | null>(null);

  useEffect(() => () => { if (frame.current !== null) cancelAnimationFrame(frame.current); }, []);

  function tick(now: number) {
    const next = still();
    let moving = false;
    const { hover, wave } = motion.current;
    if (hover) {
      const time = (now - hover.start) / 1000;
      if (time < .45) {
        next.bends[hover.index] = 4 * Math.sin(42 * time) * Math.exp(-8 * time);
        moving = true;
      } else motion.current.hover = null;
    }
    if (wave) {
      const source = bonds[wave.index];
      const elapsed = (now - wave.start) / 1000;
      bonds.forEach((bond, index) => {
        const distance = index === wave.index ? 0 : Math.abs(bond.position - source.position) + (source.vertical ? .45 : 0) + (bond.vertical ? .45 : 0);
        const time = elapsed - distance * .12;
        if (time < .65) moving = true;
        if (time >= 0 && time < .65) {
          next.bends[index] += 6 * Math.sin(31 * time) * Math.exp(-5.5 * time);
          next.glow[index] = Math.sin(Math.PI * Math.min(1, time / .5)) ** 2;
        }
      });
      tensors.forEach((_, index) => {
        const distance = Math.abs(index + .5 - source.position) + (source.vertical ? .45 : 0);
        const time = elapsed - distance * .12;
        if (time >= 0 && time < .65) next.angles[index] = 7 * Math.sin(28 * time) * Math.exp(-6 * time);
      });
      if (elapsed > 1.2) motion.current.wave = null;
    }
    setShape(next);
    frame.current = moving ? requestAnimationFrame(tick) : null;
  }

  function nudge(index: number, propagate: boolean) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const kick = { index, start: performance.now() };
    if (propagate) motion.current.wave = kick;
    else motion.current.hover = kick;
    if (frame.current === null) frame.current = requestAnimationFrame(tick);
  }

  return (
    <div className="hero-network-sketch" data-rippling={shape.glow.some((value) => value > 0)}>
      <svg viewBox="0 0 210 132" role="group" aria-label="Interactive tensor network: A₀, A₁, A₂. Hover a bond to twitch it; click to send a ripple.">
        {bonds.map((bond, index) => {
          const d = curve(index, shape.bends[index]);
          return (
            <g className="sketch-bond" key={bond.label} role="button" tabIndex={0} aria-label={`Send a ripple from ${bond.label}`} onPointerEnter={() => nudge(index, false)} onClick={() => nudge(index, true)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); nudge(index, true); } }}>
              <path className={`sketch-line ${bond.vertical ? 'faint' : ''}`} d={d} />
              <path className="sketch-bond-glow" d={d} style={{opacity:shape.glow[index] * .7}} />
              <path className="sketch-bond-hit" d={d} vectorEffect="non-scaling-stroke" />
            </g>
          );
        })}
        {tensors.map(({x, y}, index) => (
          <g className="sketch-tensor" key={x} transform={`rotate(${shape.angles[index]} ${x} ${y})`}>
            <rect className="sketch-node" x={x - 11} y={y - 11} width="22" height="22" rx="2" style={{fill:Math.abs(shape.angles[index]) > 1 ? '#dce4ff' : 'var(--paper-bright)'}} />
            <text className="sketch-index" x={x} y={y + 4}>{['A₀', 'A₁', 'A₂'][index]}</text>
          </g>
        ))}
        <text className="sketch-caption" x="4" y="29">a small state,</text>
        <text className="sketch-caption" x="116" y="110">a large system</text>
      </svg>
    </div>
  );
}
