interface Repository {
  name: string;
  html_url: string;
  visibility: string;
  default_branch: string;
  stargazers_count: number;
}

async function getGitHubStats(username: string): Promise<Repository[]> {
  const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=updated`;

  console.log(`[HTTP] Fetching repos for: ${username}...`);

  const response = await fetch(url, {
    headers: {
      "User-Agent": "dev-roadmap-tracker"
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as Repository[];
  return data;
}

async function runTracker(): Promise<void> {
  const username = "Mansi5543";

  try {
    const repos = await getGitHubStats(username);

    console.log("-----------------------------------------");
    console.log(`Live Repositories Found: ${repos.length}`);
    console.log("-----------------------------------------");

    repos.forEach((repo: Repository, idx: number) => {
      console.log(`${idx + 1}. ${repo.name}`);
      console.log(`   URL       : ${repo.html_url}`);
      console.log(`   Stars     : ${repo.stargazers_count}`);
      console.log(`   Visibility: ${repo.visibility}`);
      console.log(`   Branch    : ${repo.default_branch}`);
      console.log("-----------------------------------------");
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Execution error: ${error.message}`);
    } else {
      console.error("An unknown error occurred.");
    }
  }
}

runTracker();