// 1. Membri di default
const defaultMembers = [
  {
    name: "Marco Bianchi",
    role: "Designer",
    email: "marcobianchi@team.com",
    img: "assets/img/male1.png"
  },
  {
    name: "Laura Rossi",
    role: "Front-end Developer",
    email: "laurarossi@team.com",
    img: "assets/img/female1.png"
  },
  {
    name: "Giorgio Verdi",
    role: "Back-end Developer",
    email: "giorgioverdi@team.com",
    img: "assets/img/male2.png"
  },
  {
    name: "Marta Ipsum",
    role: "SEO Specialist",
    email: "martarossi@team.com",
    img: "assets/img/female2.png"
  },
  {
    name: "Roberto Lorem",
    role: "SEO Specialist",
    email: "robertolorem@team.com",
    img: "assets/img/male3.png"
  },
  {
    name: "Daniela Amet",
    role: "Analyst",
    email: "danielaamet@team.com",
    img: "assets/img/female3.png"
  }
];

// 2. Se esiste localStorage, usa quello. Altrimenti usa i default.
let teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || defaultMembers;

// 3. Selettori del DOM
const form = document.getElementById('addMemberForm');
const nameInput = document.getElementById('memberName');
const roleInput = document.getElementById('memberRole');
const emailInput = document.getElementById('memberEmail');
const imageInput = document.getElementById('memberImage');
const grid = document.querySelector('.row.g-4');

// 4. Funzione card
const createTeamCard = (member) => {
  const col = document.createElement('div');
  col.className = 'col-12 col-md-6 col-lg-4';

  col.innerHTML = `
    <div class="d-flex team-card">
      <img src="${member.img}" alt="team">
      <div class="p-3 d-flex flex-column justify-content-center">
        <h5 class="fw-bold">${member.name.toUpperCase()}</h5>
        <span>${member.role}</span>
        <a class="team-email" href="mailto:${member.email}">${member.email}</a>
      </div>
    </div>
  `;

  grid.appendChild(col);
};

// Render iniziale: funzione che genera tutte le card già presenti (default + localStorage)
const renderInitialCards = () => {
  for (const member of teamMembers) {
    createTeamCard(member);
  }
};

renderInitialCards();


// 6. Submit form con FileReader (Base64)
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Se l’utente NON carica un’immagine → usa default
  if (!imageInput.files || !imageInput.files[0]) {
    addMember("assets/img/default.png");
    return;
  }

  // Se l’utente carica un file -> converti in Base64
  // Così l’immagine diventa una stringa e può essere salvata nel localStorage.
  const reader = new FileReader(); 
  reader.onload = function(e) {
    addMember(e.target.result); // Base64
  };
  reader.readAsDataURL(imageInput.files[0]);
});

// 7. Funzione che aggiunge un membro
const addMember = (imageURL) => {
  const newMember = {
    name: nameInput.value,
    role: roleInput.value,
    email: emailInput.value,
    img: imageURL
  };


  teamMembers.push(newMember);
  localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  createTeamCard(newMember);
  form.reset();
}

