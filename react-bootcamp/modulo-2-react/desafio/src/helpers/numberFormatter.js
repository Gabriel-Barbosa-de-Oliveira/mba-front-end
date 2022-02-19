export function numberFormatter(stringNumber) {
  if (stringNumber)
    return stringNumber.toLocaleString();
  else
    return "";
}