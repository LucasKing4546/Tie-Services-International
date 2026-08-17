import React from 'react';
import { ChevronRight, Wind, LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  types: string[];
  highlight: string;
  icon: LucideIcon;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  types,
  highlight,
  icon: IconComponent
}) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    switch (id) {
      case 'winches':
        navigate('/products/winches');
        break;
      case 'aframes':
        navigate('/products/aframes');
        break;
      case 'lars':
        navigate('/products/lars');
        break;
      default:
        break;
    }
  };
  return (
    <Card className="hover-scale-102 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <IconComponent className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">{name}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-2">Available Types:</h4>
            <ul className="space-y-1">
              {types.map((type, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  {type}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-border pt-4">
            <div className="flex items-start gap-2">
              <Wind className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-primary font-medium">{highlight}</p>
            </div>
          </div>
          <Button className="w-full" variant="outline" onClick={handleViewDetails}>
            View Details <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;