import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, ExternalLink, LucideIcon } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    client: string;
    location: string;
    year: string;
    category: string;
    description: string;
    image: string;
    highlights: string[];
    icon: LucideIcon;
    route: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const IconComponent = project.icon;

  const handleCardClick = () => {
    window.open(project.route, '_blank');
  };

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div onClick={handleCardClick}>
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              {project.category}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-white">
              <IconComponent className="h-5 w-5" />
              <span className="font-semibold">{project.client}</span>
            </div>
          </div>
        </div>

        <CardHeader className="pb-4">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {project.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {project.year}
            </div>
          </div>
          <CardDescription className="line-clamp-3">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Project Highlights:</h4>
              <div className="flex flex-wrap gap-2">
                {project.highlights.slice(0, 3).map((highlight, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {highlight}
                  </Badge>
                ))}
                {project.highlights.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.highlights.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            >
              View Case Study
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProjectCard;