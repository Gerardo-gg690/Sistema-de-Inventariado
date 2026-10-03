/* =========================================================
   BON HOUSE - SISTEMA DE INVENTARIO
   app.js
========================================================= */


/* =========================================================
   UNIDADES
========================================================= */

const UNITS = [
    "Arroba",
    "Bandeja",
    "Bidón",
    "Bolsa",
    "Bolsa grande",
    "Bote",
    "Botella",
    "Botella (medio galón)",
    "Bulto",
    "Caja",
    "Cartón",
    "Ciento",
    "Cubeta",
    "Fardo",
    "Galón",
    "Galones",
    "Gotero",
    "Lasca",
    "Lata",
    "Lata grande",
    "Libra",
    "Lote",
    "Mangas",
    "Medio galón",
    "Packs",
    "Paquete",
    "Pliego",
    "Resma",
    "Rodaja",
    "Rollo",
    "Saco",
    "Six pack",
    "Unidad"
];

const CONTENT = [
    "Unidad",
    "Gramos (g)",
    "Kilogramos (kg)",
    "Mililitros (ml)",
    "Litros (L)",
    "Onzas (oz)",
    "Libras (lb)"
];

const ALL_UNITS = [
    ...UNITS,
    ...CONTENT.filter(unit => !UNITS.includes(unit))
];


/* =========================================================
   FUNCIÓN RÁPIDA PARA OBTENER ELEMENTOS
========================================================= */

const $ = id => document.getElementById(id);


/* =========================================================
   CARGAR INFORMACIÓN GUARDADA

   IMPORTANTE:
   NO cambiar estas claves.
========================================================= */

let products = JSON.parse(
    localStorage.getItem("bh_products") || "[]"
);

let suppliers = JSON.parse(
    localStorage.getItem("bh_suppliers") || "[]"
);

let notes = JSON.parse(
    localStorage.getItem("bh_notes") || "[]"
);

let snapshots = JSON.parse(
    localStorage.getItem("bh_snapshots") || "{}"
);

let currentDate = new Date()
    .toISOString()
    .slice(0, 10);


/* CATÁLOGO RECUPERADO DESDE LA LISTA DE PROVEEDORES */
const BONHOUSE_RECOVERED_PRODUCTS = [{"id": "recuperado-0009", "supplier": "PRICEMART (SANTA ANA)", "name": "Almendras en rajas. MEMBER SELECTION 907 gr, 0.907 kg. $13.49 GRAMO $0.0149", "brand": "", "price": 13.49, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Almendras en rajas. MEMBER SELECTION 907 gr, 0.907 kg. $13.49 GRAMO $0.0149"}, {"id": "recuperado-0010", "supplier": "PRICEMART (SANTA ANA)", "name": "Almendra entera MEMBER SELECTION  907gr, 0,907kg. $12.99 GRAMO $0.013", "brand": "", "price": 12.99, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Almendra entera MEMBER SELECTION  907gr, 0,907kg. $12.99 GRAMO $0.013"}, {"id": "recuperado-0011", "supplier": "PRICEMART (SANTA ANA)", "name": "Nachos bolsa grande KITTY 1000gr 1kg $5.29 GRAMO $ 0.0053", "brand": "", "price": 5.29, "unit": "Bolsa", "purchaseQty": 0, "content": 0, "inventoryUnit": "Bolsa", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Nachos bolsa grande KITTY 1000gr 1kg $5.29 GRAMO $ 0.0053"}, {"id": "recuperado-0012", "supplier": "PRICEMART (SANTA ANA)", "name": "Queso en lascas MEMBER SELECTION 1,360gr 1.36kg 72 lascas $10.99 GRAMO $0.0081 LASCA $0.15", "brand": "", "price": 10.99, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Queso en lascas MEMBER SELECTION 1,360gr 1.36kg 72 lascas $10.99 GRAMO $0.0081 LASCA $0.15"}, {"id": "recuperado-0013", "supplier": "PRICEMART (SANTA ANA)", "name": "Jugo de naranja galon SULA 3.78L 3,780ml $5.99 PRECIO CADA ML $0.0016", "brand": "", "price": 5.99, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Jugo de naranja galon SULA 3.78L 3,780ml $5.99 PRECIO CADA ML $0.0016"}, {"id": "recuperado-0014", "supplier": "PRICEMART (SANTA ANA)", "name": "Crema de avellanas MEMBER SELECTION 1000gr 1kg $8.89 GRAMO 0.0089", "brand": "", "price": 8.89, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Crema de avellanas MEMBER SELECTION 1000gr 1kg $8.89 GRAMO 0.0089"}, {"id": "recuperado-0015", "supplier": "PRICEMART (SANTA ANA)", "name": "Mantequilla de mani MEMBER SELECTION 1130gr 1.13 kg $9 GRAMO $0.0050", "brand": "", "price": 9.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Mantequilla de mani MEMBER SELECTION 1130gr 1.13 kg $9 GRAMO $0.0050"}, {"id": "recuperado-0016", "supplier": "PRICEMART (SANTA ANA)", "name": "Bolsa grande de marshmelows mini de colores GUANDY 1200gr (30 pack de 40g caga uno) $6.49 GRAMO $0.0054", "brand": "", "price": 6.49, "unit": "Bolsa", "purchaseQty": 0, "content": 0, "inventoryUnit": "Bolsa", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Bolsa grande de marshmelows mini de colores GUANDY 1200gr (30 pack de 40g caga uno) $6.49 GRAMO $0.0054"}, {"id": "recuperado-0017", "supplier": "PRICEMART (SANTA ANA)", "name": "por gramo $0.0060", "brand": "", "price": 0.006, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "por gramo $0.0060"}, {"id": "recuperado-0018", "supplier": "PRICEMART (SANTA ANA)", "name": "Te de durazno MEMBER SELECTION 2000GR  2KG $7.29 $0.036", "brand": "", "price": 7.29, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Te de durazno MEMBER SELECTION 2000GR  2KG $7.29 $0.036"}, {"id": "recuperado-0019", "supplier": "PRICEMART (SANTA ANA)", "name": "Te chai MEMBER SELCTION 1580gr 56oz 1.58kg $24.49 GRAMO $0.0155", "brand": "", "price": 24.49, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Te chai MEMBER SELCTION 1580gr 56oz 1.58kg $24.49 GRAMO $0.0155"}, {"id": "recuperado-0020", "supplier": "PRICEMART (SANTA ANA)", "name": "Te matcha en polvo. OKKO SUPERFOOD 454gr $26.99 PRECIO GR $0.06", "brand": "", "price": 26.99, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Te matcha en polvo. OKKO SUPERFOOD 454gr $26.99 PRECIO GR $0.06"}, {"id": "recuperado-0021", "supplier": "PRICEMART (SANTA ANA)", "name": "Lata de salsa cheddar MEMBER SELECTION 3.03KG 107 ONZAS  $11.69 Precio gramo $0.0038 Precio onza $0.11", "brand": "", "price": 11.69, "unit": "Lata", "purchaseQty": 0, "content": 0, "inventoryUnit": "Lata", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Lata de salsa cheddar MEMBER SELECTION 3.03KG 107 ONZAS  $11.69 Precio gramo $0.0038 Precio onza $0.11"}, {"id": "recuperado-0022", "supplier": "PRICEMART (SANTA ANA)", "name": "Lata de hongos. MONTEVERDE peso neto 2840gr peso drenado 1932gr $10.49 GRAMO NETO $0.0037 GRAMO DRENADO $0.0054", "brand": "", "price": 10.49, "unit": "Lata", "purchaseQty": 0, "content": 0, "inventoryUnit": "Lata", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Lata de hongos. MONTEVERDE peso neto 2840gr peso drenado 1932gr $10.49 GRAMO NETO $0.0037 GRAMO DRENADO $0.0054"}, {"id": "recuperado-0023", "supplier": "PRICEMART (SANTA ANA)", "name": "Lata de salsa para pizza. ANGELA MIA 6.61lb 3000GR 3KG $11.49 GRAMO 0.0038", "brand": "", "price": 11.49, "unit": "Lata", "purchaseQty": 0, "content": 0, "inventoryUnit": "Lata", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Lata de salsa para pizza. ANGELA MIA 6.61lb 3000GR 3KG $11.49 GRAMO 0.0038"}, {"id": "recuperado-0024", "supplier": "PRICEMART (SANTA ANA)", "name": "Queso mozarella rayado MEMBER SELECTION 2,200rg 2.2kg $15.29 GRAMO $0.0070", "brand": "", "price": 15.29, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Queso mozarella rayado MEMBER SELECTION 2,200rg 2.2kg $15.29 GRAMO $0.0070"}, {"id": "recuperado-0025", "supplier": "PRICEMART (SANTA ANA)", "name": "Salchicha de res de 24 unidades. Marca Gwaltney 1360GR 1.36KG $8.99 GRAMO $0.0066 VALOR UNITARIO $0.32", "brand": "", "price": 8.99, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Salchicha de res de 24 unidades. Marca Gwaltney 1360GR 1.36KG $8.99 GRAMO $0.0066 VALOR UNITARIO $0.32"}, {"id": "recuperado-0026", "supplier": "PRICEMART (SANTA ANA)", "name": "Arandanos secos MARIANI 1.13KG (1,130 G) $10.49 VALOR GRAMO $0.0093", "brand": "", "price": 10.49, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Arandanos secos MARIANI 1.13KG (1,130 G) $10.49 VALOR GRAMO $0.0093"}, {"id": "recuperado-0027", "supplier": "PRICEMART (SANTA ANA)", "name": "Dátiles organicos MARIANI 40oz 1.13KG (1,130 G) $12.99 VALOR GRAMO $0.0115", "brand": "", "price": 12.99, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Dátiles organicos MARIANI 40oz 1.13KG (1,130 G) $12.99 VALOR GRAMO $0.0115"}, {"id": "recuperado-0028", "supplier": "PRICEMART (SANTA ANA)", "name": "Galon de mayonesa regular MEMBER SELECTION 13.78 128oz $13.49 ONZA $0.10 costo en oz $0.1077", "brand": "", "price": 13.49, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Galon de mayonesa regular MEMBER SELECTION 13.78 128oz $13.49 ONZA $0.10 costo en oz $0.1077"}, {"id": "recuperado-0029", "supplier": "PRICEMART (SANTA ANA)", "name": "Paquete de frijoles molidos COMALI (5pack 1000g – 1k, 14oz por pack) $5.99 GRAMO $0.0012", "brand": "", "price": 5.99, "unit": "Paquete", "purchaseQty": 0, "content": 0, "inventoryUnit": "Paquete", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Paquete de frijoles molidos COMALI (5pack 1000g – 1k, 14oz por pack) $5.99 GRAMO $0.0012"}, {"id": "recuperado-0030", "supplier": "PRICEMART (SANTA ANA)", "name": "Mostaza de bote amarillo FRENCHS 2977gr 2.97kg $6.99 GRAMO $0.0023", "brand": "", "price": 6.99, "unit": "Bote", "purchaseQty": 0, "content": 0, "inventoryUnit": "Bote", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Mostaza de bote amarillo FRENCHS 2977gr 2.97kg $6.99 GRAMO $0.0023"}, {"id": "recuperado-0031", "supplier": "PRICEMART (SANTA ANA)", "name": "Durazno en almibar MEMBER SELECTION 3 PACK 820gr cada uno (2460GR) $7.49 GRAMO $0.0030", "brand": "", "price": 7.49, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Durazno en almibar MEMBER SELECTION 3 PACK 820gr cada uno (2460GR) $7.49 GRAMO $0.0030"}, {"id": "recuperado-0032", "supplier": "PRICEMART (SANTA ANA)", "name": "Paquete de bolsitas de azucar 1000 sobres CODIPA (2.95gr cada sobre) 2950gr total $6.79 GRAMO $0.0022 VALOR POR SOBRE $0.0066", "brand": "", "price": 6.79, "unit": "Paquete", "purchaseQty": 0, "content": 0, "inventoryUnit": "Paquete", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Paquete de bolsitas de azucar 1000 sobres CODIPA (2.95gr cada sobre) 2950gr total $6.79 GRAMO $0.0022 VALOR POR SOBRE $0.0066"}, {"id": "recuperado-0033", "supplier": "PRICEMART (SANTA ANA)", "name": "levadura", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "levadura"}, {"id": "recuperado-0034", "supplier": "PRICEMART (SANTA ANA)", "name": "3 pack de azúcar morena DEL CAÑAL de 2.5kg 2500gr (7500gr en total) $8.29 GRAMO $0.0033", "brand": "", "price": 8.29, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "3 pack de azúcar morena DEL CAÑAL de 2.5kg 2500gr (7500gr en total) $8.29 GRAMO $0.0033"}, {"id": "recuperado-0035", "supplier": "PRICEMART (SANTA ANA)", "name": "TOTAL ONZAS 88.190Z precio oz $0.09", "brand": "", "price": 0.09, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "TOTAL ONZAS 88.190Z precio oz $0.09"}, {"id": "recuperado-0036", "supplier": "PRICEMART (SANTA ANA)", "name": "Canela en polvo BADIA 16oz 453.6 gr $6.29 GRAMO $0.0139", "brand": "", "price": 6.29, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Canela en polvo BADIA 16oz 453.6 gr $6.29 GRAMO $0.0139"}, {"id": "recuperado-0037", "supplier": "PRICEMART (SANTA ANA)", "name": "Vino VIÑA MAIPO MERLOT 1L 1000ML $8.29 VALOR ML 0.0070", "brand": "", "price": 8.29, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Vino VIÑA MAIPO MERLOT 1L 1000ML $8.29 VALOR ML 0.0070"}, {"id": "recuperado-0038", "supplier": "PRICEMART (SANTA ANA)", "name": "Vino Viña Maipo Cabernet Sauvignon 1l 1000ML $8.29 VALOR ML 0.0083", "brand": "", "price": 8.29, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Vino Viña Maipo Cabernet Sauvignon 1l 1000ML $8.29 VALOR ML 0.0083"}, {"id": "recuperado-0039", "supplier": "PRICEMART (SANTA ANA)", "name": "Pimienta molida MEMBER SELECTION bote de 453gr $12.69 GRAMO $0.0280", "brand": "", "price": 12.69, "unit": "Bote", "purchaseQty": 0, "content": 0, "inventoryUnit": "Bote", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Pimienta molida MEMBER SELECTION bote de 453gr $12.69 GRAMO $0.0280"}, {"id": "recuperado-0040", "supplier": "PRICEMART (SANTA ANA)", "name": "Guantes medianos SANI GUARD 200 unidades $10.29 VALOR UNITARIO $0.0514", "brand": "", "price": 10.29, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Guantes medianos SANI GUARD 200 unidades $10.29 VALOR UNITARIO $0.0514"}, {"id": "recuperado-0041", "supplier": "PRICEMART (SANTA ANA)", "name": "Galon kétchup KERNS 4.1kg 4100g $6.99 GRAMO $0.0017", "brand": "", "price": 6.99, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Galon kétchup KERNS 4.1kg 4100g $6.99 GRAMO $0.0017"}, {"id": "recuperado-0042", "supplier": "PRICEMART (SANTA ANA)", "name": "Vinagre blanco CLEMENTE JACQUES 2 pack 3.8L (7,600) $7.49 VALOR Lt $1.9711", "brand": "", "price": 7.49, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Vinagre blanco CLEMENTE JACQUES 2 pack 3.8L (7,600) $7.49 VALOR Lt $1.9711"}, {"id": "recuperado-0043", "supplier": "PRICEMART (SANTA ANA)", "name": "Arroz precocido OMOA 3 pack 2.27kg cada uno 2,270g (6,810gr) $8.79 GRAMO $0.0013", "brand": "", "price": 8.79, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Arroz precocido OMOA 3 pack 2.27kg cada uno 2,270g (6,810gr) $8.79 GRAMO $0.0013"}, {"id": "recuperado-0044", "supplier": "PRICEMART (SANTA ANA)", "name": "Cerezas con tallos CIRCUS 4.3kg 4,300gr $28.99 GRAMO $0.0070", "brand": "", "price": 28.99, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cerezas con tallos CIRCUS 4.3kg 4,300gr $28.99 GRAMO $0.0070"}, {"id": "recuperado-0045", "supplier": "PRICEMART (SANTA ANA)", "name": "Vaso de cartón con tapa 8oz 100 unidades $13.49 VALOR UNITARIO $0.13", "brand": "", "price": 13.49, "unit": "Cartón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Cartón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Vaso de cartón con tapa 8oz 100 unidades $13.49 VALOR UNITARIO $0.13"}, {"id": "recuperado-0046", "supplier": "PRICEMART (SANTA ANA)", "name": "Esponjas lavatrastes SCOTH BRITE 12 unidades $6.99 VALOR UNITARIO $0.58", "brand": "", "price": 6.99, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Esponjas lavatrastes SCOTH BRITE 12 unidades $6.99 VALOR UNITARIO $0.58"}, {"id": "recuperado-0047", "supplier": "PRICEMART (SANTA ANA)", "name": "Paquete de lejia BLANCO SOL (72 UNIDADES, 6 fardos) $5.99 PRECIO UNIDAD $0.08", "brand": "", "price": 5.99, "unit": "Fardo", "purchaseQty": 0, "content": 0, "inventoryUnit": "Fardo", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Paquete de lejia BLANCO SOL (72 UNIDADES, 6 fardos) $5.99 PRECIO UNIDAD $0.08"}, {"id": "recuperado-0048", "supplier": "PRICEMART (SANTA ANA)", "name": "Caja de rinso (2 pack) 9KG $12.99 costo en kg 1.4433", "brand": "", "price": 12.99, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja de rinso (2 pack) 9KG $12.99 costo en kg 1.4433"}, {"id": "recuperado-0049", "supplier": "PRICEMART (SANTA ANA)", "name": "Chispas de chocolate MEMBER SELECTION $22.99 (2.04kg) (2400g)", "brand": "", "price": 22.99, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Chispas de chocolate MEMBER SELECTION $22.99 (2.04kg) (2400g)"}, {"id": "recuperado-0050", "supplier": "PRICEMART (SANTA ANA)", "name": "Filete de tilapia sin piel sin espinas y congelado SKINESS BONLESS $41.99 (4.54kg)", "brand": "", "price": 41.99, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Filete de tilapia sin piel sin espinas y congelado SKINESS BONLESS $41.99 (4.54kg)"}, {"id": "recuperado-0051", "supplier": "PRICEMART (SANTA ANA)", "name": "Pecana MEMBER SELECTION ($19.79)(907gramos)", "brand": "", "price": 19.79, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Pecana MEMBER SELECTION ($19.79)(907gramos)"}, {"id": "recuperado-0052", "supplier": "PRICEMART (SANTA ANA)", "name": "Melocotones en almibar MEMBER SELECTION (3pack) ($7.99)(480gramos) costo en gramos 0.0163", "brand": "", "price": 7.99, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Melocotones en almibar MEMBER SELECTION (3pack) ($7.99)(480gramos) costo en gramos 0.0163"}, {"id": "recuperado-0053", "supplier": "PRICEMART (SANTA ANA)", "name": "Salsa bertoli (alfredo) 3pack de 425gramos/15oz $11.49 precio unitario $3.83", "brand": "", "price": 11.49, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Salsa bertoli (alfredo) 3pack de 425gramos/15oz $11.49 precio unitario $3.83"}, {"id": "recuperado-0055", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Queso crema salud 210 gr $1.75 GRAMO $0.0083", "brand": "", "price": 1.75, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Queso crema salud 210 gr $1.75 GRAMO $0.0083"}, {"id": "recuperado-0056", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Lechugas escarolas frescas unidas $0.75 costo unitario 0.75", "brand": "", "price": 0.75, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Lechugas escarolas frescas unidas $0.75 costo unitario 0.75"}, {"id": "recuperado-0057", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Chorizo argentino 1LB (453.5gr) $2.75 GRAMO $0.0061", "brand": "", "price": 2.75, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Chorizo argentino 1LB (453.5gr) $2.75 GRAMO $0.0061"}, {"id": "recuperado-0058", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Jamon picado recortes (rara vez se encuentra) PRECIO 2.75 1.30lb", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Jamon picado recortes (rara vez se encuentra) PRECIO 2.75 1.30lb"}, {"id": "recuperado-0059", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Jabon de trastes SELECTOS 1000g 1kg $1.60 caja de 12 paquetes GRAMO $0.0016", "brand": "", "price": 1.6, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Jabon de trastes SELECTOS 1000g 1kg $1.60 caja de 12 paquetes GRAMO $0.0016"}, {"id": "recuperado-0060", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Galletas OREO 432g (12 pack de 36g cada uno) de 6 rodajas cada paquete $3.85 GRAMO $0.0083 VALOR POR PAQUETE DE 36 GR $0.30", "brand": "", "price": 3.85, "unit": "Paquete", "purchaseQty": 0, "content": 0, "inventoryUnit": "Paquete", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Galletas OREO 432g (12 pack de 36g cada uno) de 6 rodajas cada paquete $3.85 GRAMO $0.0083 VALOR POR PAQUETE DE 36 GR $0.30"}, {"id": "recuperado-0061", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Carnitas para chicharron 1Lb (453.5gr) $2.99 GRAMO $0.0066", "brand": "", "price": 2.99, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Carnitas para chicharron 1Lb (453.5gr) $2.99 GRAMO $0.0066"}, {"id": "recuperado-0062", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Latas de chile chipotle CLEMENTE JACQUES 380gr $3.20  costo en gramos 0.0084", "brand": "", "price": 3.2, "unit": "Lata", "purchaseQty": 0, "content": 0, "inventoryUnit": "Lata", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Latas de chile chipotle CLEMENTE JACQUES 380gr $3.20  costo en gramos 0.0084"}, {"id": "recuperado-0063", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Pechuga de pollo SELLO DE ORO 1Lb (453.5gr) $2.10 GRAMO $O.0046  INVESTIGAR PRECIO CANTIDAD (NO INGRESADO EN SISTEMA)", "brand": "", "price": 2.1, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Pechuga de pollo SELLO DE ORO 1Lb (453.5gr) $2.10 GRAMO $O.0046  INVESTIGAR PRECIO CANTIDAD (NO INGRESADO EN SISTEMA)"}, {"id": "recuperado-0064", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "2 pack atun SPLASH 140gr cada uno (total 280gr) $2.56 PRECIO GR $0.009", "brand": "", "price": 2.56, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "2 pack atun SPLASH 140gr cada uno (total 280gr) $2.56 PRECIO GR $0.009"}, {"id": "recuperado-0065", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "New york filete $8.25 (precio promedio, varia según peso)", "brand": "", "price": 8.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "New york filete $8.25 (precio promedio, varia según peso)"}, {"id": "recuperado-0066", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Rib eye $8.25 (precio promedio, varia según peso)", "brand": "", "price": 8.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Rib eye $8.25 (precio promedio, varia según peso)"}, {"id": "recuperado-0067", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Cerveza alemana benedikt $3.75 0.5litros", "brand": "", "price": 3.75, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cerveza alemana benedikt $3.75 0.5litros"}, {"id": "recuperado-0068", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Sopa de criolla de costilla/pollo/fideos/etc. 40ctvs la unidad", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Sopa de criolla de costilla/pollo/fideos/etc. 40ctvs la unidad"}, {"id": "recuperado-0069", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Pechuga con hueso SELECTOS $1.99 LB costo unidad 2.8512", "brand": "", "price": 1.99, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Pechuga con hueso SELECTOS $1.99 LB costo unidad 2.8512"}, {"id": "recuperado-0070", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Carne molida SUPER ESPECIAL $3.90 LB costo en gramos 0.0086", "brand": "", "price": 3.9, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Carne molida SUPER ESPECIAL $3.90 LB costo en gramos 0.0086"}, {"id": "recuperado-0071", "supplier": "SUPER SELECTOS (METRO CENTRO)", "name": "Carne molida ESPECIAL $3.65 LB y costo en gramos 0.0080", "brand": "", "price": 3.65, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Carne molida ESPECIAL $3.65 LB y costo en gramos 0.0080"}, {"id": "recuperado-0073", "supplier": "MERCADO DON MOY (7742-8298)", "name": "(8va av sur. Entre 19 y 21 calle pte, a la par de super tienda del ahorro, mercado colon Santa Ana)", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "(8va av sur. Entre 19 y 21 calle pte, a la par de super tienda del ahorro, mercado colon Santa Ana)"}, {"id": "recuperado-0074", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Tomate grande CAJA $35.00", "brand": "", "price": 35.0, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Tomate grande CAJA $35.00"}, {"id": "recuperado-0075", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Chile verde SACO $22.00", "brand": "", "price": 22.0, "unit": "Saco", "purchaseQty": 0, "content": 0, "inventoryUnit": "Saco", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Chile verde SACO $22.00"}, {"id": "recuperado-0076", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Cebolla morada grande SACO $22.00 (45400 gramos) VALOR GRAMO $0.0005", "brand": "", "price": 22.0, "unit": "Saco", "purchaseQty": 0, "content": 0, "inventoryUnit": "Saco", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cebolla morada grande SACO $22.00 (45400 gramos) VALOR GRAMO $0.0005"}, {"id": "recuperado-0077", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Cebolla blanca SACO $17.00 (45,400gramos) VALOR GRAMO $0.004", "brand": "", "price": 17.0, "unit": "Saco", "purchaseQty": 0, "content": 0, "inventoryUnit": "Saco", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cebolla blanca SACO $17.00 (45,400gramos) VALOR GRAMO $0.004"}, {"id": "recuperado-0078", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Zanahorias 3Lb por $1.00 (1362gr) VALOR GRAMO $ 0.0007", "brand": "", "price": 1.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Zanahorias 3Lb por $1.00 (1362gr) VALOR GRAMO $ 0.0007"}, {"id": "recuperado-0079", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Zarzamora 1Lb por $1.25 454gr VALOR DEL GRAMO $0.0028", "brand": "", "price": 1.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Zarzamora 1Lb por $1.25 454gr VALOR DEL GRAMO $0.0028"}, {"id": "recuperado-0080", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Fresa para fresco 1L por $1.00 454gr VALOR DEL GRAMO0.0022", "brand": "", "price": 1.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Fresa para fresco 1L por $1.00 454gr VALOR DEL GRAMO0.0022"}, {"id": "recuperado-0081", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Fresa buena 1Lb $2.50 454gr VALOR DEL GRAMO 0.0055", "brand": "", "price": 2.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Fresa buena 1Lb $2.50 454gr VALOR DEL GRAMO 0.0055"}, {"id": "recuperado-0082", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Lechuga escarola 3uni. por $1.00 VALOR UNIDAD $0.3333", "brand": "", "price": 1.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Lechuga escarola 3uni. por $1.00 VALOR UNIDAD $0.3333"}, {"id": "recuperado-0083", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Papa SOLOMA $47 el saco (quintal) 45,400 gramos. VALOR DE GRAMO $0.0010", "brand": "", "price": 47.0, "unit": "Saco", "purchaseQty": 0, "content": 0, "inventoryUnit": "Saco", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Papa SOLOMA $47 el saco (quintal) 45,400 gramos. VALOR DE GRAMO $0.0010"}, {"id": "recuperado-0084", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Pipian 4 por $1.00 UNIDAD $0.25", "brand": "", "price": 1.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Pipian 4 por $1.00 UNIDAD $0.25"}, {"id": "recuperado-0085", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Ciento de limones $7.00 UNIDAD $0.07", "brand": "", "price": 7.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Ciento de limones $7.00 UNIDAD $0.07"}, {"id": "recuperado-0086", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Berengena 4 por $1.00 UNIDAD $0.25", "brand": "", "price": 1.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Berengena 4 por $1.00 UNIDAD $0.25"}, {"id": "recuperado-0087", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Manzanas de las pequeñas 4 por $1.00 UNIDAD $0.25", "brand": "", "price": 1.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Manzanas de las pequeñas 4 por $1.00 UNIDAD $0.25"}, {"id": "recuperado-0088", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Caja de ajos $19.00", "brand": "", "price": 19.0, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja de ajos $19.00"}, {"id": "recuperado-0089", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Platanos $24 ciento 25 unidades por $6.50 (VALOR UNITARIO X100 $0.24)", "brand": "", "price": 24.0, "unit": "Lata", "purchaseQty": 0, "content": 0, "inventoryUnit": "Lata", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Platanos $24 ciento 25 unidades por $6.50 (VALOR UNITARIO X100 $0.24)"}, {"id": "recuperado-0090", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Cilantro $4.00 rollo", "brand": "", "price": 4.0, "unit": "Rollo", "purchaseQty": 0, "content": 0, "inventoryUnit": "Rollo", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cilantro $4.00 rollo"}, {"id": "recuperado-0091", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Perejil $2.50 rollo", "brand": "", "price": 2.5, "unit": "Rollo", "purchaseQty": 0, "content": 0, "inventoryUnit": "Rollo", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Perejil $2.50 rollo"}, {"id": "recuperado-0092", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Pepino 4 por $1.00 UNIDAD $ 0.25", "brand": "", "price": 1.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Pepino 4 por $1.00 UNIDAD $ 0.25"}, {"id": "recuperado-0093", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Güisquil 3 por $1.00 UNIDAD $0.3333", "brand": "", "price": 1.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Güisquil 3 por $1.00 UNIDAD $0.3333"}, {"id": "recuperado-0094", "supplier": "MERCADO DON MOY (7742-8298)", "name": "Kiwi 2 unidades por $1.00 UNIDAD $0.50", "brand": "", "price": 1.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Kiwi 2 unidades por $1.00 UNIDAD $0.50"}, {"id": "recuperado-0096", "supplier": "SU KARNE (DISTRIBUIDORA DE CARNE) 2441 1646", "name": "Bistec picado 1Lb (454gr) $3.90 GRAMO $ 0.0074", "brand": "", "price": 3.9, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Bistec picado 1Lb (454gr) $3.90 GRAMO $ 0.0074"}, {"id": "recuperado-0097", "supplier": "SU KARNE (DISTRIBUIDORA DE CARNE) 2441 1646", "name": "Angelina con puyazo 5.97", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Angelina con puyazo 5.97"}, {"id": "recuperado-0098", "supplier": "SU KARNE (DISTRIBUIDORA DE CARNE) 2441 1646", "name": "Dies mio PENDIENTE", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Dies mio PENDIENTE"}, {"id": "recuperado-0099", "supplier": "SU KARNE (DISTRIBUIDORA DE CARNE) 2441 1646", "name": "Entraña $5.11LB (454g)", "brand": "", "price": 5.11, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Entraña $5.11LB (454g)"}, {"id": "recuperado-0100", "supplier": "SU KARNE (DISTRIBUIDORA DE CARNE) 2441 1646", "name": "Recorte $2.75 LB (454g)", "brand": "", "price": 2.75, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Recorte $2.75 LB (454g)"}, {"id": "recuperado-0102", "supplier": "AGENCIA (7729-9968)", "name": "Bandeja 6x6 (hamburguesera) 200 unidades $10.50 VALOR UNIDAD $0.5", "brand": "", "price": 10.5, "unit": "Bandeja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Bandeja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Bandeja 6x6 (hamburguesera) 200 unidades $10.50 VALOR UNIDAD $0.5"}, {"id": "recuperado-0103", "supplier": "AGENCIA (7729-9968)", "name": "Tenedor desechable del grande 1000 unidades $11.00 VALOR UNIDAD $0.011 PENDIENTE DE CONFIRMAR PRECIOS", "brand": "", "price": 11.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Tenedor desechable del grande 1000 unidades $11.00 VALOR UNIDAD $0.011 PENDIENTE DE CONFIRMAR PRECIOS"}, {"id": "recuperado-0104", "supplier": "AGENCIA (7729-9968)", "name": "Cuchillo desechable grande 1000 unidades $15.00 VALOR UNIDAD $0.02", "brand": "", "price": 15.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cuchillo desechable grande 1000 unidades $15.00 VALOR UNIDAD $0.02"}, {"id": "recuperado-0105", "supplier": "AGENCIA (7729-9968)", "name": "Cuchara desechable pequeña 1000 unidades $10 VALOR UNIDAD $0.01 PENDIENTE DE CONFIRMAR PRECIO", "brand": "", "price": 10.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cuchara desechable pequeña 1000 unidades $10 VALOR UNIDAD $0.01 PENDIENTE DE CONFIRMAR PRECIO"}, {"id": "recuperado-0106", "supplier": "AGENCIA (7729-9968)", "name": "Fardo de servilleta YES (10 paquetes) $4.00 (cada paquete $0.40ctvs.) VALOR POR SERVILLETA $0.0051", "brand": "", "price": 4.0, "unit": "Fardo", "purchaseQty": 0, "content": 0, "inventoryUnit": "Fardo", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Fardo de servilleta YES (10 paquetes) $4.00 (cada paquete $0.40ctvs.) VALOR POR SERVILLETA $0.0051"}, {"id": "recuperado-0107", "supplier": "AGENCIA (7729-9968)", "name": "Fardo de papel higienico ELITE (48 rollos) $10.00 VALOR POR ROLO $0.21 PENDIENTE A CONFIRMAR PRECIO", "brand": "", "price": 10.0, "unit": "Fardo", "purchaseQty": 0, "content": 0, "inventoryUnit": "Fardo", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Fardo de papel higienico ELITE (48 rollos) $10.00 VALOR POR ROLO $0.21 PENDIENTE A CONFIRMAR PRECIO"}, {"id": "recuperado-0108", "supplier": "AGENCIA (7729-9968)", "name": "Paquete de azúcar esplenda 2000 unidades $37.50 VALOR POR UNIDAD $0.019 pendiente a confirmar precio", "brand": "", "price": 37.5, "unit": "Paquete", "purchaseQty": 0, "content": 0, "inventoryUnit": "Paquete", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Paquete de azúcar esplenda 2000 unidades $37.50 VALOR POR UNIDAD $0.019 pendiente a confirmar precio"}, {"id": "recuperado-0109", "supplier": "AGENCIA (7729-9968)", "name": "Caja e removedores de café 1000 unidades $2.50 VALOR UNIDAD $0.0025 PENDIENTE A CONFIRMAR PRECIO", "brand": "", "price": 2.5, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja e removedores de café 1000 unidades $2.50 VALOR UNIDAD $0.0025 PENDIENTE A CONFIRMAR PRECIO"}, {"id": "recuperado-0110", "supplier": "AGENCIA (7729-9968)", "name": "Paquete de bolsa de ½ libra o topoyiyo 500 unidades $1.50 VALOR UNITARIO $0.003", "brand": "", "price": 1.5, "unit": "Paquete", "purchaseQty": 0, "content": 0, "inventoryUnit": "Paquete", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Paquete de bolsa de ½ libra o topoyiyo 500 unidades $1.50 VALOR UNITARIO $0.003"}, {"id": "recuperado-0111", "supplier": "AGENCIA (7729-9968)", "name": "Paquete de bolsas de 1 libra 500 unidades $2. VALOR UNITARIO $ 0.004", "brand": "", "price": 2.0, "unit": "Paquete", "purchaseQty": 0, "content": 0, "inventoryUnit": "Paquete", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Paquete de bolsas de 1 libra 500 unidades $2. VALOR UNITARIO $ 0.004"}, {"id": "recuperado-0112", "supplier": "AGENCIA (7729-9968)", "name": "Paquete de bolsas de 2 libras", "brand": "", "price": 0, "unit": "Paquete", "purchaseQty": 0, "content": 0, "inventoryUnit": "Paquete", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Paquete de bolsas de 2 libras"}, {"id": "recuperado-0113", "supplier": "AGENCIA (7729-9968)", "name": "Bolsa de gabacha #1 CIENTO $0.95 VALOR UNITARIO $0.0095", "brand": "", "price": 0.95, "unit": "Bolsa", "purchaseQty": 0, "content": 0, "inventoryUnit": "Bolsa", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Bolsa de gabacha #1 CIENTO $0.95 VALOR UNITARIO $0.0095"}, {"id": "recuperado-0114", "supplier": "AGENCIA (7729-9968)", "name": "Bolsa de gabacha #2 CIENTO $1.25 VALOR UNITARIO 0.0125", "brand": "", "price": 1.25, "unit": "Bolsa", "purchaseQty": 0, "content": 0, "inventoryUnit": "Bolsa", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Bolsa de gabacha #2 CIENTO $1.25 VALOR UNITARIO 0.0125"}, {"id": "recuperado-0115", "supplier": "AGENCIA (7729-9968)", "name": "Pajilla forrada delgada (blanca, transparente)", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Pajilla forrada delgada (blanca, transparente)"}, {"id": "recuperado-0116", "supplier": "AGENCIA (7729-9968)", "name": "Pajilla de frozen forrada (blanca, transparente, ultima opción verde) $15.00 (unidades CUANTAS) VALOR UNITARIO $0.006", "brand": "", "price": 15.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Pajilla de frozen forrada (blanca, transparente, ultima opción verde) $15.00 (unidades CUANTAS) VALOR UNITARIO $0.006"}, {"id": "recuperado-0117", "supplier": "AGENCIA (7729-9968)", "name": "Papel entigrasa cuadriculado (negro, por ultimo verde o azul) RESMA 500 unidades $15.00 VALOR UNITARIO $0.03", "brand": "", "price": 15.0, "unit": "Resma", "purchaseQty": 0, "content": 0, "inventoryUnit": "Resma", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Papel entigrasa cuadriculado (negro, por ultimo verde o azul) RESMA 500 unidades $15.00 VALOR UNITARIO $0.03"}, {"id": "recuperado-0118", "supplier": "AGENCIA (7729-9968)", "name": "Galon de asistin olor: lavanda, manzana verde, por ultimo vainilla. 3.79L (3790ML) $3.00 VALOR ML $0.0008", "brand": "", "price": 3.0, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Galon de asistin olor: lavanda, manzana verde, por ultimo vainilla. 3.79L (3790ML) $3.00 VALOR ML $0.0008"}, {"id": "recuperado-0119", "supplier": "AGENCIA (7729-9968)", "name": "Botella de escencia de vainilla oscura, liquida. NUTRIZ 740ml VALOR POR ML $0.0014. PRECIO TOTAL?", "brand": "", "price": 0.0014, "unit": "Botella", "purchaseQty": 0, "content": 0, "inventoryUnit": "Botella", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Botella de escencia de vainilla oscura, liquida. NUTRIZ 740ml VALOR POR ML $0.0014. PRECIO TOTAL?"}, {"id": "recuperado-0120", "supplier": "AGENCIA (7729-9968)", "name": "Bidon de aceite 5 GALONES 40.00 (640 ONZAS) VALOR POR ONZA $O.0625", "brand": "", "price": 0, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Bidon de aceite 5 GALONES 40.00 (640 ONZAS) VALOR POR ONZA $O.0625"}, {"id": "recuperado-0121", "supplier": "AGENCIA (7729-9968)", "name": "Libra de horchata de morro $1.85 (454gr) VALOR GRAMO $0.0041", "brand": "", "price": 1.85, "unit": "Libra", "purchaseQty": 0, "content": 0, "inventoryUnit": "Libra", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Libra de horchata de morro $1.85 (454gr) VALOR GRAMO $0.0041"}, {"id": "recuperado-0122", "supplier": "AGENCIA (7729-9968)", "name": "Libra de horchata de mani $1.85 (454gr) VALOR GRAMO $0.0041", "brand": "", "price": 1.85, "unit": "Libra", "purchaseQty": 0, "content": 0, "inventoryUnit": "Libra", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Libra de horchata de mani $1.85 (454gr) VALOR GRAMO $0.0041"}, {"id": "recuperado-0123", "supplier": "AGENCIA (7729-9968)", "name": "Mani quebrado 1lb $1.50 (454gr) VALOR GAMO $0.0033", "brand": "", "price": 1.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Mani quebrado 1lb $1.50 (454gr) VALOR GAMO $0.0033"}, {"id": "recuperado-0124", "supplier": "AGENCIA (7729-9968)", "name": "Oregano 1lb $3.00 (454gr) VALOR GRAMO $0.0066", "brand": "", "price": 3.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Oregano 1lb $3.00 (454gr) VALOR GRAMO $0.0066"}, {"id": "recuperado-0125", "supplier": "AGENCIA (7729-9968)", "name": "Laurel 1lb $4.00 (454gr) VALOR GRAMO $0.0088", "brand": "", "price": 4.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Laurel 1lb $4.00 (454gr) VALOR GRAMO $0.0088"}, {"id": "recuperado-0126", "supplier": "AGENCIA (7729-9968)", "name": "Libra de Jamaica $4.00 (454gr) VALOR GRAMO $0.0088", "brand": "", "price": 4.0, "unit": "Libra", "purchaseQty": 0, "content": 0, "inventoryUnit": "Libra", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Libra de Jamaica $4.00 (454gr) VALOR GRAMO $0.0088"}, {"id": "recuperado-0127", "supplier": "AGENCIA (7729-9968)", "name": "Consome de res 1lb $2.50 (454gr) VALOR GRAMO 0.0055", "brand": "", "price": 2.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Consome de res 1lb $2.50 (454gr) VALOR GRAMO 0.0055"}, {"id": "recuperado-0128", "supplier": "AGENCIA (7729-9968)", "name": "Consome de pollo 1lb $2.20 (454gr) VALOR UNITARIO $0.0048", "brand": "", "price": 2.2, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Consome de pollo 1lb $2.20 (454gr) VALOR UNITARIO $0.0048"}, {"id": "recuperado-0129", "supplier": "AGENCIA (7729-9968)", "name": "Caja de caramelos hersheys (12 unidades de 22oz cada una) $51.00 (TOTAL ONZAS 264 Valor por calculado por onza $0.19) (TOTAL GRAMOS 7,476 Valor calculado por gramo $0.0068) VALOR POR ML $0.0065", "brand": "", "price": 51.0, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja de caramelos hersheys (12 unidades de 22oz cada una) $51.00 (TOTAL ONZAS 264 Valor por calculado por onza $0.19) (TOTAL GRAMOS 7,476 Valor calculado por gramo $0.0068) VALOR POR ML $0.0065"}, {"id": "recuperado-0130", "supplier": "AGENCIA (7729-9968)", "name": "Galon de chococolate hersheys $15.50 (120 OZ valor calculado por onza $0.13) (3.4kg 3,400gr valor calculado por gramo $0.0046 VALOR POR ML $0.0044", "brand": "", "price": 15.5, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Galon de chococolate hersheys $15.50 (120 OZ valor calculado por onza $0.13) (3.4kg 3,400gr valor calculado por gramo $0.0046 VALOR POR ML $0.0044"}, {"id": "recuperado-0131", "supplier": "AGENCIA (7729-9968)", "name": "Papel corrugado #4 (Para mini chess y muffins) Paquete 500 unidades $3.50 precio unitario $0.007", "brand": "", "price": 3.5, "unit": "Paquete", "purchaseQty": 0, "content": 0, "inventoryUnit": "Paquete", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Papel corrugado #4 (Para mini chess y muffins) Paquete 500 unidades $3.50 precio unitario $0.007"}, {"id": "recuperado-0132", "supplier": "AGENCIA (7729-9968)", "name": "Ajonjoli 1lb $1.80 (454gr) VALOR GRAMO $0.0040", "brand": "", "price": 1.8, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Ajonjoli 1lb $1.80 (454gr) VALOR GRAMO $0.0040"}, {"id": "recuperado-0133", "supplier": "AGENCIA (7729-9968)", "name": "Bolsa de jardín negra pequeña $1.25. 5 unidades? Es la que se ocupa para los basureros grandes?", "brand": "", "price": 1.25, "unit": "Bolsa", "purchaseQty": 0, "content": 0, "inventoryUnit": "Bolsa", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Bolsa de jardín negra pequeña $1.25. 5 unidades? Es la que se ocupa para los basureros grandes?"}, {"id": "recuperado-0134", "supplier": "AGENCIA (7729-9968)", "name": "Pixi para postres 1lb (454gr) $1.25 VALOR GRAMO $0.0028", "brand": "", "price": 1.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Pixi para postres 1lb (454gr) $1.25 VALOR GRAMO $0.0028"}, {"id": "recuperado-0135", "supplier": "AGENCIA (7729-9968)", "name": "Vaso #16 oz plastico trasnparente 100 unidades $12.50 PRECIO UNITARIO $0.125", "brand": "", "price": 12.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Vaso #16 oz plastico trasnparente 100 unidades $12.50 PRECIO UNITARIO $0.125"}, {"id": "recuperado-0136", "supplier": "AGENCIA (7729-9968)", "name": "Porta vaso de cartón para 4 vasos 100 unidades $15.00 PRECIO UNITARIO $0.15", "brand": "", "price": 15.0, "unit": "Cartón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Cartón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Porta vaso de cartón para 4 vasos 100 unidades $15.00 PRECIO UNITARIO $0.15"}, {"id": "recuperado-0137", "supplier": "AGENCIA (7729-9968)", "name": "Porta vaso de cartón para 2 vasos 100 unidades $7.50 PRECIO UNITARIO $0.075", "brand": "", "price": 7.5, "unit": "Cartón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Cartón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Porta vaso de cartón para 2 vasos 100 unidades $7.50 PRECIO UNITARIO $0.075"}, {"id": "recuperado-0138", "supplier": "AGENCIA (7729-9968)", "name": "Ajo molido 1Lb )454gr) $6.00 VALOR GRAMO $0.0132", "brand": "", "price": 6.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Ajo molido 1Lb )454gr) $6.00 VALOR GRAMO $0.0132"}, {"id": "recuperado-0139", "supplier": "AGENCIA (7729-9968)", "name": "Bolsa de jardín grande 5 pack $1.25 VALOR UNITARIO $0.25", "brand": "", "price": 1.25, "unit": "Bolsa", "purchaseQty": 0, "content": 0, "inventoryUnit": "Bolsa", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Bolsa de jardín grande 5 pack $1.25 VALOR UNITARIO $0.25"}, {"id": "recuperado-0140", "supplier": "AGENCIA (7729-9968)", "name": "Lata de queso cheddar MEMBER SELECTION 3.03kg 3,030gr $13.50 VALOR GRAMO $0.0045", "brand": "", "price": 13.5, "unit": "Lata", "purchaseQty": 0, "content": 0, "inventoryUnit": "Lata", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Lata de queso cheddar MEMBER SELECTION 3.03kg 3,030gr $13.50 VALOR GRAMO $0.0045"}, {"id": "recuperado-0141", "supplier": "AGENCIA (7729-9968)", "name": "Lata de chile chipotle CLEMENTE JACKES  PRECIO $3.30", "brand": "", "price": 3.3, "unit": "Lata", "purchaseQty": 0, "content": 0, "inventoryUnit": "Lata", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Lata de chile chipotle CLEMENTE JACKES  PRECIO $3.30"}, {"id": "recuperado-0142", "supplier": "AGENCIA (7729-9968)", "name": "CONFIRMAR PRECIO DE AGENCIA", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "CONFIRMAR PRECIO DE AGENCIA"}, {"id": "recuperado-0144", "supplier": "CALISTEMO (7862-9877)", "name": "Escencia para frozen:", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Escencia para frozen:"}, {"id": "recuperado-0145", "supplier": "CALISTEMO (7862-9877)", "name": "Tamarindo medio galon $9.86 (64 OZ) VALOR ONZA $0.15", "brand": "", "price": 9.86, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Tamarindo medio galon $9.86 (64 OZ) VALOR ONZA $0.15"}, {"id": "recuperado-0146", "supplier": "CALISTEMO (7862-9877)", "name": "Piña medio galon $9.86 (64 OZ) VALOR ONZA $0.15", "brand": "", "price": 9.86, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Piña medio galon $9.86 (64 OZ) VALOR ONZA $0.15"}, {"id": "recuperado-0147", "supplier": "CALISTEMO (7862-9877)", "name": "Melon medio galon $9.86 (64 OZ) VALOR ONZA $ 0.15", "brand": "", "price": 9.86, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Melon medio galon $9.86 (64 OZ) VALOR ONZA $ 0.15"}, {"id": "recuperado-0148", "supplier": "CALISTEMO (7862-9877)", "name": "Limon medio galon $9.86 (64 OZ) VALOR ONZA $0.15", "brand": "", "price": 9.86, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Limon medio galon $9.86 (64 OZ) VALOR ONZA $0.15"}, {"id": "recuperado-0149", "supplier": "CALISTEMO (7862-9877)", "name": "Mora medio galon $9.86 (64 OZ) VALOR ONZA $0.15", "brand": "", "price": 9.86, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Mora medio galon $9.86 (64 OZ) VALOR ONZA $0.15"}, {"id": "recuperado-0150", "supplier": "CALISTEMO (7862-9877)", "name": "Fresa mora medio galon $9.86 (64 OZ) VALOR ONZA $0.15", "brand": "", "price": 9.86, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Fresa mora medio galon $9.86 (64 OZ) VALOR ONZA $0.15"}, {"id": "recuperado-0151", "supplier": "CALISTEMO (7862-9877)", "name": "Naranja medio galon $9.86 (64 OZ) VALOR ONZA $0.15", "brand": "", "price": 9.86, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Naranja medio galon $9.86 (64 OZ) VALOR ONZA $0.15"}, {"id": "recuperado-0152", "supplier": "CALISTEMO (7862-9877)", "name": "Maracuyá medio galon $10.36 (64 OZ) VALOR ONZA $0.16", "brand": "", "price": 10.36, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Maracuyá medio galon $10.36 (64 OZ) VALOR ONZA $0.16"}, {"id": "recuperado-0153", "supplier": "CALISTEMO (7862-9877)", "name": "Fresa medio galon $14.13 (64 OZ) VALOR ONZA $0.22", "brand": "", "price": 14.13, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Fresa medio galon $14.13 (64 OZ) VALOR ONZA $0.22"}, {"id": "recuperado-0154", "supplier": "CALISTEMO (7862-9877)", "name": "Mango medio galon $10.36 (64 OZ) VALOR ONZA $0.16", "brand": "", "price": 10.36, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Mango medio galon $10.36 (64 OZ) VALOR ONZA $0.16"}, {"id": "recuperado-0155", "supplier": "CALISTEMO (7862-9877)", "name": "Arrayan medio galon $10.36 (64 OZ) VALOR ONZA $ 0.16", "brand": "", "price": 10.36, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Arrayan medio galon $10.36 (64 OZ) VALOR ONZA $ 0.16"}, {"id": "recuperado-0156", "supplier": "CALISTEMO (7862-9877)", "name": "Bote de Cafiza en polvo, 566g $20.00 VALOR GRAMO $0.0353", "brand": "", "price": 20.0, "unit": "Bote", "purchaseQty": 0, "content": 0, "inventoryUnit": "Bote", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Bote de Cafiza en polvo, 566g $20.00 VALOR GRAMO $0.0353"}, {"id": "recuperado-0158", "supplier": "SORBETERIA SARITA", "name": "Medio galon (800g) de sorbete Vainilla galleta, vainilla $5.25 galon (1600) $10.25", "brand": "", "price": 5.25, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Medio galon (800g) de sorbete Vainilla galleta, vainilla $5.25 galon (1600) $10.25"}, {"id": "recuperado-0159", "supplier": "SORBETERIA SARITA", "name": "VALOR GRAMO $0.0066", "brand": "", "price": 0.0066, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "VALOR GRAMO $0.0066"}, {"id": "recuperado-0161", "supplier": "CATALANA HUEVOS, 8-10 CARTONES DEL MORADO POR PEDIDO.", "name": "Cartón morado (30 huevos) $3.83 VALOR DE CADA HUEVO $0.13", "brand": "", "price": 3.83, "unit": "Cartón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Cartón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cartón morado (30 huevos) $3.83 VALOR DE CADA HUEVO $0.13"}, {"id": "recuperado-0163", "supplier": "CAFÉ EN GRANO – ACEVEDO TOSTADOR (7730-4000", "name": "Pedido cada 15 dias 25 libras. Blend tueste medio.", "brand": "", "price": 0, "unit": "Libra", "purchaseQty": 0, "content": 0, "inventoryUnit": "Libra", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Pedido cada 15 dias 25 libras. Blend tueste medio."}, {"id": "recuperado-0164", "supplier": "CAFÉ EN GRANO – ACEVEDO TOSTADOR (7730-4000", "name": "Arroba (25libras 11,350gr) $131.25 VALOR POR GRAMO $0.0116", "brand": "", "price": 131.25, "unit": "Libra", "purchaseQty": 0, "content": 0, "inventoryUnit": "Libra", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Arroba (25libras 11,350gr) $131.25 VALOR POR GRAMO $0.0116"}, {"id": "recuperado-0166", "supplier": "DEPOSITO EMANUEL – (7902-1565) 8:30 AM – 7:30 PM", "name": "Cola standar vidrio pequeña 24 pack $10.00 VALOR UNITARIO $0.42", "brand": "", "price": 10.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cola standar vidrio pequeña 24 pack $10.00 VALOR UNITARIO $0.42"}, {"id": "recuperado-0167", "supplier": "DEPOSITO EMANUEL – (7902-1565) 8:30 AM – 7:30 PM", "name": "Coca cola zero lata 24 pack 354ml $14.20 VALOR UNITARIO $0.59", "brand": "", "price": 14.2, "unit": "Lata", "purchaseQty": 0, "content": 0, "inventoryUnit": "Lata", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Coca cola zero lata 24 pack 354ml $14.20 VALOR UNITARIO $0.59"}, {"id": "recuperado-0168", "supplier": "DEPOSITO EMANUEL – (7902-1565) 8:30 AM – 7:30 PM", "name": "Salutaris simple 24 pack lata 355ml $13.00 VALOR UNITARIO $0.54", "brand": "", "price": 13.0, "unit": "Lata", "purchaseQty": 0, "content": 0, "inventoryUnit": "Lata", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Salutaris simple 24 pack lata 355ml $13.00 VALOR UNITARIO $0.54"}, {"id": "recuperado-0169", "supplier": "DEPOSITO EMANUEL – (7902-1565) 8:30 AM – 7:30 PM", "name": "Salutaris de sabor (toronja, limon) 24 pack lata 355ml $13.00 VALOR UNITARIO $0.54", "brand": "", "price": 13.0, "unit": "Lata", "purchaseQty": 0, "content": 0, "inventoryUnit": "Lata", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Salutaris de sabor (toronja, limon) 24 pack lata 355ml $13.00 VALOR UNITARIO $0.54"}, {"id": "recuperado-0170", "supplier": "DEPOSITO EMANUEL – (7902-1565) 8:30 AM – 7:30 PM", "name": "Pilsener vidrio pequeña 24 unidades 330ml $21.50 VALOR UNITARIO $0.90", "brand": "", "price": 21.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Pilsener vidrio pequeña 24 unidades 330ml $21.50 VALOR UNITARIO $0.90"}, {"id": "recuperado-0171", "supplier": "DEPOSITO EMANUEL – (7902-1565) 8:30 AM – 7:30 PM", "name": "Botella con agua AQUA 750ml 12pack $4.00 VALOR UNITARIO $0.33", "brand": "", "price": 4.0, "unit": "Botella", "purchaseQty": 0, "content": 0, "inventoryUnit": "Botella", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Botella con agua AQUA 750ml 12pack $4.00 VALOR UNITARIO $0.33"}, {"id": "recuperado-0172", "supplier": "DEPOSITO EMANUEL – (7902-1565) 8:30 AM – 7:30 PM", "name": "Botella agua CRISTAL 600ML 12 pack $4.50 VALOR UNITARIO $0.38 VALOR ML $0.0006", "brand": "", "price": 4.5, "unit": "Botella", "purchaseQty": 0, "content": 0, "inventoryUnit": "Botella", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Botella agua CRISTAL 600ML 12 pack $4.50 VALOR UNITARIO $0.38 VALOR ML $0.0006"}, {"id": "recuperado-0174", "supplier": "SALUD A DOMICILIO", "name": "Galon de leche entera 3,785ml $5.75 VALOR POR ML $0.0015", "brand": "", "price": 5.75, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Galon de leche entera 3,785ml $5.75 VALOR POR ML $0.0015"}, {"id": "recuperado-0175", "supplier": "SALUD A DOMICILIO", "name": "Medio galon de leche deslactosada 1892ml $4.00 VALOR POR ML $0.0021", "brand": "", "price": 4.0, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Medio galon de leche deslactosada 1892ml $4.00 VALOR POR ML $0.0021"}, {"id": "recuperado-0176", "supplier": "SALUD A DOMICILIO", "name": "Caja de litro leche deslactosada 1L (900ml) $2.00 VALOR POR ML $0.0022", "brand": "", "price": 2.0, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja de litro leche deslactosada 1L (900ml) $2.00 VALOR POR ML $0.0022"}, {"id": "recuperado-0178", "supplier": "SOLUCION DIGITAL", "name": "Stikers", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Stikers"}, {"id": "recuperado-0179", "supplier": "SOLUCION DIGITAL", "name": "Tarjetas de presentación", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Tarjetas de presentación"}, {"id": "recuperado-0180", "supplier": "SOLUCION DIGITAL", "name": "Flyers", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Flyers"}, {"id": "recuperado-0181", "supplier": "SOLUCION DIGITAL", "name": "Banners", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Banners"}, {"id": "recuperado-0183", "supplier": "DOLLAR CITY", "name": "Palillos de bambu para hamburguesas. 100 unidades $4.00 PRECIO UNIDAD $0.04", "brand": "", "price": 4.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Palillos de bambu para hamburguesas. 100 unidades $4.00 PRECIO UNIDAD $0.04"}, {"id": "recuperado-0184", "supplier": "DOLLAR CITY", "name": "Pastillas azules para tanque de inodoro 2pack $1.00 PRECIO UNITARIO $0.50", "brand": "", "price": 1.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Pastillas azules para tanque de inodoro 2pack $1.00 PRECIO UNITARIO $0.50"}, {"id": "recuperado-0185", "supplier": "DOLLAR CITY", "name": "Fragancia para el baño (Botesito mini con palillos) Aromas: Lavanda, vainilla, frutos rojos, canela no. $3.50", "brand": "", "price": 3.5, "unit": "Bote", "purchaseQty": 0, "content": 0, "inventoryUnit": "Bote", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Fragancia para el baño (Botesito mini con palillos) Aromas: Lavanda, vainilla, frutos rojos, canela no. $3.50"}, {"id": "recuperado-0186", "supplier": "DOLLAR CITY", "name": "Espatulas miserables $3.00", "brand": "", "price": 3.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Espatulas miserables $3.00"}, {"id": "recuperado-0187", "supplier": "DOLLAR CITY", "name": "Abrelatas $3.50", "brand": "", "price": 3.5, "unit": "Lata", "purchaseQty": 0, "content": 0, "inventoryUnit": "Lata", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Abrelatas $3.50"}, {"id": "recuperado-0188", "supplier": "DOLLAR CITY", "name": "Toppers $3.50 o $4.00", "brand": "", "price": 3.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Toppers $3.50 o $4.00"}, {"id": "recuperado-0189", "supplier": "DOLLAR CITY", "name": "Guantes para hornear $4.00 el par", "brand": "", "price": 4.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Guantes para hornear $4.00 el par"}, {"id": "recuperado-0190", "supplier": "DOLLAR CITY", "name": "Asistin 1 galon lavanda o vainilla $4.00", "brand": "", "price": 4.0, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Asistin 1 galon lavanda o vainilla $4.00"}, {"id": "recuperado-0191", "supplier": "DOLLAR CITY", "name": "Tazas de 12 onzas $2.50", "brand": "", "price": 2.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Tazas de 12 onzas $2.50"}, {"id": "recuperado-0192", "supplier": "DOLLAR CITY", "name": "Vasito mini acrilico transprente para mini postre 25 unidades $4.5 PRECIO UNITARIO $O.18", "brand": "", "price": 4.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Vasito mini acrilico transprente para mini postre 25 unidades $4.5 PRECIO UNITARIO $O.18"}, {"id": "recuperado-0193", "supplier": "DOLLAR CITY", "name": "Libreta para pequeña para ordenes unidad $1.25", "brand": "", "price": 1.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Libreta para pequeña para ordenes unidad $1.25"}, {"id": "recuperado-0194", "supplier": "DOLLAR CITY", "name": "Vela cilindrica blanca $1.25", "brand": "", "price": 1.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Vela cilindrica blanca $1.25"}, {"id": "recuperado-0195", "supplier": "DOLLAR CITY", "name": "Tabla de espuma negra 20x30 $2.50", "brand": "", "price": 2.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Tabla de espuma negra 20x30 $2.50"}, {"id": "recuperado-0196", "supplier": "DOLLAR CITY", "name": "Organizador para cajon $4.00", "brand": "", "price": 4.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Organizador para cajon $4.00"}, {"id": "recuperado-0197", "supplier": "DOLLAR CITY", "name": "Pegamento blanco en barra 4 pack $1.25", "brand": "", "price": 1.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Pegamento blanco en barra 4 pack $1.25"}, {"id": "recuperado-0198", "supplier": "DOLLAR CITY", "name": "Salero pimentero $1.25", "brand": "", "price": 1.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Salero pimentero $1.25"}, {"id": "recuperado-0199", "supplier": "DOLLAR CITY", "name": "Cubeta rectangular con agarradera $2.00", "brand": "", "price": 2.0, "unit": "Cubeta", "purchaseQty": 0, "content": 0, "inventoryUnit": "Cubeta", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cubeta rectangular con agarradera $2.00"}, {"id": "recuperado-0200", "supplier": "DOLLAR CITY", "name": "Basurero rectangular 10L $3.00", "brand": "", "price": 3.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Basurero rectangular 10L $3.00"}, {"id": "recuperado-0201", "supplier": "DOLLAR CITY", "name": "Cuadernos de espiral para notas $1.25", "brand": "", "price": 1.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cuadernos de espiral para notas $1.25"}, {"id": "recuperado-0202", "supplier": "DOLLAR CITY", "name": "Foco de luz calida DURAGLOW 9W A6 $1.50", "brand": "", "price": 1.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Foco de luz calida DURAGLOW 9W A6 $1.50"}, {"id": "recuperado-0203", "supplier": "DOLLAR CITY", "name": "Sobres tipo manila 25.4x33cm 6 pack $1.25 PRECIO UNITARIO $0.21", "brand": "", "price": 1.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Sobres tipo manila 25.4x33cm 6 pack $1.25 PRECIO UNITARIO $0.21"}, {"id": "recuperado-0204", "supplier": "DOLLAR CITY", "name": "Cartulinas de color neon 28x35cm 5 pack $1.25 PRECIO UNITARIO $0.25", "brand": "", "price": 1.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cartulinas de color neon 28x35cm 5 pack $1.25 PRECIO UNITARIO $0.25"}, {"id": "recuperado-0205", "supplier": "DOLLAR CITY", "name": "Resaltadores de doble punta 6 pack $2.00 PRECIO UNITARIO $O.33", "brand": "", "price": 2.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Resaltadores de doble punta 6 pack $2.00 PRECIO UNITARIO $O.33"}, {"id": "recuperado-0207", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Harina fuerte. EL DORADO (23kg 23,000gr) $20.50 VALOR GRAMO $0.0009. VALOR POR ONZA (811.3 OZ) $0.03", "brand": "", "price": 20.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Harina fuerte. EL DORADO (23kg 23,000gr) $20.50 VALOR GRAMO $0.0009. VALOR POR ONZA (811.3 OZ) $0.03"}, {"id": "recuperado-0208", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Harina Suave EL DORADO (23kg 23,000gr) $18.25 VALOR GRAMO $0.0008", "brand": "", "price": 18.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Harina Suave EL DORADO (23kg 23,000gr) $18.25 VALOR GRAMO $0.0008"}, {"id": "recuperado-0209", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "VALOR POR ONZA (811.3) $0.02", "brand": "", "price": 0.02, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "VALOR POR ONZA (811.3) $0.02"}, {"id": "recuperado-0210", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Arroba de maicena SUNAR (11,350gr) $15.OO VALOR GRAMO 0.0013", "brand": "", "price": 15.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Arroba de maicena SUNAR (11,350gr) $15.OO VALOR GRAMO 0.0013"}, {"id": "recuperado-0211", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Arroba de leche en polvo 11,35GR", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Arroba de leche en polvo 11,35GR"}, {"id": "recuperado-0212", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "ESPECIAL $68.20 (VALOR GRAMO $0.0061)", "brand": "", "price": 68.2, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "ESPECIAL $68.20 (VALOR GRAMO $0.0061)"}, {"id": "recuperado-0213", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "ECONOMICA $47.50 (VALOR GRAMO $0.0042)", "brand": "", "price": 47.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "ECONOMICA $47.50 (VALOR GRAMO $0.0042)"}, {"id": "recuperado-0214", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "POWER $40.25 (VALOR GRAMO $0.0035)", "brand": "", "price": 40.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "POWER $40.25 (VALOR GRAMO $0.0035)"}, {"id": "recuperado-0215", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Cubeta de toffee SANTA FE 55Lb (24,970gr) $96 VALOR GRAMO $0.0038", "brand": "", "price": 96.0, "unit": "Cubeta", "purchaseQty": 0, "content": 0, "inventoryUnit": "Cubeta", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cubeta de toffee SANTA FE 55Lb (24,970gr) $96 VALOR GRAMO $0.0038"}, {"id": "recuperado-0216", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Cocoa clara 1 arroba 25 lb (11,350gr) $83.15 VALOR GRAMO $0.0073", "brand": "", "price": 83.15, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cocoa clara 1 arroba 25 lb (11,350gr) $83.15 VALOR GRAMO $0.0073"}, {"id": "recuperado-0217", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Levadura okedo dorada 500g $3.15 VALOR GRAMO $0.0063, valor por onza, 17.64 oz. Precio x onza: $0.18.", "brand": "", "price": 3.15, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Levadura okedo dorada 500g $3.15 VALOR GRAMO $0.0063, valor por onza, 17.64 oz. Precio x onza: $0.18."}, {"id": "recuperado-0218", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Polvo de hornear FLEISHMANN 2.27kg 2,270gr $2.75 VALOR POR GRAMO $0.0012", "brand": "", "price": 2.75, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Polvo de hornear FLEISHMANN 2.27kg 2,270gr $2.75 VALOR POR GRAMO $0.0012"}, {"id": "recuperado-0219", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Bidon de aceite LA PALMA 5 galones $40.00", "brand": "", "price": 40.0, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Bidon de aceite LA PALMA 5 galones $40.00"}, {"id": "recuperado-0220", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Caja de mantequilla FREEMAN 13.61kg 13,610g $34.00 VALOR GRAMO $0.0025", "brand": "", "price": 34.0, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja de mantequilla FREEMAN 13.61kg 13,610g $34.00 VALOR GRAMO $0.0025"}, {"id": "recuperado-0221", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Total onzas 480oz precio oz $0.0708", "brand": "", "price": 0.0708, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Total onzas 480oz precio oz $0.0708"}, {"id": "recuperado-0222", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Galon de escencia de vainilla HERMEL 3.78L $5.75 128 0Z PRECIO POR OZ $0.05", "brand": "", "price": 5.75, "unit": "Galón", "purchaseQty": 0, "content": 0, "inventoryUnit": "Galón", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Galon de escencia de vainilla HERMEL 3.78L $5.75 128 0Z PRECIO POR OZ $0.05"}, {"id": "recuperado-0223", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Litro de escencia de vainilla HERMEL $2.5 PRECIO ML $0.0025 PRECIO ONZA $0.0758", "brand": "", "price": 2.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Litro de escencia de vainilla HERMEL $2.5 PRECIO ML $0.0025 PRECIO ONZA $0.0758"}, {"id": "recuperado-0224", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Escencia de chocolate LITRO $4.25 sacar precios ml", "brand": "", "price": 4.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Escencia de chocolate LITRO $4.25 sacar precios ml"}, {"id": "recuperado-0225", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Coco rayado simple 1 libra (454 GR) $6.00 PRECIO GR $0.0132", "brand": "", "price": 6.0, "unit": "Libra", "purchaseQty": 0, "content": 0, "inventoryUnit": "Libra", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Coco rayado simple 1 libra (454 GR) $6.00 PRECIO GR $0.0132"}, {"id": "recuperado-0226", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Chocolate blanco barra PIMI 1Lb 454gr $4.45 VALOR GRAMO $0.0098", "brand": "", "price": 4.45, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Chocolate blanco barra PIMI 1Lb 454gr $4.45 VALOR GRAMO $0.0098"}, {"id": "recuperado-0227", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Chocolate negro barra PIMI 1Lb 454gr $4.45 VALOR GRAMO $ 0.0098", "brand": "", "price": 4.45, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Chocolate negro barra PIMI 1Lb 454gr $4.45 VALOR GRAMO $ 0.0098"}, {"id": "recuperado-0228", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Cubeta de crema Bavaria PURATOS 10kg 10,000g $32.70 VALOR GRAMO $0.0033", "brand": "", "price": 32.7, "unit": "Cubeta", "purchaseQty": 0, "content": 0, "inventoryUnit": "Cubeta", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cubeta de crema Bavaria PURATOS 10kg 10,000g $32.70 VALOR GRAMO $0.0033"}, {"id": "recuperado-0229", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Caja de 5 mangas de fresa BACKEN 5kg 5.000g $19.00 VALOR GRAMO $0.0038", "brand": "", "price": 19.0, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja de 5 mangas de fresa BACKEN 5kg 5.000g $19.00 VALOR GRAMO $0.0038"}, {"id": "recuperado-0230", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Manga de chocolate blanco 1kg 1000g $5.20 PRECIO POR GRAMO $0.0052 (35.3 OZ PRECIO POR ONZA $0.15", "brand": "", "price": 5.2, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Manga de chocolate blanco 1kg 1000g $5.20 PRECIO POR GRAMO $0.0052 (35.3 OZ PRECIO POR ONZA $0.15"}, {"id": "recuperado-0231", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Manga de chocolate negro 1kg 1000g $5.20 PRECIO POR GRAMO $0.0052 (35.3 OZ PRECIO POR ONZA $0.15", "brand": "", "price": 5.2, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Manga de chocolate negro 1kg 1000g $5.20 PRECIO POR GRAMO $0.0052 (35.3 OZ PRECIO POR ONZA $0.15"}, {"id": "recuperado-0232", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Mangas pasteleras plásticas deseachabless (para pasteles) PEQUEÑA $0.50 GRANDE $0.75", "brand": "", "price": 0.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Mangas pasteleras plásticas deseachabless (para pasteles) PEQUEÑA $0.50 GRANDE $0.75"}, {"id": "recuperado-0233", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Bolsa de mani quebrado CASA BAZZINI 340.5g $1.60 PRECIO GR $0.0047", "brand": "", "price": 1.6, "unit": "Bolsa", "purchaseQty": 0, "content": 0, "inventoryUnit": "Bolsa", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Bolsa de mani quebrado CASA BAZZINI 340.5g $1.60 PRECIO GR $0.0047"}, {"id": "recuperado-0234", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Papel manteca 100 pliegos $8.50 VALOR UNITARIO $0.085", "brand": "", "price": 8.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Papel manteca 100 pliegos $8.50 VALOR UNITARIO $0.085"}, {"id": "recuperado-0235", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Papel corrugado #5 (para brownies) FREEMAN 500 unidades $3.75 Precio unitario $0.0075", "brand": "", "price": 3.75, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Papel corrugado #5 (para brownies) FREEMAN 500 unidades $3.75 Precio unitario $0.0075"}, {"id": "recuperado-0236", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Papel corrugado #6 FREEMAN 500 unidades $4.25 Precio unitario $0.0085", "brand": "", "price": 4.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Papel corrugado #6 FREEMAN 500 unidades $4.25 Precio unitario $0.0085"}, {"id": "recuperado-0237", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Topping base RICHS (Buttercream para pasteles blancos y postres) 4kg 4,000gr $21.00", "brand": "", "price": 21.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Topping base RICHS (Buttercream para pasteles blancos y postres) 4kg 4,000gr $21.00"}, {"id": "recuperado-0238", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "VALOR GRAMO $0.0053 (141 OZ VALOR POR ONZA $0.15", "brand": "", "price": 0.0053, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "VALOR GRAMO $0.0053 (141 OZ VALOR POR ONZA $0.15"}, {"id": "recuperado-0239", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Buttercream caja blanca con rojo (para pasteles de colores) 4KG $ (4,000 gr) $29.00 precio gramo $0.0073", "brand": "", "price": 29.0, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Buttercream caja blanca con rojo (para pasteles de colores) 4KG $ (4,000 gr) $29.00 precio gramo $0.0073"}, {"id": "recuperado-0240", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Buttercream de chocolate (para pasteles) 4KG (4,000gr) $30.00 Precio gramo $0.0075", "brand": "", "price": 30.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Buttercream de chocolate (para pasteles) 4KG (4,000gr) $30.00 Precio gramo $0.0075"}, {"id": "recuperado-0241", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Papel corrugado #1 FREEMAN 500 unidades $2.55 precio unitario $0.0051", "brand": "", "price": 2.55, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Papel corrugado #1 FREEMAN 500 unidades $2.55 precio unitario $0.0051"}, {"id": "recuperado-0242", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Cajas y bases para pastel: #12, #14, #16, #18 PRECIO", "brand": "", "price": 0, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Cajas y bases para pastel: #12, #14, #16, #18 PRECIO"}, {"id": "recuperado-0243", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Caja # 10 para pastel $0.80 unidad", "brand": "", "price": 0.8, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja # 10 para pastel $0.80 unidad"}, {"id": "recuperado-0244", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Base #10 para pastel $0.35 unidad", "brand": "", "price": 0.35, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Base #10 para pastel $0.35 unidad"}, {"id": "recuperado-0245", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Caja crema pastelera babaria PURATOS (10 mangas 1kl c/u) $32.50 VALOR GR $0.0033", "brand": "", "price": 32.5, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja crema pastelera babaria PURATOS (10 mangas 1kl c/u) $32.50 VALOR GR $0.0033"}, {"id": "recuperado-0246", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Colorante rojo liquido ENCO 250gr 8.81oz $11.50 (VALOR GRAMO $0.046) (VALOR ONZA $1.31)", "brand": "", "price": 11.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Colorante rojo liquido ENCO 250gr 8.81oz $11.50 (VALOR GRAMO $0.046) (VALOR ONZA $1.31)"}, {"id": "recuperado-0247", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Colorantes en polvo: verde, naranja. NO TIENEN EN ESOS COLORES", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Colorantes en polvo: verde, naranja. NO TIENEN EN ESOS COLORES"}, {"id": "recuperado-0248", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Colorante en polvo AMARILLO Y ROJO: ONZA $0.35ctvs   ¼ $2.5   1kg $7.50", "brand": "", "price": 0.35, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Colorante en polvo AMARILLO Y ROJO: ONZA $0.35ctvs   ¼ $2.5   1kg $7.50"}, {"id": "recuperado-0249", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Colorante en polvo ROSADO: ONZA $0.80  4 ONZAS $3.00   ½ LB $5.75  1KG $21.50", "brand": "", "price": 0.8, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Colorante en polvo ROSADO: ONZA $0.80  4 ONZAS $3.00   ½ LB $5.75  1KG $21.50"}, {"id": "recuperado-0250", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Colorante en polvo CAFÉ: ONZA $1.20   ¼ $2.5   1KG $25.80", "brand": "", "price": 1.2, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Colorante en polvo CAFÉ: ONZA $1.20   ¼ $2.5   1KG $25.80"}, {"id": "recuperado-0251", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Colorante liquido de gotero HERMEL (contenido neto 1 0z). Color rojo, azul, amarillo, verde, cafe, rosado, morado, blanco PRECIO $1.25", "brand": "", "price": 1.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Colorante liquido de gotero HERMEL (contenido neto 1 0z). Color rojo, azul, amarillo, verde, cafe, rosado, morado, blanco PRECIO $1.25"}, {"id": "recuperado-0252", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Colorante liquido ENCO (contenido neto 40gr / 1.410z) Color rojo, azul, amarillo, verde, café, rosado, morado, blanco, negro. PRECIO $3.25", "brand": "", "price": 3.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Colorante liquido ENCO (contenido neto 40gr / 1.410z) Color rojo, azul, amarillo, verde, café, rosado, morado, blanco, negro. PRECIO $3.25"}, {"id": "recuperado-0253", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Caja de cupcakes acrílica transparente para 6 cupcakes PRECIO UNITARIO $0.52", "brand": "", "price": 0.52, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja de cupcakes acrílica transparente para 6 cupcakes PRECIO UNITARIO $0.52"}, {"id": "recuperado-0254", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Caja acrílica transparente para 12 cupcakes PRECIO UNITARIO $1.15", "brand": "", "price": 1.15, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja acrílica transparente para 12 cupcakes PRECIO UNITARIO $1.15"}, {"id": "recuperado-0255", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Caja acrílica transparente para 4 cupcakes PRECIO UNITARIO $0.50", "brand": "", "price": 0.5, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja acrílica transparente para 4 cupcakes PRECIO UNITARIO $0.50"}, {"id": "recuperado-0256", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Caja de cartoncillo para 4 cupcakes. Unidad $0.75 pack 25 unidades $18.00", "brand": "", "price": 0.75, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja de cartoncillo para 4 cupcakes. Unidad $0.75 pack 25 unidades $18.00"}, {"id": "recuperado-0257", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Caja de cartoncillo para 6 cupcakes. Unidad $1.00 pack 25 unidades $23.75", "brand": "", "price": 1.0, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja de cartoncillo para 6 cupcakes. Unidad $1.00 pack 25 unidades $23.75"}, {"id": "recuperado-0258", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Molde pequeño redondo #22 $4.70", "brand": "", "price": 4.7, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Molde pequeño redondo #22 $4.70"}, {"id": "recuperado-0259", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Molde mediano redondo #24 $5.15 ALLY TIENE DUDAS DE QUE ES ESTOS ITEMS", "brand": "", "price": 5.15, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Molde mediano redondo #24 $5.15 ALLY TIENE DUDAS DE QUE ES ESTOS ITEMS"}, {"id": "recuperado-0260", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Molde grande redondo #28 $6.70", "brand": "", "price": 6.7, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Molde grande redondo #28 $6.70"}, {"id": "recuperado-0261", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "Molde de aluminio desechable para hornear:", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Molde de aluminio desechable para hornear:"}, {"id": "recuperado-0262", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "PEQUEÑO #2047 $0.35", "brand": "", "price": 0.35, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "PEQUEÑO #2047 $0.35"}, {"id": "recuperado-0263", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "MEDIANO #2046 $0.60", "brand": "", "price": 0.6, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "MEDIANO #2046 $0.60"}, {"id": "recuperado-0264", "supplier": "BODEGA DEL PANADERO (SAN MIGUELITO, 7344-2627, LUNES A VIERNES: 6:30 AM-4:00 PM. SABADO DE 6:30-12:00. DOMINGOS 7:00 MD-11:00 AM)", "name": "GRANDE #4050 $1.36", "brand": "", "price": 1.36, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "GRANDE #4050 $1.36"}, {"id": "recuperado-0266", "supplier": "SERAROLS DIAZ 7696 2081 (25 CALLE, FRENTE A GRUPO Q, PORTON CAFÉ ROJIZO, SIN MAYOR NOMBRE NI IDENTIFICACIÓN) CAJAS PARA PASTELES, POSTRES Y OTRAS ACTIVIDADES. PERSONALIZAN Y ESTAMPAN.", "name": "Caja 9x6x3 (Caja de cartoncillo blancas para box de 8 piezas) $25.27 (93 unidades $0.27ctvs)", "brand": "", "price": 25.27, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja 9x6x3 (Caja de cartoncillo blancas para box de 8 piezas) $25.27 (93 unidades $0.27ctvs)"}, {"id": "recuperado-0267", "supplier": "SERAROLS DIAZ 7696 2081 (25 CALLE, FRENTE A GRUPO Q, PORTON CAFÉ ROJIZO, SIN MAYOR NOMBRE NI IDENTIFICACIÓN) CAJAS PARA PASTELES, POSTRES Y OTRAS ACTIVIDADES. PERSONALIZAN Y ESTAMPAN.", "name": "Caja de 12x12m}x 3.5. Creo. Para box de 16 piezas", "brand": "", "price": 0, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja de 12x12m}x 3.5. Creo. Para box de 16 piezas"}, {"id": "recuperado-0268", "supplier": "SERAROLS DIAZ 7696 2081 (25 CALLE, FRENTE A GRUPO Q, PORTON CAFÉ ROJIZO, SIN MAYOR NOMBRE NI IDENTIFICACIÓN) CAJAS PARA PASTELES, POSTRES Y OTRAS ACTIVIDADES. PERSONALIZAN Y ESTAMPAN.", "name": "Caja 10x10x2.5 blanca de cartoncillo 100 unidades $30.20", "brand": "", "price": 30.2, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja 10x10x2.5 blanca de cartoncillo 100 unidades $30.20"}, {"id": "recuperado-0269", "supplier": "SERAROLS DIAZ 7696 2081 (25 CALLE, FRENTE A GRUPO Q, PORTON CAFÉ ROJIZO, SIN MAYOR NOMBRE NI IDENTIFICACIÓN) CAJAS PARA PASTELES, POSTRES Y OTRAS ACTIVIDADES. PERSONALIZAN Y ESTAMPAN.", "name": "Caja de 9x6x3 blanca de cartoncillo 100 unidades $27.17", "brand": "", "price": 27.17, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja de 9x6x3 blanca de cartoncillo 100 unidades $27.17"}, {"id": "recuperado-0270", "supplier": "SERAROLS DIAZ 7696 2081 (25 CALLE, FRENTE A GRUPO Q, PORTON CAFÉ ROJIZO, SIN MAYOR NOMBRE NI IDENTIFICACIÓN) CAJAS PARA PASTELES, POSTRES Y OTRAS ACTIVIDADES. PERSONALIZAN Y ESTAMPAN.", "name": "Caja de 8.75x4. 5x2.5 blanca de cartoncillo 100 unidades $22.62", "brand": "", "price": 22.62, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja de 8.75x4. 5x2.5 blanca de cartoncillo 100 unidades $22.62"}, {"id": "recuperado-0271", "supplier": "SERAROLS DIAZ 7696 2081 (25 CALLE, FRENTE A GRUPO Q, PORTON CAFÉ ROJIZO, SIN MAYOR NOMBRE NI IDENTIFICACIÓN) CAJAS PARA PASTELES, POSTRES Y OTRAS ACTIVIDADES. PERSONALIZAN Y ESTAMPAN.", "name": "Caja para brazo gitano micro 50 unidades $20.08", "brand": "", "price": 20.08, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja para brazo gitano micro 50 unidades $20.08"}, {"id": "recuperado-0273", "supplier": "ALL STAR (ALMACEN DE USADOS, DONDE ANTES ERA EL GIGANTE O MEGA)", "name": "Vasos de vidrio para servir en restaurante (Area de $1, consultar promociones)", "brand": "", "price": 1.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Vasos de vidrio para servir en restaurante (Area de $1, consultar promociones)"}, {"id": "recuperado-0274", "supplier": "ALL STAR (ALMACEN DE USADOS, DONDE ANTES ERA EL GIGANTE O MEGA)", "name": "Platos de cerámica para servir comida en local", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Platos de cerámica para servir comida en local"}, {"id": "recuperado-0275", "supplier": "ALL STAR (ALMACEN DE USADOS, DONDE ANTES ERA EL GIGANTE O MEGA)", "name": "Pailitas para postres o tazas de 8 onzas", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Pailitas para postres o tazas de 8 onzas"}, {"id": "recuperado-0277", "supplier": "LIBRERÍA KARLITA TEL: 77427146", "name": "Papel bond blanco resma 500 paginas $4.75 VALOR UNITARIO $0.0095", "brand": "", "price": 4.75, "unit": "Resma", "purchaseQty": 0, "content": 0, "inventoryUnit": "Resma", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Papel bond blanco resma 500 paginas $4.75 VALOR UNITARIO $0.0095"}, {"id": "recuperado-0278", "supplier": "LIBRERÍA KARLITA TEL: 77427146", "name": "Order book engrapado CONQUISTADOR $1.50", "brand": "", "price": 1.5, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Order book engrapado CONQUISTADOR $1.50"}, {"id": "recuperado-0280", "supplier": "PENDIENTE", "name": "Vendedor de juegos de tazas de 8 onzas con su paila", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Vendedor de juegos de tazas de 8 onzas con su paila"}, {"id": "recuperado-0281", "supplier": "PENDIENTE", "name": "Servicio de fumigaciones", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Servicio de fumigaciones"}, {"id": "recuperado-0282", "supplier": "PENDIENTE", "name": "Servicios de fontaneria", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Servicios de fontaneria"}, {"id": "recuperado-0284", "supplier": "MANTEMIENTOS", "name": "Maquina de café", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Maquina de café"}, {"id": "recuperado-0285", "supplier": "MANTEMIENTOS", "name": "Tuberias", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Tuberias"}, {"id": "recuperado-0286", "supplier": "MANTEMIENTOS", "name": "Techo y canales", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Techo y canales"}, {"id": "recuperado-0287", "supplier": "MANTEMIENTOS", "name": "Refrigeradoras", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Refrigeradoras"}, {"id": "recuperado-0288", "supplier": "MANTEMIENTOS", "name": "Horno y maquinas", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Horno y maquinas"}, {"id": "recuperado-0289", "supplier": "MANTEMIENTOS", "name": "Licuadoras", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Licuadoras"}, {"id": "recuperado-0291", "supplier": "PAGOS MENSUALES Y SUSCRIPCIONES", "name": "Alquiler de local $700", "brand": "", "price": 700.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Alquiler de local $700"}, {"id": "recuperado-0292", "supplier": "PAGOS MENSUALES Y SUSCRIPCIONES", "name": "Canva pro $12.99 anual", "brand": "", "price": 12.99, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Canva pro $12.99 anual"}, {"id": "recuperado-0293", "supplier": "PAGOS MENSUALES Y SUSCRIPCIONES", "name": "Lightroom pro $20 anual", "brand": "", "price": 20.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Lightroom pro $20 anual"}, {"id": "recuperado-0294", "supplier": "PAGOS MENSUALES Y SUSCRIPCIONES", "name": "Youtube premium $7.99", "brand": "", "price": 7.99, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Youtube premium $7.99"}, {"id": "recuperado-0295", "supplier": "PAGOS MENSUALES Y SUSCRIPCIONES", "name": "Agua aprox $90", "brand": "", "price": 90.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Agua aprox $90"}, {"id": "recuperado-0296", "supplier": "PAGOS MENSUALES Y SUSCRIPCIONES", "name": "Luz aprox $145", "brand": "", "price": 145.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Luz aprox $145"}, {"id": "recuperado-0297", "supplier": "PAGOS MENSUALES Y SUSCRIPCIONES", "name": "Internet $25", "brand": "", "price": 25.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Internet $25"}, {"id": "recuperado-0298", "supplier": "PAGOS MENSUALES Y SUSCRIPCIONES", "name": "Impuesto alcaldía $3", "brand": "", "price": 3.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Impuesto alcaldía $3"}, {"id": "recuperado-0299", "supplier": "PAGOS MENSUALES Y SUSCRIPCIONES", "name": "Supuesto iva 13%", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Supuesto iva 13%"}, {"id": "recuperado-0300", "supplier": "PAGOS MENSUALES Y SUSCRIPCIONES", "name": "Planillas", "brand": "", "price": 0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Planillas"}, {"id": "recuperado-0301", "supplier": "PAGOS MENSUALES Y SUSCRIPCIONES", "name": "Credito ONG $185", "brand": "", "price": 185.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Credito ONG $185"}, {"id": "recuperado-0302", "supplier": "PAGOS MENSUALES Y SUSCRIPCIONES", "name": "Credito Firemnpresa $25", "brand": "", "price": 25.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Credito Firemnpresa $25"}, {"id": "recuperado-0303", "supplier": "PAGOS MENSUALES Y SUSCRIPCIONES", "name": "Credito Bandesal $145", "brand": "", "price": 145.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Credito Bandesal $145"}, {"id": "recuperado-0305", "supplier": "EDUCACION Y CAPACITACIONES", "name": "Matriculas $100", "brand": "", "price": 100.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Matriculas $100"}, {"id": "recuperado-0306", "supplier": "EDUCACION Y CAPACITACIONES", "name": "Mensualidad Gustavo $100", "brand": "", "price": 100.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Mensualidad Gustavo $100"}, {"id": "recuperado-0307", "supplier": "EDUCACION Y CAPACITACIONES", "name": "Mensualidad Arturo $135", "brand": "", "price": 135.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Mensualidad Arturo $135"}, {"id": "recuperado-0308", "supplier": "EDUCACION Y CAPACITACIONES", "name": "Mensualidad Ally $100", "brand": "", "price": 100.0, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Mensualidad Ally $100"}, {"id": "recuperado-0310", "supplier": "PECANA", "name": "Bandeja numero 9 (base negra tapa transparente) unidad $0.97 ciento ($97)", "brand": "", "price": 0.97, "unit": "Bandeja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Bandeja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Bandeja numero 9 (base negra tapa transparente) unidad $0.97 ciento ($97)"}, {"id": "recuperado-0311", "supplier": "PECANA", "name": "Higos en almibar MIGUELS (lata grande) $18.00 costo en 1800gramos 0.0100, 63oz", "brand": "", "price": 18.0, "unit": "Lata", "purchaseQty": 0, "content": 0, "inventoryUnit": "Lata", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Higos en almibar MIGUELS (lata grande) $18.00 costo en 1800gramos 0.0100, 63oz"}, {"id": "recuperado-0312", "supplier": "PECANA", "name": "Caja numero 8 con ventana (de cartoncillo) unidad 0.65, 15 unidades $9.75", "brand": "", "price": 9.75, "unit": "Caja", "purchaseQty": 0, "content": 0, "inventoryUnit": "Caja", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Caja numero 8 con ventana (de cartoncillo) unidad 0.65, 15 unidades $9.75"}, {"id": "recuperado-0313", "supplier": "PECANA", "name": "Base numero 8, unidad 0.35 y 15 unidades $5.25", "brand": "", "price": 5.25, "unit": "Unidad", "purchaseQty": 0, "content": 0, "inventoryUnit": "Unidad", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Base numero 8, unidad 0.35 y 15 unidades $5.25"}, {"id": "recuperado-0314", "supplier": "PECANA", "name": "Premescla BACKEN saco $95 agregas peso", "brand": "", "price": 95.0, "unit": "Saco", "purchaseQty": 0, "content": 0, "inventoryUnit": "Saco", "innerContent": 1, "contentUnit": "Unidad", "complete": 0, "loose": 0, "min": 0, "minUnit": "Unidad", "max": 0, "maxUnit": "Unidad", "date": "2026-09-21", "ref": "Lista de Proveedores Bon House", "info": "Premescla BACKEN saco $95 agregas peso"}];
const BONHOUSE_RECOVERED_SUPPLIERS = ["PRICEMART (SANTA ANA)", "SUPER SELECTOS (metro centro)", "MERCADO DON MOY (7742-8298)", "SU KARNE (DISTRIBUIDORA DE CARNE) 2441 1646", "AGENCIA (7729-9968)", "CALISTEMO (7862-9877)", "SORBETERIA SARITA", "CATALANA Huevos, 8-10 cartones del morado por pedido.", "CAFÉ EN GRANO – ACEVEDO TOSTADOR (7730-4000", "DEPOSITO EMANUEL – (7902-1565) 8:30 am – 7:30 pm", "SALUD A DOMICILIO", "SOLUCION DIGITAL", "DOLLAR CITY", "BODEGA DEL PANADERO (San miguelito, 7344-2627, lunes a viernes: 6:30 am-4:00 pm. Sabado de 6:30-12:00. Domingos 7:00 md-11:00 am)", "SERAROLS DIAZ 7696 2081 (25 calle, frente a grupo Q, porton café rojizo, sin mayor nombre ni identificación) Cajas para pasteles, postres y otras actividades. Personalizan y estampan.", "ALL STAR (ALMACEN DE USADOS, DONDE ANTES ERA EL GIGANTE O MEGA)", "Librería Karlita Tel: 77427146", "PENDIENTE", "MANTEMIENTOS", "PAGOS MENSUALES Y SUSCRIPCIONES", "EDUCACION Y CAPACITACIONES", "PECANA"];

/* Carga segura: solo recupera el catálogo cuando hay 0 o 1 productos.
   Si ya existe un inventario real con varios productos, NO lo reemplaza. */
if (products.length <= 1 && localStorage.getItem("bh_catalogo_recuperado_v1") !== "1") {
    products = BONHOUSE_RECOVERED_PRODUCTS.map(item => ({...item}));
    suppliers = BONHOUSE_RECOVERED_SUPPLIERS.map((name, i) => ({
        id: "supplier-recovered-" + (i + 1),
        name: normalizeSupplierName(name)
    }));
    localStorage.setItem("bh_products", JSON.stringify(products));
    localStorage.setItem("bh_suppliers", JSON.stringify(suppliers));
    localStorage.setItem("bh_catalogo_recuperado_v1", "1");
}



/* =========================================================
   CREAR ID
========================================================= */

function createId() {

    if (
        window.crypto &&
        typeof crypto.randomUUID === "function"
    ) {
        return crypto.randomUUID();
    }

    return (
        Date.now().toString(36) +
        Math.random().toString(36).slice(2)
    );
}


/* =========================================================
   NORMALIZAR NOMBRE DEL PROVEEDOR
========================================================= */

function normalizeSupplierName(name) {

    const value = String(name || "").trim();

    if (!value) {
        return "";
    }

    if (value.toUpperCase() === "AGENICA") {
        return "AGENCIA";
    }

    return value.toUpperCase();
}


/* =========================================================
   MIGRACIÓN SEGURA DE DATOS ANTIGUOS
========================================================= */

function migrateExistingData() {

    let changed = false;

    products.forEach(product => {

        const oldSupplier = product.supplier;

        product.supplier = normalizeSupplierName(
            product.supplier
        );

        if (oldSupplier !== product.supplier) {
            changed = true;
        }
    });


    Object.keys(snapshots || {}).forEach(date => {

        if (!Array.isArray(snapshots[date])) {
            return;
        }

        snapshots[date].forEach(product => {

            const oldSupplier = product.supplier;

            product.supplier = normalizeSupplierName(
                product.supplier
            );

            if (oldSupplier !== product.supplier) {
                changed = true;
            }
        });
    });


    suppliers.forEach(supplier => {

        const oldName = supplier.name;

        supplier.name = normalizeSupplierName(
            supplier.name
        );

        if (oldName !== supplier.name) {
            changed = true;
        }
    });


    const seen = new Set();

    suppliers = suppliers.filter(supplier => {

        const key = normalizeSupplierName(
            supplier.name
        );

        if (!key) {
            return true;
        }

        if (seen.has(key)) {

            changed = true;

            return false;
        }

        seen.add(key);

        return true;
    });


    if (changed) {

        localStorage.setItem(
            "bh_products",
            JSON.stringify(products)
        );

        localStorage.setItem(
            "bh_suppliers",
            JSON.stringify(suppliers)
        );

        localStorage.setItem(
            "bh_snapshots",
            JSON.stringify(snapshots)
        );
    }
}


/* =========================================================
   NORMALIZAR PRODUCTO
========================================================= */

function normalizeProduct(product) {

    if (!product) {
        return product;
    }

    product.supplier = normalizeSupplierName(
        product.supplier
    );

    if (product.purchaseQty == null) {
        product.purchaseQty = Number(
            product.complete || 0
        );
    }

    if (!product.inventoryUnit) {
        product.inventoryUnit =
            product.unit || "Unidad";
    }

    if (product.innerContent == null) {
        product.innerContent = 1;
    }

    if (!product.contentUnit) {
        product.contentUnit = "Unidad";
    }

    if (product.complete == null) {
        product.complete = 0;
    }

    if (product.loose == null) {
        product.loose = 0;
    }

    if (product.minUnit == null) {
        product.minUnit =
            product.contentUnit ||
            product.inventoryUnit ||
            "Unidad";
    }

    if (product.maxUnit == null) {
        product.maxUnit =
            product.contentUnit ||
            product.inventoryUnit ||
            "Unidad";
    }

    return product;
}


migrateExistingData();

products = products.map(normalizeProduct);


/* =========================================================
   GUARDAR
========================================================= */

function save() {

    localStorage.setItem(
        "bh_products",
        JSON.stringify(products)
    );

    localStorage.setItem(
        "bh_suppliers",
        JSON.stringify(suppliers)
    );

    localStorage.setItem(
        "bh_notes",
        JSON.stringify(notes)
    );

    localStorage.setItem(
        "bh_snapshots",
        JSON.stringify(snapshots)
    );
}


/* =========================================================
   FORMATO DINERO
========================================================= */

function money(value) {

    return "$" + Number(value || 0).toFixed(2);
}


/* =========================================================
   FORMATO FECHA
========================================================= */

function fmtDate(date) {

    if (!date) {
        return "";
    }

    const parts = date.split("-");

    if (parts.length !== 3) {
        return date;
    }

    const [year, month, day] = parts;

    return `${day}/${month}/${year}`;
}


/* =========================================================
   ESCAPAR HTML
========================================================= */

function esc(value) {

    return String(value ?? "").replace(
        /[&<>"']/g,
        character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[character]
    );
}


/* =========================================================
   MENSAJES
========================================================= */

function toast(message) {

    const element = $("toast");

    if (!element) {
        return;
    }

    element.textContent = message;

    element.classList.add("show");

    setTimeout(() => {

        element.classList.remove("show");

    }, 2800);
}


/* =========================================================
   CÁLCULOS DE INVENTARIO
========================================================= */

function inventoryUnits(product) {

    return Number(
        product.complete || 0
    );
}


function finalLoose(product) {

    return Number(
        product.loose || 0
    );
}


function finalUnits(product) {

    const complete =
        inventoryUnits(product);

    const unitsPerPackage =
        Number(product.innerContent || 1);

    const loose =
        finalLoose(product);

    return (
        complete * unitsPerPackage
    ) + loose;
}


/* =========================================================
   CONVERTIR MÍNIMO / MÁXIMO
========================================================= */

function thresholdToFinal(
    product,
    value,
    unit
) {

    const number =
        Number(value || 0);

    if (!number) {
        return 0;
    }

    if (
        !unit ||
        unit === product.contentUnit
    ) {
        return number;
    }

    if (
        unit === product.inventoryUnit
    ) {

        return (
            number *
            Number(product.innerContent || 1)
        );
    }

    return null;
}


/* =========================================================
   ESTADO DEL PRODUCTO
========================================================= */

function status(product) {

    const quantity =
        finalUnits(product);

    const minimum =
        thresholdToFinal(
            product,
            product.min,
            product.minUnit
        );

    if (quantity <= 0) {
        return "out";
    }

    if (
        minimum !== null &&
        Number(product.min || 0) > 0 &&
        quantity <= minimum
    ) {
        return "low";
    }

    return "normal";
}


/* =========================================================
   TEXTO ESTADO
========================================================= */

function statusText(product) {

    const currentStatus =
        status(product);

    if (currentStatus === "out") {
        return "Agotado";
    }

    if (currentStatus === "low") {
        return "Stock bajo";
    }

    return "Normal";
}


/* =========================================================
   VALOR ACTUAL DEL INVENTARIO
========================================================= */

function totalValue(product) {

    const price =
        Number(product.price || 0);

    const purchaseQty =
        Number(product.purchaseQty || 0);

    const subPackages =
        Number(product.content || 0);

    const unitsPerSubPackage =
        Number(product.innerContent || 1);

    const finalPerPurchase =
        subPackages *
        unitsPerSubPackage;

    const currentStock =
        finalUnits(product);


    if (
        purchaseQty > 0 &&
        finalPerPurchase > 0
    ) {

        return (
            price *
            (
                currentStock /
                finalPerPurchase
            )
        );
    }


    const complete =
        Number(product.complete || 0);

    const loose =
        Number(product.loose || 0);

    const content =
        Number(product.content || 1);


    return (
        price * complete
    ) + (
        content > 0
            ? price * (loose / content)
            : 0
    );
}


/* =========================================================
   PRODUCTOS DE UNA FECHA
========================================================= */

function inventoryForDate(date) {

    return products
        .filter(product => product.date === date)
        .map(normalizeProduct);
}


/* =========================================================
   SNAPSHOT
========================================================= */

function makeSnapshot(date) {

    if (!date) {
        return;
    }

    snapshots[date] =
        JSON.parse(
            JSON.stringify(
                inventoryForDate(date)
            )
        );

    save();
}


/* =========================================================
   GUARDAR / EDITAR PRODUCTO
========================================================= */

function upsertProduct(data) {

    data = normalizeProduct(data);

    data.supplier =
        normalizeSupplierName(
            data.supplier
        );

    if (data.id) {

        const index =
            products.findIndex(
                product =>
                    product.id === data.id
            );

        if (index !== -1) {

            products[index] = {
                ...products[index],
                ...data
            };

        } else {

            data.id = createId();

            products.push(data);
        }

    } else {

        data.id = createId();

        products.push(data);
    }


    if (data.supplier) {

        const exists =
            suppliers.some(
                supplier =>
                    normalizeSupplierName(
                        supplier.name
                    ) === data.supplier
            );

        if (!exists) {

            suppliers.push({

                id: createId(),

                name: data.supplier,

                phone: "",

                email: "",

                notes: ""
            });
        }
    }


    save();

    makeSnapshot(data.date);
}


/* =========================================================
   FECHA ANTERIOR
========================================================= */

function latestPreviousDateWithProducts(date) {

    const dates = [
        ...new Set(
            products
                .map(product => product.date)
                .filter(Boolean)
        )
    ].sort();


    const previousDates =
        dates.filter(
            existingDate =>
                existingDate < date
        );


    if (previousDates.length) {

        return previousDates[
            previousDates.length - 1
        ];
    }


    return null;
}


/* =========================================================
   DUPLICAR INVENTARIO A NUEVA FECHA
========================================================= */

function cloneInventoryToDate(targetDate) {

    if (!targetDate) {
        return false;
    }


    if (
        inventoryForDate(targetDate)
            .length > 0
    ) {
        return false;
    }


    const sourceDate =
        latestPreviousDateWithProducts(
            targetDate
        );


    if (!sourceDate) {
        return false;
    }


    const sourceProducts =
        inventoryForDate(sourceDate);


    if (!sourceProducts.length) {
        return false;
    }


    const copies =
        sourceProducts.map(product => {

            return {

                ...JSON.parse(
                    JSON.stringify(product)
                ),

                id: createId(),

                date: targetDate
            };
        });


    products.push(...copies);

    save();

    makeSnapshot(targetDate);

    return true;
}


/* =========================================================
   LLENAR SELECT
========================================================= */

function fillSelects() {

    const options =
        `<option value="">
            Seleccionar unidad
        </option>` +

        ALL_UNITS.map(unit => {

            return (
                `<option value="${esc(unit)}">
                    ${esc(unit)}
                </option>`
            );

        }).join("");


    [
        "fUnit",
        "fInventoryUnit",
        "fContentUnit",
        "fMinUnit",
        "fMaxUnit"
    ].forEach(id => {

        const select = $(id);

        if (select) {
            select.innerHTML = options;
        }
    });
}


/* =========================================================
   MODALES
========================================================= */

function openModal(id) {

    const modal = $(id);

    if (modal) {
        modal.classList.remove("hidden");
    }
}


function closeModal(id) {

    const modal = $(id);

    if (modal) {
        modal.classList.add("hidden");
    }
}


document
    .querySelectorAll("[data-close]")
    .forEach(button => {

        button.onclick = () => {

            closeModal(
                button.dataset.close
            );
        };
    });


/* =========================================================
   LOGIN
========================================================= */

function bindBonHouseLogin() {
    const form = $("loginForm");
    if (!form || form.dataset.loginBound === "1") return;
    form.dataset.loginBound = "1";

    form.onsubmit = event => {
        event.preventDefault();

        const username = ($("loginUser")?.value || "").trim();
        const password = $("loginPass")?.value || "";

        if (username === "bonhouse" && password === "bonhouse2026_") {
            localStorage.setItem("bh_session", "1");
            $("loginScreen")?.classList.add("hidden");
            $("app")?.classList.remove("hidden");
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    };
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindBonHouseLogin, {once:true});
} else {
    bindBonHouseLogin();
}


/* =========================================================
   CERRAR SESIÓN
========================================================= */

if ($("logoutBtn")) {

    $("logoutBtn").onclick = () => {

        localStorage.removeItem(
            "bh_session"
        );

        location.reload();
    };
}


/* =========================================================
   SESIÓN GUARDADA
========================================================= */

if (
    localStorage.getItem(
        "bh_session"
    ) === "1"
) {

    if ($("loginScreen")) {

        $("loginScreen")
            .classList
            .add("hidden");
    }

    if ($("app")) {

        $("app")
            .classList
            .remove("hidden");
    }
}


/* =========================================================
   NAVEGACIÓN
========================================================= */

document
    .querySelectorAll(".nav-btn")
    .forEach(button => {

        button.onclick = () => {

            showPage(
                button.dataset.page
            );
        };
    });


function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(element => {

            element.classList.add(
                "hidden"
            );
        });


    const selected =
        $(page + "Page");

    if (selected) {

        selected.classList.remove(
            "hidden"
        );
    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === page
            );
        });


    const titles = {

        dashboard: "Dashboard",

        products: "Productos",

        suppliers: "Proveedores",

        invoices: "Facturas / Compras",

        notes: "Notas"
    };


    if ($("pageTitle")) {

        $("pageTitle").textContent =
            titles[page] ||
            "Inventario";
    }


    renderAll();
}


/* =========================================================
   FECHA DEL INVENTARIO
========================================================= */

if ($("inventoryDate")) {

    $("inventoryDate").onchange =
        () => {

            currentDate =
                $("inventoryDate").value;

            if ($("fDate")) {

                $("fDate").value =
                    currentDate;
            }


            const copied =
                cloneInventoryToDate(
                    currentDate
                );


            renderAll();

            checkAlerts();


            if (copied) {

                toast(
                    "Inventario copiado automáticamente desde la fecha anterior."
                );
            }
        };
}


/* =========================================================
   BUSCADORES
========================================================= */

if ($("searchInput")) {

    $("searchInput").oninput =
        renderDashboard;
}


if ($("productSearch")) {

    $("productSearch").oninput =
        renderProducts;
}


if ($("productStatusFilter")) {

    $("productStatusFilter")
        .onchange =
        renderDashboard;
}


if ($("productStatusFilter2")) {

    $("productStatusFilter2")
        .onchange =
        renderProducts;
}


/* =========================================================
   BOTONES NUEVO PRODUCTO
========================================================= */

if ($("newProductBtn")) {

    $("newProductBtn").onclick =
        () => openProduct();
}


if ($("newProductBtn2")) {

    $("newProductBtn2").onclick =
        () => openProduct();
}


/* =========================================================
   NUEVO PROVEEDOR
========================================================= */

if ($("newSupplierBtn")) {

    $("newSupplierBtn").onclick =
        () => {

            $("supplierForm")?.reset();

            if ($("supplierEditId")) {

                $("supplierEditId")
                    .value = "";
            }

            openModal(
                "supplierModal"
            );
        };
}


/* =========================================================
   NUEVA NOTA
========================================================= */

if ($("newNoteBtn")) {

    $("newNoteBtn").onclick =
        () => {

            $("noteForm")?.reset();

            if ($("nDate")) {

                $("nDate").value =
                    currentDate;
            }

            if ($("noteEditId")) {

                $("noteEditId")
                    .value = "";
            }

            openModal(
                "noteModal"
            );
        };
}


/* =========================================================
   COLOCAR VALOR
========================================================= */

function setValue(id, value) {

    const element = $(id);

    if (!element) {
        return;
    }

    element.value =
        value ?? "";
}


/* =========================================================
   ABRIR PRODUCTO
========================================================= */

function openProduct(id = null) {

    const form =
        $("productForm");

    if (!form) {
        return;
    }


    form.reset();

    setValue(
        "editId",
        ""
    );

    setValue(
        "fDate",
        currentDate
    );


    if (id) {

        const product =
            products.find(
                item =>
                    item.id === id
            );


        if (!product) {

            toast(
                "No se encontró el producto."
            );

            return;
        }


        normalizeProduct(product);


        setValue(
            "fSupplier",
            product.supplier
        );

        setValue(
            "fName",
            product.name
        );

        setValue(
            "fBrand",
            product.brand
        );

        setValue(
            "fPrice",
            product.price
        );

        setValue(
            "fUnit",
            product.unit
        );

        setValue(
            "fPurchaseQty",
            product.purchaseQty
        );

        setValue(
            "fContent",
            product.content
        );

        setValue(
            "fInventoryUnit",
            product.inventoryUnit
        );

        setValue(
            "fInnerContent",
            product.innerContent
        );

        setValue(
            "fContentUnit",
            product.contentUnit
        );

        setValue(
            "fComplete",
            product.complete
        );

        setValue(
            "fLoose",
            product.loose
        );

        setValue(
            "fMin",
            product.min
        );

        setValue(
            "fMinUnit",
            product.minUnit
        );

        setValue(
            "fMax",
            product.max
        );

        setValue(
            "fMaxUnit",
            product.maxUnit
        );

        setValue(
            "fDate",
            product.date
        );

        setValue(
            "fRef",
            product.ref
        );

        setValue(
            "fInfo",
            product.info
        );

        setValue(
            "editId",
            product.id
        );


        if ($("productModalTitle")) {

            $("productModalTitle")
                .textContent =
                "Editar producto";
        }

    } else {

        if ($("productModalTitle")) {

            $("productModalTitle")
                .textContent =
                "Nuevo producto";
        }
    }


    updateCalc();

    openModal(
        "productModal"
    );
}


/* =========================================================
   ACTUALIZAR CÁLCULO
========================================================= */

[
    "fPrice",
    "fPurchaseQty",
    "fComplete",
    "fLoose",
    "fContent",
    "fInnerContent",
    "fMin",
    "fMax",
    "fUnit",
    "fInventoryUnit",
    "fContentUnit",
    "fMinUnit",
    "fMaxUnit"
].forEach(id => {

    const element = $(id);

    if (!element) {
        return;
    }

    element.addEventListener(
        "input",
        updateCalc
    );

    element.addEventListener(
        "change",
        updateCalc
    );
});


function updateCalc() {

    if (!$("calcText")) {
        return;
    }


    const price =
        Number(
            $("fPrice")?.value || 0
        );

    const purchaseQty =
        Number(
            $("fPurchaseQty")?.value || 0
        );

    const subPackages =
        Number(
            $("fContent")?.value || 0
        );

    const inner =
        Number(
            $("fInnerContent")?.value || 1
        );

    const complete =
        Number(
            $("fComplete")?.value || 0
        );

    const loose =
        Number(
            $("fLoose")?.value || 0
        );


    const stockFinal =
        (complete * inner) +
        loose;


    const finalPerPurchase =
        subPackages * inner;


    let inventoryValue = 0;


    if (
        finalPerPurchase > 0
    ) {

        inventoryValue =
            price *
            (
                stockFinal /
                finalPerPurchase
            );
    }


    const purchaseUnit =
        $("fUnit")?.value ||
        "unidad de compra";

    const inventoryUnit =
        $("fInventoryUnit")?.value ||
        "subpaquete";

    const contentUnit =
        $("fContentUnit")?.value ||
        "unidad";


    $("calcText").textContent =

        `1 ${purchaseUnit} = ` +

        `${subPackages || 0} ${inventoryUnit} × ` +

        `${inner || 0} ${contentUnit}. ` +

        `Existencia: ${complete || 0} ${inventoryUnit} + ` +

        `${loose || 0} ${contentUnit}. ` +

        `Valor actual: ${money(inventoryValue)}` +

        (
            purchaseQty > 0
                ? ` | Compra: ${purchaseQty} ${purchaseUnit} = ${money(price * purchaseQty)}`
                : ""
        );
}


/* =========================================================
   GUARDAR PRODUCTO
========================================================= */

if ($("productForm")) {

    $("productForm").onsubmit =
        event => {

            event.preventDefault();


            const data = {

                id:
                    $("editId")?.value ||
                    null,

                supplier:
                    $("fSupplier")?.value.trim() ||
                    "",

                name:
                    $("fName")?.value.trim() ||
                    "",

                brand:
                    $("fBrand")?.value.trim() ||
                    "",

                price:
                    Number(
                        $("fPrice")?.value || 0
                    ),

                unit:
                    $("fUnit")?.value ||
                    "",

                purchaseQty:
                    Number(
                        $("fPurchaseQty")?.value || 0
                    ),

                content:
                    Number(
                        $("fContent")?.value || 0
                    ),

                inventoryUnit:
                    $("fInventoryUnit")?.value ||
                    "",

                innerContent:
                    Number(
                        $("fInnerContent")?.value || 1
                    ),

                contentUnit:
                    $("fContentUnit")?.value ||
                    "",

                complete:
                    Number(
                        $("fComplete")?.value || 0
                    ),

                loose:
                    Number(
                        $("fLoose")?.value || 0
                    ),

                min:
                    Number(
                        $("fMin")?.value || 0
                    ),

                minUnit:
                    $("fMinUnit")?.value ||
                    "",

                max:
                    Number(
                        $("fMax")?.value || 0
                    ),

                maxUnit:
                    $("fMaxUnit")?.value ||
                    "",

                date:
                    $("fDate")?.value ||
                    currentDate,

                ref:
                    $("fRef")?.value.trim() ||
                    "",

                info:
                    $("fInfo")?.value.trim() ||
                    ""
            };


            if (
                data.max > 0 &&
                data.min > 0
            ) {

                const maxFinal =
                    thresholdToFinal(
                        data,
                        data.max,
                        data.maxUnit
                    );

                const minFinal =
                    thresholdToFinal(
                        data,
                        data.min,
                        data.minUnit
                    );


                if (
                    maxFinal !== null &&
                    minFinal !== null &&
                    maxFinal < minFinal
                ) {

                    alert(
                        "El máximo no puede ser menor que el mínimo."
                    );

                    return;
                }
            }


            const isNewProduct = !data.id;
            upsertProduct(data);
            

            closeModal(
                "productModal"
            );

            renderAll();

            checkAlerts();

            toast(
                "Producto guardado en la fecha " +
                fmtDate(data.date)
            );
        };
}


/* =========================================================
   PROVEEDOR
========================================================= */

function supplierKey(name) {

    return String(
        name || "SIN PROVEEDOR"
    )
        .trim()
        .replace(/\s+/g, " ")
        .toUpperCase() ||
        "SIN PROVEEDOR";
}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    const list =
        inventoryForDate(
            currentDate
        );


    const search =
        (
            $("searchInput")?.value ||
            ""
        ).toLowerCase();


    const filter =
        $("productStatusFilter")?.value ||
        "all";


    const filtered =
        list.filter(product => {

            const text = (

                product.name + " " +
                product.brand + " " +
                product.supplier + " " +
                product.inventoryUnit + " " +
                product.contentUnit

            ).toLowerCase();


            return (
                text.includes(search) &&
                (
                    filter === "all" ||
                    status(product) === filter
                )
            );
        });


    if ($("statProducts")) {

        $("statProducts").textContent =
            list.length;
    }


    if ($("statNormal")) {

        $("statNormal").textContent =
            list.filter(
                product =>
                    status(product) ===
                    "normal"
            ).length;
    }


    if ($("statLow")) {

        $("statLow").textContent =
            list.filter(
                product =>
                    status(product) ===
                    "low"
            ).length;
    }


    if ($("statOut")) {

        $("statOut").textContent =
            list.filter(
                product =>
                    status(product) ===
                    "out"
            ).length;
    }


    if ($("totalMoney")) {

        $("totalMoney").textContent =
            money(
                list.reduce(
                    (total, product) =>
                        total +
                        totalValue(product),
                    0
                )
            );
    }


    if ($("moneyDate")) {

        $("moneyDate").textContent =
            "Inventario: " +
            fmtDate(currentDate);
    }


    const groups = {};


    filtered.forEach(product => {

        const supplier =
            supplierKey(
                product.supplier
            );

        if (!groups[supplier]) {

            groups[supplier] = [];
        }

        groups[supplier].push(
            product
        );
    });


    const names =
        Object.keys(groups)
            .sort(
                (a, b) =>
                    a.localeCompare(
                        b,
                        "es"
                    )
            );


    if (!$("inventoryGroups")) {
        return;
    }


    if (!names.length) {

        $("inventoryGroups")
            .innerHTML =

            `<div class="empty supplier-empty">
                No hay productos para
                ${fmtDate(currentDate)}.
            </div>`;

        return;
    }


    $("inventoryGroups")
        .innerHTML =
        names.map(name => {

            return supplierGroup(
                name,
                groups[name]
            );

        }).join("");


    bindActions();
}


/* =========================================================
   TABLA POR PROVEEDOR
========================================================= */

function supplierGroup(
    name,
    items
) {

    const total =
        items.reduce(
            (sum, product) =>
                sum +
                totalValue(product),
            0
        );


    return `

        <section class="supplier-group">

            <div class="supplier-group-head">

                <div>

                    <span class="supplier-label">
                        PROVEEDOR
                    </span>

                    <h3>
                        ${esc(name)}
                    </h3>

                </div>

                <div class="supplier-summary">

                    <b>${items.length}</b>

                    producto${items.length === 1 ? "" : "s"}

                    ·

                    <b>${money(total)}</b>

                </div>

            </div>


            <div class="table-wrap">

                <table>

                    <thead>

                        <tr>

                            <th>PRODUCTO</th>

                            <th>MARCA / INFORMACIÓN</th>

                            <th>PRECIO COMPRA</th>

                            <th>UNIDAD COMPRA</th>

                            <th>COMPLETAS</th>

                            <th>SUELTAS</th>

                            <th>CONTENIDO / UNIDAD</th>

                            <th>MÍN.</th>

                            <th>MÁX.</th>

                            <th>VALOR</th>

                            <th>ESTADO</th>

                            <th>FECHA</th>

                            <th>ACCIONES</th>

                        </tr>

                    </thead>


                    <tbody>

                        ${items
                            .map(product =>
                                productRow(
                                    product
                                )
                            )
                            .join("")}

                    </tbody>

                </table>

            </div>

        </section>
    `;
}


/* =========================================================
   FILA DE PRODUCTO
========================================================= */

function productRow(product) {

    const currentStatus =
        status(product);


    return `

        <tr>

            <td>
                <b>
                    ${esc(product.name)}
                </b>
            </td>

            <td>
                ${esc(product.brand)}
            </td>

            <td>
                ${money(product.price)}
            </td>

            <td>
                ${esc(product.unit)}
            </td>

            <td>
                ${product.complete}
                ${esc(
                    product.inventoryUnit ||
                    product.unit
                )}
            </td>

            <td>
                ${product.loose}
                ${esc(product.contentUnit)}
            </td>

            <td>

                ${product.content}
                ${esc(product.inventoryUnit)}

                / compra

                ·

                ${product.innerContent}
                ${esc(product.contentUnit)}

            </td>

            <td>

                ${product.min}
                ${esc(
                    product.minUnit ||
                    product.contentUnit
                )}

            </td>

            <td>

                ${product.max}
                ${esc(
                    product.maxUnit ||
                    product.contentUnit
                )}

            </td>

            <td>

                <b>
                    ${money(
                        totalValue(product)
                    )}
                </b>

            </td>

            <td>

                <span
                    class="status ${currentStatus}"
                >

                    ${statusText(product)}

                </span>

            </td>

            <td>
                ${fmtDate(product.date)}
            </td>

            <td>

                <div class="actions">

                    <button
                        type="button"
                        class="mini"
                        data-edit="${product.id}"
                    >
                        ✏️
                    </button>

                    <button
                        type="button"
                        class="mini del"
                        data-del="${product.id}"
                    >
                        🗑️
                    </button>

                </div>

            </td>

        </tr>
    `;
}


/* =========================================================
   PÁGINA PRODUCTOS
========================================================= */

function renderProducts() {

    if (!$("productsBody")) {
        return;
    }


    const search =
        (
            $("productSearch")?.value ||
            ""
        ).toLowerCase();


    const filter =
        $("productStatusFilter2")?.value ||
        "all";


    const list =
        inventoryForDate(
            currentDate
        ).filter(product => {

            const text = (

                product.name + " " +
                product.brand + " " +
                product.supplier + " " +
                product.inventoryUnit + " " +
                product.contentUnit

            ).toLowerCase();


            return (
                text.includes(search) &&
                (
                    filter === "all" ||
                    status(product) === filter
                )
            );
        });


    if (!list.length) {

        $("productsBody")
            .innerHTML = `

                <tr>

                    <td
                        colspan="8"
                        class="empty"
                    >

                        No hay productos que coincidan
                        con el filtro para
                        ${fmtDate(currentDate)}.

                    </td>

                </tr>
            `;

        return;
    }


    $("productsBody")
        .innerHTML =
        list.map(product => `

            <tr>

                <td>
                    <b>
                        ${esc(product.name)}
                    </b>
                </td>

                <td>
                    ${esc(product.supplier)}
                </td>

                <td>
                    ${esc(product.brand)}
                </td>

                <td>
                    ${esc(
                        product.inventoryUnit ||
                        product.unit
                    )}
                </td>

                <td>

                    ${product.complete}

                    +

                    ${product.loose}

                    ${esc(product.contentUnit)}

                </td>

                <td>
                    ${money(
                        totalValue(product)
                    )}
                </td>

                <td>
                    ${fmtDate(product.date)}
                </td>

                <td>

                    <button
                        type="button"
                        class="mini"
                        data-edit="${product.id}"
                    >
                        ✏️
                    </button>

                    <button
                        type="button"
                        class="mini del"
                        data-del="${product.id}"
                    >
                        🗑️
                    </button>

                </td>

            </tr>

        `).join("");


    bindActions();
}


/* =========================================================
   EDITAR / ELIMINAR PRODUCTOS
========================================================= */

function bindActions() {

    document
        .querySelectorAll(
            "[data-edit]"
        )
        .forEach(button => {

            button.onclick = () => {

                openProduct(
                    button.dataset.edit
                );
            };
        });


    document
        .querySelectorAll(
            "[data-del]"
        )
        .forEach(button => {

            button.onclick = () => {

                const id =
                    button.dataset.del;


                const product =
                    products.find(
                        item =>
                            item.id === id
                    );


                if (!product) {
                    return;
                }


                const confirmation =
                    confirm(
                        "¿Eliminar este producto de esta fecha?\n\n" +
                        product.name +
                        "\n\nLas demás fechas no se eliminarán."
                    );


                if (!confirmation) {
                    return;
                }


                products =
                    products.filter(
                        item =>
                            item.id !== id
                    );


                save();

                makeSnapshot(
                    currentDate
                );

                renderAll();

                toast(
                    "Producto eliminado."
                );
            };
        });
}


/* =========================================================
   PROVEEDORES
========================================================= */

function renderSuppliers() {

    if (!$("suppliersBody")) {
        return;
    }


    if (!suppliers.length) {

        $("suppliersBody")
            .innerHTML = `

                <tr>

                    <td
                        colspan="5"
                        class="empty"
                    >
                        No hay proveedores.
                    </td>

                </tr>
            `;

        return;
    }


    $("suppliersBody")
        .innerHTML =
        suppliers.map(supplier => `

            <tr>

                <td>
                    <b>
                        ${esc(supplier.name)}
                    </b>
                </td>

                <td>
                    ${esc(supplier.phone)}
                </td>

                <td>
                    ${esc(supplier.email)}
                </td>

                <td>
                    ${esc(supplier.notes)}
                </td>

                <td>

                    <button
                        type="button"
                        class="mini"
                        data-sedit="${supplier.id}"
                    >
                        ✏️
                    </button>

                    <button
                        type="button"
                        class="mini del"
                        data-sdel="${supplier.id}"
                    >
                        🗑️
                    </button>

                </td>

            </tr>

        `).join("");


    document
        .querySelectorAll(
            "[data-sedit]"
        )
        .forEach(button => {

            button.onclick = () => {

                const supplier =
                    suppliers.find(
                        item =>
                            item.id ===
                            button.dataset.sedit
                    );


                if (!supplier) {
                    return;
                }


                setValue(
                    "supplierEditId",
                    supplier.id
                );

                setValue(
                    "sName",
                    supplier.name
                );

                setValue(
                    "sPhone",
                    supplier.phone
                );

                setValue(
                    "sEmail",
                    supplier.email
                );

                setValue(
                    "sNotes",
                    supplier.notes
                );


                openModal(
                    "supplierModal"
                );
            };
        });


    document
        .querySelectorAll(
            "[data-sdel]"
        )
        .forEach(button => {

            button.onclick = () => {

                if (
                    !confirm(
                        "¿Eliminar este proveedor?"
                    )
                ) {
                    return;
                }


                suppliers =
                    suppliers.filter(
                        supplier =>
                            supplier.id !==
                            button.dataset.sdel
                    );


                save();

                renderSuppliers();

                toast(
                    "Proveedor eliminado."
                );
            };
        });
}


/* =========================================================
   GUARDAR PROVEEDOR
========================================================= */

if ($("supplierForm")) {

    $("supplierForm").onsubmit =
        event => {

            event.preventDefault();


            const id =
                $("supplierEditId")
                    ?.value || "";


            const supplier = {

                id:
                    id ||
                    createId(),

                name:
                    normalizeSupplierName(
                        $("sName")?.value
                    ),

                phone:
                    $("sPhone")?.value ||
                    "",

                email:
                    $("sEmail")?.value ||
                    "",

                notes:
                    $("sNotes")?.value ||
                    ""
            };


            if (id) {

                const existing =
                    suppliers.find(
                        item =>
                            item.id === id
                    );

                if (existing) {

                    Object.assign(
                        existing,
                        supplier
                    );
                }

            } else {

                suppliers.push(
                    supplier
                );
            }


            save();

            closeModal(
                "supplierModal"
            );

            renderSuppliers();

            toast(
                "Proveedor guardado."
            );
        };
}


/* =========================================================
   NOTAS
========================================================= */

function renderNotes() {

    if (!$("notesGrid")) {
        return;
    }


    const ordered =
        [...notes].sort(
            (a, b) =>
                String(b.date || "")
                    .localeCompare(
                        String(a.date || "")
                    )
        );


    if (!ordered.length) {

        $("notesGrid")
            .innerHTML = `

                <div class="empty">
                    No hay notas.
                </div>
            `;

        return;
    }


    $("notesGrid")
        .innerHTML =
        ordered.map(note => `

            <article class="note-card">

                <span class="tag">
                    ${esc(note.category)}
                </span>

                <h3>
                    ${esc(note.title)}
                </h3>

                <div class="note-meta">
                    ${fmtDate(note.date)}
                </div>

                <div class="note-text">
                    ${esc(note.text)}
                </div>

                <div
                    class="actions"
                    style="margin-top:14px"
                >

                    <button
                        type="button"
                        class="mini"
                        data-nedit="${note.id}"
                    >
                        ✏️ Editar
                    </button>

                    <button
                        type="button"
                        class="mini del"
                        data-ndel="${note.id}"
                    >
                        🗑️ Eliminar
                    </button>

                </div>

            </article>

        `).join("");


    document
        .querySelectorAll(
            "[data-nedit]"
        )
        .forEach(button => {

            button.onclick = () => {

                const note =
                    notes.find(
                        item =>
                            item.id ===
                            button.dataset.nedit
                    );


                if (!note) {
                    return;
                }


                setValue(
                    "noteEditId",
                    note.id
                );

                setValue(
                    "nTitle",
                    note.title
                );

                setValue(
                    "nCategory",
                    note.category
                );

                setValue(
                    "nDate",
                    note.date
                );

                setValue(
                    "nText",
                    note.text
                );


                openModal(
                    "noteModal"
                );
            };
        });


    document
        .querySelectorAll(
            "[data-ndel]"
        )
        .forEach(button => {

            button.onclick = () => {

                if (
                    !confirm(
                        "¿Eliminar esta nota?"
                    )
                ) {
                    return;
                }


                notes =
                    notes.filter(
                        note =>
                            note.id !==
                            button.dataset.ndel
                    );


                save();

                renderNotes();

                toast(
                    "Nota eliminada."
                );
            };
        });
}


/* =========================================================
   GUARDAR NOTA
========================================================= */

if ($("noteForm")) {

    $("noteForm").onsubmit =
        event => {

            event.preventDefault();


            const id =
                $("noteEditId")
                    ?.value || "";


            const note = {

                id:
                    id ||
                    createId(),

                title:
                    $("nTitle")?.value ||
                    "",

                category:
                    $("nCategory")?.value ||
                    "",

                date:
                    $("nDate")?.value ||
                    currentDate,

                text:
                    $("nText")?.value ||
                    ""
            };


            if (id) {

                const existing =
                    notes.find(
                        item =>
                            item.id === id
                    );

                if (existing) {

                    Object.assign(
                        existing,
                        note
                    );
                }

            } else {

                notes.push(note);
            }


            save();

            closeModal(
                "noteModal"
            );

            renderNotes();

            toast(
                "Nota guardada."
            );
        };
}


/* =========================================================
   RENDERIZAR TODO
========================================================= */

function renderAll() {

    renderDashboard();

    renderProducts();

    renderSuppliers();

    renderInvoices();

    renderNotes();


    if ($("fDate")) {

        $("fDate").value =
            currentDate;
    }
}


/* =========================================================
   ALERTAS
========================================================= */

function checkAlerts() {

    const alertProducts =
        inventoryForDate(
            currentDate
        ).filter(
            product =>
                status(product) !==
                "normal"
        );


    if ($("alertCount")) {

        $("alertCount").textContent =
            alertProducts.length;
    }


    if (
        !(
            "Notification" in window
        )
    ) {
        return;
    }


    if (
        Notification.permission !==
        "granted"
    ) {
        return;
    }


    alertProducts.forEach(
        product => {

            const key =
                "bh-alert-" +
                currentDate +
                "-" +
                product.id +
                "-" +
                status(product);


            if (
                sessionStorage.getItem(
                    key
                )
            ) {
                return;
            }


            new Notification(

                status(product) === "out"

                    ? "Bon House: producto agotado"

                    : "Bon House: stock bajo",

                {

                    body:
                        `${product.name}: ` +
                        `${product.complete} ${product.inventoryUnit} + ` +
                        `${product.loose} ${product.contentUnit}.`
                }
            );


            sessionStorage.setItem(
                key,
                "1"
            );
        }
    );
}


/* =========================================================
   ACTIVAR NOTIFICACIONES
========================================================= */

if ($("notifyBtn")) {

    $("notifyBtn").onclick =
        async () => {

            if (
                !(
                    "Notification" in window
                )
            ) {

                toast(
                    "Tu navegador no admite notificaciones."
                );

                return;
            }


            const result =
                await Notification
                    .requestPermission();


            toast(

                result === "granted"

                    ? "Notificaciones activadas."

                    : "No se activaron las notificaciones."
            );


            checkAlerts();
        };
}


/* =========================================================
   CAMPANA
========================================================= */

if ($("bellBtn")) {

    $("bellBtn").onclick =
        () => {

            const alerts =
                inventoryForDate(
                    currentDate
                ).filter(
                    product =>
                        status(product) !==
                        "normal"
                );


            if (!alerts.length) {

                alert(
                    "No hay alertas para esta fecha."
                );

                return;
            }


            alert(

                alerts.map(product => {

                    return (

                        `${status(product) === "out"
                            ? "AGOTADO"
                            : "STOCK BAJO"
                        }: ` +

                        `${product.name} — ` +

                        `${product.complete} ` +
                        `${product.inventoryUnit} + ` +

                        `${product.loose} ` +
                        `${product.contentUnit}`
                    );

                }).join("\n")
            );
        };
}


/* =========================================================
   AGRUPAR PARA EXPORTACIÓN
========================================================= */

function groupedExportData() {

    const list =
        inventoryForDate(
            currentDate
        );

    const groups = {};


    list.forEach(product => {

        const key =
            supplierKey(
                product.supplier
            );


        if (!groups[key]) {

            groups[key] = [];
        }


        groups[key].push(
            product
        );
    });


    return {

        list,

        groups,

        names:
            Object.keys(groups)
                .sort(
                    (a, b) =>
                        a.localeCompare(
                            b,
                            "es"
                        )
                )
    };
}


/* =========================================================
   PDF COMPLETO
========================================================= */

function printPDF() {

    const {
        list,
        groups,
        names
    } = groupedExportData();


    const total =
        list.reduce(
            (sum, product) =>
                sum +
                totalValue(product),
            0
        );


    const sections =
        names.map(name => {

            const items =
                groups[name];


            const supplierTotal =
                items.reduce(
                    (sum, product) =>
                        sum +
                        totalValue(product),
                    0
                );


            const rows =
                items.map(
                    (product, index) => {

                        return `

                            <tr>

                                <td>
                                    ${index + 1}
                                </td>

                                <td>

                                    <b>
                                        ${esc(product.name)}
                                    </b>

                                    <br>

                                    <small>
                                        ${esc(product.brand)}
                                    </small>

                                </td>

                                <td>
                                    ${esc(product.inventoryUnit)}
                                </td>

                                <td>
                                    ${product.complete}
                                </td>

                                <td>
                                    ${product.loose}
                                    ${esc(product.contentUnit)}
                                </td>

                                <td>
                                    ${product.min}
                                    ${esc(product.minUnit)}
                                </td>

                                <td>
                                    ${product.max}
                                    ${esc(product.maxUnit)}
                                </td>

                                <td>
                                    ${money(totalValue(product))}
                                </td>

                                <td>
                                    ${statusText(product)}
                                </td>

                            </tr>
                        `;

                    }
                ).join("");


            return `

                <section class="supplier">

                    <div class="supplier-head">

                        <h2>
                            PROVEEDOR:
                            ${esc(name)}
                        </h2>

                        <div>

                            ${items.length}
                            producto${items.length === 1 ? "" : "s"}

                            ·

                            ${money(supplierTotal)}

                        </div>

                    </div>


                    <table>

                        <thead>

                            <tr>

                                <th>#</th>

                                <th>
                                    Producto / información
                                </th>

                                <th>
                                    Unidad inventario
                                </th>

                                <th>
                                    Completas
                                </th>

                                <th>
                                    Sueltas
                                </th>

                                <th>
                                    Mínimo
                                </th>

                                <th>
                                    Máximo
                                </th>

                                <th>
                                    Valor
                                </th>

                                <th>
                                    Estado
                                </th>

                            </tr>

                        </thead>

                        <tbody>
                            ${rows}
                        </tbody>

                    </table>

                </section>
            `;

        }).join("");


    const printWindow =
        window.open(
            "",
            "_blank"
        );


    if (!printWindow) {

        alert(
            "Permite ventanas emergentes para generar el PDF."
        );

        return;
    }


    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8">

            <title>
                Bon House - Inventario
            </title>

            <style>

                @page {
                    size: A4 landscape;
                    margin: 12mm;
                }

                body {
                    font-family: Arial, sans-serif;
                    color: #263238;
                    margin: 0;
                }

                h1 {
                    color: #17324d;
                    margin: 0;
                }

                .header {
                    border-bottom: 4px solid #2f6f73;
                    padding-bottom: 12px;
                    margin-bottom: 15px;
                }

                .date {
                    color: #667781;
                    margin-top: 5px;
                }

                .summary {
                    background: #edf7f6;
                    border: 1px solid #c9e5e2;
                    border-radius: 8px;
                    padding: 10px;
                    margin-bottom: 18px;
                }

                .supplier {
                    margin-bottom: 25px;
                }

                .supplier + .supplier {
                    break-before: page;
                }

                .supplier-head {
                    background: #e8f3f2;
                    border-left: 5px solid #2f6f73;
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .supplier-head h2 {
                    color: #17324d;
                    font-size: 16px;
                    margin: 0;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 9px;
                }

                th {
                    background: #2f6f73;
                    color: white;
                    padding: 7px;
                    text-align: left;
                }

                td {
                    padding: 7px;
                    border-bottom: 1px solid #dfe7e8;
                }

                tr:nth-child(even) {
                    background: #f7faf9;
                }

            </style>

        </head>

        <body>

            <div class="header">

                <h1>
                    Bon House — Inventario por proveedor
                </h1>

                <div class="date">
                    Fecha:
                    ${fmtDate(currentDate)}
                </div>

            </div>


            <div class="summary">

                Productos:
                <b>${list.length}</b>

                &nbsp; | &nbsp;

                Proveedores:
                <b>${names.length}</b>

                &nbsp; | &nbsp;

                Valor total:
                <b>${money(total)}</b>

            </div>


            ${sections || "<p>No hay productos.</p>"}


            <script>

                window.onload = () => {

                    setTimeout(
                        () => window.print(),
                        300
                    );

                };

            <\/script>

        </body>

        </html>
    `);


    printWindow.document.close();
}


/* =========================================================
   PDF SOLO AGOTADOS
========================================================= */

function printOutOfStockPDF() {

    const all =
        inventoryForDate(
            currentDate
        );


    const list =
        all.filter(
            product =>
                status(product) ===
                "out"
        );


    const groups = {};


    list.forEach(product => {

        const key =
            supplierKey(
                product.supplier
            );


        if (!groups[key]) {

            groups[key] = [];
        }


        groups[key].push(
            product
        );
    });


    const names =
        Object.keys(groups)
            .sort(
                (a, b) =>
                    a.localeCompare(
                        b,
                        "es"
                    )
            );


    const sections =
        names.map(name => {

            const items =
                groups[name];


            const rows =
                items.map(
                    (product, index) => `

                        <tr>

                            <td>
                                ${index + 1}
                            </td>

                            <td>

                                <b>
                                    ${esc(product.name)}
                                </b>

                                <br>

                                <small>
                                    ${esc(product.brand)}
                                </small>

                            </td>

                            <td>
                                ${esc(
                                    product.inventoryUnit ||
                                    product.unit
                                )}
                            </td>

                            <td>
                                ${product.min}
                                ${esc(product.minUnit)}
                            </td>

                            <td>
                                ${product.max}
                                ${esc(product.maxUnit)}
                            </td>

                            <td>
                                AGOTADO
                            </td>

                        </tr>

                    `
                ).join("");


            return `

                <section class="supplier">

                    <div class="supplier-head">

                        <h2>
                            PROVEEDOR:
                            ${esc(name)}
                        </h2>

                        <div>
                            ${items.length}
                            agotado${items.length === 1 ? "" : "s"}
                        </div>

                    </div>


                    <table>

                        <thead>

                            <tr>

                                <th>#</th>

                                <th>
                                    Producto / información
                                </th>

                                <th>
                                    Unidad inventario
                                </th>

                                <th>
                                    Mínimo
                                </th>

                                <th>
                                    Máximo
                                </th>

                                <th>
                                    Estado
                                </th>

                            </tr>

                        </thead>

                        <tbody>
                            ${rows}
                        </tbody>

                    </table>

                </section>
            `;

        }).join("");


    const printWindow =
        window.open(
            "",
            "_blank"
        );


    if (!printWindow) {

        alert(
            "Permite ventanas emergentes para generar el PDF."
        );

        return;
    }


    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8">

            <title>
                Bon House - Productos agotados
            </title>

            <style>

                @page {
                    size: A4 landscape;
                    margin: 12mm;
                }

                body {
                    font-family: Arial, sans-serif;
                    color: #263238;
                    margin: 0;
                }

                h1 {
                    color: #17324d;
                }

                .header {
                    border-bottom: 4px solid #2f6f73;
                    margin-bottom: 15px;
                }

                .summary {
                    background: #edf7f6;
                    padding: 12px;
                    margin-bottom: 20px;
                    border-radius: 8px;
                }

                .supplier {
                    margin-bottom: 25px;
                }

                .supplier + .supplier {
                    break-before: page;
                }

                .supplier-head {
                    background: #e8f3f2;
                    border-left: 5px solid #2f6f73;
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                }

                .supplier-head h2 {
                    margin: 0;
                    font-size: 16px;
                    color: #17324d;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 10px;
                }

                th {
                    background: #2f6f73;
                    color: white;
                    padding: 8px;
                    text-align: left;
                }

                td {
                    padding: 7px;
                    border-bottom: 1px solid #dfe7e8;
                }

            </style>

        </head>

        <body>

            <div class="header">

                <h1>
                    Bon House — Productos agotados
                </h1>

                <p>
                    Fecha:
                    ${fmtDate(currentDate)}
                </p>

            </div>


            <div class="summary">

                Productos agotados:

                <b>
                    ${list.length}
                </b>

                &nbsp; | &nbsp;

                Proveedores afectados:

                <b>
                    ${names.length}
                </b>

            </div>


            ${
                sections ||
                "<p>No hay productos agotados para esta fecha.</p>"
            }


            <script>

                window.onload = () => {

                    setTimeout(
                        () => window.print(),
                        300
                    );

                };

            <\/script>

        </body>

        </html>
    `);


    printWindow.document.close();
}


/* =========================================================
   EXPORTAR EXCEL
========================================================= */

function exportExcel() {

    const {
        list,
        groups,
        names
    } = groupedExportData();


    const total =
        list.reduce(
            (sum, product) =>
                sum +
                totalValue(product),
            0
        );


    const sections =
        names.map(name => {

            const items =
                groups[name];


            const supplierTotal =
                items.reduce(
                    (sum, product) =>
                        sum +
                        totalValue(product),
                    0
                );


            const rows =
                items.map(
                    (product, index) => `

                        <tr>

                            <td>${index + 1}</td>

                            <td>${esc(product.name)}</td>

                            <td>${esc(product.brand)}</td>

                            <td>${esc(product.unit)}</td>

                            <td>${product.purchaseQty}</td>

                            <td>${money(product.price)}</td>

                            <td>${esc(product.inventoryUnit)}</td>

                            <td>${product.complete}</td>

                            <td>${product.loose}</td>

                            <td>
                                ${product.content}
                                ${esc(product.inventoryUnit)}
                            </td>

                            <td>
                                ${product.innerContent}
                                ${esc(product.contentUnit)}
                            </td>

                            <td>
                                ${product.min}
                                ${esc(product.minUnit)}
                            </td>

                            <td>
                                ${product.max}
                                ${esc(product.maxUnit)}
                            </td>

                            <td>
                                ${money(totalValue(product))}
                            </td>

                            <td>
                                ${statusText(product)}
                            </td>

                            <td>
                                ${fmtDate(product.date)}
                            </td>

                        </tr>

                    `
                ).join("");


            return `

                <tr class="supplier-title">

                    <td colspan="16">

                        PROVEEDOR:
                        ${esc(name)}

                        —

                        ${items.length}
                        producto${items.length === 1 ? "" : "s"}

                        —

                        Total:
                        ${money(supplierTotal)}

                    </td>

                </tr>


                <tr>

                    <th>#</th>

                    <th>Producto</th>

                    <th>Información</th>

                    <th>Unidad compra</th>

                    <th>Cantidad compra</th>

                    <th>Precio compra</th>

                    <th>Unidad inventario</th>

                    <th>Completas</th>

                    <th>Sueltas</th>

                    <th>SubPaquete</th>

                    <th>Unidades por SubPaquete</th>

                    <th>Mínimo</th>

                    <th>Máximo</th>

                    <th>Valor inventario</th>

                    <th>Estado</th>

                    <th>Fecha</th>

                </tr>


                ${rows}


                <tr class="space">

                    <td colspan="16"></td>

                </tr>
            `;

        }).join("");


    const html = `

        <html>

        <head>

            <meta charset="UTF-8">

            <style>

                body {
                    font-family: Calibri, Arial, sans-serif;
                    background: #ffffff;
                    color: #1f2937;
                }

                h1 {
                    color: #102a43;
                    font-size: 24px;
                    margin-bottom: 6px;
                }

                p {
                    color: #52606d;
                    font-size: 12px;
                    margin-bottom: 18px;
                }

                table {
                    border-collapse: collapse;
                    width: 100%;
                }

                th {
                    background: #17324d;
                    color: #ffffff;
                    padding: 10px 8px;
                    border: 1px solid #35546f;
                    font-weight: bold;
                    text-align: center;
                    vertical-align: middle;
                }

                td {
                    padding: 8px;
                    border: 1px solid #d9e2ec;
                    vertical-align: middle;
                }

                tr:nth-child(even):not(.supplier-title):not(.space) td {
                    background: #f7fafc;
                }

                .supplier-title td {
                    background: #dcefeb;
                    color: #123c3a;
                    font-size: 16px;
                    font-weight: bold;
                    border-top: 4px solid #2f6f73;
                    border-bottom: 2px solid #79b7ae;
                    padding: 12px 10px;
                }

                .space td {
                    height: 18px;
                    border: 0;
                    background: #ffffff;
                }

            </style>

        </head>

        <body>

            <h1>BON HOUSE — INVENTARIO POR PROVEEDOR</h1>

            <p>
                <b>Fecha:</b> ${fmtDate(currentDate)}
                &nbsp;&nbsp; | &nbsp;&nbsp;
                <b>Productos:</b> ${list.length}
                &nbsp;&nbsp; | &nbsp;&nbsp;
                <b>Proveedores:</b> ${names.length}
                &nbsp;&nbsp; | &nbsp;&nbsp;
                <b>Valor total:</b> ${money(total)}
            </p>


            <table>

                ${
                    sections ||
                    "<tr><td>No hay productos.</td></tr>"
                }

            </table>

        </body>

        </html>
    `;


    const blob =
        new Blob(
            [
                "\ufeff" +
                html
            ],
            {
                type:
                    "application/vnd.ms-excel;charset=utf-8"
            }
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        URL.createObjectURL(
            blob
        );


    link.download =
        `BonHouse_Inventario_por_Proveedor_${currentDate}.xls`;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    setTimeout(
        () => {

            URL.revokeObjectURL(
                link.href
            );

        },
        1000
    );


    toast(
        "Excel descargado separado por proveedor."
    );
}


/* =========================================================
   BOTONES DE EXPORTACIÓN
========================================================= */

function createExportButtons() {

    const pageHead =
        document.querySelector(
            "#dashboardPage .page-head"
        );


    if (!pageHead) {
        return;
    }


    if (
        document.getElementById(
            "exportButtons"
        )
    ) {
        return;
    }


    const container =
        document.createElement(
            "div"
        );


    container.id =
        "exportButtons";


    container.style.cssText =

        "display:flex;" +
        "gap:8px;" +
        "flex-wrap:wrap;" +
        "margin-bottom:15px;";


    container.innerHTML = `

        <button
            type="button"
            class="secondary"
            id="pdfBtn"
        >
            📄 PDF productos completos
        </button>


        <button
            type="button"
            class="secondary danger-export"
            id="outPdfBtn"
        >
            📕 PDF productos agotados
        </button>


        <button
            type="button"
            class="secondary"
            id="excelBtn"
        >
            📊 Excel por proveedor
        </button>


        <button
            type="button"
            class="secondary"
            id="cloudBtn"
        >
            ☁️ Nube / correo
        </button>
    `;


    pageHead.appendChild(
        container
    );


    $("pdfBtn").onclick =
        printPDF;


    $("outPdfBtn").onclick =
        printOutOfStockPDF;


    $("excelBtn").onclick =
        exportExcel;


    $("cloudBtn").onclick =
        () => {

            openModal(
                "cloudModal"
            );
        };
}


/* =========================================================
   CORREO
========================================================= */

function setupEmail() {

    if (!$("emailBtn")) {
        return;
    }


    $("emailBtn").onclick =
        () => {

            const email =
                $("emailTo")
                    ?.value
                    .trim();


            if (!email) {

                alert(
                    "Escribe el correo de destino."
                );

                return;
            }


            const subject =
                "Inventario Bon House - " +
                fmtDate(currentDate);


            const body =

                "Hola,\n\n" +

                "Adjunto el inventario de Bon House " +

                "con fecha " +

                fmtDate(currentDate) +

                ".\n\n" +

                "Recuerda adjuntar el PDF generado " +

                "por el sistema.";


            location.href =

                `mailto:${encodeURIComponent(email)}` +

                `?subject=${encodeURIComponent(subject)}` +

                `&body=${encodeURIComponent(body)}`;
        };
}


/* =========================================================
   INICIALIZAR SISTEMA
========================================================= */

let initialized = false;


function init() {

    if (initialized) {

        renderAll();

        return;
    }


    initialized = true;


    fillSelects();


    if ($("inventoryDate")) {

        $("inventoryDate").value =
            currentDate;
    }


    if ($("fDate")) {

        $("fDate").value =
            currentDate;
    }


    createExportButtons();

    setupEmail();

    renderAll();

    checkAlerts();


    setInterval(
        checkAlerts,
        60000
    );
}


/* =========================================================
   INICIAR SEGÚN SESIÓN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const logged =
            localStorage.getItem(
                "bh_session"
            ) === "1";


        if (logged) {

            if ($("loginScreen")) {

                $("loginScreen")
                    .classList
                    .add("hidden");
            }


            if ($("app")) {

                $("app")
                    .classList
                    .remove("hidden");
            }


            init();

        } else {

            if ($("loginScreen")) {

                $("loginScreen")
                    .classList
                    .remove("hidden");
            }


            if ($("app")) {

                $("app")
                    .classList
                    .add("hidden");
            }
        }
    }
);

/* =========================================================
   FACTURAS / COMPRAS - OCR INTEGRADO AL INVENTARIO
========================================================= */
const INVOICE_KEY = "bh_ocr_invoices";
let invoices = JSON.parse(localStorage.getItem(INVOICE_KEY) || "[]");
let invoiceImage = null;
let invoiceRaw = "";
const invEsc = s => String(s ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const invNorm = s => String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
function saveInvoices(){ localStorage.setItem(INVOICE_KEY, JSON.stringify(invoices)); }
function invoiceProductOptions(selected=""){
    const unique=new Map();
    products.forEach(p=>{ if(p && p.name && !unique.has(p.id)) unique.set(p.id,p); });
    return '<option value="">— Sin vincular —</option>'+[...unique.values()].sort((a,b)=>a.name.localeCompare(b.name)).map(p=>`<option value="${invEsc(p.id)}" ${String(p.id)===String(selected)?'selected':''}>${invEsc(p.name)} · ${invEsc(p.supplier||'Sin proveedor')}</option>`).join('');
}
function findInventoryMatch(name,supplier=""){
    const n=invNorm(name), s=invNorm(supplier); let best=null,score=0;
    products.forEach(p=>{let pn=invNorm(p.name), ps=invNorm(p.supplier); let x=0;if(n&&pn===n)x=100;else if(n&&pn&&(pn.includes(n)||n.includes(pn)))x=75;else if(n&&pn){let a=n.split(' '),b=new Set(pn.split(' '));x=a.filter(w=>w.length>2&&b.has(w)).length*15;}if(s&&ps===s)x+=15;if(x>score){score=x;best=p;}});
    return score>=30?best:null;
}
function refreshInvoiceSupplierList(){const dl=$("invoiceSupplierList");if(!dl)return;let names=new Set(suppliers.map(s=>s.name).filter(Boolean));products.forEach(p=>p.supplier&&names.add(p.supplier));invoices.forEach(f=>f.supplier&&names.add(f.supplier));dl.innerHTML=[...names].sort().map(n=>`<option value="${invEsc(n)}"></option>`).join('');}
function addInvoiceRow(p={}){
    const body=$("invoiceRows"); if(!body)return; const match=p.inventoryId?products.find(x=>String(x.id)===String(p.inventoryId)):findInventoryMatch(p.nombre,$("invoiceSupplier")?.value); const tr=document.createElement('tr');
    tr.innerHTML=`<td><input class="ir-name" value="${invEsc(p.nombre||'')}"></td><td><select class="ir-match">${invoiceProductOptions(match?.id||p.inventoryId||'')}</select></td><td><input class="ir-qty" type="number" step=".001" value="${p.cantidad??1}"></td><td><select class="ir-unit"><option value="">—</option>${ALL_UNITS.map(u=>`<option ${u===(p.unit||match?.unit)?'selected':''}>${invEsc(u)}</option>`).join('')}</select></td><td><input class="ir-price" type="number" step=".0001" value="${Number(p.precio||0)}"></td><td class="ir-old">—</td><td class="ir-diff">—</td><td class="ir-update-cell"><input class="ir-update" type="checkbox" title="Actualizar precio del inventario"></td><td><button class="danger ir-remove" type="button">×</button></td>`;
    body.appendChild(tr); const refresh=()=>{const prod=products.find(x=>String(x.id)===String(tr.querySelector('.ir-match').value));const old=Number(prod?.price||0),neu=Number(tr.querySelector('.ir-price').value||0);tr.querySelector('.ir-old').textContent=prod?money(old):'—';tr.querySelector('.ir-diff').textContent=prod?(neu-old>=0?'+':'')+money(neu-old):'—';if(prod&&!tr.querySelector('.ir-unit').value)tr.querySelector('.ir-unit').value=prod.unit||'';};
    tr.querySelector('.ir-match').onchange=refresh;tr.querySelector('.ir-price').oninput=refresh;tr.querySelector('.ir-remove').onclick=()=>tr.remove();refresh();
}
function guessInvoiceProducts(lines){let out=[];for(let l of lines){if(/TOTAL|SUBTOTAL|IVA|CAMBIO|EFECTIVO|TARJETA|NIT|NRC|FECHA/i.test(l))continue;let m=l.match(/^(.{3,60}?)\s+(\d+(?:[.,]\d{1,3})?)?\s*\$?\s*(\d+[.,]\d{2})\s*$/);if(m){let name=m[1].replace(/^\d+\s*[xX]\s*/,"").trim();if(name&&!/^\d+$/.test(name)){let qty=Number((m[2]||'1').replace(',','.'))||1,sub=Number(m[3].replace(',','.'));out.push({nombre:name,cantidad:qty,precio:sub/qty,subtotal:sub});}}}return out.slice(0,80);}
function parseInvoiceText(text){let l=text.split(/\n+/).map(x=>x.trim()).filter(Boolean);$("invoiceSupplier").value=(l.find(x=>/[A-Za-zÁÉÍÓÚÑáéíóúñ]{4}/.test(x))||'').slice(0,80);let dm=text.match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);if(dm){let y=dm[3].length===2?'20'+dm[3]:dm[3];$("invoiceDate").value=`${y}-${dm[2].padStart(2,'0')}-${dm[1].padStart(2,'0')}`;}else $("invoiceDate").value=currentDate;let tm=[...text.matchAll(/(?:TOTAL|TOTAL A PAGAR)[^\d]{0,12}\$?\s*(\d+[.,]\d{2})/gi)].pop();$("invoiceTotal").value=tm?tm[1].replace(',','.'):'';$("invoiceNotes").value=text;$("invoiceRows").innerHTML='';let ps=guessInvoiceProducts(l);ps.forEach(addInvoiceRow);if(!ps.length)addInvoiceRow();refreshInvoiceSupplierList();}
function setupInvoiceUI(){
    document.querySelectorAll('.invoice-tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.invoice-tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.invoice-subpage').forEach(x=>x.classList.add('hidden'));$(b.dataset.itab).classList.remove('hidden');renderInvoices();});
    $("invoiceFile")?.addEventListener('change',e=>{let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=()=>{invoiceImage=r.result;$("invoicePreview").src=invoiceImage};r.readAsDataURL(f);});
    if($("invoiceRead")) $("invoiceRead").onclick=async()=>{let f=$("invoiceFile").files[0];if(!f)return alert('Primero toma o sube una foto.');if(typeof Tesseract==='undefined')return alert('No se pudo cargar OCR. Esta versión necesita Internet para leer la factura.');$("invoiceProgress").classList.remove('hidden');$("invoiceRead").disabled=true;try{const worker=await Tesseract.createWorker('spa',1,{logger:m=>{if(m.progress!=null){let p=Math.round(m.progress*100);$("invoiceBar").style.width=p+'%';$("invoiceProgText").textContent=(m.status||'Leyendo')+' '+p+'%';}}});let r=await worker.recognize(f);invoiceRaw=r.data.text||'';await worker.terminate();parseInvoiceText(invoiceRaw);$("invoiceReview").classList.remove('hidden');}catch(e){alert('No se pudo leer la factura: '+e.message)}finally{$("invoiceRead").disabled=false;}};
    if($("invoiceAdd")) $("invoiceAdd").onclick=()=>addInvoiceRow();
    if($("invoiceSave")) $("invoiceSave").onclick=saveInvoicePurchase;
    if($("invoiceQ")) $("invoiceQ").oninput=renderInvoiceList;if($("invoiceFrom")) $("invoiceFrom").onchange=renderInvoiceList;if($("invoiceTo")) $("invoiceTo").onchange=renderInvoiceList;if($("invoicePriceQ")) $("invoicePriceQ").oninput=renderInvoicePrices;
    
    if($("invoiceClear")) $("invoiceClear").onclick=()=>{$("invoiceQ").value=$("invoiceFrom").value=$("invoiceTo").value='';renderInvoiceList();};
}
function saveInvoicePurchase(){let supplier=normalizeSupplierName($("invoiceSupplier").value),date=$("invoiceDate").value;if(!supplier||!date)return alert('Revisa proveedor y fecha antes de guardar.');let lines=[...$("invoiceRows").children].map(r=>{let id=r.querySelector('.ir-match').value,prod=products.find(x=>String(x.id)===String(id));return {nombre:r.querySelector('.ir-name').value.trim(),cantidad:+r.querySelector('.ir-qty').value||0,unit:r.querySelector('.ir-unit').value,precio:+r.querySelector('.ir-price').value||0,subtotal:(+r.querySelector('.ir-qty').value||0)*(+r.querySelector('.ir-price').value||0),inventoryId:id||null,inventoryName:prod?.name||'',previousPrice:prod?Number(prod.price||0):null,updated:r.querySelector('.ir-update').checked};}).filter(x=>x.nombre);let changes=0;lines.forEach(l=>{if(l.inventoryId&&l.updated){products.filter(p=>String(p.id)===String(l.inventoryId)).forEach(p=>{p.price=l.precio;if(l.unit)p.unit=l.unit;p.supplier=supplier||p.supplier;});changes++;}});if(supplier&&!suppliers.some(s=>normalizeSupplierName(s.name)===supplier))suppliers.push({id:createId(),name:supplier});invoices.push({id:createId(),supplier,date,number:$("invoiceNumber").value.trim(),total:+$("invoiceTotal").value||lines.reduce((s,x)=>s+x.subtotal,0),notes:$("invoiceNotes").value,products:lines,image:invoiceImage,created:new Date().toISOString()});try{save();saveInvoices();}catch(e){invoices.pop();return alert('No se pudo guardar. La imagen puede ser demasiado grande para el almacenamiento del navegador.');}toast(`Factura guardada${changes?' · '+changes+' precio(s) actualizado(s)':''}.`);$("invoiceReview").classList.add('hidden');$("invoiceFile").value='';invoiceImage=null;renderAll();}

function invoiceFiltered(){
    let q=invNorm($("invoiceQ")?.value),a=$("invoiceFrom")?.value,b=$("invoiceTo")?.value;
    return [...invoices]
        .filter(f=>!a||f.date>=a).filter(f=>!b||f.date<=b)
        .filter(f=>!q||invNorm([f.supplier,f.number,...(f.products||[]).map(p=>p.nombre)].join(" ")).includes(q))
        .sort((a,b)=>(b.date||"").localeCompare(a.date||""));
}
function groupInvoicesBySupplier(list){
    const map=new Map();
    list.forEach(f=>{
        const supplier=normalizeSupplierName(f.supplier||"SIN PROVEEDOR")||"SIN PROVEEDOR";
        if(!map.has(supplier))map.set(supplier,[]);
        map.get(supplier).push(f);
    });
    return [...map.entries()].sort((a,b)=>a[0].localeCompare(b[0]));
}
function renderInvoiceList(){
    let el=$("invoiceList"); if(!el)return;
    const groups=groupInvoicesBySupplier(invoiceFiltered());
    el.innerHTML=groups.length?groups.map(([supplier,docs],i)=>{
        const countProducts=docs.reduce((n,f)=>n+(f.products||[]).length,0);
        const total=docs.reduce((n,f)=>n+Number(f.total||0),0);
        return `<details class="supplier-folder" ${groups.length===1?'open':''}>
            <summary><div class="folder-icon">📁</div><div class="folder-main"><b>${invEsc(supplier)}</b><small>${docs.length} factura(s) · ${countProducts} producto(s)</small></div><strong>${money(total)}</strong></summary>
            <div class="folder-content">${docs.map(f=>`<article class="invoice-card compact"><div><h3>${fmtDate(f.date)}</h3><p>Factura #${invEsc(f.number||'—')}</p><small>${(f.products||[]).length} productos</small>${(f.image||f.imageData)?`<button type="button" class="photo-invoice-view" onclick="viewPhotographedInvoice('${f.id}')">🖼️ Ver foto original</button>`:''}</div><div class="invoice-total">${money(f.total)}</div><div>${(f.products||[]).slice(0,5).map(p=>`<span class="invoice-chip">${invEsc(p.nombre)} ${money(p.precio)}</span>`).join('')}</div><button class="danger" onclick="deleteInvoice('${f.id}')">🗑️</button></article>`).join('')}</div>
        </details>`;
    }).join(''):'<div class="invoice-panel">No hay facturas fotografiadas guardadas.</div>';
}

window.viewPhotographedInvoice=id=>{
    const f=invoices.find(x=>String(x.id)===String(id));
    const photo=f&&(f.image||f.imageData);if(!f||!photo){alert("Esta factura antigua no tiene una imagen guardada. Las nuevas sí conservarán la foto.");return}
    viewedSystemInvoice={dataUrl:photo,filename:`Factura_Foto_${String(f.supplier||"Proveedor").replace(/[^a-z0-9áéíóúñ_-]+/gi,"_")}_${f.date||"sin_fecha"}.png`,supplier:f.supplier||"Proveedor",date:f.date||""};
    const modal=$("systemInvoiceModal"),img=$("systemInvoicePreview");
    img.src=photo;
    $("systemInvoiceModalTitle").textContent="📸 Factura fotografiada — "+(f.supplier||"Proveedor")+" — "+fmtDate(f.date||currentDate);
    modal.classList.remove("hidden");modal.setAttribute("aria-hidden","false");
    document.body.classList.add("invoice-modal-open");
};

window.deleteInvoice=id=>{
    if(confirm('¿Eliminar esta factura del historial? Esto no revierte precios ya actualizados.')){
        invoices=invoices.filter(x=>String(x.id)!==String(id)); saveInvoices(); renderInvoices();
    }
};


/* =========================================================
   TICKETS AUTOMÁTICOS DE COMPRA
   Solo se crea un ticket cuando el usuario AGREGA un producto.
   No se generan tickets por duplicaciones del calendario.
========================================================= */
let systemPurchaseTickets=[];
try{systemPurchaseTickets=JSON.parse(localStorage.getItem("bh_system_purchase_tickets")||"[]")||[]}catch(e){systemPurchaseTickets=[]}
function saveSystemPurchaseTickets(){localStorage.setItem("bh_system_purchase_tickets",JSON.stringify(systemPurchaseTickets))}

function migrateExistingProductsToSystemTickets(){
    const migrationKey="bh_system_tickets_existing_products_v1";
    if(localStorage.getItem(migrationKey)==="1")return;
    const already=new Set(systemPurchaseTickets.map(t=>String(t.productId||"")).filter(Boolean));
    let added=0;
    products.forEach(p=>{
        if(!p||!p.id||!p.name)return;
        const pid=String(p.id);
        if(already.has(pid))return;
        systemPurchaseTickets.push(systemTicketFromProduct(p));
        already.add(pid);
        added++;
    });
    saveSystemPurchaseTickets();
    localStorage.setItem(migrationKey,"1");
    localStorage.setItem("bh_system_tickets_migrated_count",String(added));
}

function nextSystemTicketNumber(){
    const n=Number(localStorage.getItem("bh_system_ticket_seq")||0)+1;
    localStorage.setItem("bh_system_ticket_seq",String(n));
    return "BH-"+String(n).padStart(4,"0");
}
function systemTicketFromProduct(p){
    const qty=Number(p.purchaseQty||1)||1;
    const content=Number(p.content||0);
    const inner=Number(p.innerContent||1)||1;
    let totalInternal=content>0?content:inner;
    const unitLabel=p.inventoryUnit||p.contentUnit||"unidad";
    return {
        id:"ticket-"+Date.now()+"-"+Math.random().toString(16).slice(2),
        number:nextSystemTicketNumber(),
        productId:String(p.id||""),
        supplier:normalizeSupplierName(p.supplier||"SIN PROVEEDOR")||"SIN PROVEEDOR",
        product:p.name||"Producto",
        purchaseUnit:p.unit||p.inventoryUnit||"Unidad",
        quantity:qty,
        content:totalInternal,
        contentUnit:unitLabel,
        price:Number(p.price||0),
        unitPrice:totalInternal>0?Number(p.price||0)/totalInternal:Number(p.price||0),
        date:p.date||currentDate,
        createdAt:new Date().toISOString()
    };
}
function addSystemTicketForNewProduct(p){
    if(!p||!p.id)return;
    /* One creation event = one ticket. */
    systemPurchaseTickets.push(systemTicketFromProduct(p));
    saveSystemPurchaseTickets();
}
/* Importa una sola vez los productos que ya estaban guardados. */


function systemInvoiceGroups(){
    let q=invNorm($("systemInvoiceQ")?.value),a=$("systemInvoiceFrom")?.value,b=$("systemInvoiceTo")?.value;
    const filtered=systemPurchaseTickets.filter(t=>(!a||t.date>=a)&&(!b||t.date<=b)&&(!q||invNorm(t.supplier+" "+t.product+" "+t.number).includes(q)));
    const map=new Map();
    filtered.sort((x,y)=>(y.date||"").localeCompare(x.date||"")).forEach(t=>{
        if(!map.has(t.supplier))map.set(t.supplier,[]);
        map.get(t.supplier).push(t);
    });
    return [...map.entries()].sort((a,b)=>a[0].localeCompare(b[0]));
}
function renderSystemInvoices(){
    const el=$("systemInvoiceList");if(!el)return;
    const groups=systemInvoiceGroups();
    el.innerHTML=groups.length?groups.map(([supplier,tickets])=>`<details class="supplier-folder" ${groups.length===1?'open':''}>
      <summary><div class="folder-icon">📁</div><div class="folder-main"><b>${invEsc(supplier)}</b><small>${tickets.length} ticket(s) de compra</small></div></summary>
      <div class="folder-content">${tickets.map(t=>`<article class="purchase-ticket-card">
        <div class="ticket-card-main"><b>🧾 ${invEsc(t.number)}</b><span>${fmtDate(t.date)}</span><strong>${invEsc(t.product)}</strong>
        <small>${invEsc(t.purchaseUnit)} · ${t.quantity} compra(s) · ${t.content} ${invEsc(t.contentUnit)}</small></div>
        <div class="ticket-card-price">${money(t.price)}</div>
        <button type="button" class="invoice-image-btn" onclick="viewPurchaseTicket('${t.id}')">👁️ Ver ticket</button>
      </article>`).join("")}</div>
    </details>`).join(""):'<div class="invoice-panel">Todavía no hay tickets del sistema. Se creará uno automáticamente cada vez que agregues un producto nuevo.</div>';
}
function buildPurchaseTicketImage(ticket){
    const canvas=$("systemInvoiceCanvas"),ctx=canvas.getContext("2d");
    canvas.width=760;canvas.height=900;
    ctx.fillStyle="#fff";ctx.fillRect(0,0,760,900);
    ctx.fillStyle="#17324d";ctx.fillRect(0,0,760,105);
    ctx.fillStyle="#fff";ctx.font="bold 38px Arial";ctx.fillText("BON HOUSE",38,50);
    ctx.font="20px Arial";ctx.fillText("TICKET DE COMPRA",38,82);
    ctx.textAlign="right";ctx.font="bold 22px Arial";ctx.fillText("#"+ticket.number,720,56);ctx.textAlign="left";
    const rows=[
      ["Proveedor",ticket.supplier],["Producto",ticket.product],["Unidad de compra",ticket.purchaseUnit],
      ["Cantidad",String(ticket.quantity)],["Contenido",`${ticket.content} ${ticket.contentUnit}`],
      ["Precio de compra",money(ticket.price)],["Precio por unidad","$"+Number(ticket.unitPrice||0).toFixed(4)],
      ["Fecha",fmtDate(ticket.date)],["Factura","#"+ticket.number]
    ];
    let y=155;
    rows.forEach(([label,val],i)=>{
      ctx.fillStyle=i%2?"#f4f7f8":"#fff";ctx.fillRect(30,y-30,700,64);
      ctx.fillStyle="#607985";ctx.font="bold 19px Arial";ctx.fillText(label+":",55,y);
      ctx.fillStyle="#17324d";ctx.font="bold 22px Arial";ctx.fillText(String(val),285,y);
      y+=68;
    });
    ctx.strokeStyle="#2f6f73";ctx.lineWidth=2;ctx.strokeRect(30,125,700,rows.length*68+10);
    ctx.fillStyle="#607985";ctx.font="17px Arial";ctx.fillText("Generado automáticamente al agregar el producto al inventario.",38,820);
    ctx.fillText("Bon House · Control de Inventario",38,850);
    return {dataUrl:canvas.toDataURL("image/png"),filename:`Ticket_${ticket.number}_${ticket.product.replace(/[^a-z0-9áéíóúñ_-]+/gi,"_")}.png`,supplier:ticket.supplier,date:ticket.date};
}
window.viewPurchaseTicket=id=>{
    const t=systemPurchaseTickets.find(x=>x.id===id);if(!t)return;
    const generated=buildPurchaseTicketImage(t);viewedSystemInvoice=generated;
    const modal=$("systemInvoiceModal"),img=$("systemInvoicePreview");
    img.src=generated.dataUrl;
    $("systemInvoiceModalTitle").textContent="🧾 Ticket "+t.number+" — "+t.product;
    modal.classList.remove("hidden");modal.setAttribute("aria-hidden","false");document.body.classList.add("invoice-modal-open");
};

function invoiceImageText(v){return String(v??"").trim()||"—";}
function invoiceImageNumber(v){const n=Number(v);return Number.isFinite(n)?n:0;}
function invoiceProductDetail(p){
    const purchaseUnit=invoiceImageText(p.unit||p.inventoryUnit||"Unidad");
    const purchaseQty=invoiceImageNumber(p.purchaseQty)||1;
    const content=invoiceImageNumber(p.content);
    const inner=invoiceImageNumber(p.innerContent);
    const contentUnit=invoiceImageText(p.contentUnit||p.inventoryUnit||"Unidad");
    const inventoryUnit=invoiceImageText(p.inventoryUnit||p.contentUnit||"Unidad");
    let presentation=purchaseUnit;
    if(content>0) presentation+=` · ${content} ${inventoryUnit}`;
    if(inner>1) presentation+=` · ${inner} ${contentUnit} c/u`;
    return {purchaseUnit,purchaseQty,content,inner,contentUnit,inventoryUnit,presentation};
}
function wrapCanvasText(ctx,text,maxWidth){
    const words=String(text||"—").split(/\s+/), lines=[]; let line="";
    words.forEach(w=>{const test=line?line+" "+w:w;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=w}else line=test});
    if(line)lines.push(line); return lines.slice(0,3);
}

function buildSystemInvoiceImage(encodedSupplier,date,encodedProductId=''){

    const supplier=decodeURIComponent(encodedSupplier);
    let productsForInvoice=products.filter(p=>normalizeSupplierName(p.supplier||"SIN PROVEEDOR")===supplier);
    if(encodedProductId){
        const wanted=decodeURIComponent(encodedProductId);
        productsForInvoice=productsForInvoice.filter(p=>String(p.id||"")===wanted);
    }else{
        productsForInvoice=productsForInvoice.filter(p=>(p.date||currentDate)===date);
    }
    if(!productsForInvoice.length){alert("No hay productos para esta factura.");return}
    const canvas=$("systemInvoiceCanvas"),ctx=canvas.getContext("2d");
    const rowH=94, top=360, bottom=150;
    canvas.width=1600; canvas.height=Math.max(1000,top+productsForInvoice.length*rowH+bottom);
    ctx.fillStyle="#ffffff";ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#17324d";ctx.fillRect(0,0,canvas.width,118);
    ctx.fillStyle="#ffffff";ctx.font="bold 44px Arial";ctx.fillText("Bon House",55,60);
    ctx.font="24px Arial";ctx.fillText("Control de Inventario",55,94);
    ctx.textAlign="right";ctx.font="bold 34px Arial";ctx.fillText("FACTURA AUTOMÁTICA DEL SISTEMA",1545,58);
    ctx.font="20px Arial";ctx.fillText("Generada desde la información registrada en Productos",1545,91);
    ctx.textAlign="left";

    ctx.fillStyle="#f3f7f8";ctx.fillRect(40,145,1520,170);
    ctx.fillStyle="#17324d";ctx.font="bold 24px Arial";ctx.fillText("PROVEEDOR",70,188);
    ctx.font="bold 36px Arial";ctx.fillText(supplier,70,232);
    ctx.font="22px Arial";ctx.fillText("Fecha de compra: "+fmtDate(date),620,188);
    ctx.fillText("Productos: "+productsForInvoice.length,620,226);
    const total=productsForInvoice.reduce((s,p)=>s+(invoiceImageNumber(p.price)*(invoiceImageNumber(p.purchaseQty)||1)),0);
    ctx.font="bold 30px Arial";ctx.fillText("Total registrado: "+money(total),1120,210);

    const cols=[40,105,475,765,950,1115,1325,1560];
    ctx.fillStyle="#2f6f73";ctx.fillRect(40,330,1520,55);
    ctx.fillStyle="#fff";ctx.font="bold 18px Arial";
    ["#","Producto","Unidad de compra / presentación","Cant.","Contenido","Precio compra","Precio interno"].forEach((h,i)=>ctx.fillText(h,cols[i]+10,365));

    let y=385;
    productsForInvoice.forEach((p,i)=>{
        const d=invoiceProductDetail(p), price=invoiceImageNumber(p.price);
        ctx.fillStyle=i%2?"#eef4f6":"#ffffff";ctx.fillRect(40,y,1520,rowH);
        ctx.strokeStyle="#d9e3e6";ctx.strokeRect(40,y,1520,rowH);
        ctx.fillStyle="#17324d";ctx.font="bold 18px Arial";ctx.fillText(String(i+1),55,y+34);
        ctx.font="bold 19px Arial";
        const nameLines=wrapCanvasText(ctx,p.name,340);nameLines.forEach((t,k)=>ctx.fillText(t,115,y+30+k*23));
        ctx.font="17px Arial";ctx.fillStyle="#334e5c";
        const presLines=wrapCanvasText(ctx,d.presentation,270);presLines.forEach((t,k)=>ctx.fillText(t,485,y+30+k*22));
        ctx.fillText(String(d.purchaseQty),790,y+34);
        const contentTxt=d.content>0?`${d.content} ${d.inventoryUnit}`:"—";
        ctx.fillText(contentTxt,960,y+34);
        ctx.fillStyle="#17324d";ctx.font="bold 18px Arial";ctx.fillText(money(price),1125,y+34);
        let divisor=d.content>0?d.content:(d.inner>1?d.inner:1);
        const internal=price/divisor;
        ctx.fillText(money(internal)+" / "+(d.content>0?d.inventoryUnit:d.contentUnit),1335,y+34);
        ctx.font="15px Arial";ctx.fillStyle="#607985";
        const extra=`Mín: ${invoiceImageNumber(p.min)} ${invoiceImageText(p.minUnit)} · Máx: ${invoiceImageNumber(p.max)} ${invoiceImageText(p.maxUnit)} · Existencia completa: ${invoiceImageNumber(p.complete)} · Suelto: ${invoiceImageNumber(p.loose)}`;
        wrapCanvasText(ctx,extra,1030).forEach((t,k)=>ctx.fillText(t,485,y+61+k*18));
        y+=rowH;
    });
    ctx.fillStyle="#17324d";ctx.font="bold 27px Arial";ctx.fillText("TOTAL: "+money(total),1230,y+65);
    ctx.font="17px Arial";ctx.fillStyle="#607985";ctx.fillText("Bon House · Factura generada automáticamente con los datos guardados en el inventario.",55,y+65);

    
    const safe=supplier.replace(/[^a-z0-9áéíóúñ_-]+/gi,"_");
    return {dataUrl:canvas.toDataURL("image/png"), filename:`Factura_${safe}_${date}.png`, supplier, date};


}
let viewedSystemInvoice=null;

window.viewSystemProductInvoice=(encodedSupplier,date,encodedProductId)=>{
    const generated=buildSystemInvoiceImage(encodedSupplier,date,encodedProductId);
    if(!generated)return;
    viewedSystemInvoice=generated;
    const modal=$("systemInvoiceModal"),img=$("systemInvoicePreview");
    img.src=generated.dataUrl;
    $("systemInvoiceModalTitle").textContent="🧾 Factura individual — "+generated.supplier+" — "+fmtDate(generated.date);
    modal.classList.remove("hidden");modal.setAttribute("aria-hidden","false");
    document.body.classList.add("invoice-modal-open");
};
window.viewSystemInvoice=(encodedSupplier,date)=>{
    const generated=buildSystemInvoiceImage(encodedSupplier,date);
    if(!generated)return;
    viewedSystemInvoice=generated;
    const modal=$("systemInvoiceModal"),img=$("systemInvoicePreview");
    img.src=generated.dataUrl;
    $("systemInvoiceModalTitle").textContent="🧾 Factura — "+generated.supplier+" — "+fmtDate(generated.date);
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden","false");
    document.body.classList.add("invoice-modal-open");
};
window.downloadSystemInvoiceImage=(encodedSupplier,date)=>{
    const generated=buildSystemInvoiceImage(encodedSupplier,date);
    if(!generated)return;
    const a=document.createElement("a");
    a.download=generated.filename;a.href=generated.dataUrl;a.click();
};
function closeSystemInvoiceModal(){
    const modal=$("systemInvoiceModal"); if(!modal)return;
    modal.classList.add("hidden");modal.setAttribute("aria-hidden","true");
    document.body.classList.remove("invoice-modal-open");
}

function bindSystemInvoiceModalControls(){
    const modal=$("systemInvoiceModal");
    const closeBtn=$("closeSystemInvoiceModal");
    const downloadBtn=$("downloadViewedInvoice");
    if(!modal)return;

    if(closeBtn){
        closeBtn.onclick=(e)=>{
            e.preventDefault();
            e.stopPropagation();
            closeSystemInvoiceModal();
        };
    }
    modal.querySelectorAll("[data-close-invoice-modal]").forEach(el=>{
        el.onclick=(e)=>{
            e.preventDefault();
            closeSystemInvoiceModal();
        };
    });
    if(downloadBtn){
        downloadBtn.onclick=(e)=>{
            e.preventDefault();
            if(!viewedSystemInvoice)return;
            const a=document.createElement("a");
            a.download=viewedSystemInvoice.filename;
            a.href=viewedSystemInvoice.dataUrl;
            a.click();
        };
    }
}
bindSystemInvoiceModalControls();

document.addEventListener("keydown",(e)=>{
    if(e.key==="Escape"){
        const modal=$("systemInvoiceModal");
        if(modal && !modal.classList.contains("hidden")) closeSystemInvoiceModal();
    }
});




function renderInvoicePrices(){let el=$("invoicePriceList");if(!el)return;let q=invNorm($("invoicePriceQ")?.value),a=[];invoices.forEach(f=>f.products.forEach(p=>{if(!q||invNorm(p.nombre+' '+(p.inventoryName||'')).includes(q))a.push({...p,supplier:f.supplier,date:f.date,number:f.number});}));a.sort((x,y)=>y.date.localeCompare(x.date));el.innerHTML=a.length?a.map(p=>`<div class="price-history"><div><b>${invEsc(p.inventoryName||p.nombre)}</b><small>${invEsc(p.supplier)} · ${fmtDate(p.date)} · Factura ${invEsc(p.number||'—')}</small></div><span>${invEsc(p.unit||'Unidad')}</span><b>${money(p.precio)}</b>${p.previousPrice!=null?`<span class="price-diff">Antes ${money(p.previousPrice)}</span>`:''}</div>`).join(''):'<div class="invoice-panel">No hay movimientos de precio para mostrar.</div>';}
function renderInvoices(){refreshInvoiceSupplierList();renderInvoiceList();renderInvoicePrices();}
setupInvoiceUI();


document.addEventListener("click",(e)=>{
    if(e.target.closest("#closeSystemInvoiceModal")){
        e.preventDefault();
        e.stopPropagation();
        closeSystemInvoiceModal();
        return;
    }
    if(e.target.matches(".system-invoice-modal-backdrop")){
        e.preventDefault();
        closeSystemInvoiceModal();
    }
});

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createExportButtons, {once:true});
} else {
    createExportButtons();
}
