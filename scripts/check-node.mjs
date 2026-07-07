const [major, minor] = process.versions.node.split(".").map(Number);

if (major < 22 || (major === 22 && minor < 13)) {
  console.error(
    `\nNode ${process.version} is too old for this project (requires >= 22.13).\n` +
      `pnpm ${process.env.npm_package_manager?.split("@")[1] ?? "11.6.0"} needs a newer Node runtime.\n\n` +
      `Fix:\n` +
      `  nvm install    # reads .nvmrc (22.17)\n` +
      `  nvm use\n` +
      `  pnpm dev       # use pnpm, not npm\n`,
  );
  process.exit(1);
}
