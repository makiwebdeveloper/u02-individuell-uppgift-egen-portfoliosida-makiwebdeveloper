async function getStackData() {
  const res = await fetch("../json/stack-data.json");

  const data = await res.json();

  return data;
}

async function renderProjects() {
  const data = await getStackData();

  const list = document.getElementById("stackList");

  data.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("stack__list-item");
    li.innerHTML = `
      <img src="${item.imgUrl}" alt="${item.name}">
      `;

    list.appendChild(li);
  });
}

renderProjects();
