export function dateParser(num) {
    // Vérifiez que l'entrée est une valeur valide
    if (isNaN(num) || !num) {
        // Si l'entrée n'est pas valide, renvoyer une valeur par défaut
        return "Date invalide";
    }

    let options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    };

    // Convertir num en horodatage
    let timestamp = Date.parse(num);

    // Créer un objet Date à partir du timestamp
    if (isNaN(timestamp)) {
        // Gérer le cas où la conversion échoue
        return "Date invalide t";
    }

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options);

    // Formater la date en utilisant toLocaleDateString
    return date.toString();
}
