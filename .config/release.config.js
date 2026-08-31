export default {
  branches: ['master', 'main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    [
      '@semantic-release/exec',
      {
        publishCmd:
          'if [ -n "$GITHUB_OUTPUT" ]; then printf "new_release_published=true\\nnew_release_version=${nextRelease.version}\\nnew_release_git_tag=v${nextRelease.version}\\n" >> "$GITHUB_OUTPUT"; fi',
      },
    ],
  ],
};
