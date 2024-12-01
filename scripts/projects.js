async function getProjectsData() {
  const res = await fetch("../json/projects-data.json");

  const data = await res.json();

  return data;
}

async function renderProjects() {
  const projects = await getProjectsData();

  const list = document.getElementById("projectsList");

  projects.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("projects__list-item");
    li.innerHTML = `
      <img class="projects__item-img" src="${item.imgUrl}" alt="${item.title} img">
      <div class="projects__item-content">
        <h3 class="projects__item-title">${item.title}</h3>
        <p class="projects__item-text">${item.description}</p>
          <div class="projects__item-stack">
            <p>Tech stack:</p>
            <p>${item.techStack}</p>
          </div>
          <div class="projects__item-links">
            <a href="${item.livePreviewUrl}" target="_blank">Live Preview</a>
            <a href="${item.sourceCodeUrl}" target="_blank">View Code</a>
          </div>
        </div>
      `;

    list.appendChild(li);
  });
}

async function getGithubRepos() {
  const username = "makiwebdeveloper";
  const token =
    "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";

  const url = `https://api.github.com/users/${username}/repos?sort=created&direction=desc`;

  const options = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const repos = await res.json();

    return repos
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        visibility: repo.visibility,
        url: repo.html_url,
      }))
      .filter((repo) => repo.visibility === "public");
  } catch (error) {
    console.error("Get github repos error:", error);
  }
}

async function renderGithubRepos() {
  const loader = document.getElementById("reposLoader");
  const list = document.getElementById("reposList");

  loader.style.display = "block";
  list.innerHTML = "";

  const data = await getGithubRepos();
  loader.style.display = "none";

  data.forEach((repo) => {
    const li = document.createElement("li");
    li.classList.add("repos__list-item");
    li.innerHTML = `
        <div class="repos__item-info">
          <img src="/assets/git-icon.svg" alt="git-icon">
          <p>${repo.name}</p>
        </div>
        <a href="${repo.url}" class="repos__item-link">View code</a>
      `;

    list.appendChild(li);
  });
}

renderProjects();
renderGithubRepos();
