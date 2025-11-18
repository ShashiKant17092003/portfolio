import axios from 'axios';

const token = import.meta.env.VITE_GITHUB_TOKEN;
console.log(token);

const getReposWithLanguage = async () => {
  try {
    const response = await axios.get(`https://api.github.com/user/repos?type=all&per_page=100`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Accept': 'application/vnd.github+json',
      },
    });

    return response.data.map(repo => ({
      name: repo.full_name,
      language: repo.language || 'N/A',
    }));

  } catch (error) {
    console.error("Error fetching repositories:", error.message);
    return [];
  }
};

export const githubStats = async () => {
  const jsonData = await getReposWithLanguage();

  const repos = jsonData.length;

  const langSet = new Set();
  for (let i = 0; i < repos; i++) {
    if (jsonData[i].language !== 'N/A') {
      langSet.add(jsonData[i].language);
    }
  }

  const langs = langSet.size;

  return {
    repos,
    langs
  };
};

