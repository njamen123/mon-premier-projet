// ============================================
// SITE HÔTEL AZUR - FONCTIONS INTERACTIVES
// ============================================

// 1. MESSAGE DE BIENVENUE (déjà existant)
// --------------------------------------------
console.log("Bienvenue à l'Hôtel Azur !");

document.addEventListener('DOMContentLoaded', function() {
    alert('Bienvenue sur le site de l\'Hôtel Azur !');
    
    // Initialiser le prix affiché
    mettreAJourPrix();
});


// 2. CALCULATEUR DE PRIX (Idée 4)
// --------------------------------------------
function calculerPrix() {
    // Récupérer les valeurs du formulaire
    const nuits = document.getElementById('nuits').value;
    const prixNuit = document.getElementById('prixNuit').value;
    
    // Vérifier que les champs sont remplis
    if (nuits && prixNuit) {
        const total = nuits * prixNuit;
        document.getElementById('prixTotal').textContent = total + ' €';
    } else {
        document.getElementById('prixTotal').textContent = 'Remplissez les champs';
    }
}

// Mise à jour automatique quand on change les valeurs
function mettreAJourPrix() {
    const nuitsInput = document.getElementById('nuits');
    const prixInput = document.getElementById('prixNuit');
    
    if (nuitsInput && prixInput) {
        nuitsInput.addEventListener('input', calculerPrix);
        prixInput.addEventListener('change', calculerPrix);
    }
}


// 3. VALIDATION DE FORMULAIRE (Idée 2)
// --------------------------------------------
function reserver() {
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const nuits = document.getElementById('nuits').value;
    
    if (!nom || !email || !nuits) {
        alert('❌ Veuillez remplir tous les champs');
        return false;
    }
    
    if (!email.includes('@')) {
        alert('❌ Email invalide');
        return false;
    }
    
    alert('✅ Merci ' + nom + ' ! Votre demande a été envoyée.');
    return true;
}


// 4. CHANGEMENT DE STYLE DYNAMIQUE
// --------------------------------------------
function changerTheme() {
    const body = document.body;
    if (body.style.backgroundColor === 'lightblue') {
        body.style.backgroundColor = '';
        body.style.color = '';
    } else {
        body.style.backgroundColor = 'lightblue';
        body.style.color = 'darkblue';
    }
}


// 5. AFFICHER LA DATE DU JOUR
// --------------------------------------------
function afficherDate() {
    const aujourdhui = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = aujourdhui.toLocaleDateString('fr-FR', options);
    
    const dateElement = document.getElementById('dateDuJour');
    if (dateElement) {
        dateElement.textContent = dateStr;
    }
}

// Appeler la fonction au chargement
afficherDate();