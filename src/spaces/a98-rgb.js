import { vec3 } from "../util.js";
import {
  linear_A98RGB_to_XYZ_M,
  XYZ_to_linear_A98RGB_M,
  linear_A98RGB_to_LMS_M,
  LMS_to_linear_A98RGB_M,
  OKLab_to_linear_A98RGB_coefficients,
} from "../conversion_matrices.js";

const A98RGBToLinear = (val) => {
  let sign = val < 0 ? -1 : 1;
  let abs = Math.abs(val);
  return sign * Math.pow(abs, 563 / 256);
};

const A98RGBToGamma = (val) => {
  let sign = val < 0 ? -1 : 1;
  let abs = Math.abs(val);
  return sign * Math.pow(abs, 256 / 563);
};

/**
 * The Adobe RGB (1998) color space in linear form, without a transfer function, aliased as <code>"a98-rgb-linear"</code>.
 * @type {ColorSpace}
 * @category spaces
 */
export const A98RGBLinear = {
  id: "a98-rgb-linear",
  toXYZ_M: linear_A98RGB_to_XYZ_M,
  fromXYZ_M: XYZ_to_linear_A98RGB_M,
  toLMS_M: linear_A98RGB_to_LMS_M,
  fromLMS_M: LMS_to_linear_A98RGB_M,
};

/**
 * The Adobe RGB (1998) color space, with a transfer function, aliased as <code>"a98-rgb"</code>. Inherits from the {@link A98RGBLinear} color space.
 * @type {ColorSpace}
 * @category spaces
 */
export const A98RGB = {
  id: "a98-rgb",
  base: A98RGBLinear,
  toBase: (vec, out = vec3()) => {
    out[0] = A98RGBToLinear(vec[0]);
    out[1] = A98RGBToLinear(vec[1]);
    out[2] = A98RGBToLinear(vec[2]);
    return out;
  },
  fromBase: (vec, out = vec3()) => {
    out[0] = A98RGBToGamma(vec[0]);
    out[1] = A98RGBToGamma(vec[1]);
    out[2] = A98RGBToGamma(vec[2]);
    return out;
  },
};

/**
 * A color gamut for the {@link A98RGB}, or Adobe RGB (1998), color space.
 * @type {ColorGamut}
 * @category gamuts
 */
export const A98RGBGamut = {
  space: A98RGB,
  coefficients: OKLab_to_linear_A98RGB_coefficients,
};
