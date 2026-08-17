import React from 'react';
import ProjectCaseStudy from '@/components/ProjectCaseStudy';
import { gsiVesselProgramData } from '@/data/gsiVesselProgramData';

const GSIVesselProgram = () => {
  return <ProjectCaseStudy projectData={gsiVesselProgramData} />;
};

export default GSIVesselProgram;