function validate_cpf(strCpf) {

    if (If_Alpha(strCpf)) return false;

    strCpf = strCpf.replace(/[^\d]+/g,'');

    if (strCpf.length > 11) return false;

    if (strCpf.length < 11) return false;

    if (!/[0-9]{11}/.test(strCpf)) return false;

    if (strCpf === "00000000000") return false;

    let soma = 0;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }

    let resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto !== parseInt(strCpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto !== parseInt(strCpf.substring(10, 11))) {
        return false;
    }

    return true;
};

function validate_cnpj(strCnpj){

    if (If_Alpha(strCnpj)) return false;

    let cnpj = strCnpj.replace(/[^\d]+/g,'');

    console.log("cnpj ",cnpj);
    if(cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0,tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;

    return true;

};

function validate_name(strName){

  if(strName.length <= 4){
     return false;
  }

  return true;
};

function validate_data(strData){

    let data = moment().format('YYYY-MM-DD');
    console.log("Voce informou ", strData);
    console.log("data atual ",moment().format('YYYY-MM-DD'));

    if(strData > data || strData.length == 0 || strData.indexOf(" ") == 0) {
      alert('Data In!!')
      return false;
    }else{
      return true;
    }

}


function If_Alpha(texto){
   let letras="abcdefghyjklmnopqrstuvwxyz";
   texto = texto.toLowerCase();
   for( let i=0; i < texto.length; i++){
      if (letras.indexOf(texto.charAt(i),0)!=-1){
         return 1;
      }
   }
   return 0;
}

function remove_Acentos( newStringComAcento ) {
    var string = newStringComAcento;
    var mapaAcentosHex 	= {
        a : /[\xE0-\xE6]/g,
        A : /[\xC0-\xC6]/g,
        e : /[\xE8-\xEB]/g,
        E : /[\xC8-\xCB]/g,
        i : /[\xEC-\xEF]/g,
        I : /[\xCC-\xCF]/g,
        o : /[\xF2-\xF6]/g,
        O : /[\xD2-\xD6]/g,
        u : /[\xF9-\xFC]/g,
        U : /[\xD9-\xDC]/g,
        c : /\xE7/g,
        C : /\xC7/g,
        n : /\xF1/g,
        N : /\xD1/g
    };

    for ( var letra in mapaAcentosHex ) {
        var expressaoRegular = mapaAcentosHex[letra];
        string = string.replace( expressaoRegular, letra );
    }

    return string;
}