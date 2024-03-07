import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import VersionDetails from './components/VersionDetails';
import './App.css';
import data from './data.json';
import './App.css';
import * as XLSX from 'xlsx';



function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const onSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
  };
  const versionsToShow = data.versions
    .filter(version => version.project_id === selectedProjectId)
    .sort((a, b) => b.version.localeCompare(a.version));
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data.projects.concat(data.versions));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ProjectsAndVersions");
    XLSX.writeFile(wb, "ProjectsAndVersions.xlsx");
};

  return (
    <div className="App">
      <header className="App-header">
        <h1>Version Control System</h1>
      </header>
      <div className="content">
        <div className="project-list">
        <ProjectList projects={data.projects} onSelectProject={onSelectProject} selectedProjectId={selectedProjectId} />
        </div>
        <div className="version-details">
          <VersionDetails versions={versionsToShow} projects={data.projects} selectedProjectId={selectedProjectId} />
        </div>
      </div>
      <div className="export-button-container">
          <button onClick={exportToExcel}>Export Data to Excel</button>
        </div>
    </div>
  );
}


export default App;
