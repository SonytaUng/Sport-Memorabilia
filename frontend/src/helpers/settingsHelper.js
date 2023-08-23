const USERNAME    = 0; const EMAIL       = 1;
const FIRST_NAME  = 2; const LAST_NAME   = 3;
const DOB         = 4; const PHONE       = 5;
const PASSWORD    = 6; const CONFIRM_PW  = 7;

export function noChangesMade(fields) {
  for (let i = 0; i < fields.length; i++) {
    if (fields[i] != 0) {
      return false;
    }
  }

  return true;
}

export function isValid(field) {
  let fieldType   = field[0];
  let fieldInput  = field[1];

  switch(fieldType){
    case USERNAME:
      return alphaCheck(fieldInput) && fieldInput != username; 
    case FIRST_NAME: 
      return alphaCheck(fieldInput) && fieldInput != firstName;
    case LAST_NAME: 
      return alphaCheck(fieldInput) && fieldInput != lastName;
    case EMAIL: 
      return emailCheck(fieldInput) && fieldInput != email;
    case DOB:
      return fieldInput != dob;
    case PHONE: 
      return fieldInput.length === 10 && numCheck(fieldInput) && fieldInput != phone;
    default: // PASSWORD
      return fieldInput.length >= 8;
  }
}

export function passwordsAreValid(newPassword, confirmPW) {
  if(newPassword != confirmPW) {
    outputErrors(12);
    return false;
  } else {
    return newPassword == "" || isValid([PASSWORD, newPassword]);
  }
}