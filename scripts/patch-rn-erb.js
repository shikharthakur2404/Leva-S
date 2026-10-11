/**
 * Persist RN 0.68 node_modules fixes needed on modern macOS/Ruby:
 * 1) ERB.new(str, safe_level, trim_mode) removed in Ruby 3.2+/4
 * 2) boost JFrog URL is dead; use archives.boost.io
 */
const fs = require('fs');
const path = require('path');

function patchFile(relativePath, replacements) {
  const target = path.join(__dirname, '..', relativePath);
  if (!fs.existsSync(target)) {
    return;
  }
  let contents = fs.readFileSync(target, 'utf8');
  let changed = false;
  for (const [from, to] of replacements) {
    if (contents.includes(from)) {
      contents = contents.split(from).join(to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(target, contents);
    console.log(`patch-rn: updated ${relativePath}`);
  }
}

patchFile(
  'node_modules/react-native/scripts/react_native_pods_utils/script_phases.rb',
  [["ERB.new(template, 0, '->')", "ERB.new(template, trim_mode: '->')"]],
);

patchFile('node_modules/react-native/third-party-podspecs/boost.podspec', [
  [
    'https://boostorg.jfrog.io/artifactory/main/release/1.76.0/source/boost_1_76_0.tar.bz2',
    'https://archives.boost.io/release/1.76.0/source/boost_1_76_0.tar.bz2',
  ],
]);
