'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
  const [step, setStep] = useState(0);

  return (
    <figure className="charge-diagram" data-step={step}>
      <div className="diagram-heading">
        <span>Endpoint-prefix update</span>
        <small>one long-range Majorana term</small>
      </div>
      <div className="diagram-steps" role="group" aria-label="Explore the Majorana update">
        {updateSteps.map((item, index) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={step === index}
            aria-controls="charge-flow-panel"
            onClick={() => setStep(index)}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {item.label}
          </button>
        ))}
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
          <g className="interval-note">
            <path className="scribble-arrow" markerEnd="url(#charge-arrow)" d="M615 321 C654 339 704 337 737 307" />
            <text className="scribble-copy" x="500" y="346">toggle only the interval [i, j)</text>
          </g>
        </svg>
      </div>
      <figcaption id="charge-flow-panel" aria-live="polite" aria-atomic="true">
        <strong>{updateSteps[step].title}</strong> {updateSteps[step].description}
      </figcaption>
    </figure>
  );
}

export function ManyBodySketch() {
  const [representation, setRepresentation] = useState('mps');
  const isMps = representation === 'mps';
  const description = isMps
    ? 'Virtual bonds with dimension χ > 1 can carry correlations between sites. The dashed arcs are schematic, not a measure of entanglement.'
    : 'At bond dimension χ = 1, the MPS reduces to a product of local states. This example is an alternating spin configuration.';

  return (
    <figure className="many-body-sketch" data-representation={representation}>
      <div className="many-body-heading">
        <span>A five-site spin chain</span>
        <div className="representation-control">
          <label htmlFor="spin-representation">Representation</label>
          <span className="select-wrap">
            <select id="spin-representation" value={representation} onChange={(event) => setRepresentation(event.target.value)}>
              <option value="mps">MPS · χ &gt; 1</option>
              <option value="product">Product state · χ = 1</option>
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </span>
        </div>
      </div>
      <svg viewBox="0 0 720 140" role="img" aria-labelledby="spin-chain-title spin-chain-description">
        <title id="spin-chain-title">{isMps ? 'A matrix product state with virtual correlations' : 'A product state of five spins'}</title>
        <desc id="spin-chain-description">{description}</desc>
        <g className="many-correlations">
          <path className="many-arc" d="M89 80 Q151 10 213 80" />
          <path className="many-arc second" d="M213 80 Q277 138 341 80" />
          <path className="many-arc" d="M341 80 Q405 10 469 80" />
          <path className="many-arc second" d="M469 80 Q533 138 597 80" />
        </g>
        <path className="many-baseline" d="M60 80 C206 74 482 86 626 80" />
        {[89, 213, 341, 469, 597].map((x, index) => (
          <g key={x}>
            <circle className="many-site" cx={x} cy="80" r="16" />
            <text className="many-spin" x={x} y="86">{isMps ? ['s₁', 's₂', 's₃', 's₄', 's₅'][index] : index % 2 === 0 ? '↑' : '↓'}</text>
          </g>
        ))}
      </svg>
      <p className="many-equation">{isMps ? '|ψ⟩ ≈ A¹ — A² — ··· — Aᴸ' : '|ψ⟩ = |↑⟩ ⊗ |↓⟩ ⊗ |↑⟩ ⊗ |↓⟩ ⊗ |↑⟩'}</p>
      <figcaption aria-live="polite" aria-atomic="true">{description}</figcaption>
    </figure>
  );
}
