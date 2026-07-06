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
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var import_express_rate_limit = __toESM(require("express-rate-limit"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var GAS_URL = "https://script.google.com/macros/s/AKfycbyJ6Mp449Y2jYBEYKdwRgCb7GvlKHo-TpzapeVpq-XvYyzm7FoY1EU_3bFt0bId7_Id/exec";
var HERO_BANNER_PATH = import_path.default.resolve("C:/Users/oil_p/.gemini/antigravity-ide/brain/c36c2d90-e88c-4501-9e17-aad8e7135f98/media__1783327342583.png");
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  console.log("Setting up Express...");
  const limiter = (0, import_express_rate_limit.default)({
    windowMs: 15 * 60 * 1e3,
    max: 100,
    message: { success: false, message: "\u0E04\u0E33\u0E02\u0E2D\u0E21\u0E32\u0E01\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B \u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E2D\u0E2A\u0E31\u0E01\u0E04\u0E23\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48" }
  });
  app.use("/api", limiter);
  app.use(import_express.default.json({ limit: "10mb" }));
  app.get("/hero-banner.png", (req, res) => {
    if (import_fs.default.existsSync(HERO_BANNER_PATH)) {
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=86400");
      import_fs.default.createReadStream(HERO_BANNER_PATH).pipe(res);
    } else {
      res.status(404).send("Not found");
    }
  });
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    import_jsonwebtoken.default.verify(token, process.env.JWT_SECRET || "secret", (err, user) => {
      if (err) return res.status(403).json({ success: false, message: "Forbidden" });
      next();
    });
  };
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      const token = import_jsonwebtoken.default.sign({ username }, process.env.JWT_SECRET || "secret", { expiresIn: "8h" });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E2B\u0E23\u0E37\u0E2D\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" });
    }
  });
  app.post("/api/register", async (req, res) => {
    try {
      const formData = req.body;
      if (formData.userType === "alumni") {
        if (formData.secretCode !== process.env.ALUMNI_SECRET_CODE) {
          return res.status(400).json({ success: false, message: "\u0E23\u0E2B\u0E31\u0E2A\u0E25\u0E31\u0E1A\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E28\u0E34\u0E29\u0E22\u0E4C\u0E40\u0E01\u0E48\u0E32\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" });
        }
      }
      const response = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          formData
        })
      });
      const text = await response.text();
      try {
        const result = JSON.parse(text);
        res.json(result);
      } catch (e) {
        console.error("GAS Error Response:", text);
        res.status(500).json({ success: false, message: "\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E01\u0E31\u0E1A Google Apps Script \u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32\u0E44\u0E14\u0E49\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E42\u0E04\u0E49\u0E14 Code.gs \u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14\u0E44\u0E1B\u0E27\u0E32\u0E07\u0E41\u0E25\u0E30 Deploy \u0E40\u0E1B\u0E47\u0E19 New version \u0E41\u0E25\u0E49\u0E27" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25" });
    }
  });
  app.post("/api/search", async (req, res) => {
    try {
      const response = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "search",
          email: req.body.email,
          phone: req.body.phone
        })
      });
      const text = await response.text();
      try {
        const result = JSON.parse(text);
        res.json(result);
      } catch (e) {
        console.error("GAS Error Response:", text);
        res.status(500).json({ success: false, message: "\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E01\u0E31\u0E1A Google Apps Script \u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E01\u0E32\u0E23 Deploy Code.gs" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25" });
    }
  });
  app.post("/api/update", async (req, res) => {
    try {
      const { id, ...updateData } = req.body;
      if (!updateData.email || !updateData.phone) {
        return res.status(400).json({ success: false, message: "\u0E15\u0E49\u0E2D\u0E07\u0E23\u0E30\u0E1A\u0E38\u0E2D\u0E35\u0E40\u0E21\u0E25\u0E41\u0E25\u0E30\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E15\u0E31\u0E27\u0E15\u0E19" });
      }
      const response = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          id,
          updateData
        })
      });
      const text = await response.text();
      try {
        const result = JSON.parse(text);
        res.json(result);
      } catch (e) {
        console.error("GAS Error Response:", text);
        res.status(500).json({ success: false, message: "\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E01\u0E31\u0E1A Google Apps Script \u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E01\u0E32\u0E23 Deploy Code.gs" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25" });
    }
  });
  app.get("/api/dashboard", authenticateToken, async (req, res) => {
    try {
      const response = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "dashboard"
        })
      });
      const text = await response.text();
      try {
        const result = JSON.parse(text);
        res.json(result);
      } catch (e) {
        console.error("GAS Error Response:", text);
        res.status(500).json({ success: false, message: "\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E01\u0E31\u0E1A Google Apps Script \u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E01\u0E32\u0E23 Deploy Code.gs" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E14\u0E36\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E41\u0E14\u0E0A\u0E1A\u0E2D\u0E23\u0E4C\u0E14" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    console.log("Creating Vite server...");
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    console.log("Vite server created, attaching middleware...");
    app.use(vite.middlewares);
  } else {
    console.log("Serving production build...");
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  console.log("Starting listener on port:", PORT);
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
