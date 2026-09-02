// function to calculate required daily study hours
function calculateStudyPlan(targetWeeks, targetTotalHours) {
    const totalDays = targetWeeks *7
    const hoursperDay = (targetTotalHours / totaldays).toFixed(1);
     
    return {
        totalDays,
        dailyRequirement: hoursperDay
    };
}
 const developer = "Man                     si";
 const plan = calculateStudyPlan(16,800);

 console.log("----------------------------------------");
 console.log('Developer: ${developer}');
 console.log('Timeline: ${plan.totalDays}Days');
 console.log('Commitment:${plan.dailyRequiremnet} hours/day to hit 800 hours');
 console.log("Status in progress");
 console.log("-----------------------------------------------");
 
