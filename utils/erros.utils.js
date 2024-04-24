module.exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" };
  
    if (err.message.includes("pseudo"))
      errors.pseudo = "Pseudo incorrect ou déjà pris";
  
    if (err.message.includes("email")) errors.email = "Email incorrect";
  
    if (err.message.includes("password"))
      errors.password = "Le mot de passe doit faire 6 caractères minimum";
  
  
    if (err.code === 11000 && Object.keys(err.keyValue))[0].includes('pseudo')
      errors.pseudo = "Cet pseudo est déjà enregistré";

      if (err.code === 11000 && Object.keys(err.keyValue))[0].includes('email')
      errors.email = "Cet email est déjà enregistré";
  
    return errors;
  };

module.exports.signInErrors = (err) => {
     let errors = { email: '', password: ''}

     if (err.message.includes('email'))
     errors.email = "Email inconnu";

     if (err.message.includes('password'))
     errors.password = "Le mot de passe ne correspond pas";

     return errors;
}

module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: '' };

  if (err.code.includes('LIMIT_FILE_SIZE')) {
      errors.maxSize = "Le fichier dépasse (150 Ko post)";
  }

  if (err === 'LIMIT_FILE_TYPE') {
    errors.format = "Le fichier incompatible";
}

  return errors;
};

module.exports.uploadPictureErrors = (err) => {
  let errors = { format: '', maxSize: '' };

  if (err.code && err.code.includes('LIMIT_FILE_SIZE')) {
      errors.maxSize = "Le fichier dépasse (150 user Ko)";
  }

//   if (err.message.includes('LIMIT_FILE_TYPE')) {
//     errors.format = "Le fichier incompatible";
// }

  return errors;
};

