/**
 * Retorna a string com a máscara aplicada
 * @param val
 * @param mask
 * @returns string
 */
export function mask(val:string, mask:string) {

  if (mask == "phone") {

    if (val.length == 13) {
        mask = "+## (##) # ####-####";

    } else if (val.length == 12) {
        mask = "+## (##) ####-####";

    } else {
        return val;
    }

  }

  if (mask == "date") {
    mask = "##-##-####";
  }

  val = String(val);
  var maskared = '';
  var k = 0;

  for (var i = 0; i <= mask.length - 1; i++) {
      if (mask[i] == '#') {
          if (val[k]) {
              maskared += val[k++];
          }
      } else {
          if (mask[i]) {
              maskared += mask[i];
          }
      }
  }

return maskared;
}
