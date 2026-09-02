// Native fetch is built into Node.js (v18+)
async function getGitHubStats(username) {
  const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=updated`;

  console.log(`Querying GitHub API for user: ${username}...`);

  const response = await fetch(url, {
    headers: {
      "User-Agent": "dev-roadmap-tracker"
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
  }

  const repos = await response.json();
  return repos;
}

async function runTracker() {
  const username = "Mansi5543";

  try {
    const repos = await getGitHubStats(username);

    console.log("-----------------------------------------");
    console.log(`Live Repositories Found: ${repos.length}`);
    console.log("-----------------------------------------");

    repos.forEach((repo, idx) => {
      console.log(`${idx + 1}. ${repo.name}`);
      console.log(`   URL       : ${repo.html_url}`);
      console.log(`   Visibility: ${repo.visibility}`);
      console.log(`   Default Br: ${repo.default_branch}`);
      console.log("-----------------------------------------");
    });
  } catch (error) {
    console.error(`Execution failed: ${error.message}`);
  }
}

runTracker();