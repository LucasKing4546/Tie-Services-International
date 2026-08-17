import React from 'react';
import ProjectCaseStudy from '@/components/ProjectCaseStudy';
import { dsvNewbuildData } from '@/data/dsvNewBuildData';

const DSVNewbuild = () => {
  return <ProjectCaseStudy projectData={dsvNewbuildData} />;
};

export default DSVNewbuild;