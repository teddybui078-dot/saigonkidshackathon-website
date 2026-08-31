import { ChalkFilter } from "./space";

/* the hero's chalk tooth, promoted to site chrome: one fixed sheet of
   desaturated noise soft-lit over every section, so no fill anywhere on
   the site is a clean fill — the white cards weather the same way the
   sky does. it rides under the navbar and never catches the pointer;
   translateZ pins it to one raster so nothing re-blends per frame. */
export default function SceneVeil() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40">
      <ChalkFilter id="veil-chalk" />
      <div
        className="absolute inset-0 opacity-[0.10] mix-blend-soft-light [transform:translateZ(0)]"
        style={{ filter: "url(#veil-chalk)" }}
      />
    </div>
  );
}
