import { vec3 } from "../util.js";
import {
  linear_Rec2020_to_LMS_M,
  linear_Rec2020_to_XYZ_M,
  LMS_to_linear_Rec2020_M,
  XYZ_to_linear_Rec2020_M,
  OKLab_to_linear_Rec2020_coefficients,
} from "../conversion_matrices.js";

const ALPHA = 1.09929682680944;
const BETA = 0.018053968510807;

const Rec2020ToLinear = (val) =>
  val < BETA * 4.5 ? val / 4.5 : Math.pow((val + ALPHA - 1) / ALPHA, 1 / 0.45);

const Rec2020ToGamma = (val) =>
  val >= BETA ? ALPHA * Math.pow(val, 0.45) - (ALPHA - 1) : 4.5 * val;

/**
 * The Rec2020 color space in linear form, without a transfer function, aliased as <code>"rec2020-linear"</code>.
 * @type {ColorSpace}
 * @category spaces
 */
export const Rec2020Linear = {
  id: "rec2020-linear",
  toXYZ_M: linear_Rec2020_to_XYZ_M,
  fromXYZ_M: XYZ_to_linear_Rec2020_M,
  toLMS_M: linear_Rec2020_to_LMS_M,
  fromLMS_M: LMS_to_linear_Rec2020_M,
};

/**
 * The Rec2020 color space, with a transfer function, aliased as <code>"rec2020"</code>. Inherits from the {@link Rec2020Linear} color space.
 * @type {ColorSpace}
 * @category spaces
 */
export const Rec2020 = {
  id: "rec2020",
  base: Rec2020Linear,
  toBase: (vec, out = vec3()) => {
    out[0] = Rec2020ToLinear(vec[0]);
    out[1] = Rec2020ToLinear(vec[1]);
    out[2] = Rec2020ToLinear(vec[2]);
    return out;
  },
  fromBase: (vec, out = vec3()) => {
    out[0] = Rec2020ToGamma(vec[0]);
    out[1] = Rec2020ToGamma(vec[1]);
    out[2] = Rec2020ToGamma(vec[2]);
    return out;
  },
};

/**
 * A color gamut for the {@link Rec2020} color space.
 * @type {ColorGamut}
 * @category gamuts
 */
export const Rec2020Gamut = {
  space: Rec2020,
  coefficients: OKLab_to_linear_Rec2020_coefficients,
};
