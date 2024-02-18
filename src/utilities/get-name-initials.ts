export const getNameInitials = (name: string, count = 2) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const filtered = initials.replace(/[^a-zA-Z]/g, "");
  return filtered.slice(0, count).toUpperCase();
};

//create a function that gets initals from a name 
export const getInitialsFromName = (name: string) => {
  const initials = name
  .split(" ")
  .map((n) => n[0])
  .join("");
  const filtered = initials.replace(/[^a-zA-Z]/g, "");
  return filtered.slice(0, 2).toUpperCase();
};