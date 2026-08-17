export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const {
      fullName,
      first_name,
      last_name,
      email,
      phone,
      institution,
      type,
      city,
      location,
      designation,
      role,
      message,
      comment,
      requirements,
      students,
      solution_interest,
      implementation_time,
    } = req.body;

    const resolvedName = fullName || `${first_name || ""} ${last_name || ""}`.trim();
    const resolvedEmail = email;
    const resolvedPhone = phone;
    const resolvedInstitution = institution || type;
    const resolvedLocation = city || location;
    const resolvedRole = designation || role;
    const resolvedMessage = message || comment || requirements;

    if (!resolvedName || !resolvedEmail || !resolvedPhone) {
      return res.status(422).json({
        success: false,
        message: "Please provide your name, email, and phone number.",
      });
    }

    // You can forward this to email, database, or CRM here
    console.log("New Enquiry Received:", {
      name: resolvedName,
      email: resolvedEmail,
      phone: resolvedPhone,
      institution: resolvedInstitution,
      city: resolvedLocation,
      designation: resolvedRole,
      message: resolvedMessage,
      students,
      solution_interest,
      implementation_time,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: "Thank you! Your enquiry has been received successfully.",
    });
  } catch (error) {
    console.error("Enquiry API Error:", error);
    return res.status(500).json({
      success: false,
      message: "An internal error occurred. Please try again.",
    });
  }
}
