import HeroMotion from "./HeroMotion";
import {
  HeroCanvas,
  HeroCelestial,
  HeroLandmark,
  HeroMascots,
  HeroTerrain,
  HeroTexture,
} from "./HeroLayers";
import HeroUi from "./HeroUi";

/* the hero: seven layers deep, composed here in z order (the constant in
   hero-layers.ts is what actually stacks them). a server component, so
   every layer's art is rendered once on the server; HeroMotion is the
   one client boundary and only ever moves what is already there */
export default function Hero() {
  return (
    <HeroMotion>
      <HeroCanvas />
      <HeroCelestial />
      <HeroLandmark />
      <HeroMascots />
      <HeroTerrain />
      <HeroUi />
      <HeroTexture />
    </HeroMotion>
  );
}
