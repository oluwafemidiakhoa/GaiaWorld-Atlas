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
