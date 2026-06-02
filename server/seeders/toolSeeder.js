const mongoose = require("mongoose");
const Tool = require("../src/models/Tool");

const tools = [
  {
    name: "ChatGPT",
    description:
      "An AI assistant that helps users with writing, coding, brainstorming, research support, and learning.",
    purpose:
      "To help students, faculty, developers, and staff complete academic and professional tasks more efficiently.",
    capabilities: [
      "Answer questions",
      "Generate code",
      "Explain concepts",
      "Summarize content",
      "Help with writing and editing",
    ],
    url: "https://chat.openai.com",
    mainUsers: [
      "student",
      "faculty",
      "researcher",
      "developer",
      "content-creator",
      "staff",
    ],
    category: "AI Assistant",
    tags: ["ai", "chatbot", "writing", "coding", "productivity"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    submittedBy: new mongoose.Types.ObjectId("69f4e83495ab05300fe7d021"),
    status: "approved",
    adminNotes: "Useful general-purpose AI tool.",
  },
  {
    name: "Canva",
    description:
      "A graphic design platform used to create presentations, posters, flyers, social media graphics, and visual content.",
    purpose:
      "To help users design professional-looking visual materials without advanced design skills.",
    capabilities: [
      "Create presentations",
      "Design posters and flyers",
      "Edit images",
      "Use templates",
      "Collaborate on designs",
    ],
    url: "https://www.canva.com",
    mainUsers: ["student", "faculty", "designer", "content-creator", "staff"],
    category: "Design",
    tags: ["design", "graphics", "presentation", "templates", "marketing"],
    logo: "https://static.canva.com/static/images/favicon-1.ico",
    submittedBy: new mongoose.Types.ObjectId("69f4e83495ab05300fe7d021"),
    status: "approved",
    adminNotes: "Good tool for creating course and marketing materials.",
  },
  {
    name: "GitHub",
    description:
      "A platform for hosting, sharing, and collaborating on code repositories.",
    purpose:
      "To help developers manage source code, version control, collaboration, and project documentation.",
    capabilities: [
      "Host code repositories",
      "Track changes with Git",
      "Manage issues",
      "Review pull requests",
      "Collaborate with teams",
    ],
    url: "https://github.com",
    mainUsers: ["student", "faculty", "researcher", "developer"],
    category: "Development",
    tags: ["code", "git", "version-control", "repository", "collaboration"],
    logo: "https://github.githubassets.com/favicons/favicon.svg",
    submittedBy: new mongoose.Types.ObjectId("69f4e83495ab05300fe7d021"),
    status: "approved",
    adminNotes: "Recommended for programming and software development courses.",
  },
  {
    name: "Firebase",
    description:
      "A Google platform that provides backend services such as authentication, databases, hosting, and cloud functions.",
    purpose:
      "To help developers build full-stack web and mobile apps without creating a custom backend from scratch.",
    capabilities: [
      "User authentication",
      "Firestore database",
      "Realtime database",
      "Cloud storage",
      "App hosting",
    ],
    url: "https://firebase.google.com",
    mainUsers: ["student", "developer", "faculty"],
    category: "Backend",
    tags: ["firebase", "backend", "authentication", "firestore", "database"],
    logo: "https://www.gstatic.com/devrel-devsite/prod/v85b3c61a38eacd3e51f4f3d8a093e33e82bc04f5c35090fdb6b61c94fbd8cbe9/firebase/images/favicon.png",
    submittedBy: new mongoose.Types.ObjectId("69f4e83495ab05300fe7d021"),
    status: "approved",
    adminNotes: "Useful for React Native and web development projects.",
  },
  {
    name: "Figma",
    description:
      "A collaborative design tool used for UI/UX design, wireframing, prototyping, and design systems.",
    purpose:
      "To help designers, developers, and students plan application interfaces before development.",
    capabilities: [
      "Create wireframes",
      "Design UI screens",
      "Build prototypes",
      "Collaborate in real time",
      "Share design files",
    ],
    url: "https://www.figma.com",
    mainUsers: ["student", "designer", "developer", "faculty"],
    category: "Design",
    tags: ["ui", "ux", "prototype", "wireframe", "design"],
    logo: "https://static.figma.com/app/icon/1/favicon.svg",
    submittedBy: new mongoose.Types.ObjectId("69f4e83495ab05300fe7d021"),
    status: "approved",
    adminNotes: "Great for planning app layouts and prototypes.",
  },
  {
    name: "Google Scholar",
    description:
      "A search engine for scholarly articles, academic papers, theses, books, and research publications.",
    purpose:
      "To help researchers and students find academic sources for papers and literature reviews.",
    capabilities: [
      "Search scholarly articles",
      "Find citations",
      "Access academic papers",
      "Track related research",
      "Export citations",
    ],
    url: "https://scholar.google.com",
    mainUsers: ["student", "faculty", "researcher"],
    category: "Research",
    tags: [
      "research",
      "academic",
      "articles",
      "citations",
      "literature-review",
    ],
    logo: "https://scholar.google.com/favicon.ico",
    submittedBy: new mongoose.Types.ObjectId("69f4e83495ab05300fe7d021"),
    status: "approved",
    adminNotes: "Useful for academic research assignments.",
  },
  {
    name: "Grammarly",
    description:
      "A writing assistant that helps users improve grammar, spelling, clarity, tone, and writing quality.",
    purpose:
      "To help users write clearer and more professional documents, emails, and assignments.",
    capabilities: [
      "Check grammar",
      "Check spelling",
      "Improve clarity",
      "Suggest tone changes",
      "Review writing style",
    ],
    url: "https://www.grammarly.com",
    mainUsers: ["student", "faculty", "researcher", "content-creator", "staff"],
    category: "Writing",
    tags: ["writing", "grammar", "editing", "proofreading", "communication"],
    logo: "https://static.grammarly.com/assets/files/8f7dd16fbcaa81cb8a5c5ef9d9b1985d/favicon.ico",
    submittedBy: new mongoose.Types.ObjectId("69f4e83495ab05300fe7d021"),
    status: "approved",
    adminNotes: "Helpful for improving writing quality.",
  },
  {
    name: "Notion",
    description:
      "A productivity and note-taking platform used for organizing notes, tasks, documents, and project information.",
    purpose:
      "To help users manage personal notes, class materials, research notes, and project documentation.",
    capabilities: [
      "Create notes",
      "Manage tasks",
      "Organize documents",
      "Create databases",
      "Collaborate with others",
    ],
    url: "https://www.notion.so",
    mainUsers: ["student", "faculty", "researcher", "developer", "staff"],
    category: "Productivity",
    tags: ["notes", "tasks", "organization", "documents", "productivity"],
    logo: "https://www.notion.so/images/favicon.ico",
    submittedBy: new mongoose.Types.ObjectId("69f4e83495ab05300fe7d021"),
    status: "approved",
    adminNotes: "Useful for organizing academic and project work.",
  },
  {
    name: "Postman",
    description:
      "An API platform used to test, document, and manage API requests.",
    purpose:
      "To help developers test backend routes and understand API communication.",
    capabilities: [
      "Test API requests",
      "Send GET, POST, PUT, and DELETE requests",
      "Manage API collections",
      "View API responses",
      "Document APIs",
    ],
    url: "https://www.postman.com",
    mainUsers: ["student", "developer", "faculty"],
    category: "Development",
    tags: ["api", "backend", "testing", "postman", "development"],
    logo: "https://www.postman.com/_ar-assets/images/favicon-1-32.png",
    submittedBy: new mongoose.Types.ObjectId("69f4e83495ab05300fe7d021"),
    status: "approved",
    adminNotes: "Helpful for backend and API testing lessons.",
  },
  {
    name: "Visual Studio Code",
    description:
      "A lightweight and powerful code editor used for web, mobile, and software development.",
    purpose: "To help developers write, debug, and manage code efficiently.",
    capabilities: [
      "Write code",
      "Install extensions",
      "Debug applications",
      "Use integrated terminal",
      "Manage Git repositories",
    ],
    url: "https://code.visualstudio.com",
    mainUsers: ["student", "developer", "faculty"],
    category: "Development",
    tags: ["code-editor", "programming", "vscode", "development", "debugging"],
    logo: "https://code.visualstudio.com/favicon.ico",
    submittedBy: new mongoose.Types.ObjectId("69f4e83495ab05300fe7d021"),
    status: "approved",
    adminNotes: "Recommended code editor for programming courses.",
  },
];

module.exports = tools;

const seedTools = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/campusai");

    console.log("MongoDB connected");

    await Tool.deleteMany();
    console.log("Old tools deleted");

    await Tool.insertMany(tools);
    console.log("Tools seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding tools:", error);
    process.exit(1);
  }
};

seedTools();
