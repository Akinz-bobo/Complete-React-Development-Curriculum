// ========== Custom Build Scripts ==========

// scripts/build.js
const webpack = require("webpack");
const config = require("../config/webpack.config.js");

function build() {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err || new Error("Build failed"));
        return;
      }

      console.log("Build completed successfully!");
      console.log(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
        })
      );

      resolve();
    });
  });
}

if (require.main === module) {
  build().catch(console.error);
}

module.exports = build;

// scripts/deploy.js
const { execSync } = require("child_process");
const path = require("path");

async function deploy() {
  try {
    console.log("Starting deployment...");

    // Build the project
    console.log("Building project...");
    execSync("npm run build", { stdio: "inherit" });

    // Run tests
    console.log("Running tests...");
    execSync("npm run test", { stdio: "inherit" });

    // Deploy to server
    console.log("Deploying to server...");
    execSync("rsync -avz dist/ user@server:/var/www/html/", {
      stdio: "inherit",
    });

    console.log("Deployment completed successfully!");
  } catch (error) {
    console.error("Deployment failed:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  deploy();
}

module.exports = deploy;

// ========== Dependency Management Utilities ==========

// scripts/check-dependencies.js
const fs = require("fs");
const { execSync } = require("child_process");

function checkDependencies() {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  console.log("Checking for outdated dependencies...");

  try {
    const outdated = execSync("npm outdated --json", { encoding: "utf8" });
    const outdatedPackages = JSON.parse(outdated);

    if (Object.keys(outdatedPackages).length === 0) {
      console.log("✅ All dependencies are up to date!");
      return;
    }

    console.log("📦 Outdated packages found:");
    for (const [pkg, info] of Object.entries(outdatedPackages)) {
      console.log(`  ${pkg}: ${info.current} → ${info.latest}`);
    }
  } catch (error) {
    // npm outdated returns exit code 1 when packages are outdated
    if (error.stdout) {
      const outdatedPackages = JSON.parse(error.stdout);
      console.log("📦 Outdated packages found:");
      for (const [pkg, info] of Object.entries(outdatedPackages)) {
        console.log(`  ${pkg}: ${info.current} → ${info.latest}`);
      }
    }
  }
}

function checkVulnerabilities() {
  console.log("Checking for security vulnerabilities...");

  try {
    execSync("npm audit --audit-level=moderate", { stdio: "inherit" });
    console.log("✅ No security vulnerabilities found!");
  } catch (error) {
    console.log(
      '⚠️  Security vulnerabilities found. Run "npm audit fix" to resolve.'
    );
  }
}

if (require.main === module) {
  checkDependencies();
  checkVulnerabilities();
}

// ========== Package Size Analysis ==========

// scripts/analyze-bundle.js
const fs = require("fs");
const path = require("path");

function getDirectorySize(dirPath) {
  let totalSize = 0;

  function calculateSize(currentPath) {
    const stats = fs.statSync(currentPath);

    if (stats.isFile()) {
      totalSize += stats.size;
    } else if (stats.isDirectory()) {
      const files = fs.readdirSync(currentPath);
      files.forEach((file) => {
        calculateSize(path.join(currentPath, file));
      });
    }
  }

  if (fs.existsSync(dirPath)) {
    calculateSize(dirPath);
  }

  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function analyzeBundleSize() {
  const nodeModulesSize = getDirectorySize("node_modules");
  const srcSize = getDirectorySize("src");
  const distSize = getDirectorySize("dist");

  console.log("📊 Bundle Size Analysis:");
  console.log(`  Source code: ${formatBytes(srcSize)}`);
  console.log(`  Built files: ${formatBytes(distSize)}`);
  console.log(`  Dependencies: ${formatBytes(nodeModulesSize)}`);

  // Analyze package.json dependencies
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const depCount = Object.keys(packageJson.dependencies || {}).length;
  const devDepCount = Object.keys(packageJson.devDependencies || {}).length;

  console.log(`  Production dependencies: ${depCount}`);
  console.log(`  Development dependencies: ${devDepCount}`);

  // Check for large dependencies
  console.log("\n🔍 Analyzing large dependencies...");
  if (fs.existsSync("node_modules")) {
    const modules = fs
      .readdirSync("node_modules")
      .filter((dir) => !dir.startsWith(".") && !dir.startsWith("@"))
      .map((dir) => ({
        name: dir,
        size: getDirectorySize(path.join("node_modules", dir)),
      }))
      .sort((a, b) => b.size - a.size)
      .slice(0, 10);

    modules.forEach((module) => {
      console.log(`  ${module.name}: ${formatBytes(module.size)}`);
    });
  }
}

if (require.main === module) {
  analyzeBundleSize();
}
