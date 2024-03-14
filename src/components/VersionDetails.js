// VersionDetails.js
import React, { useState, useEffect } from 'react';

const VersionDetails = ({ selectedProjectId }) => {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    // Define the function to fetch versions
    const fetchVersions = async () => {
      try {
        // Use the environment variable for the API base URL
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/versions/${selectedProjectId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setVersions(data);
      } catch (error) {
        console.error("There was a problem fetching version data:", error);
      }
    };

    // Check if a project has been selected and only then call the fetch function
    if (selectedProjectId) {
      fetchVersions();
    }
  }, [selectedProjectId]); // Dependency array ensures this effect runs when selectedProjectId changes

  return (
    <div>
      <h2>Version Details</h2>
      {versions.length > 0 ? (
       versions.map(version => (
        <div className="version-item" key={version.version_id}>
          <p><strong>Version: {version.version}</strong></p>
          <p className="version-time">Created At: {version.createdAt}</p>
          <p className="version-time">Modified At: {version.modified}</p>
        </div>
        ))
      ) : (
        <p>No versions available for this project</p>
      )}
    </div>
  );
};

export default VersionDetails;
