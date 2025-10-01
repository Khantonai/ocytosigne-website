// ==========================
// Données praticiens
// ==========================
const practitioners = [
    {
        name: "Dr. Marie Dubois",
        specialty: "Médecin généraliste",
        // Ajoutez le chemin de votre vidéo téléchargée (ex: dossier /videos)
        video: "https://elix-lsf.s3.rbx.io.cloud.ovh.net/spip_videos/00009-3.mp4",
        rating: 4.9,
        reviews: 127,
        location: "Paris 11ème",
        availability: "Disponible aujourd'hui",
        lsfLevel: "LSF Natif",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
        badges: ["LSF", "Urgences"],
    },
    {
        name: "Dr. Thomas Martin",
        specialty: "Psychologue",
        video: "https://elix-lsf.s3.rbx.io.cloud.ovh.net/spip_videos/psychologue_adjetn_1_2.mp4", 
        rating: 4.8,
        reviews: 89,
        location: "Lyon 3ème",
        availability: "Demain 14h",
        lsfLevel: "LSF Certifié",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
        badges: ["LSF", "Thérapie"],
    },
    {
        name: "Dr. Sophie Leroy",
        specialty: "Dermatologue",
        video: "https://elix-lsf.s3.rbx.io.cloud.ovh.net/spip_videos/dermatologue_nm_1_1.mp4", 
        rating: 4.9,
        reviews: 156,
        location: "Marseille 1er",
        availability: "Lundi 9h",
        lsfLevel: "LSF Expert",
        image: null,
        badges: ["LSF", "Téléconsultation"],
    },
    {
        name: "Dr. Ahmed Benali",
        specialty: "Cardiologue",
        video: "https://elix-lsf.s3.rbx.io.cloud.ovh.net/spip_videos/cardiologue_nm_1_1.mp4",
        rating: 4.7,
        reviews: 203,
        location: "Toulouse Centre",
        availability: "Mercredi 15h",
        lsfLevel: "LSF Avancé",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face",
        badges: ["LSF", "Spécialiste"],
    },
    {
        name: "Dr. Claire Moreau",
        specialty: "Pédiatre",
        video: "https://elix-lsf.s3.rbx.io.cloud.ovh.net/spip_videos/pediatre_nm_1_2.mp4", 
        rating: 4.9,
        reviews: 174,
        location: "Nantes Sud",
        availability: "Aujourd'hui 16h",
        lsfLevel: "LSF Natif",
        image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=300&fit=crop&crop=face",
        badges: ["LSF", "Enfants"],
    },
    {
        name: "Dr. Paul Rousseau",
        specialty: "Kinésithérapeute",
        video: "https://elix-lsf.s3.rbx.io.cloud.ovh.net/spip_videos/kinesitherapeute_nm_1_1.mp4", 
        reviews: 92,
        location: "Bordeaux Centre",
        availability: "Vendredi 10h",
        lsfLevel: "LSF Certifié",
        image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&h=300&fit=crop&crop=face",
        badges: ["LSF", "Réhabilitation"],
    },
];

// ==========================
// Rendu dynamique des praticiens
// ==========================
const grid = document.getElementById("praticiensGrid");

practitioners.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "praticien-card";
    card.innerHTML = `
      <div class="praticien-header">
        <img src="${p.image}" alt="${p.name}" />
        <div class="praticien-info">
          <h3>${p.name}</h3>
          ${p.video
            ? `<video class="praticien-video"
                       src="${p.video}"
                       controls
                       muted
                       autoplay
                       loop
                       playsinline
                       preload="metadata"
                       poster="${p.image}"
                       aria-label="Présentation vidéo de ${p.name}"></video>`
            : `<p>${p.specialty}</p>`}
          <p style="color:#e65100; font-weight:600;">${p.lsfLevel}</p>
        </div>
      </div>
      <div class="badges">
        ${p.badges.map((b) => `<span class="badge">${b}</span>`).join("")}
      </div>
      <div class="details">
        <p class="info rating"><i class="fa-solid fa-star"></i> ${p.rating} (${p.reviews} avis)</p>
        <p class="info"><i class="fa-solid fa-location-dot"></i> ${p.location}</p>
        <p class="info availability"><i class="fa-solid fa-circle-check"></i> ${p.availability}</p>
      </div>
      <button class="btn-primary rdv-btn" data-index="${index}">Prendre rendez-vous</button>
      <div class="actions">
        <button><i class="fa-solid fa-video"></i> Vidéo LSF</button>
        <button>Profil complet</button>
      </div>
    `;
    grid.appendChild(card);
});

// ==========================
// Gestion de la modal
// ==========================
const modal = document.getElementById("rdv-modal");
const closeBtn = modal.querySelector(".close");

// Infos praticien dans la modal
const modalPraticienName = document.getElementById("modal-praticien-name");
const modalPraticienImg = modal.querySelector(".modal-praticien img");
const modalPraticienInfo = modal.querySelector(".modal-praticien p");

// Ouvrir la modal avec les infos du praticien cliqué
document.querySelectorAll(".rdv-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        const p = practitioners[index];

        // Injection des infos
        modalPraticienName.textContent = p.name;
        modalPraticienImg.src = p.image;
        modalPraticienImg.alt = p.name;
        modalPraticienInfo.textContent = `${p.specialty} – ${p.location}`;

        // Afficher la modal
        modal.style.display = "flex";
    });
});

// Fermer la modal (croix)
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fermer en cliquant à l’extérieur
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
