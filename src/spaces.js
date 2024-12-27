/**
 * List of color spaces and their corresponding modules.
 *
 * @module spaces
 */

import { XYZ, XYZD50 } from "./spaces/xyz.js";
import { OKLab, OKLCH, OKHSV, OKHSL } from "./spaces/oklab.js";
import { sRGB, sRGBLinear, sRGBGamut } from "./spaces/srgb.js";
import {
  DisplayP3,
  DisplayP3Linear,
  DisplayP3Gamut,
} from "./spaces/display-p3.js";
import { Rec2020, Rec2020Linear, Rec2020Gamut } from "./spaces/rec2020.js";
import { A98RGB, A98RGBLinear, A98RGBGamut } from "./spaces/a98-rgb.js";
import { ProPhotoRGB, ProPhotoRGBLinear } from "./spaces/prophoto-rgb.js";

export * from "./spaces/xyz.js";
export * from "./spaces/oklab.js";
export * from "./spaces/srgb.js";
export * from "./spaces/display-p3.js";
export * from "./spaces/rec2020.js";
export * from "./spaces/a98-rgb.js";
export * from "./spaces/prophoto-rgb.js";

/**
 * Exports all color space modules.
 * @see module:spaces/xyz
 * @see module:spaces/oklab
 * @see module:spaces/srgb
 * @see module:spaces/display-p3
 * @see module:spaces/rec2020
 * @see module:spaces/a98-rgb
 * @see module:spaces/prophoto-rgb
 */

/**
 * Returns a list of color spaces.
 *
 * @function
 * @returns {Array} An array of color space objects.
 */
export const listColorSpaces = () => {
  return [
    XYZ, // D65
    XYZD50,
    OKLab,
    OKLCH,
    OKHSV,
    OKHSL,
    sRGB,
    sRGBLinear,
    DisplayP3,
    DisplayP3Linear,
    Rec2020,
    Rec2020Linear,
    A98RGB,
    A98RGBLinear,
    ProPhotoRGB,
    ProPhotoRGBLinear,
  ];
};

/**
 * Returns a list of color gamuts.
 *
 * @function
 * @returns {Array} An array of color gamut objects.
 */
export const listColorGamuts = () => {
  return [sRGBGamut, DisplayP3Gamut, Rec2020Gamut, A98RGBGamut];
};
