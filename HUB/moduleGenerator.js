const fs = require("fs");
const path = require("path");
const { toSnakeCase, toKebabCase } = require("../utils/text");

// Get the entity name from the environment variable
const entityName = process.env.npm_config_entity;

if (!entityName) {
  console.error("Please provide an entity name.");
  process.exit(1);
}

// Define the base directory for models, controllers, and routes
const basePath = path.join(__dirname, "..");

// Function to create a file with specific content
function createFile(filePath, content) {
  // Ensure the directory exists
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // Create the directory if it doesn't exist
  }

  // Create the file
  fs.writeFileSync(filePath, content, "utf8");
}

// Function to generate model, controller, and routes
function generateFiles(entityName) {
  const snakeCaseName = toSnakeCase(entityName);
  const kebabCaseName = toKebabCase(entityName);

  // Create model
  const modelContent = `
const BaseModel = require("../HUB/BaseModel");

module.exports = class ${entityName} extends BaseModel {
  constructor() {
    super('${snakeCaseName}');
  }
};
`;

  createFile(path.join(basePath, `models/${entityName}.js`), modelContent);

  // Create controller
  const controllerContent = `
const BaseController = require("../HUB/BaseController");
const ${entityName} = require("../models/${entityName}");

module.exports = class ${entityName}Controller extends BaseController {
  constructor() {
    super(new ${entityName}());
  }
};
`;

  createFile(
    path.join(basePath, `controllers/${entityName}Controller.js`),
    controllerContent
  );

  // Create routes
  const routesContent = `
const genericRoutes = require("../HUB/genericRoutes");

const router = genericRoutes("${entityName}");

module.exports = router;
`;

  createFile(
    path.join(basePath, `routes/${kebabCaseName}.routes.js`),
    routesContent
  );

  const appPath = path.join(basePath, "app.js");
  const newRoute = `app.use("/${kebabCaseName}", require("./routes/${kebabCaseName}.routes"));`;

  const appContent = fs.readFileSync(appPath, "utf8");
  const lines = appContent.split("\n");

  // Find the line with the comment "// routes" and add the new route beneath it
  const routeIndex = lines.findIndex((line) => line.includes("// routes"));
  if (routeIndex >= 0) {
    lines.splice(routeIndex + 1, 0, newRoute);
    fs.writeFileSync(appPath, lines.join("\n"), "utf8");
  }

  console.log(`Files for ${entityName} created successfully.`);
}

// Generate files using the entity name
generateFiles(entityName);
