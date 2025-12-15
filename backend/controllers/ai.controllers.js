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

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    const model = genAI.getGenerativeModel({model:"gemini-2.0-flash"})

    const result = await model.generateContent(prompt)

    const responseText = result.response.text()

  

    res.json(
        new apiResponse(
            200,
            {
                village:village.villageName,
                plan:responseText,
            },
            "message generated successfully"
        )
    )
  } catch (error) {
    console.error("Error generated while generating response:", error)
    res.status(500).json({
      success: false,
      message: "Failed to generate development plan",
      error: error.message
    })
  }
};
