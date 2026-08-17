export interface ProjectData {
  // Hero Section
  title: string;
  subtitle: string;
  description: string;
  badges: Array<{
    text: string;
    variant: "secondary" | "outline";
  }>;
  
  // Project Info
  location: string;
  completedYear: string;
  vesselType: string;
  icon: string; // Icon name for the vessel type
  
  // Overview
  overviewTitle: string;
  overviewIcon: string;
  overviewContent: string[];
  
  // Technical Scope/Equipment
  technicalTitle: string;
  leftColumn: {
    title: string;
    items: string[];
  };
  rightColumn: {
    title: string;
    items: string[];
  };
  
  // Project Highlights/Achievements
  highlightsTitle: string;
  highlightSections: Array<{
    title: string;
    content: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
  
  // Sidebar Details
  client: string;
  duration: string;
  classification: string;
  application: string;
  
  // Testimonial
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
}