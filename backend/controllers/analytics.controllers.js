import { Village } from "../models/village.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

export const getSummaryAnalytics = async (req, res) => {
  try {
    const totalVillages = await Village.countDocuments();
    const approvedVillages = await Village.countDocuments({
      status: "approved",
    });
    const pendingVillages = await Village.countDocuments({ status: "pending" });
    const avgPriorityScore = await Village.aggregate([
      { $group: { _id: null, avgScore: { $avg: "$priorityScore" } } },
    ]);

    const averagePrioriyScore = avgPriorityScore[0]?.avgScore || 0;

    res.json(
      new apiResponse(
        200,
      {
        totalVillages,
        approvedVillages,
        pendingVillages,
        averagePrioriyScore,
      },
      "Got the summary successfully"
      )
    );
  } catch (error) {
    console.error("Error while getting the summary of the village", error);
    throw new apiError(500, "server error");
  }
};

export const getAmenitiesStatus = async (req, res) => {
  try {
    const result = {
      waterSupplyMissing: await Village.countDocuments({
        "amenities.waterSupply": "Not Available",
      }),
      electricityMissing: await Village.countDocuments({
        "amenities.electricity": "Not Available",
      }),
      roadConnectivityMissing: await Village.countDocuments({
        "amenities.roadConnectivity": "Poor",
      }),
      healthcareMissing: await Village.countDocuments({
        "amenities.healthcare": "Not Available",
      }),
      schoolMissing: await Village.countDocuments({
        "amenities.school": "Not Available",
      }),
      toiletsMissing: await Village.countDocuments({
        "amenities.toilets": "Not Available",
      }),
      internetMissing: await Village.countDocuments({
        "amenities.internet": "Not Available",
      }),
    };

    res.json(
      new apiResponse(
        200,
        {
          result,
        },
        "Got the amenities successfully"
      )
    );
  } catch (error) {
    console.error("Amenities Analytics Error:", error);
    throw new apiError(500, "server error");
  }
};

export const getPriorityRanking = async (req, res) => {
  try {
    const villages = await Village.find()
      .sort({ priorityScore: -1 })
      .limit(10)
      .select("villageName district priorityScore");

    res.json(
      new apiResponse(
        200,
        {
          villages
        },
        "Got the priority ranking"
      )
    )
  } catch (error) {
    console.error("Error while getting the priority ranking",error)
    throw new apiError(500,"server error")
  }
};
