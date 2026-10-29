# BioSynth Research Lab implementation plan

Goal: implement the user's seven-section, twelve-project scientific education specification in OPENCODE_MASTER_PROMPT.md and the current request.

Architecture: preserve the original HTML verbatim in docs/archive; use a small Python static renderer over docs/projects.json to produce accessible, readable-without-JavaScript lessons. Browser JavaScript progressively adds filtering, scenario controls, and economic calculations. No production dependencies, server, secrets, or external fonts.

Decisions: retain GitHub Pages /docs hosting rather than introduce separate hosting; separate implementation evidence from validation evidence; keep historical unsupported claims in an explicitly marked archive and audit ledger. The user explicitly requested autonomous implementation and publication, so no design approval pause is needed.

Tasks:
- [x] Write failing Node tests for freight arithmetic (including negative time differences, invalid inputs, zero benefit and overflow), Bayesian updating, selection dynamics, data completeness and UI contract.
- [x] Implement pure economic and teaching models, twelve complete project records and deterministic static renderer. Pin inspected FORGE and Q-Branch source links to fetched blob versions via repository commits when available; otherwise disclose inspection date and blob SHA.
- [x] Add responsive homepage, academy, science lab, economics lab, portfolio, per-project roadmap and open research; support keyboard, no-JS access, reduced motion, live announcements and accessible chart text.
- [x] Execute Node tests, renderer freshness, local link checks and browser smoke tests where available. Review scientific assertions and diff. Preserve LICENSE and master prompt.
- [ ] Commit, push without force, configure Pages if available, and verify the exact release and public URL independently.

Review focus: empty/negative/overflowing inputs must not display fictitious savings; export must preserve filtering; absent research artifacts must never become verified claims; unknown probabilities remain unknown; long pages and narrow screens stay navigable.

## Execution record

User-authorized autonomous execution; existing main checkout was clean at start. Tests for new models were first observed failing, then passed after implementation. Final review identified missing scientific references; background links added separately from evidence. No-script calculator safety and population endpoint wording received regression tests. Final limitations: no full WCAG audit, external main links mutable with blob IDs disclosed, original project research unreplicated. Publication step remains open until push and Pages status are verified.
