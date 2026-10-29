# BioSynth Research Lab — 29 October 2026

## Delivered

Expanded the original static website into Home, Research Academy, Scientific Laboratory, Economic Value Laboratory, Research Portfolio, Implementation Roadmap and Open Research. All twelve systems have an analogy, mechanism steps, defined equation, worked hypothetical example, achieved/unverified distinction, failure mode, economic value channel and falsifiable next experiment.

Added searchable/category-filtered project cards, deep-link disclosures, experiment briefs, expandable six-stage research method, deterministic population selection, Bayesian updating, opportunity-cost purchasing and a full freight capacity calculator with scenario export. Native disclosures and complete static lessons work without JavaScript; calculator assumptions remain disabled until enhancement loads.

Preserved original HTML byte for byte, master prompt, LICENSE and all earlier history. Unsupported historical precision is retained in the archive/audit, not promoted as verified findings. FORGE and Q-Branch primary project sources were inspected and their blob IDs recorded. Background references for Bayes, game dynamics and constrained optimization are separate from project evidence.

## Validation actually executed

- `node --test tests/*.test.cjs`: **19 passing, 0 failing** in the release candidate. Covers economic arithmetic, zero/negative/invalid/overflow cases, probability and population behavior, twelve-project completeness, original-page preservation, no-script safety and scientific-reference availability. Six UI tests execute the production app against a small DOM fixture; this is not a complete browser implementation.
- `python3 scripts/render.py --check`: generated HTML matches source.
- `python3 scripts/check_site.py`: **81 local links/fragments pass**, along with unique IDs, explicit labels, language, one h1 and responsive/focus/reduced-motion rule checks.
- `node --check docs/assets/app.js` and `node --check docs/assets/models.js`: syntax checks pass.
- `git diff --check`: no whitespace errors.
- Chrome desktop: inspected homepage visually; exercised realization change to 100% ($14,000), reset (−$1,400), category plus text search, deep-link lesson expansion, invalid realization/export disabling, experiment selection and keyboard slider endpoints.
- Chrome responsive fixtures: 375px and 768px iframe elements (360px and 753px content area with scrollbar) show no document-wide horizontal overflow. Inspected mobile/tablet home visually; mobile calculator form is 320px within 360px content. Navigation has its own intentional horizontal scroller on narrow screens; evidence table scrolls within its region.
- Script-blocked sandbox: complete lessons and default −$1,400 example render; assumptions are disabled; native LOVE lesson disclosure opens without scripts.
- Independent reviewer reran the then-current 16-test suite and static checks. No critical defects; missing background links were added. No-script input safety was also improved. The final 19-test suite is separately rerun by the implementer. External `main` links remain mutable, with inspected blob IDs disclosed.

No full WCAG, screen-reader, Lighthouse or project-level research replication is claimed. Browser extension metadata errors were present in Chrome logs; no application execution error was identified during the checked interactions. External publisher/university reference pages may restrict access from some clients.

## Research still unverified

Original LOVE simulations and newer unfavorable evolutionary study; redemption effectiveness; autonomous scientific accuracy; APEX superiority; calibrated FORGE loss prediction; real purchasing improvements; OTSA profitability and tax correctness; quantum speedup; evolutionary stability; ethical validation; production AI workflow performance; freight extraction accuracy and realized business savings. The teaching demos do not fill those evidence gaps.

## Deployment

The public address checked during release preparation, https://jjdagz.github.io/BioSynth-AI/, returned GitHub Pages “There isn't a GitHub Pages site here.” Source publication and live hosting are distinct. GitHub's connected repository tools support code writes but do not expose Pages settings. The browser Pages settings page is signed out. The repository includes `/docs`, `.nojekyll`, validation CI and exact Pages setup instructions; enabling Pages requires access to the authenticated settings page. See final task handoff for any later deployment update.

## Changed files

The complete release manifest follows. The original LICENSE, OPENCODE_MASTER_PROMPT.md, SECURITY.md and .gitignore were not modified.

- `.github/workflows/validate.yml`
- `README.md`
- `RELEASE_NOTES.md`
- `RESEARCH_LAB_METHODS.md`
- `RESEARCH_LAB_README.md`
- `docs/.nojekyll`
- `docs/EVIDENCE_AUDIT.md`
- `docs/archive/index-2026-10-29.html`
- `docs/assets/app.js`
- `docs/assets/favicon.svg`
- `docs/assets/models.js`
- `docs/assets/style.css`
- `docs/index.html`
- `docs/projects.json`
- `docs/superpowers/plans/2026-10-29-research-lab.md`
- `scripts/check_site.py`
- `scripts/render.py`
- `scripts/template.html`
- `tests/lab.test.cjs`
- `tests/ui.test.cjs`
