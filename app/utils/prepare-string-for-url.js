export default function(string) {
  // replace anything that isn't alphanumeric
  return string.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
}
