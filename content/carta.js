/* =====================================================================
   OCRE · Carta
   ---------------------------------------------------------------------
   FUENTE: menú publicado por Ocre en su sistema oficial de reservas Cluvi
   (https://ocre.cluvi.co/bookings/32410), consultado el 2026-11-09.
   Nombres, descripciones y precios se transcriben de esa fuente; solo se
   corrigió la ortografía de marcas (Smirnoff, Buchanan's, Grey Goose…).

   Para actualizar: edita los textos aquí. Para ocultar todos los precios
   pon `mostrarPrecios: false`.
   STORYTELLING de los 9 cócteles de autor (frase, perfil, historia): tomado
   del documento de Ocre «Speech, story telling, perfil, coctelería» (recibido
   el 2026-11-09). El «speech» del documento es guion para el personal y no se
   publica. Solo se corrigió «Marraschino» → «Maraschino».

   Campos de cada producto:
     nombre (obligatorio) · desc · precio (número en COP o null)
     frase (frase corta) · perfil (lista de notas de sabor) · historia (relato)
     foto: ruta base sin extensión (ver docs/FOTOGRAFIAS.md) o null
   FOTOS DE PLATOS SERVIDOS (Cogollo, Tartar, Panceta, Helado, Lemon Posset):
   entregadas por Ocre el 2026-11-09. `ingredientes: true` marca las fotos que
   muestran los ingredientes y no el plato servido (la leyenda lo indica).
   FOTOS DE CLUVI: las de cócteles y el resto de platos son las que Ocre publica en su carta de
   Cluvi (https://ocre.cluvi.co/newmenu/32410/…), descargadas en su resolución
   original el 2026-11-09 con autorización del cliente y optimizadas con
   tools/optimizar-imagenes.mjs. Sin foto en Cluvi: Papas Ocre, Caviar Ocre,
   Lemon Posset Citrus, Oishi, Selva y Ascua (muestran marco provisional).
   ===================================================================== */
window.OCRE = window.OCRE || {};

OCRE.carta = {
  fuente: "Carta publicada por Ocre en su sistema de reservas",
  consultado: "2026-11-09",
  mostrarPrecios: true,
  notaPrecios: "Precios en pesos colombianos publicados por el establecimiento. Pueden cambiar sin previo aviso; confírmalos en el lugar.",

  secciones: [
    {
      id: "entradas", titulo: "Entradas",
      intro: "Para abrir la mesa.",
      items: [
        { nombre: "Cogollo Beetroot", foto: "assets/img/platos/cogollo-beetroot-emplatado", ancho: 3, alto: 4, alt: "Cogollo Beetroot servido en plato de cerámica terracota, vista cenital", precio: 19900, desc: "Cremoso de aguacate, mayonesa de remolacha, hilos de papa, supremas de limón y salsa XO." },
        { nombre: "Molcajete Ocre", foto: "assets/img/platos/molcajete-ocre", ancho: 2, alto: 3, alt: "Fotografía de Ocre con los ingredientes de Molcajete Ocre", ingredientes: true, precio: 37900, desc: "Cremoso de aguacate acompañado de berenjenas crocantes, orellanas crocantes, mayonesa de remolacha y mayo de hummus." },
        { nombre: "Feta encurtido y eneldo", foto: "assets/img/platos/feta-encurtido-y-eneldo", ancho: 2, alto: 3, alt: "Fotografía de Ocre con los ingredientes de Feta encurtido y eneldo", ingredientes: true, precio: 34000, desc: "Queso feta asado sobre una cama de puré de coliflor rostizado, cubierto con un encurtido de guatila y remolacha, finalizado con brotes de eneldo y aceite de oliva." },
        { nombre: "Tartar de Lomo Ocre", foto: "assets/img/platos/tartar-de-lomo-ocre-emplatado", ancho: 4, alto: 5, alt: "Tartar de Lomo Ocre con crocantes de arroz, en plato de cerámica terracota", precio: 36000, desc: "Tartar de lomo con notas contundentes, acompañado de crocantes de arroz." },
        { nombre: "Papas Ocre", precio: 19900, desc: "Papas a la francesa rústicas sobre una base de salsa beetroot, finalizadas con queso crema y cebollín, acompañadas de un cremoso de aguacate." },
        { nombre: "Caviar Ocre", precio: 72900, desc: "20 gramos de caviar negro sobre una cama de mantequilla cultivada dentro de un aro de arroz, finalizado con un gelificado cítrico." }
      ]
    },
    {
      id: "fuertes", titulo: "Platos fuertes",
      intro: "El centro de la noche.",
      items: [
        { nombre: "Lomo duxelle y centeno", foto: "assets/img/platos/lomo-duxelle-y-centeno", ancho: 2, alto: 3, alt: "Fotografía de Ocre con los ingredientes de Lomo duxelle y centeno", ingredientes: true, precio: 110900, desc: "Medallón de res (USDA) relleno de duxelle de setas y tuétano, jus Rossini con trufa y foie gras, zanahorias baby glaseadas en gastrique de vinagre con crumble de centeno y papas a la francesa." },
        { nombre: "Chicken Sticky (picante)", foto: "assets/img/platos/chicken-sticky", ancho: 2, alto: 3, alt: "Fotografía de Ocre con los ingredientes de Chicken Sticky (picante)", ingredientes: true, precio: 47900, desc: "Pernil de pollo frito en trozos, salsa estilo coreano ligeramente picante, cebollín y papa crocante." },
        { nombre: "Pollo & Brasa", foto: "assets/img/platos/pollo-y-brasa", ancho: 2, alto: 3, alt: "Fotografía de Ocre con los ingredientes de Pollo & Brasa", ingredientes: true, precio: 54900, desc: "Pollo rostizado y cocido en sous vide, acompañado de un mille-feuille de batatas, cremoso de papa y ensalada púrpura." },
        { nombre: "Panceta confitada", foto: "assets/img/platos/panceta-confitada-emplatado", ancho: 3, alto: 4, alt: "Panceta confitada sobre crema de ahuyama, con brotes y supremas de mandarina", precio: 44900, desc: "Panceta de cerdo cocida al estilo Dong Po sobre crema de ahuyama, supremas de mandarina y brotes. Acompañada de papas criollas salteadas." },
        { nombre: "Crudo de atún", foto: "assets/img/platos/crudo-de-atun", ancho: 2, alto: 3, alt: "Fotografía de Ocre con los ingredientes de Crudo de atún", ingredientes: true, precio: 47900, desc: "Crudo de atún con un marinado inspirado en el tartar inglés, sobre leche de tigre de mango y maracuyá, zanahoria cocida en naranja y miso." },
        { nombre: "Salmón Ocre", foto: "assets/img/platos/salmon-ocre", ancho: 2, alto: 3, alt: "Fotografía de Ocre con los ingredientes de Salmón Ocre", ingredientes: true, precio: 74900, desc: "Filete de salmón de 200 g sobre salsa de queso azul, acompañado de una ensalada de queso crema y mantequilla cultivada y espárragos salteados." }
      ]
    },
    {
      id: "postres", titulo: "Postres",
      intro: "Un cierre lento.",
      items: [
        { nombre: "Helado de tarta vasca", foto: "assets/img/platos/helado-de-tarta-vasca-emplatado", ancho: 3, alto: 4, alt: "Helado de tarta vasca con crocante de centeno sobre fondo azul", precio: 22900, desc: "Helado de tarta vasca con notas de aguardiente y crocante de centeno, sobre una base de rábano y flor de jamaica." },
        { nombre: "Sticky Pudding", foto: "assets/img/platos/sticky-pudding", ancho: 2, alto: 3, alt: "Fotografía de Ocre con los ingredientes de Sticky Pudding", ingredientes: true, precio: 32000, desc: "Queso crema, toffee claro, curd de uva Isabel y crocante de masa." },
        { nombre: "Lemon Posset Citrus", foto: "assets/img/platos/lemon-posset-citrus", ancho: 4, alto: 5, alt: "Lemon Posset Citrus en plato de cerámica terracota sobre fondo azul", precio: 36000, desc: "Gel de yuzu, posset y crocante de mantequilla avellanada." }
      ]
    },
    {
      id: "cocteles", titulo: "Cócteles", alcohol: true,
      intro: "Tragos de autor y clásicos de la casa.",
      items: [
        { nombre: "Moss", foto: "assets/img/cocteleria/moss", ancho: 2, alto: 3, precio: 42000, autor: true, frase: "Fresco de entrada, ahumado al final.", perfil: ["Herbal", "Fresco", "Cítrico", "Ahumado", "Aromático", "Especiado", "Profundo", "Exótico", "Elegante", "Fácil de beber"],
          historia: "Nace del encuentro entre lo herbal y lo ahumado. La frescura de la albahaca abre paso a una ginebra aromática, mientras el mezcal aporta profundidad y ese carácter de humo que aparece poco a poco. El cordial de té marroquí conecta ambos mundos con notas especiadas y exóticas.",
          desc: "Ginebra Hendrick's, mezcal Ojo de Tigre, albahaca fresca, cordial de té marroquí y zumo de limón Tahití." },
        { nombre: "OCR 0326", foto: "assets/img/cocteleria/ocr-0326", ancho: 2, alto: 3, precio: 43000, autor: true, frase: "Intenso, fresco y perfectamente equilibrado.", perfil: ["Ahumado", "Cítrico", "Especiado", "Amargo", "Aromático", "Seco", "Complejo"],
          historia: "Es un juego de contrastes: el humo del mezcal, el amargor del Aperol y la dulzura sutil del Maraschino se encuentran con un cordial de té marroquí, construido alrededor de especias y aromas cálidos. El limón Tahití despierta el conjunto y deja un final fresco, seco y complejo.",
          desc: "Mezcal Ojo de Tigre, Aperol, Maraschino Luxardo, cordial de té marroquí y zumo de limón Tahití." },
        { nombre: "Dirty Wine", foto: "assets/img/cocteleria/dirty-wine", ancho: 2, alto: 3, precio: 35000, autor: true, frase: "Herbal, intenso y fresco: un cóctel que no pasa desapercibido.", perfil: ["Herbal", "Cítrico", "Especiado", "Frutal", "Profundo", "Fresco", "Intenso"],
          historia: "Encuentra el equilibrio entre lo herbal y lo profundo. La ruda, de aroma intenso y carácter limpio, se une a la limonaria, fresca y luminosa, creando una base aromática que armoniza con el vino y el Jägermeister. El Maraschino y el limón Tahití terminan de darle frescura, acidez y balance.",
          desc: "Ron de ruda y limonaria, Jägermeister, Maraschino Luxardo, vino fortificado y zumo de limón Tahití." },
        { nombre: "Sibylle", foto: "assets/img/cocteleria/sibylle", ancho: 2, alto: 3, precio: 35000, autor: true, frase: "Dos formas de disfrutar la misma combinación.", perfil: ["Herbal", "Frutal", "Cítrico", "Floral", "Fresco", "Ligero", "Aromático"],
          historia: "Nace desde la armonía entre lo herbal y lo frutal. La limonaria y la ruda aportan una sensación limpia y aromática, mientras la fresa introduce un contraste dulce y fresco. El vermouth bianco, la tónica y el limón Tahití construyen un perfil ligero, cítrico y elegante, acompañado por una gelificación que prolonga el sabor en boca.",
          desc: "Ron de limonaria y ruda, vermouth bianco, agua tónica, cordial de fresa y zumo de limón Tahití, acompañado de una gelificación de vermut bianco y fresa." },
        { nombre: "Medicina Latina", foto: "assets/img/cocteleria/medicina-latina", ancho: 2, alto: 3, precio: 43000, autor: true, frase: "Fuerza, dulzor, sal y humo en un solo trago.", perfil: ["Cálido", "Cítrico", "Especiado", "Salino", "Ahumado", "Intenso", "Equilibrado"],
          historia: "Nace del encuentro entre la fuerza del tequila y la calidez de la miel salada con jengibre. El licor de naranja asada aporta un lado cítrico y aromático, al igual que contundencia alcohólica, mientras la Angostura añade complejidad. El float de mezcal aparece al final con una capa ahumada que completa la experiencia.",
          desc: "Tequila 1800 Silver, cordial de miel salada, licor de naranja, bitter Angostura y un float de mezcal Ojo de Tigre." },
        { nombre: "Trópico", foto: "assets/img/cocteleria/tropico", ancho: 2, alto: 3, precio: 45000, autor: true, frase: "Exótico desde el primer sorbo.", perfil: ["Aromático", "Especiado", "Cálido", "Cítrico", "Refrescante", "Dulce-salino", "Cremoso"],
          historia: "Combina la elegancia del cognac con la calidez de la haba tonka y las especias del té marroquí. El vermouth rosso aporta profundidad, mientras la ginger beer y la sal cítrica despiertan el cóctel con frescura y un toque vibrante. La espuma de miel salada cierra la experiencia con una textura suave y un contraste dulce-salino.",
          desc: "Cognac Hennessy macerado con haba tonka, vermouth rosso, ginger beer, cordial de té marroquí, lágrimas de sal cítrica y espuma de miel salada." },
        { nombre: "Oishi", precio: 39000, autor: true, frase: "La elegancia de un Martini, con un giro fresco y tropical.", perfil: ["Floral", "Frutal", "Cítrico", "Herbal", "Fresco", "Aromático", "Delicado"],
          historia: "Oishi significa «delicioso» en japonés. Juega con la delicadeza del lychee y la frescura aromática de la limonaria. El vodka y el vermouth bianco crean una base limpia, mientras el Soho aporta un perfil cítrico y floral. El limón Tahití equilibra el conjunto y la gota de aceite verde añade un último toque herbal y una capa aromática inesperada.",
          desc: "Vodka Smirnoff Red, vermouth bianco, Soho, cordial de lychee y limonaria, zumo de limón Tahití y una gota de aceite verde." },
        { nombre: "Selva", precio: 39000, autor: true, frase: "Sabores de nuestra tierra llevados a un cóctel fresco y contemporáneo.", perfil: ["Ahumado", "Especiado", "Herbal", "Cítrico", "Fresco", "Aromático", "Salino"],
          historia: "Lleva el carácter ahumado del mezcal hacia un territorio más fresco y aromático. El pipilongo aporta una especia de identidad colombiana, mientras el té marroquí suma profundidad y notas cálidas. La tónica y las lágrimas de sal cítrica despiertan el conjunto, y la hierbabuena deja un final verde, fresco y limpio.",
          desc: "Mezcal macerado con pipilongo, cordial de té marroquí, agua tónica, lágrimas de sal cítrica y hierbabuena." },
        { nombre: "Ascua", precio: 39000, autor: true, frase: "El lado más cálido del whisky.", perfil: ["Tostado", "Cítrico", "Especiado", "Cálido", "Dulce-salado", "Intenso", "Profundo"],
          historia: "Parte de sabores cálidos y tostados. El whisky se encuentra con una naranja asada y una miel salada de jengibre que aportan profundidad, mientras el limón equilibra con frescura y acidez. El bitter redondea el conjunto y la goma de ginger beer y miel lleva esos mismos sabores a otra textura.",
          desc: "Whisky Monkey Shoulder, vermouth rosso, miel salada de jengibre, licor de naranja asada, zumo de limón y bitter de chocolate, con una goma de ginger beer y miel." },
        { nombre: "Mojito", foto: "assets/img/cocteleria/mojito", ancho: 2, alto: 3, precio: 32000, desc: "Ron Flor de Caña 4 años, ron de limonaria y ruda, cordial de té marroquí, soda, hierbabuena y limón Tahití." },
        { nombre: "Margarita", foto: "assets/img/cocteleria/margarita", ancho: 2, alto: 3, precio: 32000, desc: "Tequila José Cuervo Silver, licor de naranja asada, cordial de miel salada y jengibre, zumo de limón Tahití, borde de sal y Tajín." },
        { nombre: "Aperol", foto: "assets/img/cocteleria/aperol", ancho: 2, alto: 3, precio: 45000, desc: "Aperol, vino espumoso, soda y un toque de cordial de té marroquí." },
        { nombre: "Moscow Mule", foto: "assets/img/cocteleria/moscow-mule", ancho: 2, alto: 3, precio: 43000, desc: "Vodka Smirnoff Red, cordial de miel salada y jengibre, zumo de limón Tahití, ginger beer Mil976 y hierbabuena." },
        { nombre: "Old Fashion", foto: "assets/img/cocteleria/old-fashion", ancho: 2, alto: 3, precio: 39000, desc: "Whisky escocés, bitter Angostura, bitter wild orange, azúcar blanca y corteza de naranja Valencia." },
        { nombre: "Negroni clásico", foto: "assets/img/cocteleria/negroni-clasico", ancho: 2, alto: 3, precio: 45000, desc: "Vermouth rosso, Campari, ginebra Tanqueray London Dry y media luna de naranja Valencia." }
      ]
    },
    {
      id: "sin-alcohol", titulo: "Sin alcohol",
      intro: "Mocktails y bebidas de la casa.",
      items: [
        { nombre: "Mocktail de fresa", foto: "assets/img/cocteleria/mocktail-de-fresa", ancho: 2, alto: 3, precio: 19000, desc: "Cordial de fresa, sparkling de toronja, borde de Tajín, lima kaffir y zumo de limón Tahití." },
        { nombre: "Mocktail de lychees", foto: "assets/img/cocteleria/mocktail-de-lychees", ancho: 2, alto: 3, precio: 21000, desc: "Cordial de lychees y limonaria, cordial de lulo y manzanilla, zumo de limón Tahití y soda." },
        { nombre: "Té marroquí", precio: 19000, desc: "Preparación de la casa: té verde, hierbabuena, soda y un toque de limón." },
        { nombre: "Soda", precio: 8000 },
        { nombre: "Agua Manantial con gas", precio: 11000 },
        { nombre: "Agua Voss 375 ml", precio: 25000 },
        { nombre: "Red Bull", precio: 24000, desc: "Con azúcar. Sin azúcar: $22.000." },
        { nombre: "Hatsu amarillo / blanco", precio: 12000 }
      ]
    },
    {
      id: "bar", titulo: "Bar", alcohol: true, compacta: true,
      intro: "Botella completa o trago de 60 ml.",
      columnas: ["Trago 60 ml", "Botella"],
      grupos: [
        { titulo: "Tequila", items: [
          { nombre: "Don Julio Reposado", precios: [63000, 1000000] },
          { nombre: "Don Julio 70", precios: [85000, 1300000] },
          { nombre: "José Cuervo Silver", precios: [null, 270000] },
          { nombre: "Maestro Dobel", precios: [null, 750000] } ] },
        { titulo: "Mezcal", items: [
          { nombre: "400 Conejos", precios: [49000, 640000] },
          { nombre: "Ojo de Tigre", precios: [36000, 600000] } ] },
        { titulo: "Ron", items: [
          { nombre: "Zacapa 23", precios: [64000, 1000000] },
          { nombre: "Flor de Caña 4 años", precios: [16000, 290000] },
          { nombre: "Ron Medellín 8 años", precios: [18000, 270000] } ] },
        { titulo: "Ginebra", items: [
          { nombre: "Hendrick's", precios: [51000, 470000] },
          { nombre: "Tanqueray", precios: [34000, 520000] },
          { nombre: "Tanqueray Ten", precios: [55000, 900000] } ] },
        { titulo: "Whisky", items: [
          { nombre: "Bulleit Bourbon", precios: [40000, 610000] },
          { nombre: "Buchanan's Deluxe 12 años", precios: [34000, 500000] },
          { nombre: "Buchanan's 18 años", precios: [82000, 1350000] } ] },
        { titulo: "Vodka", items: [
          { nombre: "Smirnoff Red", precios: [21000, 320000] },
          { nombre: "Grey Goose", precios: [48000, 800000] },
          { nombre: "Smirnoff Tamarindo", precios: [10000, 170000] } ] },
        { titulo: "Aguardiente", items: [
          { nombre: "Aguardiente verde", precios: [10000, 150000] },
          { nombre: "Aguardiente azul", precios: [11000, 160000] },
          { nombre: "Aguardiente amarillo", precios: [9000, 160000] } ] },
        { titulo: "Vino", columnas: ["Copa", "Botella"], items: [
          { nombre: "Ramón Bilbao Crianza", precios: [38000, 230000] },
          { nombre: "Ramón Bilbao Verdejo", precios: [38000, 220000] } ] },
        { titulo: "Cerveza", columnas: ["", "Unidad"], items: [
          { nombre: "Club Colombia Dorada", precios: [null, 13000] },
          { nombre: "Stella Artois", precios: [null, 15000] } ] },
        { titulo: "Mezcladores", columnas: ["", "Unidad"], items: [
          { nombre: "Mil976 toronja", precios: [null, 18000] },
          { nombre: "Mil976 ginger beer", precios: [null, 22000] },
          { nombre: "Tónica Ocean", precios: [null, 18000] },
          { nombre: "Tónica Indi", precios: [null, 18000] } ] }
      ]
    }
  ]
};
