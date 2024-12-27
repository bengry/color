///<reference path="../types.d.ts" />
import { listColorSpaces, serialize, sRGB } from "../src/index.js";
console.log(serialize([0.5, 0.25, 0.15], sRGB), listColorSpaces()[0].id);

// This stub is just to check that this compiles properly with tsc...
