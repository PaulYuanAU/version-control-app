import React, { useState, useEffect } from 'react';
import ProjectList from './components/ProjectList';
import VersionDetails from './components/VersionDetails';
import './App.css';
import * as XLSX from 'xlsx';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    // Fetch projects from the API
    fetch(`${process.env.REACT_APP_API_BASE_URL}/projects`)
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error("Error fetching projects:", error));

    // Fetch all versions from the API
    fetch(`${process.env.REACT_APP_API_BASE_URL}/versions`)
      .then(response => response.json())
      .then(data => setVersions(data))
      .catch(error => console.error("Error fetching versions:", error));

    // Fetch versions from the API if a project is selected
    if (selectedProjectId) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/versions/${selectedProjectId}`)
        .then(response => response.json())
        .then(data => setVersions(data))
        .catch(error => console.error("Error fetching versions:", error));
    }
  }, [selectedProjectId]);

  const onSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const exportToExcel = () => {
    // Export all projects and versions data
    const wsProjects = XLSX.utils.json_to_sheet(projects);
    const wsVersions = XLSX.utils.json_to_sheet(versions);
    
    const wb = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(wb, wsProjects, "Projects");
    XLSX.utils.book_append_sheet(wb, wsVersions, "Versions");
    
    XLSX.writeFile(wb, "AllProjectsAndVersions.xlsx");
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Version Control System</h1>
      </header>
      <div className="content">
        <div className="project-list">
          <ProjectList projects={projects} onSelectProject={onSelectProject} selectedProjectId={selectedProjectId} />
        </div>
        <div className="version-details">
          <VersionDetails versions={versions} selectedProjectId={selectedProjectId} />
        </div>
      </div>
      <div className="export-button-container">
        <button onClick={exportToExcel}>Export Data to Excel</button>
      </div>
    </div>
  );
}

export default App;
