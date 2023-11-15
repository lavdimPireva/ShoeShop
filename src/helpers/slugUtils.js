export function generateSlug(name, id) {
  return `${name.toLowerCase().split(" ").join("-")}-${id}`;
}
