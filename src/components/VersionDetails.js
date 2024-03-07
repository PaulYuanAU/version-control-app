import React from 'react';

const VersionDetails = ({ versions, projects, selectedProjectId }) => {
    const projectName = projects.find(project => project.project_id === selectedProjectId)?.name || '';
  
    return (
      <div>
        <h2>Version Details</h2>
        {versions.length > 0 ? (
          versions.map((version) => (
            <div className="version-item" key={version.version_id}>
              <p><strong>{projectName} - Version: {version.version}</strong></p>
              <p className="version-time">Created At: {version.createdAt}</p>
              <p className="version-time">Modified: {version.modified}</p>
            </div>
          ))
        ) : (
          <p>No versions available</p>
        )}
      </div>
    );
  };
  
  

export default VersionDetails;
