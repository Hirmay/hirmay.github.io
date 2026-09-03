import {
  ArrowDown,
  ArrowUpRight,
  Download,
  GraduationCap,
  Mail,
} from 'lucide-react';

const links = {
  email: 'mailto:hirmaysandesara@gmail.com',
  github: 'https://github.com/hirmay',
  linkedin: 'https://www.linkedin.com/in/hirmay-sandesara-504874198',
  scholar: 'https://scholar.google.com/citations?user=NhJzdIsAAAAJ&hl=en',
};

const researchInterests = [
  'Tensor-network algorithms',
  'Quantum many-body systems',
  'Fermionic dynamics',
  'Thermal-state simulation',
];

function HeroNetworkSketch() {
  return (
    <svg
      className="hero-network-sketch"
      viewBox="0 0 210 132"
      aria-hidden="true"
    >
      <path className="sketch-line" d="M16 68 C45 58, 59 78, 86 66 S136 55, 191 69" />
      <path className="sketch-line faint" d="M52 66 C48 91, 63 104, 60 123" />
      <path className="sketch-line faint" d="M108 64 C105 38, 118 23, 116 7" />
      <path className="sketch-line faint" d="M163 63 C169 88, 155 103, 162 124" />
      <rect className="sketch-node" x="42" y="55" width="22" height="22" rx="2" />
      <rect className="sketch-node" x="98" y="53" width="22" height="22" rx="2" />
      <rect className="sketch-node" x="153" y="55" width="22" height="22" rx="2" />
      <text x="49" y="70">A</text>
      <text x="105" y="68">A</text>
      <text x="160" y="70">A</text>
      <text className="sketch-caption" x="4" y="29">a small state,</text>
      <text className="sketch-caption" x="116" y="110">a large system</text>
    </svg>
  );
}

function MajoranaStringMotif() {
  return (
    <figure className="micro-motif majorana-string-motif">
      <div className="micro-motif-heading">
        <span>Majorana string</span>
        <small>endpoint-local</small>
      </div>
      <svg
        viewBox="0 0 340 112"
        role="img"
        aria-labelledby="majorana-motif-title majorana-motif-description"
      >
        <title id="majorana-motif-title">A long Majorana string stored through its endpoints</title>
        <desc id="majorana-motif-description">
          Gamma a and gamma b act at opposite endpoints. The crossed interior sites
          contribute virtual parity information instead of a stored numerical string.
        </desc>
        <path className="motif-bond" d="M43 61 C102 56 235 66 297 60" />
        <path className="motif-parity-path" d="M81 61 C130 31 211 30 260 60" />
        {[92, 132, 172, 212, 252].map((x) => (
          <g key={x}>
            <rect className="motif-site" x={x - 8} y="53" width="16" height="16" rx="1.5" />
            <path className="motif-leg" d={`M${x} 69 L${x} 87`} />
          </g>
        ))}
        <circle className="motif-endpoint" cx="52" cy="61" r="18" />
        <circle className="motif-endpoint" cx="288" cy="61" r="18" />
        <text className="motif-endpoint-copy" x="52" y="66">γₐ</text>
        <text className="motif-endpoint-copy" x="288" y="66">γᵦ</text>
        <text className="motif-path-copy" x="171" y="25">virtual parity remembers the middle</text>
        <text className="motif-tiny-copy" x="171" y="105">two numerical endpoints · one charge trail</text>
      </svg>
    </figure>
  );
}

function CompressionMotif() {
  return (
    <figure className="micro-motif compression-motif">
      <div className="micro-motif-heading">
        <span>After the update</span>
        <small>compress, but keep the sectors</small>
      </div>
      <svg
        viewBox="0 0 380 130"
        role="img"
        aria-labelledby="compression-title compression-description"
      >
        <title id="compression-title">Charge-aware singular value compression</title>
        <desc id="compression-description">
          A wide bond carrying even and odd charge sectors is compressed by a
          sector-aware singular value decomposition into a smaller bond.
        </desc>
        <rect className="compress-tensor" x="24" y="44" width="42" height="42" rx="2" />
        <rect className="compress-tensor" x="126" y="44" width="42" height="42" rx="2" />
        <path className="compress-sector even" d="M66 55 C87 49 104 50 126 55" />
        <path className="compress-sector odd" d="M66 66 C88 62 104 63 126 66" />
        <path className="compress-sector spare" d="M66 77 C88 82 105 82 126 77" />
        <text className="compress-charge" x="96" y="40">q = 0, 1</text>
        <path className="compress-arrow" d="M185 65 C206 65 217 65 236 65" />
        <path className="compress-arrow" d="M230 59 L237 65 L230 71" />
        <text className="compress-svd" x="211" y="48">SVD</text>
        <rect className="compress-tensor after" x="253" y="44" width="42" height="42" rx="2" />
        <rect className="compress-tensor after" x="338" y="44" width="42" height="42" rx="2" />
        <path className="compress-sector kept" d="M295 60 C310 56 324 57 338 60" />
        <path className="compress-sector kept odd" d="M295 72 C311 76 324 76 338 72" />
        <text className="compress-rank" x="317" y="31">χ → χ̃</text>
        <text className="motif-tiny-copy" x="190" y="118">truncate within charge blocks, not across them</text>
      </svg>
    </figure>
  );
}

function ThermalLayersMotif() {
  const sites = [88, 142, 196, 250];
  const layers = [88, 58, 28];

  return (
    <figure className="micro-motif thermal-motif">
      <div className="micro-motif-heading">
        <span>Thermal states</span>
        <small>imaginary time, layer by layer</small>
      </div>
      <svg
        viewBox="0 0 340 132"
        role="img"
        aria-labelledby="thermal-title thermal-description"
      >
        <title id="thermal-title">Layered imaginary-time tensor network</title>
        <desc id="thermal-description">
          Three short layers of local gates act above a four-site matrix product state,
          with imaginary time increasing upward.
        </desc>
        <path className="thermal-time" d="M42 99 L42 20" />
        <text className="thermal-time-copy" x="27" y="18">τ</text>
        {layers.map((y, layerIndex) => (
          <g key={y} className={`thermal-layer layer-${layerIndex}`}>
            <path className="thermal-rail" d={`M70 ${y} L268 ${y}`} />
            {sites.map((x, siteIndex) => (
              <g key={`${x}-${y}`}>
                <circle className="thermal-site" cx={x} cy={y} r="6" />
                {layerIndex < layers.length - 1 && (
                  <path className="thermal-vertical" d={`M${x} ${y - 6} L${x} ${layers[layerIndex + 1] + 6}`} />
                )}
                {siteIndex < sites.length - 1 && (siteIndex + layerIndex) % 2 === 0 && (
                  <rect className="thermal-gate" x={x + 15} y={y - 8} width="24" height="16" rx="2" />
                )}
              </g>
            ))}
          </g>
        ))}
        <text className="motif-tiny-copy" x="170" y="122">e<tspan baselineShift="super" fontSize="8">−ΔτH</tspan> · compress · repeat</text>
      </svg>
    </figure>
  );
}

function ChargeFlowDiagram() {
  return (
    <figure className="charge-diagram">
      <div className="diagram-heading">
        <span>Endpoint-prefix update</span>
        <small>one long-range Majorana term</small>
      </div>
      <div className="diagram-scroll">
        <svg
          viewBox="0 0 1040 360"
          role="img"
          aria-labelledby="charge-flow-title charge-flow-description"
        >
          <title id="charge-flow-title">Virtual charge flow through a long-range MPS update</title>
          <desc id="charge-flow-description">
            Endpoint operators ell a and ell b act on tensors i and j. Signs are read
            from old prefix charges, the virtual charges between the endpoints are
            toggled, and the charge is restored after the right endpoint.
          </desc>
          <defs>
            <pattern id="paper-dots" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" className="diagram-dot" />
            </pattern>
            <marker id="charge-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="arrow-head" />
            </marker>
          </defs>

          <rect x="0" y="0" width="1040" height="360" fill="url(#paper-dots)" opacity="0.52" />

          <path className="diagram-bond" d="M44 206 C95 202 153 210 224 205" />
          <path className="diagram-bond toggled" d="M288 205 C346 198 419 211 488 205" />
          <path className="diagram-bond toggled" d="M552 205 C615 210 690 199 752 205" />
          <path className="diagram-bond" d="M816 205 C884 200 934 208 996 204" />

          <text className="bond-copy" x="119" y="179">old</text>
          <text className="bond-copy active" x="336" y="176">Q₁ → Q₁ ⊕ 1</text>
          <text className="bond-copy active" x="601" y="176">Q₂ → Q₂ ⊕ 1</text>
          <text className="bond-copy" x="884" y="178">restored</text>

          <rect className="diagram-tensor" x="224" y="173" width="64" height="64" rx="3" />
          <rect className="diagram-tensor middle" x="488" y="173" width="64" height="64" rx="3" />
          <rect className="diagram-tensor" x="752" y="173" width="64" height="64" rx="3" />
          <text className="tensor-copy" x="256" y="212">A<tspan baselineShift="super" fontSize="13">[i]</tspan></text>
          <text className="tensor-copy dots" x="520" y="210">⋯</text>
          <text className="tensor-copy" x="784" y="212">A<tspan baselineShift="super" fontSize="13">[j]</tspan></text>

          <circle className="endpoint-node" cx="256" cy="66" r="31" />
          <circle className="endpoint-node" cx="784" cy="66" r="31" />
          <text className="endpoint-copy" x="256" y="73">ℓₐ</text>
          <text className="endpoint-copy" x="784" y="73">ℓᵦ</text>
          <path className="endpoint-flow" markerEnd="url(#charge-arrow)" d="M256 99 C256 120 256 142 256 164" />
          <path className="endpoint-flow" markerEnd="url(#charge-arrow)" d="M784 99 C784 120 784 142 784 164" />
          <text className="sign-copy" x="274" y="134">(−1)<tspan baselineShift="super" fontSize="12">Qᵢ₋₁</tspan></text>
          <text className="sign-copy right" x="801" y="134">(−1)<tspan baselineShift="super" fontSize="12">Qⱼ₋₁</tspan></text>

          <path className="physical-leg" d="M256 237 C254 262 259 279 256 302" />
          <path className="physical-leg" d="M520 237 C524 260 516 281 520 302" />
          <path className="physical-leg" d="M784 237 C780 261 788 281 784 302" />
          <text className="physical-copy" x="256" y="326">sᵢ</text>
          <text className="physical-copy" x="520" y="326">sₖ</text>
          <text className="physical-copy" x="784" y="326">sⱼ</text>

          <path className="scribble-arrow" markerEnd="url(#charge-arrow)" d="M615 321 C654 339 704 337 737 307" />
          <text className="scribble-copy" x="500" y="346">toggle only the interval [i, j)</text>
        </svg>
      </div>
      <figcaption>
        <strong>Read, act, toggle.</strong> I first read the old prefix charges, then
        apply the endpoint maps and signs, and only afterwards XOR-toggle the bond
        charges across the interval. No numerical parity string is applied to every
        tensor in the middle.
      </figcaption>
    </figure>
  );
}

function ManyBodySketch() {
  return (
    <div className="many-body-sketch">
      <div className="many-body-note">many local choices → one global state</div>
      <svg viewBox="0 0 720 170" aria-hidden="true">
        <path className="many-arc" d="M89 90 Q151 20 213 90" />
        <path className="many-arc second" d="M213 90 Q277 148 341 90" />
        <path className="many-arc" d="M341 90 Q405 20 469 90" />
        <path className="many-arc second" d="M469 90 Q533 148 597 90" />
        {[89, 213, 341, 469, 597].map((x, index) => (
          <g key={x}>
            <circle className="many-site" cx={x} cy="90" r="16" />
            <text className="many-spin" x={x} y="96">{index % 2 === 0 ? '↑' : '↓'}</text>
          </g>
        ))}
        <path className="many-baseline" d="M60 90 C206 84 482 96 626 90" />
        <text className="many-equation" x="356" y="157">|ψ⟩ ≈ A¹ — A² — ··· — Aᴸ</text>
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Hirmay Sandesara, home">
          HS<span>.</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#research">Research</a>
          <a href="#work">Selected work</a>
          <a href="#background">Background</a>
        </nav>
        <a className="header-cv" href="/resume_main.pdf" target="_blank">
          CV <Download size={15} strokeWidth={1.8} />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">M.Sc. student · Technical University of Munich</p>
          <h1>
            Hirmay
            <br />
            Sandesara<span>.</span>
          </h1>
          <p className="intro">
            I develop numerical methods for quantum many-body systems. My current
            work focuses on tensor-network representations for fermionic dynamics,
            with the aim of avoiding explicit exponential storage while keeping the
            underlying physics visible in the algorithm.
          </p>
          <p className="phd-status">
            <span>PhD search</span>
            I am looking for positions in the Fall 2027 cycle.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#research">
              Read about my research <ArrowDown size={17} />
            </a>
            <a className="text-action" href={links.email}>
              Get in touch <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="portrait-wrap">
          <HeroNetworkSketch />
          <div className="portrait-frame">
            <img
              src="/hirmay-sandesara.jpg"
              alt="Portrait of Hirmay Sandesara"
              className="portrait"
            />
          </div>
          <p className="portrait-note">Based in Munich, Germany</p>
        </div>
      </section>

      <section className="research-section" id="research">
        <div className="section-kicker">
          <span>01</span>
          <p>Current research</p>
        </div>
        <div className="research-grid">
          <div>
            <p className="supervision">Supervised by Dr. Christian B. Mendl</p>
            <h2>Tracking fermionic parity inside a matrix product state.</h2>
          </div>
          <div className="research-body">
            <p>
              I am developing an operator-space matrix product state approach for
              propagating Majorana operators in fermionic systems with long-range
              interactions. Long Jordan-Wigner and Majorana strings make the signs
              difficult to handle without storing a rapidly growing set of terms.
            </p>
            <p>
              My approach places virtual <span className="math">ℤ₂</span> charge
              labels on the MPS bonds. These labels record the accumulated fermionic
              parity, so the string signs can be recovered from endpoint and virtual-
              state information. The tensor contractions and SVD compression remain
              charge-aware throughout.
            </p>
          </div>
        </div>

        <MajoranaStringMotif />

        <div className="method-card">
          <div className="method-copy">
            <div>
              <p className="method-label">Virtual charge rule</p>
              <p className="equation">q<sub>R</sub> = q<sub>L</sub> ⊕ p(s)</p>
            </div>
            <p>
              The bond charge is a small bookkeeping variable with a useful job: it
              remembers the parity accumulated to the left of the current site.
            </p>
          </div>
          <ChargeFlowDiagram />
        </div>
      </section>

      <section className="interests-band">
        <p>Research interests</p>
        <div className="interest-list">
          {researchInterests.map((interest, index) => (
            <span key={interest}>
              <small>0{index + 1}</small>
              {interest}
            </span>
          ))}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-kicker">
          <span>02</span>
          <p>Selected work</p>
        </div>
        <div className="work-heading">
          <h2>A few problems I have worked on.</h2>
          <div>
            <p>
              My path into tensor networks grew out of quantum algorithms, simulation,
              and open-source work. I like problems where mathematical structure can
              be turned into a practical numerical method.
            </p>
            <CompressionMotif />
          </div>
        </div>

        <div className="work-list">
          <article className="work-item">
            <div className="work-meta">
              <span>Research publication</span>
              <time>2025</time>
            </div>
            <h3>Quantum approach to nonlinear optimal control</h3>
            <p>
              I developed and implemented a modified variational quantum algorithm
              for a multidimensional nonlinear optimal-control framework involving
              broken-PT-symmetric systems. The work was published in <em>Quantum
              Information Processing</em>.
            </p>
            <a href="https://link.springer.com/article/10.1007/s11128-025-04710-z" target="_blank" rel="noreferrer">
              View publication <ArrowUpRight size={17} />
            </a>
          </article>

          <article className="work-item">
            <div className="work-meta">
              <span>MIT iQuHack · IonQ Challenge</span>
              <time>2026</time>
            </div>
            <h3>Entanglement distillation with a minimal Bell-pair budget</h3>
            <p>
              I led the team that built a heuristic parity-check protocol for
              entanglement distillation. We placed second with a score of 89 and
              high-fidelity edge claiming of at least 0.9.
            </p>
            <a href="https://github.com/Hirmay/iQuHack-IonQ-Challenge---2nd-Prize" target="_blank" rel="noreferrer">
              View project <ArrowUpRight size={17} />
            </a>
          </article>

          <article className="work-item">
            <div className="work-meta">
              <span>Open source</span>
              <time>Ongoing</time>
            </div>
            <h3>Tools and learning resources for quantum computing</h3>
            <p>
              I have contributed to Qiskit&apos;s circuit library and textbook, fixed a
              Qiskit Terra bug, and translated more than 5,000 words of educational
              material into Hindi.
            </p>
            <a href={links.github} target="_blank" rel="noreferrer">
              Visit GitHub <ArrowUpRight size={17} />
            </a>
          </article>
        </div>
      </section>

      <section className="background-section" id="background">
        <div className="section-kicker light-kicker">
          <span>03</span>
          <p>Background</p>
        </div>
        <div className="background-grid">
          <div>
            <h2>I am interested in efficient numerical algorithms for quantum many-body simulation.</h2>
            <p>
              I am especially interested in tensor-network methods for fermionic
              dynamics, thermal states, and strongly interacting systems. I want to
              understand not only whether an algorithm works, but when its ranks stay
              manageable, what accuracy costs, and where the representation begins to fail.
            </p>
            <ThermalLayersMotif />
          </div>
          <div className="timeline">
            <article>
              <GraduationCap size={21} />
              <div>
                <span>2024 — present</span>
                <h3>M.Sc. Computational Science and Engineering</h3>
                <p>Technical University of Munich · Grade 1.5</p>
                <small>TUM Merit Scholarship · Deutschlandstipendium</small>
              </div>
            </article>
            <article>
              <GraduationCap size={21} />
              <div>
                <span>2019 — 2023</span>
                <h3>B.Tech. Computer Science and Engineering</h3>
                <p>Ahmedabad University · Rank 2 of 140</p>
                <small>Graduated with highest excellence</small>
              </div>
            </article>
          </div>
        </div>
        <ManyBodySketch />
      </section>

      <section className="contact-section">
        <p className="eyebrow">Let&apos;s talk</p>
        <h2>Interested in working together?</h2>
        <p>
          I would be glad to hear about PhD opportunities and research conversations
          in tensor networks, quantum simulation, and computational many-body physics.
        </p>
        <a className="contact-email" href={links.email}>
          hirmaysandesara@gmail.com <ArrowUpRight size={25} />
        </a>
      </section>

      <footer>
        <p>© 2026 Hirmay Sandesara</p>
        <p className="footer-signoff">tensors, signs, and careful approximations.</p>
        <div className="social-links">
          <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            GH
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            IN
          </a>
          <a href={links.scholar} target="_blank" rel="noreferrer" aria-label="Google Scholar">
            <GraduationCap size={20} />
          </a>
          <a href={links.email} aria-label="Email">
            <Mail size={19} />
          </a>
        </div>
      </footer>
    </main>
  );
}
