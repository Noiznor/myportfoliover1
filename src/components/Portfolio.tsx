import React, { useState } from 'react';
import Projects from './Projects';
import ProjectModal from './ProjectModal';
import { projects as projectData } from '../data/projects';
import type { Project } from '../types/Project';

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <Projects projects={projectData} onProjectClick={handleProjectClick} />
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Portfolio;
