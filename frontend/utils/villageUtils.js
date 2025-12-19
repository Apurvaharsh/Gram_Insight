export const getMissingAmenities = (amenities = {}) =>
  Object.entries(amenities)
    .filter(([_, value]) => value === "Not Available" || value === "Poor")
    .map(([key]) => key);

export const getSeverityIcon = (priorityScore, icons) => {
  if (priorityScore >= 70) return icons.red;
  if (priorityScore >= 40) return icons.orange;
  return icons.green;
};  
