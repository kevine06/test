export function dateParser(num) {
    // Vérifiez que l'entrée est une valeur valide


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
        return Date();
    }

    let date = new Date(timestamp).toLocaleDateString('fr-FR', options);

    // Formater la date en utilisant toLocaleDateString
    return date.toString();
}

export const timestampParser = (num) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    let date = new Date(num).toLocaleDateString("fr-FR", options);
  
    return date.toString();
  }

export const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };