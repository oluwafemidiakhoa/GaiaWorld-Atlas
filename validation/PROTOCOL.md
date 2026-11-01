# GaiaWorld Atlas: prospective external validation protocol (v1)

**Status:** protocol only. No participants recruited, experiments run, outcomes obtained, revenue earned, or humanitarian impact established.

## Decision being tested

For a facility manager, field researcher, or preparedness analyst, does GaiaWorld Atlas reduce the effort required to create an **accurate, source-traceable geographic observation summary** compared with their normal workflow? This is not an experiment about earthquake prediction, health outcomes, safety certification, or true hazard/exposure risk.

**Primary estimand:** difference in median task completion time (minutes) between Atlas and the participant's normal workflow, calculated on **valid** submissions only. Report both valid completion rates to avoid biased time-only conclusions.

**Population and sample:** recruit 5–10 independent prospective users familiar with geographic research or facility monitoring, from at least two types of organization where feasible. This small pilot measures usability and feasibility, not market demand or generalizable efficacy.

## Task scenario (same instructions in both conditions)

"You are preparing a briefing for three hypothetical facilities. Using public sources available at the time of evaluation, identify records from a specified scientific collection within a stated radius of each coordinate. Provide each count, at least one verifiable original source link when events are found, source time, retrieval time, and a statement of limitations. Do not claim that proximity is a calibrated risk score."

The facilitator assigns a date/time window, chosen source (e.g. USGS earthquakes), three **fictional** facility coordinates, and radius before starting. Keep these fixed across conditions, and record them in a pre-registered task sheet. Use no real confidential facility names or restricted locations.

## Study procedure

1. Obtain informed consent and explain that participation is voluntary. Use pseudonymous participant codes; do not record names, emails, IP addresses, or organizational secrets in results.
2. Record participant role category, prior GIS experience (self-reported), task configuration, date/time, and source availability. No sensitive personal information.
3. Randomize the order of the two methods: Atlas then existing workflow, or existing workflow then Atlas. Alternate order across participants to reduce practice effects.
4. Use matched but distinct facility-coordinate sets of comparable difficulty; assign counterbalanced task sets A/B to reduce memorization. Record any deviations.
5. Start timer when task instructions and data sources are available; stop at submission. Set the same time cap (e.g. 30 min) for both methods. Timeouts count as non-completions.
6. Save participant-produced reports and independently check all counted observations against frozen source snapshots or archived source responses taken at evaluation time. Rolling feeds can change between tasks; **do not compare counts from different feed states without freezing a common reference**.
7. Blind a second reviewer to condition where feasible when grading correctness. Resolve disagreements transparently.
8. Ask two short questions after each condition: "How confident are you in the report's traceability?" and "How usable was this workflow?" Use a fixed 1–5 scale; report as exploratory.
9. Report all attempts including failures and timeouts; do not remove unfavorable observations. No deployment decisions based solely on five participants.

## Pre-registered outcomes

| Outcome | Measurement | Success criterion for next-stage discovery |
|---|---|---|
| Valid completion rate (co-primary safeguard) | Fraction meeting all correctness/traceability criteria | Atlas not lower than comparator in this pilot |
| Time to valid report (primary) | Minutes for valid submissions; separately report timeouts | Median Atlas time at least 20% lower as a directional pilot threshold |
| Correct counts | Absolute difference from frozen ground truth, per facility | No material systematic discrepancy |
| Citation traceability | Share of cited events with accessible original-source links and matching event IDs | At least 95% verifiable in checked reports |
| Unsupported assertions | Count of risk/safety claims not warranted by data | Zero in Atlas reports |
| Usability | 1–5 rating and structured comments | Descriptive only; no threshold for scientific claims |
| Willingness to pay | Interview: budget owner, purchasing trigger, price sensitivity | Report qualitative evidence, not booked revenue |

The 20% and 95% thresholds are **prospective pilot decision rules**, not established product performance. Analyze all participants and methods, report confidence intervals where sensible, and avoid significance claims with a tiny sample.

## Grading rubric (per attempt)

- **Valid:** correct facility set, radius, source/collection, retrieval timestamp, matching counts within the same frozen dataset, accessible source links when records are present, and explicit limitation distinguishing proximity from risk.
- **Invalid:** wrong facility/radius/source, unsupported risk conclusion, missing timestamp or provenance, or count inconsistent with the frozen reference.
- **Incomplete:** time limit reached or missing entire required sections.
- **Unverifiable:** source feed unavailable or no frozen reference captured. Exclude from valid-time estimation but include visibly in all-attempt flow and limitation summary.

## Analysis and governance

Use `validation/attempts-template.csv`. Treat blank results as **not collected**. Do not manufacture outcomes. Calculate per-participant paired differences only when both methods have valid results; show a separate denominator for incomplete and unverifiable tasks. Release only aggregated, de-identified results with participant permission. Retain raw notes with access controls outside the public GitHub repository. In public reports, include recruitment method, date, source snapshot hashes, protocol deviations, uncertainty, and failures.

## Go / no-go

**Proceed to a paid pilot discussion only if:** valid completion rate is no worse, the time advantage is consistently useful to participants, reviewers can reproduce the cited observations, and at least two prospective buyers describe a repeatable decision and a plausible budget pathway. If those conditions are not met, adjust the target problem rather than adding unvalidated prediction features.

**Do not claim:** prevented deaths, validated hazard prediction, scientifically proven risk reduction, certified safety, or paying customers without separate evidence.

## Execution checklist

- [ ] Freeze task sets A and B and publish SHA-256 hashes before any trials
- [ ] Build frozen-source snapshot capture and event-ID reconciliation
- [ ] Recruit consenting independent participants
- [ ] Run counterbalanced sessions
- [ ] Perform independent blinded grading
- [ ] Publish transparent aggregate findings, including failures
- [ ] Interview budget owners separately from usability participants
