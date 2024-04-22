function findJsonProperties(objeto: any, propriedade: any) {
    var resultados: any = [];

    // Verifica se o objeto é um array
    if (Array.isArray(objeto)) {
        // Se for um array, percorra cada elemento do array
        for (var i = 0; i < objeto.length; i++) {
            // Busque recursivamente em cada elemento
            resultados = resultados.concat(findJsonProperties(objeto[i], propriedade));
        }
    } else if (typeof objeto === 'object') {
        // Se for um objeto, verifique suas propriedades
        for (var key in objeto) {
            if (key === propriedade) {
                resultados.push(objeto[key]);
            } else if (objeto[key] && objeto[key]._text) {
                // Se a propriedade contém um objeto com _text, busque nele recursivamente
                resultados = resultados.concat(findJsonProperties(objeto[key]._text, propriedade));
            } else if (typeof objeto[key] === 'object') {
                // Busque recursivamente em cada propriedade do objeto
                resultados = resultados.concat(findJsonProperties(objeto[key], propriedade));
            }
        }
    }

    return resultados;
}
