const { name } = require("../package.json");
const kinds = ["class", "member", "constant", "function", "typedef"];

module.exports.handlers = {
  beforeParse: function (e) {
    e.source += `/**
 * @module ${name}
 */
`;
  },
  // adds @module texel/color to all doclets
  newDoclet(e) {
    const doc = e.doclet;

    if (doc.undocumented) {
      return;
    }

    if (doc.kind === "module") {
      return;
    }

    if (!kinds.includes(doc.kind)) {
      return;
    }

    if (doc.memberof) {
      doc.scope = "global";
      return;
    }

    doc.scope = "global";
    doc.memberof = `module:${name}`;
    doc.longname = `module:${doc.memberof}.${doc.longname}`;
  },
};
