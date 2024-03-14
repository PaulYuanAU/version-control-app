// ProjectList.js
import React, { useState, useEffect } from 'react';

const ProjectList = ({ onSelectProject, selectedProjectId }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Define the function to fetch projects
    const fetchProjects = async () => {
      try {
        // Use the environment variable for the API base URL
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("There was a problem fetching project data:", error);
      }
    };

    // Call the fetch function
    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Project List</h2>
      <ul>
        {projects.map(project => (
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
