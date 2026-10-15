import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  GraduationCap,
  Mail,
} from 'lucide-react';
import { ChargeFlowDiagram, ManyBodySketch } from './tensor-diagrams';

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

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.09c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.71 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.15 5.55.41.35.77 1.03.77 2.08v3.1c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.45 2H3.55C2.7 2 2 2.68 2 3.51v16.98c0 .83.7 1.51 1.55 1.51h16.9c.86 0 1.55-.68 1.55-1.51V3.51C22 2.68 21.3 2 20.45 2ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.46 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.29 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.52V9.2h2.82v1.3h.04c.39-.74 1.35-1.53 2.78-1.53 2.97 0 3.59 1.95 3.59 4.49v5.29Z" />
    </svg>
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
        <a className="header-cv" href="/cv.pdf" target="_blank" rel="noreferrer" aria-label="View academic CV (PDF)">
          <FileText size={18} strokeWidth={1.7} aria-hidden="true" /> CV
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
              <Mail size={18} strokeWidth={1.7} aria-hidden="true" /> Get in touch
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
            <p className="supervision">Supervised by Prof. Christian B. Mendl</p>
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
        <div className="social-links">
          <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
            <GithubIcon />
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <LinkedinIcon />
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
