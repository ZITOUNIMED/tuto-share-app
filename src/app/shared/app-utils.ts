export function oc(object: any){
  return object ? object : {};
}

export function isNotEmptyArray(array){
  return !!(array && array.length>0);
}

export function emptyToArray(array){
  if(!array){
    return [];
  }
  return array;
}
