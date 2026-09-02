import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { writeFile } from "node:fs/promises";

interface Repository {
  name: string;
  html_url: string;
  visibility: string;
  default_branch: string;
  stargazers_count: number;
}

const ai = new GoogleGenAI();

async function getGitHubStats(username: string): Promise<Repository[]> {
  const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=updated`;
  console.log(`[HTTP] Fetching repos for: ${username}...`);

  const response = await fetch(url, {
    headers: { "User-Agent": "dev-roadmap-tracker" }
  });

  if (!response.ok) {
    throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as Repository[];
}

async function generatePortfolioBio(username: string, repos: Repository[]): Promise<string> {
  console.log("[AI] Generating developer profile summary with Gemini...");

  const repoList = repos
    .map((r) => `- [${r.name}](${r.html_url}) (Branch: ${r.default_branch})`)
    .join("\n");

  const prompt = `
You are a technical career assistant. Write a sharp, professional developer bio in GitHub Markdown format for developer "${username}".
Include:
1. A brief overview (2-3 sentences) summarizing their activity based on these repositories:
${repoList}
2. A bulleted section titled "### Core Repositories" listing each project with a concise one-line description of its probable purpose.
3. A brief section titled "### Active Tech Stack" based on these projects.
Keep it punchy, technical, and ready for a GitHub profile README.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt
  });

  return response.text ?? "No summary generated.";
}

async function runTracker(): Promise<void> {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    console.error("Configuration error: GITHUB_USERNAME is missing from .env");
    process.exit(1);
  }

  try {
    const repos = await getGitHubStats(username);
    console.log(`[Sync] Live Repositories Found: ${repos.length}`);

    const markdownContent = await generatePortfolioBio(username, repos);

    const outputPath = "PROFILE.md";
    await writeFile(outputPath, markdownContent, "utf-8");

    console.log(`[Success] Generated profile saved cleanly to ${outputPath}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Execution error: ${error.message}`);
    } else {
      console.error("An unknown error occurred.");
    }
  }
}

runTracker();
