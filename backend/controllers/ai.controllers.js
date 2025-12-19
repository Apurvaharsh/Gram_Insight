import { GoogleGenerativeAI } from "@google/generative-ai";
import { Village } from "../models/village.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import OpenAI from "openai";

export const generateDevelopmentPlan = async (req, res) => {
  try {
    const villageId = req.params.id;
    const village = await Village.findById(villageId);

    if (!village) {
      throw new apiError(400, "Village not found");
    }
    const prompt = `
Generate a professional development plan for an Indian rural village based on the following data. 
Focus on SC-majority population impact, missing amenities, urgency level, government scheme suggestions, 
and a step-by-step improvement plan including timeline.

Village Name: ${village.villageName}
District: ${village.district}
Population: ${village.population}
SC Population: ${village.scPopulation}
Current Priority Score: ${village.priorityScore}

Amenities Status:
Water Supply: ${village.amenities.waterSupply}
Electricity: ${village.amenities.electricity}
Road Connectivity: ${village.amenities.roadConnectivity}
Healthcare: ${village.amenities.healthcare}
School: ${village.amenities.school}
Toilets: ${village.amenities.toilets}
Internet: ${village.amenities.internet}

Write a detailed proposal with 10-15 lines in a formal government tone including:
- Critical issues
- Impact on SC community
- Recommended solutions
- Timeline for completion
- Resource estimate
- Expected improvement outcome on ranking score
`;

    let responseText;

    let isFallback = false;

    try {
      // Prefer live model when key is available
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY not set");
      }
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      responseText = result.response.text();
    } catch (aiError) {
      console.warn("AI plan generation failed, using fallback:", aiError.message);
      // Fallback deterministic plan so UI never breaks
      isFallback = true;
      responseText = `
DEVELOPMENT PLAN SUMMARY
1) Water Supply: Deploy solar water pumps and storage within 3 months.
2) Electricity: Set up decentralized solar micro-grid; target 24/7 availability.
3) Roads: Resurface main arteries; enable all-weather connectivity in 4–6 months.
4) Healthcare: Weekly mobile health clinic; set up telemedicine kiosk.
5) Education: Bridge-school program; ensure primary school capacity and teachers.
6) Sanitation: 100% household toilets and community maintenance drive.
7) Internet: Public Wi-Fi hotspot at Panchayat; fiber/4G uptime monitoring.
8) Governance: Monthly review with SC community reps; publish progress dashboard.
9) Schemes: Leverage Jal Jeevan Mission, PMGSY, Saubhagya, Ayushman, and PM-WANI.
10) Timeline & Budget: Phase 1 (0–3m) critical gaps; Phase 2 (4–9m) infra; Phase 3 (10–18m) sustain. Budget tuned to missing amenities count.
`.trim();
    }

    res.json(
      new apiResponse(
        200,
        {
          village: village.villageName,
          plan: responseText,
          isFallback,
        },
        "message generated successfully"
      )
    );
  } catch (error) {
    console.error("Error generated while generating response:", error)
    res.status(500).json({
      success: false,
      message: "Failed to generate development plan",
      error: error.message
    })
  }
};
