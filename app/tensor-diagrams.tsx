'use client';

import { useEffect, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';

const updateSteps = [
  {
    label: 'Read charges',
    title: 'Read the old prefix charges.',
    description: 'The endpoint signs use the parity accumulated before each endpoint. These charges must be read before changing the interval.',
  },
  {
    label: 'Apply endpoints',
    title: 'Apply the endpoint maps and signs.',
    description: 'The two endpoint tensors receive the local maps and the signs from the old prefix charges. No numerical parity string is applied to the tensors in between.',
  },
  {
    label: 'Toggle interval',
    title: 'Toggle the virtual charges across [i, j).',
    description: 'XOR with 1 updates the bonds between the endpoints. The charge is restored after the right endpoint; the middle tensors retain their numerical entries.',
  },
];

export function ChargeFlowDiagram() {
  const [playhead, setPlayhead] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [sequence, setSequence] = useState(0);
  const step = Math.min(updateSteps.length - 1, Math.floor(playhead));
  const completed = playhead >= updateSteps.length;
  const playbackLabel = playing ? 'Pause update' : completed ? 'Replay update' : playhead > 0 ? 'Resume update' : 'Play update';

  useEffect(() => {
    if (!playing) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const elapsed = (now - previous) / 2200;
      previous = now;
      setPlayhead((position) => Math.min(updateSteps.length, position + elapsed));
    }, 50);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (completed) setPlaying(false);
  }, [completed]);

  function togglePlayback() {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (completed) setPlayhead(0);
    setSequence(sequence + 1);
    setPlaying(true);
  }

  function selectStep(index: number) {
    setPlaying(false);
    setPlayhead(index);
    setSequence(sequence + 1);
  }

  return (
    <figure className="charge-diagram" data-step={step} data-playing={playing}>
      <div className="diagram-heading">
        <span>Endpoint-prefix update</span>
        <small>one long-range Majorana term</small>
      </div>
      <div className="diagram-toolbar">
        <button className="play-update" type="button" onClick={togglePlayback} aria-label={playbackLabel}>
          {playing ? <Pause size={16} aria-hidden="true" /> : completed ? <RotateCcw size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          {playing ? 'Pause' : completed ? 'Replay update' : playhead > 0 ? 'Resume' : 'Play update'}
        </button>
        <div className="diagram-steps" role="group" aria-label="Explore the Majorana update">
          {updateSteps.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={step === index}
              aria-controls="charge-flow-panel"
              data-passed={index < step}
              onClick={() => selectStep(index)}
            >
              <span aria-hidden="true">0{index + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="walkthrough-progress" aria-hidden="true">
        <span style={{width:`${playhead / updateSteps.length * 100}%`}} />
      </div>
      <div className="diagram-scroll" tabIndex={0} role="region" aria-label="Charge-flow diagram; scroll horizontally on small screens">
        <svg viewBox="0 0 1040 360" role="img" aria-labelledby="charge-flow-title charge-flow-description">
          <title id="charge-flow-title">Virtual charge flow through a long-range MPS update</title>
          <desc id="charge-flow-description">{updateSteps[step].title} {updateSteps[step].description}</desc>
          <defs>
            <pattern id="paper-dots" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" className="diagram-dot" />
            </pattern>
            <marker id="charge-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="arrow-head" />
            </marker>
          </defs>
          <rect width="1040" height="360" fill="url(#paper-dots)" opacity="0.52" />
          <path className="diagram-bond" d="M44 206 C95 202 153 210 224 205" />
          <path className={`diagram-bond interval-bond${step === 2 ? ' toggled' : ''}`} d="M288 205 C346 198 419 211 488 205" />
          <path className={`diagram-bond interval-bond${step === 2 ? ' toggled' : ''}`} d="M552 205 C615 210 690 199 752 205" />
          <path className="diagram-bond" d="M816 205 C884 200 934 208 996 204" />
          <text className="bond-copy" x="119" y="179">old</text>
          <text className="bond-copy active" x="388" y="176">{step === 2 ? 'Q₁ → Q₁ ⊕ 1' : 'Q₁'}</text>
          <text className="bond-copy active" x="652" y="176">{step === 2 ? 'Q₂ → Q₂ ⊕ 1' : 'Q₂'}</text>
          <text className="bond-copy" x="904" y="178">{step === 2 ? 'restored' : 'unchanged'}</text>

          <g className="phase-visual" key={`${sequence}-${step}`} aria-hidden="true">
            {step === 0 && <>
              <path className="signal-trace" pathLength="100" d="M44 205 L224 205" />
              <path className="signal-trace delayed" pathLength="100" d="M552 205 L752 205" />
              <rect className="sign-highlight" x="270" y="112" width="87" height="31" rx="5" />
              <rect className="sign-highlight" x="797" y="112" width="87" height="31" rx="5" />
            </>}
            {step === 1 && <>
              <path className="signal-trace" pathLength="100" d="M256 99 L256 170" />
              <path className="signal-trace delayed" pathLength="100" d="M784 99 L784 170" />
              <circle className="phase-halo" cx="256" cy="205" r="46" />
              <circle className="phase-halo delayed" cx="784" cy="205" r="46" />
            </>}
            {step === 2 && <>
              <path className="signal-trace interval-signal" pathLength="100" d="M288 205 L752 205" />
              <path className="interval-bracket" pathLength="100" d="M288 259 L288 272 L752 272 L752 259" />
              <text className="interval-status" x="520" y="146">virtual parity flipped · numerical tensors unchanged</text>
            </>}
          </g>

          <rect className="diagram-tensor endpoint-tensor" x="224" y="173" width="64" height="64" rx="3" />
          <rect className="diagram-tensor middle" x="488" y="173" width="64" height="64" rx="3" />
          <rect className="diagram-tensor endpoint-tensor" x="752" y="173" width="64" height="64" rx="3" />
          <text className="tensor-copy" x="256" y="212">A<tspan baselineShift="super" fontSize="13">[i]</tspan></text>
          <text className="tensor-copy dots" x="520" y="210">⋯</text>
          <text className="tensor-copy" x="784" y="212">A<tspan baselineShift="super" fontSize="13">[j]</tspan></text>

          <g className="endpoint-maps">
            <circle className="endpoint-node" cx="256" cy="66" r="31" />
            <circle className="endpoint-node" cx="784" cy="66" r="31" />
            <text className="endpoint-copy" x="256" y="73">ℓₐ</text>
            <text className="endpoint-copy" x="784" y="73">ℓᵦ</text>
            <path className="endpoint-flow" markerEnd="url(#charge-arrow)" d="M256 99 L256 164" />
            <path className="endpoint-flow" markerEnd="url(#charge-arrow)" d="M784 99 L784 164" />
          </g>
          <g className="prefix-signs">
            <text className="sign-copy" x="274" y="134">(−1)<tspan baselineShift="super" fontSize="12">Qᵢ₋₁</tspan></text>
            <text className="sign-copy" x="801" y="134">(−1)<tspan baselineShift="super" fontSize="12">Qⱼ₋₁</tspan></text>
            <text className="prefix-note" x="520" y="114">signs from the old charges</text>
          </g>
          <path className="physical-leg" d="M256 237 C254 262 259 279 256 302" />
          <path className="physical-leg" d="M520 237 C524 260 516 281 520 302" />
          <path className="physical-leg" d="M784 237 C780 261 788 281 784 302" />
          <text className="physical-copy" x="256" y="326">sᵢ</text>
          <text className="physical-copy" x="520" y="326">sₖ</text>
          <text className="physical-copy" x="784" y="326">sⱼ</text>
        </svg>
      </div>
      <figcaption id="charge-flow-panel" aria-live="polite" aria-atomic="true">
        <span className="stage-caption" key={step}><strong>{updateSteps[step].title}</strong> {updateSteps[step].description}</span>
      </figcaption>
    </figure>
  );
}
