# Optional wildlife history and research library

Implemented within the existing game. Selecting a 3D organism, catalogue info button or population row opens a compact card with name, scientific name, status and VIEW HISTORY. The detailed, scrollable right-side panel opens only on that explicit action. Closing it returns to the card; closing the card returns to gameplay. Catalogue information selection collapses the tray for mobile readability.

All 90 supported organism records use the shared panel: overview, evolutionary history, habitat/geography, ecology/behavior, extinction/conservation, and separate simulation results. Existing evidence is reused, including approximate dates and group-level caveats. Missing lineage, adaptation, reproduction and conservation details remain explicitly unverified. Future results are labelled as simulation, not scientific forecasts.

The structured resource collection includes species ID, title, organization, type, URL, publication year when known, description, topic, taxonomic/group scope and verification date. 187 pre-existing source URLs were retrieved: 168 succeeded, 19 failed and were excluded from the new collection. 87 of 90 organisms have reachable existing resources; wildflower, decomposer fungi and Deinonychus show availability messages. Successful HTTP retrieval verifies reachability, not a new scientific review. Existing taxon/field associations retain their earlier curated basis.

Additional resources were opened and checked: Maidment, Brassey & Barrett (2015), the open-access PLOS ONE Stegosaurus anatomy paper; the National Park Service Dinosaur National Monument educational PDF (labelled as a booklet, not a research paper); and PBS/South Carolina ETV's What's Wild: Ferns video. No publication year was invented for the booklet or episode. No thumbnails were copied. Other paper/video categories are explicitly unavailable rather than filled with unrelated links.

All new resource links use HTTPS, target=_blank and rel=noopener noreferrer. No iframe, video element, automatic redirect or resource fetch runs during gameplay. Opening resources does not mutate date, placement, save or simulation state.

Validation: compact selection from catalogue, 3D canvas and population list; explicit expansion/collapse; actual paper/PDF/video popup tabs; unchanged original date/save after opening documents; future marine context; mobile plant layout; unit coverage of optional behavior, safe links and unknown data. Screenshots inspected, including mobile. Tests do not claim that every website's future availability can be guaranteed.

Changed implementation: src/ui/WildlifeHistory.tsx, src/ui/GameUI.tsx, src/styles/global.css, src/sim/research.ts and two research JSON collections. Added component/resource tests and browser QA scripts. No model or simulation equations changed. Existing taxonomy-only research library remains separate.

The attached request ended at “Required Testing — Verify”; checks above cover the complete preceding requirements. Local commit only; no push or deploy. Pre-existing .gitignore edit preserved separately.

Final checks: typecheck PASS; 136 tests PASS (including unchanged simulation timing limit); production build PASS. Existing large-bundle and Three.js CommonJS warnings remain. Desktop resource/navigation and mobile touch tests PASS. Animated instance picking now invalidates cached raycast bounds; its regression test reproduces and fixes selection after movement. Additional files: src/scene/BatchedOrganisms.tsx, instancePicking.ts and instancePicking.test.ts.
