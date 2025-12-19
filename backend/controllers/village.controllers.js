import { Village } from "../models/village.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

export const createVillage = async (req, res) => {
  try {
    const villageData = req.body;

    villageData.createdBy = req.user._id;

    // Handle both amenities and amenties (typo) for backward compatibility
    const amenities = villageData.amenities || villageData.amenties || {};
    villageData.amenities = amenities;
    delete villageData.amenties; // Remove typo field

    const missingAmenities = Object.values(amenities).filter(
      (value) => value === "Not Available" || value === "Poor"
    ).length;

    villageData.priorityScore = missingAmenities * 10 + (villageData.scPopulation || 0) / 10;

    const village = await Village.create(villageData);

    res.status(200).json(
      new apiResponse(
        200,
        {
          village: village,
        },
        "village created successfully"
      )
    );
  } catch (error) {
    console.error("Error while creating the village ", error);
    throw new apiError(400, error.message || "server error");
  }
};

export const getVillages = async (req, res) => {
  try {
    const villages = await Village.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(
      new apiResponse(
        200,
        {
          villages,
        },
        "villages fetched successfully"
      )
    );
  } catch (error) {
    console.error("Error while listing the villages", error);
    throw new apiError(400, error.message || "server error");
  }
};

export const getVillageById = async (req, res) => {
  try {
    const village = await Village.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!village) {
      return res.status(404).json(
        new apiResponse(
          404,
          null,
          "Village not found"
        )
      );
    }

    res.json(
      new apiResponse(
        200,
        {
          village,
        },
        "village found successfully"
      )
    );
  } catch (error) {
    console.error("Error while fetching the village", error);
    if (error.name === 'CastError') {
      return res.status(404).json(
        new apiResponse(
          404,
          null,
          "Village not found"
        )
      );
    }
    throw new apiError(400, error.message || "server error");
  }
};

export const updateVillage = async (req, res) => {
  try {
    // Handle amenities normalization
    if (req.body.amenities || req.body.amenties) {
      req.body.amenities = req.body.amenities || req.body.amenties;
      delete req.body.amenties;
    }

    // Recalculate priority score if amenities changed
    if (req.body.amenities) {
      const missingAmenities = Object.values(req.body.amenities).filter(
        (value) => value === "Not Available" || value === "Poor"
      ).length;
      const village = await Village.findById(req.params.id);
      const scPopulation = req.body.scPopulation || village?.scPopulation || 0;
      req.body.priorityScore = missingAmenities * 10 + scPopulation / 10;
    }

    const updatedVillage = await Village.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("createdBy", "name email");

    if (!updatedVillage) {
      return res.status(404).json(
        new apiResponse(
          404,
          null,
          "Village not found"
        )
      );
    }

    res.json(
      new apiResponse(
        200,
        {
          village: updatedVillage,
        },
        "village updated successfully"
      )
    );
  } catch (error) {
    console.error("Error while updating village", error);
    throw new apiError(400, error.message || "server error");
  }
};

export const deleteVillage = async (req, res) => {
  try {
    const village = await Village.findById(req.params.id);

    if (!village) {
      throw new apiError(400, "village not found to delete");
    }

    await village.deleteOne(village);
    res.json(
      new apiResponse(
        200,
        {
          village,
        },
        "this village deleted successfully"
      )
    );
  } catch (error) {
    console.log("Error while deleting the village",error)
    throw new apiError(400,"server error")
  }
};

export const approveVillage = async(req,res) => {
    try {
        const village = await Village.findById(req.params.id)

        if(!village){
            throw new apiError(400,"village not found")
        }
        village.status= "approved"
        await village.save()

        res.json(
            new apiResponse(
                200,
                {
                    village
                },
                "This village got approved"
            )
        )
    } catch (error) {
        console.error("Error while approving the village",error)
        throw new apiError(500,"server error")
    }
}
