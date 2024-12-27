/**
 * A 3x3 matrix represented as an array of arrays.
 * @example
 * const matrix = [
 *   [a, b, c],
 *   [d, e, f],
 *   [g, h, i]
 * ];
 */
declare type Matrix3x3 = number[][];

/**
 * A n-dimensional vector represented as an array of numbers, typically in 3D (X, Y, Z).
 * @example
 * const vec = [ x, y, z ];
 */
declare type Vector = number[];

/**
 * @property id - the unique identifier for this color space in lowercase
 */
declare type ColorSpace = {
    id: string;
};

/**
 * @property space - the color space associated with this color gamut
 */
declare type ColorGamut = {
    space: ColorSpace;
};

/**
 * Converts OKLab color to another color space.
 * @param OKLab - The OKLab color.
 * @param LMS_to_output - The transformation matrix from LMS to the output color space.
 * @param [out = vec3()] - The output vector.
 * @returns The transformed color.
 */
declare function OKLab_to(OKLab: Vector, LMS_to_output: Matrix3x3, out?: Vector): Vector;

/**
 * Converts a color from another color space to OKLab.
 * @param input - The input color.
 * @param input_to_LMS - The transformation matrix from the input color space to LMS.
 * @param [out = vec3()] - The output vector.
 * @returns The transformed color.
 */
declare function OKLab_from(input: Vector, input_to_LMS: Matrix3x3, out?: Vector): Vector;

/**
 * Transforms a color vector by the specified 3x3 transformation matrix.
 * @param input - The input color.
 * @param matrix - The transformation matrix.
 * @param [out = vec3()] - The output vector.
 * @returns The transformed color.
 */
declare function transform(input: Vector, matrix: Matrix3x3, out?: Vector): Vector;

/**
 * Serializes a color to a CSS color string.
 * @param input - The input color.
 * @param inputSpace - The input color space.
 * @param [outputSpace = inputSpace] - The output color space.
 * @returns The serialized color string.
 */
declare function serialize(input: Vector, inputSpace: ColorSpace, outputSpace?: ColorSpace): string;

/**
 * Deserializes a color string to an object with <code>id</code> (color space string) and <code>coords</code> (the vector, in 3 or 4 dimensions).
 * Note this does not return a <code>ColorSpace</code> object; you may want to use the example code below to map the string ID to a <code>ColorSpace</code>, but this will increase the size of your final bundle as it references all spaces.
 * @example
 * import { listColorSpaces, deserialize } from "@texel/color";
 *
 * const { id, coords } = deserialize(str);
 * // now find the actual color space object
 * const space = listColorSpaces().find((f) => id === f.id);
 * console.log(space, coords);
 * @param input - The color string to deserialize.
 * @returns The deserialized color object.
 */
declare function deserialize(input: string): any;

/**
 * Parses a color string and converts it to the target color space.
 * @param input - The color string to parse.
 * @param targetSpace - The target color space.
 * @param [out = vec3()] - The output vector.
 * @returns The parsed and converted color.
 */
declare function parse(input: string, targetSpace: ColorSpace, out?: Vector): Vector;

/**
 * Converts a color from one color space to another.
 * @param input - The input color.
 * @param fromSpace - The source color space.
 * @param toSpace - The target color space.
 * @param [out = vec3()] - The output vector.
 * @returns The converted color.
 */
declare function convert(input: Vector, fromSpace: ColorSpace, toSpace: ColorSpace, out?: Vector): Vector;

/**
 * Calculates the DeltaEOK (color difference) between two OKLab colors.
 * @param oklab1 - The first OKLab color.
 * @param oklab2 - The second OKLab color.
 * @returns The delta E value.
 */
declare function deltaEOK(oklab1: Vector, oklab2: Vector): number;

/**
 * A function that maps an OKLCH color to a lightness value.
 * @param oklch - The input OKLCH color
 */
declare type GamutMapping = (oklch: Vector) => void;

/**
 * MapToL a {@link GamutMapping} function that maintains the color's Lightness.
 */
declare const MapToL: GamutMapping;

/**
 * Takes any OKLCH value and maps it to fall within the given gamut.
 */
declare function gamutMapOKLCH(): void;

/**
 * Converts OKHSL color to OKLab color.
 * @param hsl - The OKHSL color as an array [h, s, l].
 * @param [gamut = sRGBGamut] - The color gamut.
 * @param [out = vec3()] - The output array to store the OKLab color.
 * @returns The OKLab color as an array [L, a, b].
 */
declare function OKHSLToOKLab(hsl: Vector, gamut?: ColorGamut, out?: Vector): Vector;

/**
 * Converts OKLab color to OKHSL color.
 * @param lab - The OKLab color as an array [L, a, b].
 * @param [gamut = sRGBGamut] - The color gamut.
 * @param [out = vec3()] - The output array to store the OKHSL color.
 * @returns The OKHSL color as an array [h, s, l].
 */
declare function OKLabToOKHSL(lab: Vector, gamut?: ColorGamut, out?: Vector): Vector;

/**
 * Converts OKHSV color to OKLab color.
 * @param hsv - The OKHSV color as an array [h, s, v].
 * @param [gamut = sRGBGamut] - The color gamut.
 * @param [out = vec3()] - The output array to store the OKLab color.
 * @returns The OKLab color as an array [L, a, b].
 */
declare function OKHSVToOKLab(hsv: Vector, gamut?: ColorGamut, out?: Vector): Vector;

/**
 * Converts OKLab color to OKHSV color.
 * @param lab - The OKLab color as an array [L, a, b].
 * @param [gamut = sRGBGamut] - The color gamut.
 * @param [out = vec3()] - The output array to store the OKHSV color.
 * @returns The OKHSV color as an array [h, s, v].
 */
declare function OKLabToOKHSV(lab: Vector, gamut?: ColorGamut, out?: Vector): Vector;

/**
 * Returns a list of color spaces.
 * @returns An array of color space objects.
 */
declare function listColorSpaces(): ColorSpace[];

/**
 * Returns a list of color gamuts.
 * @returns An array of color gamut objects.
 */
declare function listColorGamuts(): ColorGamut[];

/**
 * Clamps a value between a minimum and maximum value.
 * @param value - The value to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped value.
 */
declare function clamp(value: number, min: number, max: number): number;

/**
 * Linearly interpolates between two values.
 * @param min - The start value.
 * @param max - The end value.
 * @param t - The interpolation factor between 0 and 1.
 * @returns The interpolated value.
 */
declare function lerp(min: number, max: number, t: number): number;

/**
 * Converts degrees to radians.
 * @param n - The angle in degrees.
 * @returns The angle in radians.
 */
declare function degToRad(n: number): number;

/**
 * Converts radians to degrees.
 * @param n - The angle in radians.
 * @returns The angle in degrees.
 */
declare function radToDeg(n: number): number;

/**
 * Constrains an angle to the range [0, 360).
 * @param angle - The angle in degrees.
 * @returns The constrained angle.
 */
declare function constrainAngle(angle: number): number;

/**
 * Converts a hex color string to an RGB array.
 * @param str - The hex color string.
 * @param [out = vec3()] - The output array.
 * @returns The RGB array.
 */
declare function hexToRGB(str: string, out?: Vector): Vector;

/**
 * Converts an RGB array to a hex color string.
 * @param rgb - The RGB array.
 * @returns The hex color string.
 */
declare function RGBToHex(rgb: Vector): string;

declare function RGBtoHex(): void;

/**
 * Checks if an RGB color is within the gamut.
 * @param lrgb - The linear RGB array.
 * @param [ep = GAMUT_EPSILON] - The epsilon value for comparison.
 * @returns True if the color is within the gamut, false otherwise.
 */
declare function isRGBInGamut(lrgb: Vector, ep?: number): boolean;

/**
 * Clamps an RGB array to the range [0, 1].
 * @param rgb - The RGB array.
 * @param [out = vec3()] - The output array.
 * @returns The clamped RGB array.
 */
declare function clampedRGB(rgb: Vector, out?: Vector): Vector;

/**
 * Converts xyY color space to XYZ color space.
 * @param arg - The xyY array.
 * @param [out = vec3()] - The output array.
 * @returns The XYZ array.
 */
declare function xyY_to_XYZ(arg: Vector, out?: Vector): Vector;

/**
 * Converts XYZ color space to xyY color space.
 * @param arg - The XYZ array.
 * @param [out = vec3()] - The output array.
 * @returns The xyY array.
 */
declare function XYZ_to_xyY(arg: Vector, out?: Vector): Vector;

/**
 * Converts a float value to a byte value.
 * @param n - The float value.
 * @returns The byte value.
 */
declare function floatToByte(n: number): number;

/**
 * Creates a new vec3 array.
 * @returns The vec3 array.
 */
declare function vec3(): Vector;

/**
 * Calculates the delta angle between two angles.
 * @param a0 - The first angle in degrees.
 * @param a1 - The second angle in degrees.
 * @returns The delta angle in degrees.
 */
declare function deltaAngle(a0: number, a1: number): number;

/**
 * Linearly interpolates between two angles.
 * @param a0 - The start angle in degrees.
 * @param a1 - The end angle in degrees.
 * @param t - The interpolation factor between 0 and 1.
 * @returns The interpolated angle in degrees.
 */
declare function lerpAngle(a0: number, a1: number, t: number): number;

