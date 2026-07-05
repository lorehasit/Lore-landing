/**
 * Zero-config content fallback.
 *
 * Mirrors the exact copy from legacy/index.html and legacy/docs.html. The
 * FAQ and docs sections render from Sanity when NEXT_PUBLIC_SANITY_PROJECT_ID
 * is configured; otherwise they render from here, so `npm run dev` reproduces
 * the original site with zero external accounts.
 */

export type FaqItem = {
  _id: string;
  question: string;
  answerHtml: string;
};

export const faqItems: FaqItem[] = [
  {
    _id: "wiki-vs-memory",
    question: "Why decision memory instead of a wiki?",
    answerHtml:
      "<p>Wikis demand discipline no team sustains — and the “why” is almost never written down in the first place. Lore captures reasoning automatically, in the medium where it’s actually created, and keeps it current as decisions change.</p>",
  },
  {
    _id: "search-vs-lore",
    question: "How is this different from enterprise search?",
    answerHtml:
      "<p>Search retrieves documents. The reasoning was never in a document — it’s scattered across PRs, threads, and retros. Lore reconstructs the decision itself: what, why, trade-offs, people — each linked to its evidence.</p>",
  },
  {
    _id: "what-it-reads",
    question: "What does it read, exactly?",
    answerHtml:
      '<p>Merged GitHub pull requests — title, description, <strong>and the full review discussion</strong> — plus any commit with a <code class="why">Why:</code> line via the Scribe. On install, Lore also backfills your recent PR history, so the memory is useful from day one. Slack, Linear, and Jira are on the roadmap. You control which repos are connected.</p>',
  },
  {
    _id: "privacy",
    question: "Is our code and data private?",
    answerHtml:
      "<p>Yes. Each team gets its own isolated memory store, everything is encrypted in transit and at rest, and your data is never used to train shared models. Answers are grounded only in your team’s own sources.</p>",
  },
  {
    _id: "stale-answers",
    question: "What if an answer is wrong or stale?",
    answerHtml:
      "<p>Every answer cites its sources, so it can be checked in one click. When a decision changes — a new PR, a reversal in a thread — the memory updates, and the old answer is superseded, not silently kept.</p>",
  },
  {
    _id: "who",
    question: "Who's behind this?",
    answerHtml:
      "<p>A small founding team of engineers who got tired of being their team’s tribal-knowledge hotline. Design partners are onboarded by hand, with founding pricing locked in.</p>",
  },
];

export type DocsSection = {
  _id: string;
  slug: string;
  navGroup: "Start" | "Surfaces" | "Backend";
  title: string;
  /** Plain-text title for the sidebar link, when `title` contains inline markup (e.g. a pill). */
  navTitle?: string;
  order: number;
  html: string;
};

export const docsSections: DocsSection[] = [
  {
    _id: "overview",
    slug: "overview",
    navGroup: "Start",
    title: "Overview",
    order: 0,
    html: `
      <p>Lore is <strong>decision memory for engineering teams</strong>. It captures the <em>why</em>
      behind technical decisions — from merged pull requests and commit messages — and lets anyone
      recall it in plain English, with a citation to the source.</p>
      <p>One backend (the engine) does the thinking; thin clients talk to it: a VS Code extension,
      a terminal CLI, and a GitHub App. Ask <code>/lore &lt;question&gt;</code> and get a cited answer.</p>
    `,
  },
  {
    _id: "lexicon",
    slug: "lexicon",
    navGroup: "Start",
    title: "Lexicon",
    order: 1,
    html: `
      <table>
        <tbody>
        <tr><th>Term</th><th>Meaning</th></tr>
        <tr><td><strong>a Why</strong></td><td>One captured decision + its reasoning (the atomic unit)</td></tr>
        <tr><td><strong>the Canon</strong></td><td>A team/repo's body of Whys</td></tr>
        <tr><td><strong>Provenance</strong></td><td>The sources a Why is grounded in (PRs, commits)</td></tr>
        <tr><td><strong>the Scribe</strong></td><td>The npm git-hook that captures commits</td></tr>
        <tr><td><strong>inscribe</strong> / <strong>recall</strong></td><td>Write to / read from the Canon</td></tr>
        </tbody>
      </table>
    `,
  },
  {
    _id: "quickstart",
    slug: "quickstart",
    navGroup: "Start",
    title: "Quick start",
    order: 2,
    html: `
      <p>Point any client at a running backend, then ask. A hosted backend URL looks like
      <code>https://your-space.hf.space</code>. Check it's alive:</p>
      <pre><code>GET /health   →   {"mode":"live","canon_store":"pgvector", ...}</code></pre>
      <div class="callout">No backend yet? See <a href="#selfhost">Self-hosting</a>. It runs locally with zero keys in "mock" mode, and goes live with a Groq API key.</div>
    `,
  },
  {
    _id: "vscode",
    slug: "vscode",
    navGroup: "Surfaces",
    title: "VS Code extension",
    order: 3,
    html: `
      <p>A <code>/lore</code> side-panel in your editor, plus a right-click <em>"Why is this here?"</em> on any code selection.</p>
      <h3>Install</h3>
      <pre><code>code --install-extension lore-0.1.2.vsix</code></pre>
      <p>Then reload VS Code. Set the backend URL in Settings → <code>lore.backendUrl</code>.</p>
      <h3>Use</h3>
      <ul>
        <li>Click the <strong>Lore</strong> icon in the Activity Bar → type a question in the <code>/lore</code> box.</li>
        <li>Select code → right-click → <strong>"Lore: Why is this here?"</strong></li>
        <li>The status bar shows <code>Lore: live</code> when connected.</li>
      </ul>
    `,
  },
  {
    _id: "cli",
    slug: "cli",
    navGroup: "Surfaces",
    title: "Terminal (CLI)",
    order: 4,
    html: `
      <h3>Install</h3>
      <pre><code>npm install -g lore</code></pre>
      <h3>Interactive mode</h3>
      <p>Run <code>lore</code> with no arguments for a full-screen prompt (banner + <code>/lore</code> REPL). Quit with <code>/quit</code>.</p>
      <pre><code>lore                       # interactive prompt
lore recall "why postgres?"  # one-off question
lore canon                   # list the Canon</code></pre>
      <p>Configure the backend via <code>~/.lore.json</code>, a per-repo <code>.lore.json</code>,
      <code>--url</code>, or the <code>LORE_BACKEND_URL</code> env var.</p>
      <pre><code>{ "backendUrl": "https://your-space.hf.space", "canon": "my-repo" }</code></pre>
    `,
  },
  {
    _id: "scribe",
    slug: "scribe",
    navGroup: "Surfaces",
    title: 'The Scribe <span class="pill">git hook</span>',
    navTitle: "The Scribe",
    order: 5,
    html: `
      <p>Capture the <em>why</em> of a commit automatically. Install into any repo:</p>
      <pre><code>npm install --save-dev lore
npx lore init --url https://your-space.hf.space --canon my-repo</code></pre>
      <p>Then add a <code>Why:</code> line to a commit — the Scribe inscribes it. Commits without a
      <code>Why:</code> are ignored, keeping the Canon high-signal.</p>
      <pre><code>git commit -m "feat(auth): short-lived JWTs" \\
           -m "Why: Redis failover logged everyone out; stateless tokens remove that SPOF."</code></pre>
    `,
  },
  {
    _id: "github",
    slug: "github",
    navGroup: "Surfaces",
    title: 'GitHub App <span class="pill">auto-capture</span>',
    navTitle: "GitHub App",
    order: 6,
    html: `
      <p>Install once; every <strong>merged pull request</strong> is captured automatically — no developer effort.</p>
      <ol>
        <li>Create a GitHub App (Settings → Developer settings → GitHub Apps).</li>
        <li>Webhook URL: <code>https://your-space.hf.space/webhook/github</code></li>
        <li>Webhook secret: set the same value as the backend's <code>GITHUB_WEBHOOK_SECRET</code>.</li>
        <li>Permissions: <strong>Pull requests → Read</strong>. Events: subscribe to <strong>Pull request</strong>.</li>
        <li>Install it on your repos.</li>
      </ol>
      <div class="callout">Only <strong>merged</strong> PRs are captured (a merge = a finalized decision). Webhooks are HMAC-signature verified.</div>
    `,
  },
  {
    _id: "selfhost",
    slug: "selfhost",
    navGroup: "Backend",
    title: "Self-hosting the backend",
    order: 7,
    html: `
      <pre><code>cd backend
pip install -r requirements.txt
cp .env.example .env      # add GROQ_API_KEY to go live (runs in mock mode without one)
uvicorn main:app --port 8000</code></pre>
      <h3>Environment</h3>
      <table>
        <tbody>
        <tr><th>Variable</th><th>Purpose</th></tr>
        <tr><td><code>GROQ_API_KEY</code></td><td>LLM (empty = mock mode)</td></tr>
        <tr><td><code>GROQ_MODEL</code></td><td>e.g. <code>llama-3.1-8b-instant</code></td></tr>
        <tr><td><code>EMBEDDER_MODEL</code> / <code>EMBEDDER_DIMS</code></td><td>local embeddings (fastembed)</td></tr>
        <tr><td><code>VECTOR_STORE</code></td><td><code>qdrant</code> (local) or <code>pgvector</code> (hosted)</td></tr>
        <tr><td><code>DATABASE_URL</code></td><td>Postgres connection string (pgvector mode)</td></tr>
        <tr><td><code>GITHUB_WEBHOOK_SECRET</code></td><td>verifies GitHub webhooks</td></tr>
        </tbody>
      </table>
      <p>For a shared team brain, set <code>VECTOR_STORE=pgvector</code> with a managed Postgres
      (Supabase/Neon) — the table and <code>vector</code> extension are created automatically.</p>
    `,
  },
  {
    _id: "deploy",
    slug: "deploy",
    navGroup: "Backend",
    title: "Deploying",
    order: 8,
    html: `
      <p>The backend ships with configs for three hosts:</p>
      <ul>
        <li><strong>Hugging Face Spaces</strong> (free, Docker) — drop the <code>hf-space/</code> files into a Docker Space, set secrets.</li>
        <li><strong>Fly.io</strong> — <code>fly launch</code> + <code>fly deploy</code> (Dockerfile + <code>fly.toml</code>).</li>
        <li><strong>Render</strong> — a <code>render.yaml</code> Blueprint.</li>
      </ul>
      <p>Then point clients at the public URL (extension <code>lore.backendUrl</code>, CLI <code>--url</code>, GitHub App webhook).</p>
    `,
  },
  {
    _id: "api",
    slug: "api",
    navGroup: "Backend",
    title: "API reference",
    order: 9,
    html: `
      <table>
        <tbody>
        <tr><th>Endpoint</th><th>Does</th></tr>
        <tr><td><code>GET /health</code></td><td>mode + Canon store</td></tr>
        <tr><td><code>POST /why</code></td><td>recall — composed, cited answer</td></tr>
        <tr><td><code>POST /lore</code></td><td>free search across the Canon</td></tr>
        <tr><td><code>POST /inscribe</code></td><td>inscribe a commit's Why</td></tr>
        <tr><td><code>POST /webhook/github</code></td><td>GitHub App webhook (auto-capture)</td></tr>
        <tr><td><code>GET /canon</code></td><td>everything in the Canon</td></tr>
        <tr><td><code>POST /ingest/seed</code> · <code>/ingest/repo</code></td><td>seed / GitHub-PR ingestion</td></tr>
        </tbody>
      </table>
      <pre><code>curl -X POST https://your-space.hf.space/why \\
  -H "Content-Type: application/json" \\
  -d '{"question":"why is auth stateless?"}'</code></pre>
    `,
  },
  {
    _id: "architecture",
    slug: "architecture",
    navGroup: "Backend",
    title: "Architecture",
    order: 10,
    html: `
      <pre><code>VS Code / CLI / GitHub App  →  Backend (FastAPI)  →  mem0
                                                     ├─ Groq (LLM)
                                                     ├─ fastembed (embeddings, local)
                                                     └─ Qdrant / pgvector (vector store)</code></pre>
      <p>Capture: a merged PR or a <code>Why:</code> commit → distilled into the Canon.
      Recall: a question → semantic search → an LLM composes a cited answer.</p>
    `,
  },
];

export const docsNavGroups: DocsSection["navGroup"][] = ["Start", "Surfaces", "Backend"];
