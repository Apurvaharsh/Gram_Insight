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

    const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

    const completion = await openai.chat.completions.create({
        model:"gpt-4o-mini",
        messages:[{role:"user",content:prompt}]
    })

    const generatedMessage = completion.choices[0].message.content;

    res.json(
        new apiResponse(
            200,
            {
                villageId,
                plan:generatedMessage
            }
        )
    )
  } catch (error) {}
};
