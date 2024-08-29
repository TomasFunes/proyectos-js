
const main = document.querySelector('main');

const getProjects = async () => {
    
    try{
        const response = await fetch("./proyectos.json");
        const projects = await response.json();
        
        for (const project of projects) {
            const card = await (buildProjectCard(project));
            main.appendChild(card);
        }
    }
    catch (errors) {
        console.error(errors);
    }
    
    
}

const buildProjectCard = async (project) => {
    const card = document.createElement('div');
    const name = document.createElement('h2');
    const description = document.createElement('p');
    const demoLink = document.createElement('a');
    const repoLink = document.createElement('a');
    const preview = document.createElement('img');
    
    name.textContent = project.name;
    description.textContent = project.description;

    preview.setAttribute("src", project.preview);

    demoLink.setAttribute("href", project.demoLink);
    demoLink.setAttribute("target", "_blank");
    demoLink.style.display = "block";
    demoLink.textContent = "demo";
    
    repoLink.setAttribute("href", project.repoLink);
    repoLink.setAttribute("target", "_blank");
    repoLink.style.display = "block";
    repoLink.textContent = "repo";
    
    card.className = "project-card";
    card.appendChild(name);
    card.appendChild(preview);
    card.appendChild(description);
    card.appendChild(demoLink);
    card.appendChild(repoLink);
    
    return card;
}

getProjects();
