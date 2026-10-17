'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, X } from 'lucide-react';

type Network = 'parity' | 'compression';

function PeekSketch({ kind }: { kind: Network }) {
  return (
    <svg viewBox="0 0 112 58" aria-hidden="true">
      {kind === 'parity' ? (
        <>
          <path className="peek-bond" d="M-8 30 H104 M26 30 V54 M72 30 V54" />
          <path className="peek-trail" d="M26 19 Q49 -2 72 19" />
          <rect x="17" y="21" width="18" height="18" rx="2" />
          <rect x="63" y="21" width="18" height="18" rx="2" />
          <text x="26" y="34">A</text><text x="72" y="34">A</text>
          <text className="peek-charge" x="49" y="25">q</text>
        </>
      ) : (
        <>
          <path className="peek-bond" d="M8 30 H120 M26 30 V54 M78 30 V54" />
          <path className="peek-trail" d="M32 23 Q52 5 72 23 M32 37 Q52 55 72 37" />
          <rect x="17" y="21" width="18" height="18" rx="2" />
          <rect x="69" y="21" width="18" height="18" rx="2" />
          <text x="26" y="34">A</text><text x="78" y="34">B</text>
          <text className="peek-charge" x="52" y="25">χ</text>
        </>
      )}
    </svg>
  );
}

function ParitySketch({ stage }: { stage: number }) {
  const toggled = stage === 3;
  return (
    <svg className="edge-demonstration parity-demonstration" viewBox="0 0 300 152" role="img" aria-label={toggled ? 'The three interval charges are flipped; both outer charges are unchanged.' : 'Four tensors, with endpoint maps at the first and last sites and charges on the bonds.'} data-stage={stage}>
      <path className="edge-bond" d="M8 76 H292" />
      <path className="edge-interval" d="M52 76 H248" />
      <path className="edge-charge-signal" d="M52 76 H248" />
      {[18, 84, 150, 216, 282].map((x, index) => (
        <text key={x} className={`edge-charge ${index > 0 && index < 4 ? 'interval-charge' : ''}`} x={x} y="63">{toggled && index > 0 && index < 4 ? [0, 0, 1, 0, 0][index] : [0, 1, 0, 1, 0][index]}</text>
      ))}
      {[52, 117, 183, 248].map((x, index) => (
        <g key={x}>
          <path className="edge-leg" d={`M${x} 88 V112`} />
          <rect className={`edge-tensor ${index === 0 || index === 3 ? 'edge-end-tensor' : ''}`} x={x - 12} y="64" width="24" height="24" rx="2" />
          <text className="edge-tensor-letter" x={x} y="80">A</text>
        </g>
      ))}
      <g className="edge-endpoint-maps">
        <path d="M52 30 V58 M248 30 V58 M48 52 L52 58 L56 52 M244 52 L248 58 L252 52" />
        <text x="52" y="23">ℓₐ</text><text x="248" y="23">ℓᵦ</text>
      </g>
      <text className="edge-diagram-note" x="150" y="140">{toggled ? 'q → q ⊕ 1 on the interval' : stage === 2 ? 'endpoint maps + old-charge signs' : 'read the old prefix charges'}</text>
    </svg>
  );
}

function CompressionSketch({ compressed }: { compressed: boolean }) {
  return (
    <svg className="edge-demonstration compression-demonstration" viewBox="0 0 300 152" role="img" aria-label={compressed ? 'Small singular values are discarded within each charge block; even and odd sectors remain separate.' : 'A bond has separate even and odd charge blocks before compression.'} data-compressed={compressed}>
      <text className="edge-sector-label" x="150" y="22">even · q = 0</text>
      <text className="edge-sector-label odd" x="150" y="128">odd · q = 1</text>
      {[37, 47, 57, 91, 101, 111].map((y, index) => (
        <path key={y} className={`edge-singular-line ${index < 3 ? 'even' : 'odd'} ${index === 2 || index === 5 ? 'small' : 'kept'}`} d={`M65 74 Q150 ${2 * y - 74} 235 74`} />
      ))}
      <rect className="edge-tensor" x="35" y="59" width="32" height="32" rx="2" />
      <rect className="edge-tensor" x="233" y="59" width="32" height="32" rx="2" />
      <path className="edge-leg" d="M51 91 V118 M249 91 V118 M10 75 H35 M265 75 H290" />
      <text className="edge-tensor-letter" x="51" y="80">A</text><text className="edge-tensor-letter" x="249" y="80">B</text>
      <text className="edge-svd-label" x="150" y="80">{compressed ? 'χ̃' : 'χ'}</text>
      <text className="edge-diagram-note" x="150" y="150">{compressed ? 'smaller bond, same charge structure' : 'SVD within each charge block'}</text>
    </svg>
  );
}

export function EdgeNetworks() {
  const [open, setOpen] = useState<Network | null>(null);
  const [run, setRun] = useState(0);
  const [stage, setStage] = useState(0);
  const [compressed, setCompressed] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Partial<Record<Network, HTMLButtonElement | null>>>({});

  function start(kind: Network) {
    setOpen(kind);
    setStage(0);
    setCompressed(false);
    setRun((value) => value + 1);
  }

  function close() {
    if (open) triggers.current[open]?.focus();
    setOpen(null);
  }

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus({ preventScroll: true });
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(null);
    }
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStage(3);
      setCompressed(true);
      return;
    }
    const timers = open === 'parity'
      ? [window.setTimeout(() => setStage(1), 250), window.setTimeout(() => setStage(2), 1000), window.setTimeout(() => setStage(3), 1900)]
      : [window.setTimeout(() => setCompressed(true), 850)];
    return () => timers.forEach(window.clearTimeout);
  }, [open, run]);

  return (
    <div className="edge-networks" ref={root} onKeyDown={(event) => { if (event.key === 'Escape' && open) { event.preventDefault(); close(); } }}>
      {(['parity', 'compression'] as const).map((kind) => (
        <div className={`edge-network edge-network-${kind}`} key={kind}>
          <button className="network-peek" ref={(node) => { triggers.current[kind] = node; }} type="button" aria-expanded={open === kind} aria-controls={`edge-${kind}-panel`} aria-label={`Explore ${kind === 'parity' ? 'virtual parity' : 'charge-aware compression'}`} onClick={() => open === kind ? close() : start(kind)}>
            <PeekSketch kind={kind} />
            <span>{kind === 'parity' ? 'Virtual parity' : 'Charge-aware SVD'}<ArrowRight size={12} aria-hidden="true" /></span>
          </button>
          {open === kind && (
            <section className="network-panel" id={`edge-${kind}-panel`} aria-labelledby={`edge-${kind}-title`}>
              <div className="network-panel-heading">
                <h3 id={`edge-${kind}-title`}>{kind === 'parity' ? 'Virtual parity update' : 'Charge-aware compression'}</h3>
                <button ref={closeButton} className="network-close" type="button" aria-label="Close tensor network" onClick={() => close()}><X size={17} aria-hidden="true" /></button>
              </div>
              {kind === 'parity' ? <ParitySketch stage={stage} /> : <CompressionSketch compressed={compressed} />}
              <p>{kind === 'parity' ? 'Read the old charges, apply the endpoint maps and signs, then flip the virtual charges in between. The middle tensors stay unchanged.' : 'Compress the bond within its even and odd charge blocks. Small singular values can be discarded without mixing the sectors.'}</p>
              <div className="network-panel-footer">
                <button className="network-replay" type="button" onClick={() => start(kind)}><RotateCcw size={13} aria-hidden="true" />{kind === 'parity' ? 'Replay update' : 'Replay compression'}</button>
                <small>Schematic</small>
              </div>
              <span className="sr-only" role="status">{kind === 'parity' ? stage === 3 ? 'Update complete. Only the interval charges have flipped.' : stage === 2 ? 'Applying endpoint maps and signs.' : 'Reading old prefix charges.' : compressed ? 'Compression complete. Both charge sectors are retained.' : 'Performing charge-aware compression.'}</span>
            </section>
          )}
        </div>
      ))}
    </div>
  );
}
