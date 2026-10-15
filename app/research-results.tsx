import { ArrowUpRight, ChevronDown, Download } from 'lucide-react';

const mpsSeries = [
  { chi: 16, color: '#bcbddc' },
  { chi: 32, color: '#9e9ac8' },
  { chi: 64, color: '#807dba' },
  { chi: 128, color: '#6a51a3' },
  { chi: 256, color: '#54278f' },
];

const referenceSeries = [
  { exponent: 10, color: '#9ecae1' },
  { exponent: 11, color: '#6baed6' },
  { exponent: 12, color: '#4292c6' },
  { exponent: 13, color: '#2171b5' },
  { exponent: 14, color: '#08519c' },
  { exponent: 15, color: '#08306b' },
  { exponent: 16, color: '#041f45' },
];

function ResultPanel({ title, viewBox }: { title: string; viewBox: string }) {
  return (
    <svg className="result-panel" viewBox={viewBox} role="img" aria-label={title}>
      <title>{title}</title>
      <image href="/research/thermal-hubbard-37.svg" width="800.376584" height="617.79616" />
    </svg>
  );
}

export function ResearchResults() {
  return (
    <section className="research-results" id="results" aria-labelledby="results-title">
      <div className="results-heading">
        <div>
          <p className="results-label">Numerical results · work in progress</p>
          <h3 id="results-title">Thermal states on a 37-site Hubbard cluster.</h3>
        </div>
        <a className="results-download" href="/research/thermal-hubbard-37.pdf" target="_blank" rel="noreferrer">
          Full figure (PDF) <Download size={16} aria-hidden="true" />
        </a>
      </div>
      <p className="results-intro">
        I use a triangular-lattice Hubbard model to study the accuracy and storage
        costs of the operator-space MPS approach. These results compare fixed bond
        dimensions with explicit Majorana-string propagation, using a numerical
        linked-cluster expansion (NLCE) as the energy reference.
      </p>
      <div className="results-parameters" aria-label="Model parameters">
        <span>37 sites</span><span>Spinful Hubbard model</span><span>t = 1 · U = 8 · μ = U/2</span>
      </div>

      <figure className="results-figure">
        <div className="results-plots">
          <ResultPanel title="Thermal energy versus inverse temperature, with the NLCE reference" viewBox="0 0 403 274" />
          <ResultPanel title="Absolute error in energy per site against NLCE versus stored numbers" viewBox="0 273 403 274" />
        </div>
        <div className="results-legend">
          <div className="legend-series">
            <p>My MPS · bond dimension</p>
            <div>{mpsSeries.map(({ chi, color }) => <span key={chi}><i className="legend-swatch with-point" style={{color}} />χ = {chi}</span>)}</div>
          </div>
          <div className="legend-series">
            <p>Majorana-string propagation · coefficient threshold</p>
            <div>{referenceSeries.map(({ exponent, color }) => <span key={exponent}><i className="legend-swatch" style={{color}} /><span>2<sup>−{exponent}</sup></span></span>)}</div>
          </div>
          <div className="legend-markers">
            <span><b>×</b> NLCE, order 7</span>
            <span><b>■</b> β = 0.1</span><span><b>▲</b> β = 0.2</span><span><b>◆</b> β = 0.4</span><span><b>▼</b> β = 0.8</span><span><b>✚</b> β = 1.2</span>
          </div>
        </div>
        <details className="results-details">
          <summary>Storage and propagation time <ChevronDown size={17} aria-hidden="true" /></summary>
          <div className="results-plots">
            <ResultPanel title="Stored MPS entries and Majorana strings versus inverse temperature" viewBox="403 0 397.376584 274" />
            <ResultPanel title="Cumulative propagation time on shared compute nodes versus inverse temperature" viewBox="403 273 397.376584 274" />
          </div>
          <p className="results-detail-copy">Storage counts MPS entries or stored strings, not bytes. The timing panel records propagation on shared nodes with different integrators and thread counts; it is not a controlled speed comparison.</p>
        </details>
      </figure>

      <details className="results-setup">
        <summary>Numerical setup and comparison <ChevronDown size={17} aria-hidden="true" /></summary>
        <div>
          <p>The energy plot uses β/2 on the horizontal axis, following the comparison figure. Error is the absolute difference in energy per site from NLCE. The MPS runs with χ = 16–128 reach β = 2; the χ = 256 curve is shown up to β = 1.9.</p>
          <p>Thermal evolution starts from the identity. My MPS uses local dimension d = 4, a second-order schedule with Δβ = 0.02, and fixed bond dimensions χ = 16–256. It is normalised to the identity coefficient after each gate; the small cutoff is 2<sup>−30</sup>.</p>
          <p>The blue curves reproduce the gate set and coefficient-truncation scheme of <a href="https://arxiv.org/abs/2602.04878" target="_blank" rel="noreferrer">Rudolph et al., <em>Thermal State Simulation with Pauli and Majorana Propagation</em> <ArrowUpRight size={13} aria-hidden="true" /></a>, using first-order steps of 0.04 in my β convention. Their scheme is labelled “their scheme” in the original figure. Panel (c) includes runs reaching at least two NLCE temperatures.</p>
          <p>Reference points use seventh-order NLCE. Results are a snapshot from 14 October 2026; shorter curves denote partial trajectories.</p>
        </div>
      </details>
    </section>
  );
}
