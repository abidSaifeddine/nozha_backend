const fs = require("fs");
const path = require("path");
const { toKebabCase } = require("../utils/text");

// Function to delete a file and handle errors
function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // Delete the file
    console.log(`Deleted file: ${filePath}`);
  } else {
    console.warn(`File not found: ${filePath}`);
  }
}

// Function to delete files related to a specific entity
function deleteFiles(entityName) {
  const basePath = path.join(__dirname, ".."); // Base path for models, controllers, and routes
  const kebabCaseName = toKebabCase(entityName);

  const filesToDelete = [
    path.join(basePath, `models/${entityName}.js`),
    path.join(basePath, `controllers/${entityName}Controller.js`),
    path.join(basePath, `routes/${kebabCaseName}.routes.js`),
  ];

  // Delete each file
  filesToDelete.forEach((filePath) => {
    deleteFile(filePath);
  });
  // Remove the route from app.js
  const appPath = path.join(basePath, "app.js");
  const appContent = fs.readFileSync(appPath, "utf8");
  const lines = appContent.split("\n");

  const routeToRemove = `app.use("/${kebabCaseName}", require("./routes/${kebabCaseName}.routes"));`;

  const newLines = lines.filter((line) => !line.includes(routeToRemove));
  fs.writeFileSync(appPath, newLines.join("\n"), "utf8");
}

// Get the entity name from the command line argument
const entityName = process.env.npm_config_entity; // Using environment variable

if (!entityName) {
  console.error("Please provide an entity name.");
  process.exit(1);
}

// Call the function to delete files for the given entity
deleteFiles(entityName);
