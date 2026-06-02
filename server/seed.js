const mongoose = require("mongoose");
const Tool = require("../server/src/models/Tool"); // Change to your actual file path

// Generate a valid ObjectId to simulate an admin or user submission
const fakeUserId = new mongoose.Types.ObjectId();

const seedTools = [
  {
    name: "Academic WriteFlow",
    description:
      "An AI-powered writing assistant that helps organize research papers, formats citations automatically, and checks for style inconsistencies.",
    purpose:
      "Streamline academic writing and citation management for research publications.",
    capabilities: [
      "Citation generation",
      "Style checking",
      "Outline building",
      "Plagiarism detection",
    ],
    url: "https://writeflow-academic.edu",
    mainUsers: ["student", "faculty", "researcher"],
    category: "Writing",
    tags: ["AI", "Research", "Formatting", "LaTeX"],
    logo: "https://static.canva.com/static/images/favicon-1.ico",
    submittedBy: fakeUserId,
    status: "approved",
    adminNotes: "Verified university domain and integration options.",
  },
  {
    name: "DevSandbox Live",
    description:
      "A collaborative, cloud-based IDE designed for real-time pair programming, featuring instant preview environments and shared terminals.",
    purpose:
      "Facilitate remote developer collaboration and quick prototyping without local setup.",
    capabilities: [
      "Live pair programming",
      "Shared terminal",
      "Multi-language support",
      "Docker preview",
    ],
    url: "https://devsandbox.live",
    mainUsers: ["developer", "student"],
    category: "Development",
    tags: ["IDE", "Cloud", "Collaboration", "Coding"],
    logo: "devsandbox.live",
    submittedBy: fakeUserId,
    status: "approved",
    adminNotes: "Highly requested tool by the computer science department.",
  },
  {
    name: "PixelCraft Engine",
    description:
      "A browser-based vector graphic and asset generation tool built specifically for interface designers and web content creators.",
    purpose:
      "Provide lightweight, collaborative vector editing tools directly in the browser.",
    capabilities: [
      "Vector editing",
      "SVG export",
      "Design system linking",
      "Component variants",
    ],
    url: "https://pixelcraft-engine.io",
    mainUsers: ["designer", "content-creator"],
    category: "Design",
    tags: ["Vector", "UI/UX", "Graphics", "Prototyping"],
    logo: "", // Default schema value handles this but explicitly seeding it empty
    submittedBy: fakeUserId,
    status: "pending",
    adminNotes:
      "Awaiting security review regarding third-party cloud assets storage.",
  },
  {
    name: "CampusSync Planner",
    description:
      "An internal administrative tool used to coordinate departmental schedules, physical space room allocations, and campus event requests.",
    purpose:
      "Automate room booking and minimize scheduling conflicts across academic buildings.",
    capabilities: [
      "Calender syncing",
      "Room booking automation",
      "Conflict notifications",
    ],
    url: "campus-sync.local",
    mainUsers: ["staff", "faculty"],
    category: "Administration",
    tags: ["Operations", "Scheduling", "Internal"],
    logo: "campus-sync.local",
    submittedBy: fakeUserId,
    status: "pending",
    adminNotes: "",
  },
  {
    name: "VideoSnippet Pro",
    description:
      "A rapid video editing application designed to slice long lectures into highly engaging social media snippets and micro-learning modules.",
    purpose:
      "Help educators and creators convert long-form audio/video content into scannable formats.",
    capabilities: [
      "Auto-captioning",
      "Smart cutting",
      "Aspect ratio conversion",
      "Direct export",
    ],
    url: "https://videosnippet.pro",
    mainUsers: ["content-creator", "faculty"],
    category: "Media",
    tags: ["Video Editing", "AI", "Microlearning"],
    logo: "videosnippet.pro",
    submittedBy: fakeUserId,
    status: "rejected",
    adminNotes:
      "Rejected due to high pricing model and lack of educational institutional discounts.",
  },
];

// Execution script to push data into MongoDB
const seedDB = async () => {
  try {
    // Modify connection URL matching your local database configuration
    await mongoose.connect("mongodb://127.0.0.1:27017/campusai");
    console.log("Connected to MongoDB successfully...");

    // Clear out existing data to avoid duplicate testing records
    await Tool.deleteMany({});
    console.log("Cleared old Tool data...");

    // Insert new seed documents
    await Tool.insertMany(seedTools);
    console.log("Database seeded successfully with test items!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding your database:", error);
    process.exit(1);
  }
};

seedDB();
