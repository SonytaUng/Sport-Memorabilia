export function alphaCheck(entry) {
  let regex = /^[a-z]+$/i;
  return entry != null && entry.match(regex);
}

export function numCheck(entry) {
  let regex = /^[0-9]+$/i;
  return entry != null && entry.match(regex);
}

export function emailCheck(entry) {
  let regex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  return entry != null && entry.match(regex);
}

export function alphaCheckWithSpaces(entry) {
  // with period punctuation
  let regex = /^[a-zA-Z\s\.]*$/;  
  return (entry != "" && entry.match(regex));
}

export function alphaNumCheckWithSpaces(entry) {
  // with period punctuation
  let regex = /^[A-Za-z0-9 _\.]*[A-Za-z0-9][A-Za-z0-9 _\.]*$/;  
  return (entry != "" && entry.match(regex));
}

const US_STATES = [ "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
                    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
                    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
                    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
                    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

export function stateCheck(entry) {
  return US_STATES.includes(entry);
}

export function zipCodeCheck(entry) {
  if (entry.length != 5) {
    return false;
  }

  return numCheck(entry);
}
