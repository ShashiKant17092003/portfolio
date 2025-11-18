/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
const token = import.meta.env.VITE_GITHUB_TOKEN;
function GitHubData() {

    const [hoveredRepoId, setHoveredRepoId] = useState(null);

    const handleHover = (id) => setHoveredRepoId(id);
    const handleUnhover = () => setHoveredRepoId(null);


  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const username = 'shashikant17092003';
  const personalAccessToken = token;

  const [repoDetails, setRepoDetails] = useState({});
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [totalAdditions, setTotalAdditions] = useState(0);
  const [totalDeletions, setTotalDeletions] = useState(0);

  const fetchFromGitHub = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${personalAccessToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'Accept': 'application/vnd.github+json',
        },
      });
      return response.data;
    } catch (err) {
      console.error('GitHub API Error:', err.response ? err.response.data : err.message);
      throw err;
    }
  };

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);
    setRepositories([]);
    setRepoDetails({});
    setSelectedRepo(null);
    setTotalAdditions(0);
    setTotalDeletions(0);

    try {
      const userRepos = await fetchFromGitHub(`https://api.github.com/user/repos?type=all&per_page=100`);
      setRepositories(userRepos);
    } catch (err) {
      setError(`Failed to fetch repositories: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [username,token]);

  const fetchCodeFrequency = async (owner, repoName) => {
    try {
      const data = await fetchFromGitHub(`https://api.github.com/repos/${owner}/${repoName}/stats/code_frequency`);
      let additions = 0;
      let deletions = 0;
      if (Array.isArray(data)) {
        data.forEach(week => {
          additions += week[1];
          deletions += week[2];
        });
      }
      return { additions, deletions };
    } catch (err) {
      return { additions: 0, deletions: 0 };
    }
  };

  const fetchTechnologies = async (owner, repoName) => {
    try {
      const content = await fetchFromGitHub(`https://api.github.com/repos/${owner}/${repoName}/contents/package.json`);
      const decodedContent = atob(content.content);
      const packageJson = JSON.parse(decodedContent);

      const technologies = {
        languages: [],
        dependencies: [],
        devDependencies: [],
        isViteApp: false,
      };

      if ((packageJson.dependencies && packageJson.dependencies.vite) || (packageJson.devDependencies && packageJson.devDependencies.vite)) {
        technologies.isViteApp = true;
      }

      if (packageJson.scripts) {
        for (const scriptName in packageJson.scripts) {
          if (packageJson.scripts[scriptName].includes('vite')) {
            technologies.isViteApp = true;
            break;
          }
        }
      }

      if (packageJson.dependencies) {
        technologies.dependencies = Object.keys(packageJson.dependencies);
      }
      if (packageJson.devDependencies) {
        technologies.devDependencies = Object.keys(packageJson.devDependencies);
      }

      const repoInfo = await fetchFromGitHub(`https://api.github.com/repos/${owner}/${repoName}`);
      if (repoInfo.language) {
        technologies.languages.push(repoInfo.language);
      }

      return technologies;
    } catch (err) {
      return { languages: [], dependencies: [], devDependencies: [], isViteApp: false };
    }
  };

  const handleSelectRepo = async (repo) => {
    setSelectedRepo(repo);
    setRepoDetails({});
    setTotalAdditions(0);
    setTotalDeletions(0);
    setLoading(true);
    setError(null);

    try {
      const codeStats = await fetchCodeFrequency(repo.owner.login, repo.name);
      setTotalAdditions(codeStats.additions);
      setTotalDeletions(codeStats.deletions);

      const techInfo = await fetchTechnologies(repo.owner.login, repo.name);
      setRepoDetails({ ...techInfo, codeStats });

    } catch (err) {
      setError(`Failed to load details for ${repo.name}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1B22] text-[#00fe99] p-4 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-[#302f35] border border-[#00fe99]/20 shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl bg-[#302f35] font-bold text-center mb-8 text-[#00fe99]">🚀 GitHub Repo Analyzer</h1>

        {error && (
          <div className="bg-red-800/10 border border-red-400 text-red-300 px-4 py-3 rounded-lg mb-6">
            <strong className="bg-red-800/10 text-red-300 font-bold">Error!</strong>
            <span className="bg-red-800/10  text-red-300 block sm:inline ml-2">{error}</span>
          </div>
        )}

        {loading && repositories.length === 0 && (
          <div className="text-center bg-[#302f35] text-gray-300">⏳ Loading repositories...</div>
        )}

        {repositories.length > 0 && (
            <div className="mb-8 bg-[#302f35] pt-1">
                <h2 className="text-2xl bg-[#302f35] font-semibold mb-4 text-[#00fe99]">📁 Your Repositories</h2>
                <div className="max-h-96 overflow-y-auto border border-[#00fe99]/20 rounded-lg p-2 space-y-2">
                {repositories.map((repo) => (
                    <div
                    key={repo.id}
                    onMouseEnter={() => setHoveredRepoId(repo.id)}
                    onMouseLeave={() => setHoveredRepoId(null)}
                    onClick={() => handleSelectRepo(repo)}
                    className={`p-4 rounded-xl border border-[#00fe99]/10 transition cursor-pointer flex justify-between items-center ${
                        hoveredRepoId === repo.id ? 'bg-[#00fe99]/10' : 'bg-[#302f35]'
                    }`}
                    >
                    <div>
                        <p
                        className={`font-semibold text-[#00fe99] ${
                            hoveredRepoId === repo.id ? 'bg-[#00fe99]/10' : 'bg-[#302f35]'
                        }`}
                        >
                        {repo.full_name}
                        </p>
                        <p
                        className={`text-sm text-gray-400 ${
                            hoveredRepoId === repo.id ? 'bg-[#00fe99]/10' : 'bg-[#302f35]'
                        }`}
                        >
                        {repo.private ? 'Private' : 'Public'}
                        </p>
                    </div>
                    <span
                        className={`text-xs text-gray-400 px-2 py-1 rounded ${
                        hoveredRepoId === repo.id ? 'bg-[#00fe99]/10' : 'bg-[#302f35]'
                        }`}
                    >
                        View
                    </span>
                    </div>
                ))}
                </div>
            </div>
            )}



        {selectedRepo && (
          <div className="mt-10 pt-6 border-t bg-[#302f35] border-[#00fe99]/20">
            <h2 className="text-2xl font-semibold mb-4 bg-[#302f35] text-[#00fe99]">📦 {selectedRepo.full_name}</h2>
            {loading ? (
              <div className="text-center bg-[#302f35] text-gray-300">⏳ Loading repository details...</div>
            ) : (
              <div className="space-y-4 bg-[#302f35] p-6 rounded-2xl border border-[#00fe99]/20 shadow-inner">
                <p className='bg-[#302f35]'><span className="bg-[#302f35] text-gray-300 font-semibold">📝 Description:</span> {selectedRepo.description || 'N/A'}</p>
                <p className='bg-[#302f35]'><span className="bg-[#302f35] text-gray-300 font-semibold">🧪 Language:</span> {selectedRepo.language || 'N/A'}</p>
                <p className='bg-[#302f35]'><span className="bg-[#302f35] text-gray-300 font-semibold">➕ Additions:</span> <span className="bg-[#302f35] *:text-[#00fe99] font-bold">{totalAdditions} lines</span></p>
                <p className='bg-[#302f35]'><span className="bg-[#302f35] text-gray-300 font-semibold">➖ Deletions:</span> <span className="bg-[#302f35] *:text-[#00fe99] font-bold">{Math.abs(totalDeletions)} lines</span></p>

                {repoDetails.isViteApp && (
                  <div className="bg-[#302f35] p-4 ">
                    <p className="bg-[#00fe99]/10 p-4 rounded-lg border border-[#00fe99]/30 text-[#00fe99] font-semibold">⚡️ This is a Vite.js project!</p>
                  </div>
                )}

                {repoDetails.languages.length > 0 && (
                  <div className='bg-[#302f35]'>
                    <p className="bg-[#302f35] font-semibold text-[#00fe99]">Languages:</p>
                    <ul className="bg-[#302f35] list-disc list-inside text-sm text-gray-300 ml-4">
                      {repoDetails.languages.map((lang, idx) => (
                        <li className='bg-[#302f35]' key={idx}>{lang}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {repoDetails.dependencies?.length > 0 && (
                  <div className='bg-[#302f35]'>
                    <p className="bg-[#302f35] font-semibold text-[#00fe99]">Dependencies:</p>
                    <ul className="bg-[#302f35] list-disc list-inside grid grid-cols-2 sm:grid-cols-3 gap-x-4 text-sm text-gray-300 ml-4">
                      {repoDetails.dependencies.map((dep, idx) => (
                        <li className='bg-[#302f35]' key={idx}>{dep}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {repoDetails.devDependencies?.length > 0 && (
                  <div className='bg-[#302f35]'>
                    <p className="bg-[#302f35] font-semibold text-[#00fe99]">Dev Dependencies:</p>
                    <ul className="bg-[#302f35] list-disc list-inside grid grid-cols-2 sm:grid-cols-3 gap-x-4 text-sm text-gray-300 ml-4">
                      {repoDetails.devDependencies.map((dep, idx) => (
                        <li className='bg-[#302f35]' key={idx}>{dep}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GitHubData;
