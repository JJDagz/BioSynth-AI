# BioSynth Research Lab methods

## Reproduce the educational release

Requires Python 3.9+ and Node.js 20+. No runtime package installation, AI credentials or network access is needed to render and test the site.

```sh
python3 scripts/render.py
python3 scripts/render.py --check
node --test tests/*.test.cjs
python3 scripts/check_site.py
```

Serve `docs/` with any static server or GitHub Pages. Relative asset paths support the `/BioSynth-AI/` repository prefix. JavaScript is an enhancement: all lessons, formulas, source links and the default freight example are present in HTML. Native details/summary works without scripts. Original content remains in docs/archive and Git history.

## Economic units and definitions

Inputs are monthly quote count q, manual human minutes m, automated human minutes a, fully loaded dollars per hour w, realized percentage r, annual operating dollars O, and one-time development dollars D. Let f = r/100.

- Annual released hours H = q × 12 × (m − a) / 60.
- Gross annual capacity benefit G = H × w.
- Annual realized value R = G × f.
- First-year total cost C = O + D.
- Annual recurring net A = R − O.
- First-year net N = R − O − D.
- Simple payback in months = 12D/A when A > 0; otherwise not reached. If D = 0 and A > 0, payback is immediate.
- First-year benefit/cost ratio = R/C when C > 0; otherwise undefined.

Negative released hours are preserved when automation takes longer. Blank, negative, nonfinite, overflowing or out-of-range realization assumptions produce an error; exports are disabled until valid. Fractional input values are allowed. Report values rounded for display, with unrounded values in scenario exports.

Default check: q=400, m=15, a=4, w=35, r=50, O=4800, D=12000 gives H=880, G=30800, R=15400, A=10600, N=−1400 and payback≈13.585 months. At r=100, N=14000.

Capacity is not cash savings. A realization fraction is an assumption, not proof. Net values exclude tax, financing, discounting and inflation. Payback assumes constant volume and evenly realized recurring benefit. Pilot timing must include review, exceptions, integration, corrections and approval labor. Actual spending changes require separate evidence.

## Teaching models versus research algorithms

The Bayesian widget assumes P(E|A)=0.8 and P(E|not A)=0.2. It updates a user-selected prior using ordinary Bayes' rule. Probabilities are scenario inputs, not calibrated forecasts.

The deterministic population widget assumes infinite population, no mutation and payoffs f_A=4p and f_B=3. It applies p_next = p f_A / (p f_A + (1−p) f_B) for 30 steps. The 75% threshold is specific to these assumptions. It is not a LOVE implementation or reproduction.

The purchasing widget compares $75 + 5u against $90 with all other acquisition costs zero and assumed delivery time. The full lesson exposes shipping, tax, travel and repair terms. It does not infer delivery confidence.

## Project research validation protocol

1. Freeze a falsifiable claim, code commit and measurement definitions before looking at outcomes.
2. Establish a relevant baseline with identical data access, time and compute or review budget.
3. Separate training/tuning from held-out evaluation; retain negative cases and failures.
4. Publish raw de-identified or synthetic inputs, seed lists, environment and commands. Never substitute synthetic data for claimed field observations.
5. Report uncertainty and sensitivity to weights, costs, selection rules and missing data.
6. Have another person execute from a clean environment. Reproduction does not by itself establish field validity.
7. Pilot only with explicit permissions, approval controls and rollback. Report adoption, quality, rights impacts and full costs.

Each lesson specifies its own baseline, outcome measures and rejection rule. Numerical acceptance thresholds must be preregistered for a concrete domain; this site does not invent a universal accuracy or ROI threshold.

## Evidence policy

Proposed, implemented, simulated, independently reproduced and field validated are separate labels. A source review supports only claims visible in that source. See docs/EVIDENCE_AUDIT.md for current provenance, unavailable artifacts and historical negative findings. No sensitive business material, tracking scripts or model calls are included.
