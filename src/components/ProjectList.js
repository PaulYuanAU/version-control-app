import React from 'react';

const ProjectList = ({ projects, onSelectProject, selectedProjectId }) => {
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li
            key={project.project_id}
            onClick={() => onSelectProject(project.project_id)}
            className={selectedProjectId === project.project_id ? 'selected' : ''}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
