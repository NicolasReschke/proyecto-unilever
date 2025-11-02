-- Script para insertar productos reales de Unilever en Supabase
-- Ejecutar este SQL en el SQL Editor de Supabase DESPUÉS de crear las tablas

-- Insertar productos reales para cada categoría
INSERT INTO productos (nombre, categoria_id, stock_status, fecha_pedido, imagen_url, orden) VALUES
-- Jabón de tocador (categoria_id = 2)
('DOVE JAB LIQ P/M NUTRIC PROF REP12X220ML', 2, 'stock_normal', '2024-01-15', 'https://via.placeholder.com/100x100?text=DOVE+JAB+LIQ'),
('DOVE JAB ORIGINAL 60X90G', 2, 'poco_stock', '2024-01-20', 'https://via.placeholder.com/100x100?text=DOVE+JAB+ORIGINAL'),
('LUX JAB LIQ BOTAN JAZMIN RFL 12X220ML', 2, 'sin_stock', '2024-01-25', 'https://via.placeholder.com/100x100?text=LUX+JAB+LIQ'),
('LUX BOTAN JAB JAZMIN CREMOSO 72X120G', 2, 'stock_normal', '2024-01-10', 'https://via.placeholder.com/100x100?text=LUX+BOTAN+JAB'),
('REXONA JAB COTTON FRESH 72X120G', 2, 'mucho_stock', '2024-01-12', 'https://via.placeholder.com/100x100?text=REXONA+JAB'),
('SUAVE JAB LIQ COCO Y KARITE 12X220ML', 2, 'stock_normal', '2024-01-18', 'https://via.placeholder.com/100x100?text=SUAVE+JAB+LIQ'),

-- Pelo (categoria_id = 1) - Acondicionadores y Crema para Peinar
('DOVE AC RECONSTRUCTION DP 12X180ML', 1, 'stock_normal', '2024-01-08', 'https://via.placeholder.com/100x100?text=DOVE+AC+RECONSTRUCTION'),
('DOVE AC RITUAL DE REPAR COCO DP 12X180ML', 1, 'sin_stock', '2024-01-22', 'https://via.placeholder.com/100x100?text=DOVE+AC+RITUAL'),
('DOVE AC NUTRICION 12X200ML', 1, 'stock_normal', '2024-01-05', 'https://via.placeholder.com/100x100?text=DOVE+AC+NUTRICION'),
('DOVE AC RECONSTRUCTION 12X200ML', 1, 'poco_stock', '2024-01-14', 'https://via.placeholder.com/100x100?text=DOVE+AC+RECONSTRUCTION'),
('SEDAL AC CR BALANCE 12X300ML', 1, 'stock_normal', '2024-01-16', 'https://via.placeholder.com/100x100?text=SEDAL+AC+BALANCE'),
('SEDAL AC CERAMIDAS 12X300ML', 1, 'mucho_stock', '2024-01-03', 'https://via.placeholder.com/100x100?text=SEDAL+AC+CERAMIDAS'),
('SEDAL AC CR BALANCE 12X190ML', 1, 'stock_normal', '2024-01-07', 'https://via.placeholder.com/100x100?text=SEDAL+AC+BALANCE+190ML'),
('SEDAL AC CERAMIDAS 12X190ML', 1, 'sin_stock', '2024-01-19', 'https://via.placeholder.com/100x100?text=SEDAL+AC+CERAMIDAS+190ML'),
('SEDAL CR PEIN RIZOS DEFINIDOS 12X300ML', 1, 'stock_normal', '2024-01-11', 'https://via.placeholder.com/100x100?text=SEDAL+CR+PEIN+RIZOS'),
('DOVE SH RECONSTRUCTION 12X200ML', 1, 'poco_stock', '2024-01-21', 'https://via.placeholder.com/100x100?text=DOVE+SH+RECONSTRUCTION'),

-- Pelo (categoria_id = 1) - Shampoo (continuación)
('SEDAL SH CR BALANCE 12X190ML', 1, 'mucho_stock', '2024-01-02', 'https://via.placeholder.com/100x100?text=SEDAL+SH+BALANCE'),
('SEDAL CR PEIN RIZOS DEFINIDOS 12X300ML', 1, 'stock_normal', '2024-01-09', 'https://via.placeholder.com/100x100?text=SEDAL+CR+PEIN+RIZOS'),
('DOVE SH RECONSTRUCTION 12X200ML', 1, 'sin_stock', '2024-01-23', 'https://via.placeholder.com/100x100?text=DOVE+SH+RECONSTRUCTION'),
('DOVE SH NUTRICION 12X200ML', 1, 'stock_normal', '2024-01-13', 'https://via.placeholder.com/100x100?text=DOVE+SH+NUTRICION'),
('DOVE SH RITUAL DE REPAR COCO DP 12X200ML', 1, 'poco_stock', '2024-01-17', 'https://via.placeholder.com/100x100?text=DOVE+SH+RITUAL'),
('DOVE SH RECONSTRUCTION DP 12X200ML', 1, 'stock_normal', '2024-01-04', 'https://via.placeholder.com/100x100?text=DOVE+SH+RECONSTRUCTION+DP'),
('SEDAL SH CERAMIDAS 12X300ML', 1, 'mucho_stock', '2024-01-06', 'https://via.placeholder.com/100x100?text=SEDAL+SH+CERAMIDAS'),
('SEDAL SH CERAMIDAS 12X190ML', 1, 'stock_normal', '2024-01-24', 'https://via.placeholder.com/100x100?text=SEDAL+SH+CERAMIDAS+190ML'),
('SEDAL SH CR BALANCE 12X300ML', 1, 'sin_stock', '2024-01-01', 'https://via.placeholder.com/100x100?text=SEDAL+SH+BALANCE+300ML'),

-- DEOS y fragancias (categoria_id = 3)
('REXONA W DEO ROL AP ACT CONFIDEN 12X50ML', 3, 'stock_normal', '2024-01-15', 'https://via.placeholder.com/100x100?text=REXONA+W+DEO+ROL'),
('REXONA W DEO AP AER XT EMO 12X89G/150ML', 3, 'poco_stock', '2024-01-20', 'https://via.placeholder.com/100x100?text=REXONA+W+DEO+AER'),
('REXONA DEO CR AP ODOR 7H 12X60G', 3, 'sin_stock', '2024-01-25', 'https://via.placeholder.com/100x100?text=REXONA+DEO+CR'),
('AXE DEO AER BS MARINE 12X97G/150ML', 3, 'stock_normal', '2024-01-10', 'https://via.placeholder.com/100x100?text=AXE+DEO+AER+MARINE'),
('AXE DEO AER BS BLUE LAV 12X96G/150ML', 3, 'mucho_stock', '2024-01-12', 'https://via.placeholder.com/100x100?text=AXE+DEO+AER+BLUE'),
('REXONA M DEO ROL AP V8 12X50ML', 3, 'stock_normal', '2024-01-18', 'https://via.placeholder.com/100x100?text=REXONA+M+DEO+ROL'),
('REXONA M DEO AER V8 12X95G/150ML', 3, 'poco_stock', '2024-01-08', 'https://via.placeholder.com/100x100?text=REXONA+M+DEO+AER'),
('DOVE DEO AER AP ORIGINAL 12X87G/150ML', 3, 'sin_stock', '2024-01-22', 'https://via.placeholder.com/100x100?text=DOVE+DEO+AER+ORIGINAL'),
('DOVE DEO AER AP IN CARE 7ZH 12X87G/150ML', 3, 'stock_normal', '2024-01-05', 'https://via.placeholder.com/100x100?text=DOVE+DEO+AER+CARE'),
('DOVE DEO ROL ORIGINAL 12X50ML', 3, 'poco_stock', '2024-01-14', 'https://via.placeholder.com/100x100?text=DOVE+DEO+ROL+ORIGINAL'),
('REXONA W DEO AP AER INVIS 12X150ML', 3, 'stock_normal', '2024-01-16', 'https://via.placeholder.com/100x100?text=REXONA+W+DEO+AER+INVIS'),
('REXONA W DEO ROL AP ACT EMOTION 12X50ML', 3, 'mucho_stock', '2024-01-03', 'https://via.placeholder.com/100x100?text=REXONA+W+DEO+ROL+EMOTION'),
('REXONA W DEO AER ACT EMO 12X89G/150ML', 3, 'stock_normal', '2024-01-07', 'https://via.placeholder.com/100x100?text=REXONA+W+DEO+AER+EMO'),
('REXONA DEO CR AP ORG 12X50ML', 3, 'sin_stock', '2024-01-19', 'https://via.placeholder.com/100x100?text=REXONA+DEO+CR+ORG'),

-- Limpiadores (categoria_id = 5)
('CIF AER DESINF ORIGINAL 12X260G/3CM', 5, 'stock_normal', '2024-01-11', 'https://via.placeholder.com/100x100?text=CIF+AER+DESINF'),
('CIF EXPERT ANTIGRASA DP 15X450ML', 5, 'poco_stock', '2024-01-21', 'https://via.placeholder.com/100x100?text=CIF+EXPERT+ANTIGRASA'),
('CIF EXPERT BANO DP 15X450ML', 5, 'mucho_stock', '2024-01-02', 'https://via.placeholder.com/100x100?text=CIF+EXPERT+BANO'),
('CIF EXPERT ORIGINAL CR BOT 15X450ML', 5, 'stock_normal', '2024-01-09', 'https://via.placeholder.com/100x100?text=CIF+EXPERT+ORIGINAL'),
('CIF CR BIO MULTIUSO ORIGINAL DP 12X375G', 5, 'sin_stock', '2024-01-23', 'https://via.placeholder.com/100x100?text=CIF+CR+BIO+MULTIUSO'),
('CIF UBRILLO MULTIUSO ORIGINAL BOT 12X375G', 5, 'stock_normal', '2024-01-13', 'https://via.placeholder.com/100x100?text=CIF+UBRILLO+MULTIUSO'),
('CIF UBRILLO MULTIUSO ORIGINAL DP 15X450ML', 5, 'poco_stock', '2024-01-17', 'https://via.placeholder.com/100x100?text=CIF+UBRILLO+MULTIUSO+DP'),
('CIF EXPERT VIDRIOS Y MULTUSOS DP 15X450ML', 5, 'stock_normal', '2024-01-04', 'https://via.placeholder.com/100x100?text=CIF+EXPERT+VIDRIOS'),

-- Jabón para la ropa (categoria_id = 7)
('ALA LIQ CONC P/DIL MAX REM BOT 12X500ML', 7, 'mucho_stock', '2024-01-06', 'https://via.placeholder.com/100x100?text=ALA+LIQ+CONC'),
('ALA LIQ B LAV TOTAL MAX REM DP 12X800ML', 7, 'stock_normal', '2024-01-24', 'https://via.placeholder.com/100x100?text=ALA+LIQ+B+LAV'),
('ALA LIQ CONC P/DIL MAX REM DP 4X3L', 7, 'sin_stock', '2024-01-01', 'https://via.placeholder.com/100x100?text=ALA+LIQ+CONC+P+DIL'),
('SKIP LIQ CONC P/DIL LIMON BOT 12X500ML', 7, 'stock_normal', '2024-01-15', 'https://via.placeholder.com/100x100?text=SKIP+LIQ+CONC+LIMON'),
('SKIP LIQ B LAV TOTAL MAX REM DP 12X800ML', 7, 'poco_stock', '2024-01-20', 'https://via.placeholder.com/100x100?text=SKIP+LIQ+B+LAV'),
('SKIP LIQ B E LV LA ROPA DP 4X3L', 7, 'sin_stock', '2024-01-25', 'https://via.placeholder.com/100x100?text=SKIP+LIQ+B+E+LV'),
('ALA PV0 MATIC LAV C R/BICARBONATO DP 24X400G', 7, 'stock_normal', '2024-01-10', 'https://via.placeholder.com/100x100?text=ALA+PV0+MAT+LAV+C+R'),
('ALA PV0 MATIC LAV T C/BICARBONATO DP 24X400G', 7, 'mucho_stock', '2024-01-12', 'https://via.placeholder.com/100x100?text=ALA+PV0+MAT+LAV+T+C'),

-- Savoury (categoria_id = 8)
('MAIZENA ALMIDON DE MAIZ 28X500G', 8, 'stock_normal', '2024-01-18', 'https://via.placeholder.com/100x100?text=MAIZENA+ALMIDON'),
('KNORR BOLSA HORNO LIMON Y OREG 15X21G', 8, 'poco_stock', '2024-01-08', 'https://via.placeholder.com/100x100?text=KNORR+BOLSA+HORNO'),
('KNORR CDO VERD C/VEG 80X12GCUB', 8, 'sin_stock', '2024-01-22', 'https://via.placeholder.com/100x100?text=KNORR+CDO+VERD'),
('KNORR CDO GAL C/VEG 16X10XCUB', 8, 'stock_normal', '2024-01-05', 'https://via.placeholder.com/100x100?text=KNORR+CDO+GAL'),
('KNORR PURE PAPAS LISTO NVA FORM 12X125G', 8, 'poco_stock', '2024-01-14', 'https://via.placeholder.com/100x100?text=KNORR+PURE+PAPAS'),
('CICA SSA PIZZA NVA FORM 24X340G', 8, 'stock_normal', '2024-01-16', 'https://via.placeholder.com/100x100?text=CICA+SSA+PIZZA'),
('KNORR SSA FILETO 24X340GR', 8, 'mucho_stock', '2024-01-03', 'https://via.placeholder.com/100x100?text=KNORR+SSA+FILETO'),
('KNORR SSA PIZZA 24X340GR', 8, 'stock_normal', '2024-01-07', 'https://via.placeholder.com/100x100?text=KNORR+SSA+PIZZA'),
('KNORR SSA MIX SAB CARNE 40X14XSOB', 8, 'sin_stock', '2024-01-19', 'https://via.placeholder.com/100x100?text=KNORR+SSA+MIX+SAB'),
('KNORR MIX SAB CARNE 4X10X40G', 8, 'stock_normal', '2024-01-11', 'https://via.placeholder.com/100x100?text=KNORR+MIX+SAB+CARNE'),
('KNORR SOPA POL C/ FIDE 4X10C AGL', 8, 'poco_stock', '2024-01-21', 'https://via.placeholder.com/100x100?text=KNORR+SOPA+POL+FIDE'),
('KNORR SOPA VEG C/PAS TRICOLOR 10X60G', 8, 'stock_normal', '2024-01-02', 'https://via.placeholder.com/100x100?text=KNORR+SOPA+VEG+PAS'),
('KNORR SOPA QUICK VEGETALES 10X60G', 8, 'mucho_stock', '2024-01-09', 'https://via.placeholder.com/100x100?text=KNORR+SOPA+QUICK+VEG');

-- Verificar que se insertaron correctamente
SELECT
    c.nombre as categoria,
    COUNT(p.id) as productos
FROM categorias c
LEFT JOIN productos p ON c.id = p.categoria_id
GROUP BY c.id, c.nombre
ORDER BY c.orden;