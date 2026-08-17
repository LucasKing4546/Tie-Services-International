import React from 'react';
import ProjectCaseStudy from '@/components/ProjectCaseStudy';
import { fugroGeophysicalData } from '@/data/fugroGeophysicalData';

const FugroGeophysical = () => {
  return <ProjectCaseStudy projectData={fugroGeophysicalData} />;
};

export default FugroGeophysical;
