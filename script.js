// ============================================
// SITE HÔTEL AZUR - VERSION DYNAMIQUE
// ============================================

// 1. CHARGEMENT INITIAL
document.addEventListener('DOMContentLoaded', function() {
    console.log("Bienvenue à l'Hôtel Azur !");
    afficherReservations();
    afficherDate();
    mettreAJourPrix();
});


// 2. CALCULATEUR DE PRIX
function calculerPrix() {
    const nuits = document.getElementById('nuits').value;
    const prixNuit = document.getElementById('prixNuit').value;
    
    if (nuits && prixNuit) {
        const total = nuits * prixNuit;
        document.getElementById('prixTotal').textContent = total + ' €';
    }
}

function mettreAJourPrix() {
    const nuitsInput = document.getElementById('nuits');
    const prixInput = document.getElementById('prixNuit');
    
    if (nuitsInput && prixInput) {
        nuitsInput.addEventListener('input', calculerPrix);
        prixInput.addEventListener('change', calculerPrix);
    }
}


// 3. RÉSERVATION AVEC STOCKAGE LOCAL
function reserver() {
    // Récupérer les valeurs
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const nuits = document.getElementById('nuits').value;
    const chambre = document.getElementById('prixNuit').selectedOptions[0].text;
    const total = document.getElementById('prixTotal').textContent;
    
    // Validation
    if (!nom || !email || !nuits) {
        alert('❌ Veuillez remplir tous les champs');
        return false;
    }
    
    if (!email.includes('@')) {
        alert('❌ Email invalide');
        return false;
    }
    
    // Créer l'objet réservation
    const reservation = {
        id: Date.now(),
        nom: nom,
        email: email,
        nuits: nuits,
        chambre: chambre,
        total: total,
        date: new Date().toLocaleDateString('fr-FR')
    };
    
    // Récupérer les réservations existantes
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    
    // Ajouter la nouvelle réservation
    reservations.push(reservation);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('reservations', JSON.stringify(reservations));
    
    // Confirmation
    alert('✅ Merci ' + nom + ' ! Votre réservation a été enregistrée.');
    
    // Réinitialiser le formulaire
    document.getElementById('nom').value = '';
    document.getElementById('email').value = '';
    document.getElementById('nuits').value = '1';
    
    // Mettre à jour l'affichage
    afficherReservations();
}


// 4. AFFICHER LES RÉSERVATIONS
function afficherReservations() {
    const liste = document.getElementById('listeReservations');
    if (!liste) return;
    
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    
    if (reservations.length === 0) {
        liste.innerHTML = '<p class="aucune">Aucune réservation pour le moment.</p>';
        return;
    }
    
    let html = '<ul class="liste-reservations">';
    reservations.slice(-5).reverse().forEach(res => {
        html += `
            <li class="reservation-item">
                <strong>${res.nom}</strong> - 
                ${res.chambre} - 
                ${res.nuits} nuit(s) - 
                Total: ${res.total}
                <br>
                <small>${res.date}</small>
                <button onclick="supprimerReservation(${res.id})" class="btn-supprimer">🗑️</button>
            </li>
        `;
    });
    html += '</ul>';
    
    liste.innerHTML = html;
}


// 5. SUPPRIMER UNE RÉSERVATION
function supprimerReservation(id) {
    if (!confirm('Supprimer cette réservation ?')) return;
    
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations = reservations.filter(res => res.id !== id);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    
    afficherReservations();
}


// 6. EXPORTER EN CSV
function exporterReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    
    if (reservations.length === 0) {
        alert('Aucune réservation à exporter');
        return;
    }
    
    // Créer l'en-tête CSV
    let csv = 'Nom,Email,Nuits,Chambre,Total,Date\n';
    
    // Ajouter chaque réservation
    reservations.forEach(res => {
        csv += `"${res.nom}","${res.email}",${res.nuits},"${res.chambre}","${res.total}","${res.date}"\n`;
    });
    
    // Télécharger le fichier
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const lien = document.createElement('a');
    lien.href = URL.createObjectURL(blob);
    lien.download = 'reservations_hotel.csv';
    lien.click();
}


// 7. AFFICHER LA DATE
function afficherDate() {
    const aujourdhui = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.getElementById('dateDuJour');
    if (dateElement) {
        dateElement.textContent = aujourdhui.toLocaleDateString('fr-FR', options);
    }
}