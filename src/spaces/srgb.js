import {
  linear_sRGB_to_LMS_M,
  linear_sRGB_to_XYZ_M,
  LMS_to_linear_sRGB_M,
  XYZ_to_linear_sRGB_M,
  OKLab_to_linear_sRGB_coefficients,
} from "../conversion_matrices.js";

import { sRGBGammaToLinearVec3, sRGBLinearToGammaVec3 } from "./util.js";

/**
 * The sRGB color space in linear form, without a transfer function, aliased as <code>"srgb-linear"</code>.
 * @type {ColorSpace}
 * @category spaces
 */
export const sRGBLinear = {
  id: "srgb-linear",
  toXYZ_M: linear_sRGB_to_XYZ_M,
  fromXYZ_M: XYZ_to_linear_sRGB_M,
  toLMS_M: linear_sRGB_to_LMS_M,
  fromLMS_M: LMS_to_linear_sRGB_M,
};

/**
 * The sRGB color space, with a transfer function, aliased as <code>"srgb"</code>. Inherits from the {@link sRGBLinear} color space.
 * @type {ColorSpace}
 * @category spaces
 */
export const sRGB = {
  id: "srgb",
  base: sRGBLinear,
  toBase: sRGBGammaToLinearVec3,
  fromBase: sRGBLinearToGammaVec3,
};

/**
 * A color gamut for the {@link sRGB} color space.
 * @type {ColorGamut}
 * @category gamuts
 */
export const sRGBGamut = {
  space: sRGB,
  coefficients: OKLab_to_linear_sRGB_coefficients,
};
