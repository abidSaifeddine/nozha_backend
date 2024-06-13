// Function to convert a string to snake_case
function toSnakeCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2") // Convert camelCase to snake_case
    .toLowerCase();
}

// Function to convert a string to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Convert camelCase to kebab-case
    .toLowerCase();
}

module.exports = {
  toSnakeCase,
  toKebabCase,
};
