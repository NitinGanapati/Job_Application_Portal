import  express from 'express';
const router = express.Router();
import  Application from '../models/applicationSchema.js'; // Import the application model

// Route to get statistics for a job applicant
router.get('/applicant/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Total applications
    const totalApplications = await Application.countDocuments({ "jobSeekerInfo.id": userId });

    // Applications in the last 7 days
    const lastWeekApplications = await Application.countDocuments({
      "jobSeekerInfo.id": userId,
      appliedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Ensure you have an `appliedAt` field in the schema
    });

    // Total interviews scheduled
    const interviews = await Application.countDocuments({
      "jobSeekerInfo.id": userId,
      status: 'interview_scheduled', // Make sure this status exists in your application data
    });

    res.json({
      totalApplications,
      lastWeekApplications,
      interviews,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;