'use client';

import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { ArrowRight, X } from 'lucide-react';

type Network = 'parity' | 'compression';
const sites = [45, 110, 175, 240, 305];
const initialCharges = [0, 1, 0, 1];
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function PeekSketch({ kind }: { kind: Network }) {
  return (
    <svg viewBox="0 0 112 58" aria-hidden="true">
      <path className="peek-bond" d="M-8 30 H120 M26 30 V54 M78 30 V54" />
      <path className="peek-trail" d={kind === 'parity' ? 'M26 19 Q52 -2 78 19' : 'M32 23 Q52 5 72 23 M32 37 Q52 55 72 37'} />
      <g className="peek-left-tensor"><rect x="17" y="21" width="18" height="18" rx="2" /><text x="26" y="34">A</text></g>
      <g className="peek-right-tensor"><rect x="69" y="21" width="18" height="18" rx="2" /><text x="78" y="34">{kind === 'parity' ? 'A' : 'B'}</text></g>
      <text className="peek-charge" x="52" y="25">{kind === 'parity' ? 'q' : 'χ'}</text>
    </svg>
  );
}

function ParityDoodle() {
  const [charge, setCharge] = useState(0);
  const [pulse, setPulse] = useState<{ origin: number; progress: number } | null>(null);
  const frame = useRef<number | null>(null);

  function send(origin: number) {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    if (reducedMotion()) {
      setCharge((value) => value ^ 1);
      setPulse(null);
      return;
    }
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / 1250);
      if (progress < 1) {
        setPulse({ origin, progress });
        frame.current = requestAnimationFrame(tick);
      } else {
        setCharge((value) => value ^ 1);
        setPulse(null);
        frame.current = null;
      }
    }
    setPulse({ origin, progress: 0 });
    frame.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    send(0);
    return () => { if (frame.current !== null) cancelAnimationFrame(frame.current); };
  }, []);

  const originX = sites[pulse?.origin ?? 0];
  const reach = Math.max(originX - sites[0], sites[4] - originX);
  const distance = (pulse?.progress ?? 0) * reach;
  const touched = (x: number) => pulse !== null && Math.abs(x - originX) <= distance;
  const tokenXs = pulse ? [originX > sites[0] ? originX - distance : null, originX < sites[4] ? originX + distance : null].filter((x): x is number => x !== null && x >= sites[0] && x <= sites[4]) : [];

  return (
    <>
      <div className="network-toy parity-toy" data-moving={pulse !== null}>
        <svg viewBox="0 0 350 190" aria-hidden="true">
          <path className="toy-bond" d="M15 100 H335" />
          {sites.map((x) => <path key={x} className="toy-leg" d={`M${x} 100 V142`} />)}
          {initialCharges.map((value, index) => {
            const x = (sites[index] + sites[index + 1]) / 2;
            const bit = value ^ charge ^ Number(touched(x));
            return <text key={x} className={`toy-bit ${touched(x) ? 'just-flipped' : ''}`} x={x} y="83">{bit}</text>;
          })}
          <text className="toy-handwriting" x="175" y="31">mind the minus signs</text>
          <path className="toy-pencil-arrow" d="M282 45 Q315 46 311 72 M305 65 311 73 317 65" />
          {tokenXs.map((x, index) => (
            <g className="toy-sign" key={index} transform={`translate(${x} ${56 - 8 * Math.sin((pulse?.progress ?? 0) * Math.PI)})`}>
              <circle r="14" /><text y="4">−1</text>
              <path d="M0 18 V25" />
            </g>
          ))}
          {!pulse && <text className="toy-small-label" x="175" y="175">q ⊕ 1</text>}
        </svg>
        {sites.map((x, index) => (
          <button key={x} className="toy-tensor" type="button" style={{ left: `${x / 350 * 100}%`, top: `${100 / 190 * 100}%` }} data-bumped={pulse !== null && Math.abs(Math.abs(x - originX) - distance) < 24} aria-label={`Send a parity pulse from tensor ${index + 1}`} onClick={() => send(index)}>
            <span className="toy-tensor-face">A</span>
          </button>
        ))}
      </div>
      <p className="network-toy-hint">Tap a tensor. Pass a sign.</p>
      <span className="sr-only" role="status">{pulse ? 'Passing a parity sign along the network.' : `Pulse finished. Virtual charges flipped; the bookkeeping bit is ${charge}.`}</span>
    </>
  );
}

function ElasticDoodle() {
  const [pull, setPull] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [compressed, setCompressed] = useState(false);
  const frame = useRef<number | null>(null);
  const drag = useRef<{ start: number; scale: number; initial: number; pull: number } | null>(null);

  function spring(amount: number) {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    setCompressed(true);
    if (reducedMotion()) { setPull(0); return; }
    const start = performance.now();
    setPull(amount);
    function tick(now: number) {
      const time = (now - start) / 1000;
      if (time < 1.25) {
        setPull(amount * Math.exp(-4.8 * time) * Math.cos(17 * time));
        frame.current = requestAnimationFrame(tick);
      } else {
        setPull(0);
        frame.current = null;
      }
    }
    frame.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    spring(44);
    return () => { if (frame.current !== null) cancelAnimationFrame(frame.current); };
  }, []);

  function grab(event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || !event.isPrimary) return;
    event.preventDefault();
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    const width = event.currentTarget.parentElement!.getBoundingClientRect().width;
    drag.current = { start: event.clientX, scale: 350 / width, initial: pull, pull };
    setDragging(true);
    setCompressed(false);
  }

  function tug(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!drag.current) return;
    const amount = Math.max(-35, Math.min(60, drag.current.initial + (event.clientX - drag.current.start) * drag.current.scale));
    drag.current.pull = amount;
    setPull(amount);
  }

  function release(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!drag.current) return;
    const amount = drag.current.pull;
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    spring(Math.abs(amount) < 8 ? 44 : amount);
  }

  const right = 245 + pull;
  const middle = (75 + right) / 2;
  return (
    <>
      <div className="network-toy elastic-toy" data-compressed={compressed} data-dragging={dragging}>
        <svg viewBox="0 0 350 190" aria-hidden="true">
          <text className="toy-handwriting" x="175" y="25">a bond with a little give</text>
          <path className="toy-leg" d={`M15 100 H75 M${right} 100 H335 M75 100 V146 M${right} 100 V146`} />
          {[57, 69, 81, 119, 131, 143].map((y, index) => <path key={y} className={`toy-elastic-line ${index < 3 ? 'even' : 'odd'} ${index === 2 || index === 5 ? 'small' : ''}`} d={`M75 100 Q${middle} ${2 * y - 100 - Math.abs(pull) * (index < 3 ? -0.25 : 0.25)} ${right} 100`} />)}
          <text className="toy-sector" x={middle} y="48">q = 0</text>
          <text className="toy-sector odd" x={middle} y="161">q = 1</text>
          <text className="toy-rank" x={middle} y="106">{compressed ? 'χ̃' : 'χ'}</text>
          {!dragging && Math.abs(pull) > 6 && <text className="toy-boing" x={right} y="77">boing.</text>}
          <path className="toy-pencil-arrow" d={`M${right - 2} 169 Q${right + 30} 160 ${right + 24} 133 M${right + 19} 140 ${right + 24} 132 ${right + 30} 139`} />
        </svg>
        <div className="toy-anchor" style={{left:`${75 / 350 * 100}%`,top:`${100 / 190 * 100}%`}}><span className="toy-tensor-face">A</span></div>
        <button className="toy-tensor toy-tug" type="button" style={{left:`${right / 350 * 100}%`,top:`${100 / 190 * 100}%`}} aria-label="Tug and release the tensor bond" aria-describedby="elastic-instructions" onPointerDown={grab} onPointerMove={tug} onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release} onClick={(event) => { if (event.detail === 0) spring(44); }}>
          <span className="toy-tensor-face">B</span>
        </button>
      </div>
      <p className="network-toy-hint" id="elastic-instructions">Drag the right tensor. Let go.</p>
      <span className="sr-only" role="status">{dragging ? 'Stretching the bond.' : compressed ? 'Bond released. Even and odd charge sectors stay separate.' : 'Ready to tug the bond. Keyboard users can press Enter or Space.'}</span>
    </>
  );
}

export function EdgeNetworks() {
  const [open, setOpen] = useState<Network | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Partial<Record<Network, HTMLButtonElement | null>>>({});

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

  return (
    <div className="edge-networks" ref={root} onKeyDown={(event) => { if (event.key === 'Escape' && open) { event.preventDefault(); close(); } }}>
      {(['parity', 'compression'] as const).map((kind) => (
        <div className={`edge-network edge-network-${kind}`} key={kind}>
          <button className="network-peek" ref={(node) => { triggers.current[kind] = node; }} type="button" aria-expanded={open === kind} aria-controls={`edge-${kind}-panel`} aria-label={kind === 'parity' ? 'Play with virtual parity' : 'Play with an elastic tensor bond'} onClick={() => open === kind ? close() : setOpen(kind)}>
            <PeekSketch kind={kind} />
            <span>{kind === 'parity' ? 'pass a sign' : 'tug a bond'}<ArrowRight size={12} aria-hidden="true" /></span>
          </button>
          {open === kind && (
            <section className="network-panel" id={`edge-${kind}-panel`} aria-label={kind === 'parity' ? 'Virtual parity margin doodle' : 'Elastic tensor bond margin doodle'}>
              <div className="network-panel-heading">
                <small>margin doodle</small>
                <button ref={closeButton} className="network-close" type="button" aria-label="Close tensor doodle" onClick={close}><X size={17} aria-hidden="true" /></button>
              </div>
              {kind === 'parity' ? <ParityDoodle /> : <ElasticDoodle />}
            </section>
          )}
        </div>
      ))}
    </div>
  );
}
