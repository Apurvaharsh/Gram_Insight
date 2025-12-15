import { GoogleGenerativeAI } from "@google/generative-ai";
import { Village } from "../models/village.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

export const generateForecast = async (req, res) => {
  try {
    const village = await Village.findById(req.params.id);

    if (!village) {
      throw new apiError(400, "village not found");
    }

    const baseCostPerAminity = 250000;
    const timePerAminity = 1.2;

    const amenities = village.amenities || {};

    const missingCount = Object.values(amenities).filter(
      (value) => value === "Not Available" || value === "Poor"
    ).length;

    const estimatedBudget = missingCount * baseCostPerAminity;
    const estimatedTimeline = missingCount * timePerAminity;
    const expectedScoreIncrease = missingCount * 8;

    const formattedBudget = `₹${estimatedBudget.toLocaleString("en-IN")}`;

    let aiSummary;

    try {
      const prompt = `
Create a short professional summary for a government development proposal.

Village Name: ${village.villageName}
District: ${village.district}
Population: ${village.population}
SC Population: ${village.scPopulation}
Missing Amenities Count: ${missingCount}

Estimated Budget: ${formattedBudget}
Estimated Timeline: ${estimatedTimeline.toFixed(1)} months
Expected Score Improvement: +${expectedScoreIncrease}

Write in a formal tone highlighting:
- Critical development need
- Benefit to SC population
- Government impact
- Why urgent intervention is required
- Expected outcome
(10-12 lines)
`;

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
      const result = await model.generateContent(prompt);
      aiSummary = result.response.text();
    } catch (aiError) {
      console.warn("Gemini API error, using fallback summary:", aiError.message);
      // Fallback summary when API quota is exceeded
      aiSummary = `
**DEVELOPMENT FORECAST FOR ${village.villageName.toUpperCase()}, ${village.district.toUpperCase()} DISTRICT**

This village requires urgent government intervention with ${missingCount} critical amenities missing or in poor condition. The Scheduled Caste population of ${village.scPopulation} (${((village.scPopulation/village.population)*100).toFixed(1)}% of total ${village.population} residents) faces significant hardship due to inadequate infrastructure.

**CRITICAL GAPS IDENTIFIED:**
Essential services including water supply, electricity, road connectivity, healthcare facilities, educational infrastructure, sanitation facilities, and digital connectivity require immediate attention. These deficiencies directly impact the quality of life and socio-economic development of the SC community.

**PROPOSED INTERVENTION:**
Comprehensive development plan estimated at ${formattedBudget} over ${estimatedTimeline.toFixed(1)} months. This investment will address all identified gaps through targeted schemes under central and state government programs.

**EXPECTED OUTCOMES:**
Upon completion, the village priority score is projected to improve by ${expectedScoreIncrease} points, significantly enhancing living standards and creating equitable access to basic amenities. This intervention aligns with national rural development goals and SC welfare policies.

**RECOMMENDATION:**
Immediate approval and fund allocation recommended for expedited implementation.
      `.trim();
    }

    res.json(
      new apiResponse(200, {
        village,
        forecast: {
          estimatedBudget: formattedBudget,
          estimatedTimeline: `${estimatedTimeline.toFixed(1)} months`,
          expectedScoreIncrease: `+${expectedScoreIncrease}`,
          aiSummary: aiSummary,
        },
      },"forecast generated successfully"
    )
    );
  } catch (error) {
    console.error("Forecast AI Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate forecast",
      error: error.message,
    });
  }
};
