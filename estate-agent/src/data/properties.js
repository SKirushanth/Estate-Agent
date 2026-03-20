import rawProperties from "./properties.json";
import { propertyAssets } from "../assets/asset";

const properties = rawProperties.map((property) => {
  const assets = propertyAssets[property.id];

  if (!assets) {
    return property;
  }

  return {
    ...property,
    images: assets.images,
    floorPlan: assets.floorPlan,
  };
});

export default properties;
