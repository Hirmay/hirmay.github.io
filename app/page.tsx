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

        <div className="method-card" aria-label="Schematic of the virtual charge update">
          <div className="method-copy">
            <p className="method-label">Virtual charge rule</p>
            <p className="equation">
              q<sub>R</sub> = q<sub>L</sub> ⊕ p(s)
            </p>
            <p>
              The right bond charge equals the incoming charge plus the parity of
              the local operator label, modulo two.
            </p>
          </div>
          <div className="tensor-chain" aria-hidden="true">
            <span className="bond-label label-a">q<sub>L</sub></span>
            <span className="bond-label label-b">q<sub>R</sub></span>
            <span className="bond line-one" />
            <span className="tensor tensor-one">A¹</span>
            <span className="bond line-two" />
            <span className="tensor tensor-two">A²</span>
            <span className="bond line-three" />
            <span className="tensor tensor-three">A³</span>
            <span className="bond line-four" />
            <span className="physical physical-one" />
            <span className="physical physical-two" />
            <span className="physical physical-three" />
          </div>
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
          <p>
            My path into tensor networks grew out of quantum algorithms, simulation,
            and open-source work. I like problems where mathematical structure can
            be turned into a practical numerical method.
          </p>
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
            <h2>I am looking for a PhD where numerical ideas meet hard physical problems.</h2>
            <p>
              I am especially interested in scalable algorithms for fermionic
              dynamics, thermal states, and strongly interacting systems. I want to
              understand not only whether a tensor-network method works, but when its
              ranks stay manageable and where the representation begins to fail.
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
