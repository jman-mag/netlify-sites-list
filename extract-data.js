const fs = require('fs');

// Read the raw sites data
const rawData = JSON.parse(fs.readFileSync('sites-raw.json', 'utf8'));

// Extract relevant information
const sitesData = rawData.map(site => {
  const repoUrl = site.build_settings?.repo_url || null;
  const lastDeploy = site.published_deploy;
  
  return {
    name: site.name,
    url: site.ssl_url || site.url,
    created_at: site.created_at,
    updated_at: site.updated_at,
    last_deploy_at: lastDeploy?.published_at || lastDeploy?.created_at,
    repo_url: repoUrl,
    state: site.state,
    custom_domain: site.custom_domain
  };
});

// Sort by last updated date (most recent first)
sitesData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

// Write the processed data
fs.writeFileSync('sites-processed.json', JSON.stringify(sitesData, null, 2));

console.log(`Processed ${sitesData.length} sites`);
console.log('Data saved to sites-processed.json');