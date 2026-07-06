var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var GAS_URL = process.env.GAS_URL || "https://script.google.com/macros/s/AKfycbyJ6Mp449Y2jYBEYKdwRgCb7GvlKHo-TpzapeVpq-XvYyzm7FoY1EU_3bFt0bId7_Id/exec";
var ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin_nptu";
var ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin@nptu2569*";
var SECRET_CODE = process.env.SECRET_CODE || "NPTU-MENTOR26";
async function proxyToGAS(payload) {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const text = await response.text();
    try {
      const result = JSON.parse(text);
      return { status: 200, body: result };
    } catch (e) {
      console.error("GAS Error Response:", text);
      return { status: 500, body: { success: false, message: "\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E01\u0E31\u0E1A Google Apps Script \u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E01\u0E32\u0E23 Deploy Code.gs" } };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, body: { success: false, message: "\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C" } };
  }
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "50mb" }));
  app.post("/api/verify-secret", (req, res) => {
    const { secretCode } = req.body;
    if (secretCode === SECRET_CODE) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E39\u0E49\u0E41\u0E19\u0E30\u0E19\u0E33\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" });
    }
  });
  app.post("/api/admin-login", (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E2B\u0E23\u0E37\u0E2D\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" });
    }
  });
  app.post("/api/register", async (req, res) => {
    const result = await proxyToGAS({ action: "register", formData: req.body });
    res.status(result.status).json(result.body);
  });
  app.post("/api/search", async (req, res) => {
    const result = await proxyToGAS({ action: "search", email: req.body.email, phone: req.body.phone });
    res.status(result.status).json(result.body);
  });
  app.post("/api/update", async (req, res) => {
    const { id, ...updateData } = req.body;
    const result = await proxyToGAS({ action: "update", id, updateData });
    res.status(result.status).json(result.body);
  });
  app.get("/api/dashboard", async (req, res) => {
    const result = await proxyToGAS({ action: "dashboard" });
    res.status(result.status).json(result.body);
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
