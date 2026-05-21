/**
 * Merge newFrontend.txt (client UI) with API layer from existing CreativeOpsApp.jsx
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const repoRoot = path.resolve(root, "..");

const newSrc = fs.readFileSync(path.join(repoRoot, "newFrontend.txt"), "utf8");
const oldSrc = fs.readFileSync(path.join(root, "src/CreativeOpsApp.jsx"), "utf8");
const outPath = path.join(root, "src/CreativeOpsApp.jsx");

const preambleStart = oldSrc.indexOf("/** Cursor canvas provides");
const preambleEnd = oldSrc.indexOf("const getMediaType");
const preamble = oldSrc.slice(preambleStart, preambleEnd);

const apiStart = oldSrc.indexOf("  const apiBase = useMemo");
const apiEnd = oldSrc.indexOf("  // Migrate feedback loop content");
const apiBlock = oldSrc.slice(apiStart, apiEnd);

const dmStart = oldSrc.indexOf(
  '          <div style={{ fontSize:13, fontWeight:600, color:C.textSec, marginBottom:12 }}>Data Management</div>\n          {apiBase ? ('
);
const dmEnd = oldSrc.indexOf(
  '          <div style={{ fontSize:11, color:C.textTer, marginTop:8 }}>Export regularly to back up your data.'
);
const dataManagementBlock = oldSrc.slice(dmStart, dmEnd);

let out = newSrc;

out = out.replace(
  'import { useState, useEffect, useCallback, useMemo } from "react";',
  'import { useState, useEffect, useCallback, useMemo, useRef } from "react";'
);

out = out.replace(
  /const genId = \(\) => "[^"]+";\nconst getMediaType/,
  `const genId = () => "b" + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);\n\n${preamble}const getMediaType`
);

const brandMarker = "  const [brandConfirm, setBrandConfirm] = useState(null);";
const migrateMarker = "  // Migrate feedback loop content";
const bi = out.indexOf(brandMarker);
const mi = out.indexOf(migrateMarker);
if (bi === -1 || mi === -1) {
  throw new Error("Could not find brandConfirm / migrate markers in new frontend");
}
out =
  out.slice(0, bi + brandMarker.length) +
  "\n\n" +
  apiBlock +
  "\n\n" +
  out.slice(mi);

const newDmMarker =
  '          <div style={{ fontSize:13, fontWeight:600, color:C.textSec, marginBottom:12 }}>Data Management</div>\n          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>';
const newDmEnd =
  '          <div style={{ fontSize:11, color:C.textTer, marginTop:8 }}>Export regularly to back up your data.';
const ndi = out.indexOf(newDmMarker);
const nde = out.indexOf(newDmEnd);
if (ndi === -1 || nde === -1) {
  throw new Error("Could not find Data Management section in merged file");
}
out =
  out.slice(0, ndi) +
  dataManagementBlock +
  out.slice(nde);

fs.writeFileSync(outPath, out);
console.log("Wrote", outPath, "(" + out.length + " bytes)");
