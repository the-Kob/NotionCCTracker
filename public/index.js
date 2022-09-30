const getSets = async () => {
  const rest = await fetch("http://localhost:8080/sets");
  const sets = await rest.json();
  
  return sets;
};
  
const addSets = async () => {
  const sets = await getSets();

  sets.forEach((value) => {
    const div = document.createElement("div");
    div.classList.add("userContainer");
    div.innerHTML = `
        <h3>${value.name}</h3>
        <p>${value.url}</p>
    `;

    container.append(div);
  });
};

addSets();