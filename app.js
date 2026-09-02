// Function simulating a fetch request from a remote API
function fetchDeveloperProfile(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!username) {
        reject(new Error("Username is required"));
      } else {
        resolve({
          user: username,
          role: "AI Tooling & Backend Engineer",
          targetTrack: "TypeScript + Open Source Automation",
          dailyGoalHours: 6,
          status: "Active"
        });
      }
    }, 1200); // Simulates 1.2-second network latency
  });
}

// Asynchronous runner function using modern async/await
async function runRoadmapTracker() {
  console.log("Connecting to remote developer registry...");

  try {
    const profile = await fetchDeveloperProfile("Mansi");
    
    console.log("Data retrieved successfully:");
    console.log("-----------------------------------------");
    console.log(`Developer : ${profile.user}`);
    console.log(`Role Track: ${profile.role}`);
    console.log(`Focus     : ${profile.targetTrack}`);
    console.log(`Daily Goal: ${profile.dailyGoalHours} hours/day`);
    console.log(`Status    : ${profile.status}`);
    console.log("-----------------------------------------");
  } catch (error) {
    console.error(`Failed to load profile: ${error.message}`);
  }
}

// Execute the async program
runRoadmapTracker();