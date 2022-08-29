export function formats(ele, event) {
  if (ele.value.length < 19) {
    ele.value = ele.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    return true;
  } else {
    return false;
  }
}
export const numberValidation = (event) => {
  event.target.value = event.target.value.replace(/[^\d ]/g, '');
  return false;
};
