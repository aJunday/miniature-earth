# Reusable toy art pipeline

Only the three requested sample models are built. No additional organisms are generated.

Run `python3 art/run_all.py` to build the models, icons, contact sheet, and validation reports. The default executable is `/Applications/Blender.app/Contents/MacOS/Blender`, invoked with `--background --factory-startup`. Individual scripts can run with that executable and `--python art/build_fern.py`.

Every render uses Cycles on CPU with 32 samples and OpenImageDenoise. Icons are transparent 256×256 RGBA PNGs. The contact sheet uses the neutral floor and soft shadows. No Eevee or Workbench render path exists, and environment variables cannot switch the renderer.

The requested default executable is absent in this workspace's host. Verification uses the existing smoke-test binary explicitly: `python3 art/run_all.py --blender work/blender36/Blender/Blender.app/Contents/MacOS/Blender --gpu-backend opengl`. The optional backend flag avoids that older binary's Metal startup crash; all rendering still uses Cycles CPU. The runner fails clearly when the selected executable is missing and does not silently substitute a different executable.

`python3 art/validate.py` checks the exported GLB data and actual PNG alpha values. `python3 art/inspect_all.py` runs `npx @gltf-transform/cli@4.5.1 inspect` and `validate` on every GLB, with its npm cache kept inside art/. The all-model runner performs both validation stages after rendering. Reports belong in art/reports/.

Coordinates exposed by common.py are X right, Y up, +Z forward. Helpers convert them to Blender space. The exporter converts back to glTF Y-up. `add_part` initially collects geometry on an empty at the joint; `finish_model` applies modifiers, joins each part's geometry into one named mesh, preserves the joint origin, applies scale and rotation, and recalculates normals. The final hierarchy has one identity Root with named mesh children. `export_glb` excludes studio cameras/lights and uses no textures or Draco.

The three build scripts and `render_contact_sheet.py` use `art/lib/common.py`. The contact sheet imports every GLB in public/models and uses display-only scale normalization to make the organism silhouettes readable next to the large island. Exports retain world units.

See NOTES.md for every task-specific assumption. AGENTS.md was not available, so its rules and species table have not been verified.
