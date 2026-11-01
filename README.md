# GaiaWorld Atlas

An independent, browser-based geospatial research workspace for displaying geographic observations. **This is a demonstrator, not a scientific surveillance feed.**

## Quick start

Run `python -m http.server 8080` in the repository folder and open http://localhost:8080.

Uses Leaflet and OpenStreetMap tiles; internet access is required for tiles and CDN assets. No credentials or backend needed.

## Features

- Pan-and-zoom world map with interactive markers
- Search and domain filters
- GeoJSON Point FeatureCollection import and export
- Source and provenance metadata in observation details
- Local-only imports; no data is transmitted to GaiaLab
- Clearly flagged synthetic demo data

## Scientific and security boundaries

Built-in example observations are **synthetic and illustrative**, not disease incidence, climate measurements, forecasts, or clinical guidance. Imported records are user supplied, **not verified**. Validate sources before using a dataset for research.

This application is separate from GaiaLab's biological GaiaWorld experimental engine. No production data, secrets, or integrations are included.

## Next steps

Add tests, opt-in curated data sources with source/date/license attribution, and a server-side validated GeoJSON adapter. Preserve research provenance and uncertainty.

## License

No license has yet been granted; contact the repository owner for reuse rights.

## Optional real observations: USGS

Choose **USGS earthquakes · past 24 hours** and click **Load selected dataset**. The app requests the [USGS official GeoJSON summary feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson) directly from the browser. Each event includes source ID, observed time, feed generation time, magnitude, depth (when available), and status. The feed is a rolling 24-hour window, **not** a forecast or a stable archival dataset; locations and magnitudes can change upon review.

No server proxy or API key is used. A failed download preserves the currently displayed observations. GeoJSON uploads remain browser-local and must not be presented as verified observations. The dataset selector keeps synthetic examples separate from USGS observations.

### Validation checklist before merge

1. Open the branch preview locally over HTTP and load the USGS feed.
2. Confirm 24-hour events and their observation/source metadata are present; try search and filters.
3. Disable network access and confirm loading fails gracefully without losing the displayed dataset.
4. Import GeoJSON and check it remains separate from the USGS and demo datasets.
5. Test narrow viewport and export GeoJSON; do not treat exported data as original USGS archival data.

Production GitHub Pages continues serving `main` until this pull request is reviewed and merged.
