/*
  Masons Getränkehandbuch – Rezeptdaten
  ------------------------------------
  So fügst du einen Drink hinzu oder änderst ihn:
  1. Einen Block unten kopieren und anpassen.
  2. Foto als JPG in den Ordner img/ legen, Dateiname = id (z. B. img/mojito.jpg).
  3. In sw.js die VERSION um 1 erhöhen, damit alle Handys die neue Version laden.

  Felder:
    id       eindeutiger Kurzname (klein, mit Bindestrichen)
    name     Anzeigename
    cat      Kategorie (siehe CATEGORIES)
    af       true = alkoholfrei
    glass    Glas
    ice      Eis im Glas
    method   Technik (Shaken, Rühren, Bauen, Muddeln, Schichten, Mixen, Dry Shake)
    ing      Zutaten: [Menge, Zutat, optionaler Zusatz]
    steps    Zubereitung, ein Schritt pro Eintrag
    garnish  Deko / Anrichten
    note     optionaler Hinweis
*/

window.CATEGORIES = [
  { id: 'longdrinks', name: 'Longdrinks' },
  { id: 'tiki',       name: 'Tiki & Tropisch' },
  { id: 'short',      name: 'Short Drinks' },
  { id: 'sours',      name: 'Sours' },
  { id: 'spritz',     name: 'Spritz' },
  { id: 'coladas',    name: 'Coladas' },
  { id: 'frozen',     name: 'Frozen' },
  { id: 'shots',      name: 'Shots' },
  { id: 'shakes',     name: 'Shakes' },
  { id: 'matcha',     name: 'Matcha' }
];

window.DRINKS = [
  {
    id: 'adios-motherfucker', name: 'Adios Motherfucker', cat: 'longdrinks',
    glass: 'Longdrinkglas', ice: 'Eiswürfel', method: 'Bauen',
    ing: [['2 cl', 'Zitronensaft'], ['2 cl', 'Lime'], ['2 cl', 'Vodka'], ['2 cl', 'weißer Rum'], ['2 cl', 'Tequila'], ['2 cl', 'Gin'], ['auffüllen', 'Sprite'], ['2 cl', 'Blue Curaçao', 'floaten']],
    steps: ['Glas mit Eis füllen.', 'Zitronensaft, Lime, Vodka, weißen Rum, Tequila und Gin ins Glas geben.', 'Mit Sprite auffüllen.', '2 cl Blue Curaçao obendrauf floaten.'],
    garnish: 'Zitronenscheibe, Strohhalm'
  },
  {
    id: 'amaretto-sour', name: 'Amaretto Sour', cat: 'sours',
    glass: 'Tumbler', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['5 cl', 'Amaretto'], ['3 cl', 'Zitronensaft'], ['3 cl', 'Orangensaft'], ['2 cl', 'Eiweiß']],
    steps: ['Alle Zutaten mit Eis in den Shaker geben.', 'Kräftig shaken.', 'Auf frisches Eis ins Glas abseihen.'],
    garnish: 'Getrocknete Orangenscheibe'
  },
  {
    id: 'amore-piccante', name: 'Amore Piccante', cat: 'longdrinks', af: true,
    glass: 'Longdrinkglas', ice: 'Crushed Ice', method: 'Shaken',
    ing: [['1 cl', 'Honig'], ['1 cl', 'warmes Wasser'], ['2 cl', 'Passionsfruchtsirup'], ['2 cl', 'Zitronensaft'], ['½ TL', 'Ingwer', 'frisch gerieben'], ['1', 'Chilischeibe', 'dünn'], ['auffüllen', 'Ginger Ale']],
    steps: ['Honig mit warmem Wasser verrühren.', 'Passionsfruchtsirup, Zitronensaft, Ingwer und Chilischeibe dazugeben.', 'Mit Eis shaken.', 'In ein mit Eis gefülltes Glas abseihen.', 'Mit Ginger Ale auffüllen.'],
    garnish: 'Chilischote, Rosmarinzweig'
  },
  {
    id: 'aperol-spritz', name: 'Aperol Spritz', cat: 'spritz',
    glass: 'Weinglas', ice: 'Eiswürfel', method: 'Bauen',
    ing: [['6 cl', 'Aperol'], ['9 cl', 'Prosecco'], ['3 cl', 'Sprudelwasser']],
    steps: ['Weinglas mit Eis füllen.', 'Prosecco, Aperol und Sprudelwasser hineingeben.', 'Einmal vorsichtig umrühren.'],
    garnish: 'Getrocknete Orangenscheibe, Rosmarinzweig'
  },
  {
    id: 'b52', name: 'B52', cat: 'shots',
    glass: 'Shotglas', ice: 'ohne Eis', method: 'Schichten',
    ing: [['2 cl', 'Kahlúa'], ['2 cl', 'Baileys'], ['1 cl', '151er Rum']],
    steps: ['Kahlúa direkt ins Shotglas geben.', 'Baileys vorsichtig über einen Barlöffel daraufschichten.', '151er Rum als oberste Schicht daraufschichten.', 'Anzünden und sofort servieren.'],
    garnish: '–',
    note: 'Vorsicht beim Anzünden: Gast warnen, nichts Brennbares in der Nähe, nicht mit brennendem Glas laufen.'
  },
  {
    id: 'bahama-mama', name: 'Bahama Mama', cat: 'tiki',
    glass: 'Tiki-Becher', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['2 cl', 'Zitronensaft'], ['2 cl', 'Kokossirup'], ['3 cl', 'brauner Rum'], ['6 cl', 'weißer Rum'], ['auffüllen', 'Ananassaft'], ['auffüllen', 'Orangensaft'], ['2 cl', 'Grenadine', 'floaten']],
    steps: ['Zitronensaft, Kokossirup und beide Rumsorten mit Eis in den Shaker geben.', 'Mit Ananas- und Orangensaft auffüllen.', 'Shaken und auf Eis ins Glas abseihen.', '2 cl Grenadine floaten.'],
    garnish: 'Ananasspalte'
  },
  {
    id: 'baileys-colada', name: 'Baileys Colada', cat: 'coladas',
    glass: 'Hurricane-Glas', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['3 cl', 'Sahne'], ['3 cl', 'Kokossirup'], ['6 cl', 'Baileys'], ['auffüllen', 'Ananassaft']],
    steps: ['Sahne, Kokossirup und Baileys mit Eis in den Shaker geben.', 'Mit Ananassaft auffüllen.', 'Shaken und ins Glas geben.', 'Mit Sahne sowie Schoko- und Karamellsauce toppen.'],
    garnish: 'Sahne, Schoko- und Karamellsauce, Ananasspalte'
  },
  {
    id: 'bellini', name: 'Bellini', cat: 'spritz',
    glass: 'Sektglas', ice: 'ohne Eis', method: 'Bauen',
    ing: [['2 cl', 'Pfirsichsirup'], ['auffüllen', 'Prosecco']],
    steps: ['Pfirsichsirup ins Glas geben.', 'Langsam mit Prosecco auffüllen.'],
    garnish: 'Orangenscheibe, Rosmarinzweig'
  },
  {
    id: 'beverly-hills-iced-tea', name: 'Beverly Hills Iced Tea', cat: 'longdrinks',
    glass: 'Longdrinkglas', ice: 'Eiswürfel', method: 'Bauen',
    ing: [['1 cl', 'Lime'], ['1 cl', 'Zuckersirup'], ['2 cl', 'Gin'], ['2 cl', 'Orangenlikör'], ['2 cl', 'Vodka'], ['2 cl', 'weißer Rum'], ['auffüllen', 'Prosecco']],
    steps: ['Glas mit Eis füllen.', 'Lime, Zuckersirup, Gin, Orangenlikör, Vodka und weißen Rum hineingeben.', 'Mit Prosecco auffüllen.'],
    garnish: 'Limettenscheibe'
  },
  {
    id: 'blow-job', name: 'Blow Job', cat: 'shots',
    glass: 'Shotglas', ice: 'ohne Eis', method: 'Shaken',
    ing: [['2 cl', 'Baileys'], ['1 cl', 'Kahlúa'], ['1 cl', 'Amarettolikör'], ['', 'Sprühsahne']],
    steps: ['Baileys, Kahlúa und Amarettolikör mit Eis in den Shaker geben.', 'Shaken und ins Shotglas abseihen.', 'Mit Sprühsahne toppen.'],
    garnish: 'Sprühsahne'
  },
  {
    id: 'bora-bora', name: 'Bora Bora', cat: 'tiki', af: true,
    glass: 'Tiki-Becher', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['2 cl', 'Kokossirup'], ['auffüllen', 'Ananassaft'], ['auffüllen', 'Maracujasaft'], ['auffüllen', 'Bananensaft']],
    steps: ['Kokossirup mit Eis in den Shaker geben.', 'Mit Ananas-, Maracuja- und Bananensaft auffüllen.', 'Shaken und ins Glas füllen.'],
    garnish: 'Ananasspalte'
  },
  {
    id: 'bubblegum-shot', name: 'Bubblegum Shot', cat: 'shots',
    glass: 'Shotglas', ice: 'ohne Eis', method: 'Shaken',
    ing: [['2 cl', 'Baileys'], ['2 cl', 'Blue Curaçao'], ['2 cl', 'Bananenlikör']],
    steps: ['Alle Zutaten mit Eis in den Shaker geben.', 'Shaken und ins Shotglas abseihen.'],
    garnish: '–'
  },
  {
    id: 'caipifragola', name: 'Caipifragola', cat: 'longdrinks',
    glass: 'Longdrinkglas', ice: 'Crushed Ice', method: 'Muddeln',
    ing: [['4', 'Limettenspalten'], ['2 cl', 'Lime'], ['2 BL', 'Rohrzucker'], ['6 cl', 'Cachaça'], ['2 cl', 'Erdbeersirup']],
    steps: ['Limettenspalten, Lime und Rohrzucker ins Glas geben.', 'Muddeln.', 'Glas mit Crushed Ice füllen.', 'Cachaça und Erdbeersirup dazugeben.', 'Rühren.'],
    garnish: 'Limettenscheibe, Strohhalm'
  },
  {
    id: 'caipirinha', name: 'Caipirinha', cat: 'longdrinks',
    glass: 'Longdrinkglas', ice: 'Crushed Ice', method: 'Muddeln',
    ing: [['4', 'Limettenspalten'], ['2 cl', 'Lime'], ['1 BL', 'Rohrzucker'], ['6 cl', 'Cachaça']],
    steps: ['Limettenspalten, Lime und Rohrzucker ins Glas geben.', 'Muddeln.', 'Glas mit Crushed Ice füllen.', 'Cachaça dazugeben.', 'Rühren.'],
    garnish: 'Limettenscheibe, Minze, Strohhalm'
  },
  {
    id: 'coconut-kiss', name: 'Coconut Kiss', cat: 'tiki', af: true,
    glass: 'Hurricane-Glas', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['2 cl', 'Sahne'], ['2 cl', 'Kokossirup'], ['auffüllen', 'Orangensaft'], ['auffüllen', 'Ananassaft']],
    steps: ['Sahne und Kokossirup mit Eis in den Shaker geben.', 'Mit Orangen- und Ananassaft auffüllen.', 'Shaken und ins Glas abseihen.', 'Mit Sprühsahne toppen.'],
    garnish: 'Sprühsahne, Cocktailkirsche'
  },
  {
    id: 'cosmopolitan', name: 'Cosmopolitan', cat: 'short',
    glass: 'Martiniglas', ice: 'ohne Eis', method: 'Shaken',
    ing: [['2 cl', 'Lime'], ['1 cl', 'Triple Sec'], ['4 cl', 'Vodka'], ['4 cl', 'Cranberrysaft']],
    steps: ['Alle Zutaten mit Eis in den Shaker geben.', 'Shaken.', 'Ins Glas abseihen.'],
    garnish: 'Limettenscheibe, Zuckerrand'
  },
  {
    id: 'cuba-libre', name: 'Cuba Libre', cat: 'longdrinks',
    glass: 'Longdrinkglas', ice: 'Eiswürfel', method: 'Bauen',
    ing: [['4 cl', 'weißer Rum'], ['auffüllen', 'Cola'], ['2', 'Limettenviertel']],
    steps: ['Glas mit Eis füllen.', '4 cl weißen Rum hineingeben.', 'Mit Cola auffüllen.', '2 Limettenviertel hineingeben.'],
    garnish: 'Limettenviertel, Strohhalm'
  },
  {
    id: 'daiquiri', name: 'Daiquiri', cat: 'short',
    glass: 'Martiniglas', ice: 'ohne Eis', method: 'Shaken',
    ing: [['3 cl', 'Lime'], ['1 cl', 'Zuckersirup'], ['5 cl', 'weißer Rum']],
    steps: ['Alle Zutaten mit Eis in den Shaker geben.', 'Shaken.', 'Ins Glas abseihen.'],
    garnish: 'Limettenscheibe'
  },
  {
    id: 'frozen-strawberry-daiquiri', name: 'Frozen Strawberry Daiquiri', cat: 'frozen',
    glass: 'Martiniglas', ice: 'Crushed Ice (im Mixer)', method: 'Mixen',
    ing: [['50 g', 'TK-Erdbeeren'], ['3 cl', 'Lime'], ['2 cl', 'Erdbeersirup'], ['6 cl', 'weißer Rum'], ['', 'Crushed Ice']],
    steps: ['Crushed Ice in den Mixer geben.', 'TK-Erdbeeren, Lime, Erdbeersirup und weißen Rum dazugeben.', 'Mixen.', 'Ins Glas aufhäufen.'],
    garnish: 'Kiwischeibe, Strohhalm'
  },
  {
    id: 'del-mar', name: 'Del Mar', cat: 'longdrinks',
    glass: 'Longdrinkglas', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['1 cl', 'Zitronensaft'], ['1 cl', 'Zuckersirup'], ['2 cl', 'brauner Rum'], ['3 cl', 'weißer Rum'], ['auffüllen', 'Orangensaft'], ['2 cl', 'Grenadine', 'floaten']],
    steps: ['Zitronensaft, Zuckersirup und beide Rumsorten mit Eis in den Shaker geben.', 'Mit Orangensaft auffüllen und shaken.', 'In ein Glas mit Eis geben.', '2 cl Grenadine floaten.'],
    garnish: 'Halbe Maracuja'
  },
  {
    id: 'espresso-martini', name: 'Espresso Martini', cat: 'short',
    glass: 'Coupette', ice: 'ohne Eis', method: 'Shaken',
    ing: [['4 cl', 'Vodka'], ['3 cl', 'Espresso', 'frisch'], ['2 cl', 'Kahlúa'], ['1 cl', 'Zuckersirup']],
    steps: ['Alle Zutaten mit Eis in den Shaker geben.', 'Kräftig shaken.', 'Ins Glas abseihen.', 'Mit Kakaopulver, Kaffeebohnen und Löffelbiskuit dekorieren.'],
    garnish: 'Kakaopulver, Kaffeebohnen, Löffelbiskuit'
  },
  {
    id: 'gin-sour', name: 'Gin Sour', cat: 'sours',
    glass: 'Tumbler', ice: 'Eiswürfel', method: 'Dry Shake',
    ing: [['5 cl', 'Gin'], ['3 cl', 'Zitronensaft'], ['4 cl', 'Orangensaft'], ['2 cl', 'Zuckersirup'], ['2 cl', 'Eiweiß']],
    steps: ['Alle Zutaten ohne Eis in den Shaker geben.', 'Dry Shaken.', 'Eis hinzufügen.', 'Kräftig shaken.', 'Auf Eis ins Glas abseihen.'],
    garnish: 'Getrocknete Limettenscheibe'
  },
  {
    id: 'hardcore', name: 'Hardcore', cat: 'longdrinks',
    glass: 'Longdrinkglas', ice: 'Eiswürfel', method: 'Bauen',
    ing: [['2 cl', 'Zitronensaft'], ['2 cl', 'Maracujasirup'], ['2 cl', 'weißer Rum'], ['6 cl', 'brauner Rum'], ['auffüllen', 'Orangensaft']],
    steps: ['Glas mit Eis füllen.', 'Zitronensaft, Maracujasirup und beide Rumsorten hineingeben.', 'Mit Orangensaft auffüllen.'],
    garnish: 'Halbe Maracuja'
  },
  {
    id: 'hugo', name: 'Hugo', cat: 'spritz',
    glass: 'Weinglas', ice: 'Eiswürfel', method: 'Bauen',
    ing: [['3 cl', 'Holundersirup'], ['1 Schuss', 'Sprudelwasser'], ['auffüllen', 'Prosecco'], ['2', 'Limettenscheiben', 'frisch'], ['', 'Minze'], ['1', 'Thymianzweig']],
    steps: ['Holundersirup und einen Schuss Sprudel ins Glas geben.', 'Mit Prosecco auffüllen.', 'Eis, 2 frische Limettenscheiben, Minze und einen Thymianzweig ins Glas geben.'],
    garnish: 'Minze, Thymianzweig, Limettenscheiben'
  },
  {
    id: 'hurricane', name: 'Hurricane', cat: 'tiki',
    glass: 'Longdrinkglas', ice: 'Crushed Ice', method: 'Shaken',
    ing: [['2 cl', 'Lime'], ['2 cl', 'Maracujasirup'], ['4 cl', 'brauner Rum'], ['4 cl', 'weißer Rum'], ['1 cl', 'Grenadine'], ['auffüllen', 'Ananassaft'], ['auffüllen', 'Orangensaft']],
    steps: ['Lime, Maracujasirup, beide Rumsorten und Grenadine mit Eis in den Shaker geben.', 'Mit Ananas- und Orangensaft auffüllen.', 'Shaken und ins Glas auf Eis geben.'],
    garnish: 'Halbe Maracuja'
  },
  {
    id: 'ipanema', name: 'Ipanema', cat: 'longdrinks', af: true,
    glass: 'Longdrinkglas', ice: 'Crushed Ice', method: 'Muddeln',
    ing: [['4', 'Limettenspalten'], ['2 cl', 'Lime'], ['2 BL', 'Rohrzucker'], ['auffüllen', 'Maracujasaft'], ['auffüllen', 'Ginger Ale']],
    steps: ['Limettenspalten, Lime und Rohrzucker ins Glas geben.', 'Muddeln.', 'Glas mit Crushed Ice füllen.', 'Mit Maracujasaft und Ginger Ale auffüllen.', 'Rühren.'],
    garnish: 'Minze, Limettenscheibe, Strohhalm'
  },
  {
    id: 'lillet-wildberry', name: 'Lillet Wildberry', cat: 'spritz',
    glass: 'Weinglas', ice: 'Eiswürfel', method: 'Bauen',
    ing: [['6 cl', 'Lillet Blanc'], ['auffüllen', 'Schweppes Wild Berry'], ['', 'TK-Beeren']],
    steps: ['Weinglas mit Eis füllen.', '6 cl Lillet Blanc hineingeben.', 'Mit Schweppes Wild Berry auffüllen.', 'TK-Beeren hinzufügen.', 'Rühren.'],
    garnish: 'TK-Beeren, Minze'
  },
  {
    id: 'london-mule', name: 'London Mule', cat: 'longdrinks',
    glass: 'Kupferbecher', ice: 'Eiswürfel', method: 'Bauen',
    ing: [['2 cl', 'Lime'], ['5 cl', 'Gin'], ['2', 'Limettenspalten'], ['auffüllen', 'Ginger Beer'], ['1', 'Gurkenscheibe']],
    steps: ['Becher mit Eis füllen.', 'Lime, Gin und 2 Limettenspalten hineingeben.', 'Rühren.', 'Mit Ginger Beer auffüllen.', 'Gurkenscheibe dazugeben.'],
    garnish: 'Gurkenscheibe, Limette, Minze'
  },
  {
    id: 'long-island-iced-tea', name: 'Long Island Iced Tea', cat: 'longdrinks',
    glass: 'Longdrinkglas', ice: 'Eiswürfel', method: 'Bauen',
    ing: [['1 cl', 'Lime'], ['2 cl', 'Tequila'], ['2 cl', 'Gin'], ['2 cl', 'Triple Sec'], ['2 cl', 'weißer Rum'], ['2 cl', 'Vodka'], ['auffüllen', 'Cola']],
    steps: ['Glas mit Eis füllen.', 'Lime, Tequila, Gin, Triple Sec, weißen Rum und Vodka hineingeben.', 'Mit Cola auffüllen.'],
    garnish: 'Zitronenscheibe, Strohhalm'
  },
  {
    id: 'mai-tai', name: 'Mai Tai', cat: 'tiki',
    glass: 'Longdrinkglas', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['4 cl', 'brauner Rum'], ['2 cl', 'weißer Rum'], ['2 cl', 'Triple Sec'], ['2 cl', 'Mandelsirup'], ['3 cl', 'Lime']],
    steps: ['Alle Zutaten mit Eis in den Shaker geben.', 'Kräftig shaken.', 'Ins Glas auf Eis abseihen.'],
    garnish: 'Orangenzeste, Cocktailkirsche'
  },
  {
    id: 'margarita', name: 'Margarita', cat: 'short',
    glass: 'Martiniglas', ice: 'ohne Eis', method: 'Shaken',
    ing: [['2 cl', 'Lime'], ['2 cl', 'Zitronensaft'], ['3 cl', 'Triple Sec'], ['5 cl', 'Tequila']],
    steps: ['Glas mit Salzrand vorbereiten.', 'Alle Zutaten mit Eis in den Shaker geben.', 'Shaken.', 'Ins Glas abseihen.', 'Rosmarinzweig hineingeben.'],
    garnish: 'Salzrand, Rosmarinzweig, Limettenscheibe'
  },
  {
    id: 'frozen-margarita', name: 'Frozen Margarita', cat: 'frozen',
    glass: 'Martiniglas', ice: 'Crushed Ice (im Mixer)', method: 'Mixen',
    ing: [['4 cl', 'Lime'], ['4 cl', 'Zitronensaft'], ['3 cl', 'Zuckersirup'], ['6 cl', 'Tequila'], ['', 'Crushed Ice']],
    steps: ['Crushed Ice in den Mixer geben.', 'Lime, Zitronensaft, Zuckersirup und Tequila dazugeben.', 'Mixen.', 'Ins Glas aufhäufen.'],
    garnish: 'Physalis, Strohhalm'
  },
  {
    id: 'martini', name: 'Martini', cat: 'short',
    glass: 'Martiniglas', ice: 'ohne Eis', method: 'Rühren',
    ing: [['6 cl', 'Gin'], ['1 cl', 'trockener Wermut']],
    steps: ['Glas vorkühlen.', 'Gin und Wermut mit Eis ins Rührglas geben.', 'Ca. 20–30 Sekunden rühren.', 'Ins vorgekühlte Glas abseihen.', 'Olive am Cocktailspieß ins Glas geben.'],
    garnish: 'Olive am Cocktailspieß'
  },
  {
    id: 'matcha-erdbeer', name: 'Matcha Erdbeer', cat: 'matcha', af: true,
    glass: 'Latte-Glas', ice: 'Eiswürfel', method: 'Schichten',
    ing: [['1 Löffel', 'Matcha'], ['', 'heißes Wasser'], ['2 cm', 'Erdbeerpüree', 'Füllhöhe'], ['1 cl', 'Erdbeersirup'], ['auffüllen', 'Milch'], ['', 'Eiswürfel']],
    steps: ['1 Löffel Matcha in eine Schüssel geben und mit heißem Wasser schaumig rühren.', 'Erdbeerpüree ins Glas geben (ca. 2 cm hoch).', '1 cl Erdbeersirup dazugeben.', 'Mit Milch und Eiswürfeln auffüllen.', 'Schaumige Matcha-Masse langsam obendrauf geben (ca. 1 cm hoch).'],
    garnish: 'Strohhalm'
  },
  {
    id: 'matcha-latte', name: 'Matcha Latte', cat: 'matcha', af: true,
    glass: 'Henkelglas', ice: 'ohne Eis (heiß)', method: 'Schichten',
    ing: [['1 Löffel', 'Matcha'], ['', 'heißes Wasser'], ['auffüllen', 'Milch', 'heiß, aufgeschäumt']],
    steps: ['1 Löffel Matcha in eine Schüssel geben und mit heißem Wasser schaumig rühren.', 'Heiße Milch ins Glas geben.', 'Schaumige Matcha-Masse langsam obendrauf geben.'],
    garnish: 'Etwas Matchapulver auf den Schaum'
  },
  {
    id: 'matcha-mango', name: 'Matcha Mango', cat: 'matcha', af: true,
    glass: 'Latte-Glas', ice: 'Eiswürfel', method: 'Schichten',
    ing: [['1 Löffel', 'Matcha'], ['', 'heißes Wasser'], ['2 cm', 'Mangopüree', 'Füllhöhe'], ['1 cl', 'Mangosirup'], ['auffüllen', 'Milch'], ['', 'Eiswürfel']],
    steps: ['1 Löffel Matcha in eine Schüssel geben und mit heißem Wasser schaumig rühren.', 'Mangopüree ins Glas geben (ca. 2 cm hoch).', '1 cl Mangosirup dazugeben.', 'Mit Milch und Eiswürfeln auffüllen.', 'Schaumige Matcha-Masse langsam obendrauf geben (ca. 1 cm hoch).'],
    garnish: 'Strohhalm'
  },
  {
    id: 'melon-colada', name: 'Melon Colada', cat: 'coladas',
    glass: 'Hurricane-Glas', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['2 cl', 'Sahne'], ['2 cl', 'Kokossirup'], ['4 cl', 'Melonenlikör'], ['4 cl', 'weißer Rum'], ['auffüllen', 'Ananassaft'], ['auffüllen', 'Maracujasaft']],
    steps: ['Sahne, Kokossirup, Melonenlikör und weißen Rum mit Eis in den Shaker geben.', 'Mit Ananas- und Maracujasaft auffüllen.', 'Shaken und ins Glas geben.', 'Mit Sahne und etwas Melonenlikör servieren.'],
    garnish: 'Sahne, Melonenlikör, Melonenspalte'
  },
  {
    id: 'melon-sour', name: 'Melon Sour', cat: 'sours',
    glass: 'Tumbler', ice: 'Eiswürfel', method: 'Dry Shake',
    ing: [['6 cl', 'Melonenlikör'], ['3 cl', 'Zitronensaft'], ['4 cl', 'Orangensaft'], ['1 cl', 'Zuckersirup'], ['2 cl', 'Eiweiß']],
    steps: ['Alle Zutaten ohne Eis in den Shaker geben.', 'Dry Shaken.', 'Eis hinzufügen.', 'Shaken.', 'Ins Glas abseihen.'],
    garnish: 'Getrocknete Limettenscheibe, Minze'
  },
  {
    id: 'mojito', name: 'Mojito', cat: 'longdrinks',
    glass: 'Longdrinkglas', ice: 'Crushed Ice', method: 'Muddeln',
    ing: [['4', 'Limettenspalten'], ['2 cl', 'Lime'], ['2 cl', 'Zuckersirup'], ['2', 'Minzzweige'], ['6 cl', 'weißer Rum'], ['auffüllen', 'Sprudelwasser']],
    steps: ['Limettenspalten, Lime und Zuckersirup ins Glas geben.', 'Muddeln.', '2 Minzzweige dazugeben.', 'Glas mit Crushed Ice füllen.', '6 cl weißen Rum dazugeben.', 'Rühren.', 'Mit Sprudel auffüllen.'],
    garnish: 'Minzzweig, Limettenscheibe, Strohhalm'
  },
  {
    id: 'moscow-mule', name: 'Moscow Mule', cat: 'longdrinks',
    glass: 'Kupferbecher', ice: 'Eiswürfel', method: 'Bauen',
    ing: [['2 cl', 'Lime'], ['5 cl', 'Vodka'], ['1 cl', 'Gurkensirup'], ['2', 'Limettenspalten'], ['1', 'Gurkenscheibe'], ['auffüllen', 'Ginger Beer']],
    steps: ['Becher mit Eis füllen.', 'Lime, Vodka und Gurkensirup hineingeben.', '2 Limettenspalten und 1 Gurkenscheibe dazugeben.', 'Rühren.', 'Mit Ginger Beer auffüllen.'],
    garnish: 'Limettenspalten, Minze'
  },
  {
    id: 'pina-colada', name: 'Piña Colada', cat: 'coladas',
    glass: 'Hurricane-Glas', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['2 cl', 'Sahne'], ['4 cl', 'Kokossirup'], ['6 cl', 'weißer Rum'], ['auffüllen', 'Ananassaft']],
    steps: ['Sahne, Kokossirup und weißen Rum mit Eis in den Shaker geben.', 'Mit Ananassaft auffüllen.', 'Shaken und ins Glas geben.', 'Mit Sahne, Ananas und Cocktailkirsche anrichten.'],
    garnish: 'Sahne, Ananasspalte, Cocktailkirsche'
  },
  {
    id: 'pimms-cup', name: "Pimm's Cup", cat: 'longdrinks',
    glass: 'Longdrinkglas', ice: 'Eiswürfel', method: 'Bauen',
    ing: [['2', 'Gurkenscheiben'], ['1', 'Orangenscheibe'], ['1', 'Limettenspalte'], ['5 cl', "Pimm's No. 1"], ['auffüllen', 'Ginger Ale']],
    steps: ['Gurkenscheiben, Orangenscheibe und Limettenspalte ins Glas geben.', 'Glas mit Eis füllen.', "5 cl Pimm's No. 1 dazugeben.", 'Mit Ginger Ale auffüllen.', 'Rühren.'],
    garnish: 'Minze, Zitronenscheibe'
  },
  {
    id: 'pornstar-martini', name: 'Pornstar Martini', cat: 'short',
    glass: 'Coupette', ice: 'ohne Eis', method: 'Shaken',
    ing: [['4 cl', 'Vodka'], ['2 cl', 'Passoã'], ['1 cl', 'Maracujasirup'], ['2 cl', 'Vanillesirup'], ['2 cl', 'Lime'], ['1 Schuss', 'Maracujasaft'], ['4 cl', 'Prosecco', 'separat']],
    steps: ['Vodka, Passoã, Maracujasirup, Vanillesirup, Lime und Maracujasaft mit Eis in den Shaker geben.', 'Kräftig shaken.', 'Ins Glas abseihen.', 'Mit einer halben Maracuja dekorieren.', '4 cl Prosecco separat im Shotglas dazu servieren.'],
    garnish: 'Halbe Maracuja, Prosecco im Shotglas'
  },
  {
    id: 'rainbow', name: 'Rainbow', cat: 'longdrinks',
    glass: 'Longdrinkglas', ice: 'Eiswürfel', method: 'Schichten',
    ing: [['2 cl', 'Lime'], ['4 cl', 'Vodka'], ['auffüllen', 'Orangensaft'], ['2 cl', 'Grenadine'], ['2 cl', 'Blue Curaçao']],
    steps: ['Glas mit Eis füllen.', 'Lime und Vodka hineingeben.', 'Mit Orangensaft auffüllen.', '2 cl Grenadine langsam am Glasrand absinken lassen.', '2 cl Blue Curaçao vorsichtig über einen Barlöffel schichten.', 'Nicht umrühren!'],
    garnish: 'Orangenzeste'
  },
  {
    id: 'sarti-spritz', name: 'Sarti Spritz', cat: 'spritz',
    glass: 'Weinglas', ice: 'Eiswürfel', method: 'Bauen',
    ing: [['6 cl', 'Sarti Rosa'], ['9 cl', 'Prosecco'], ['3 cl', 'Sprudelwasser']],
    steps: ['Glas mit Eis füllen.', 'Sarti Rosa, Prosecco und Sprudelwasser hineingeben.', 'Vorsichtig rühren.'],
    garnish: 'Getrocknete Limettenscheibe am Glasrand, frische Limettenscheibe im Glas'
  },
  {
    id: 'sex-on-the-beach', name: 'Sex on the Beach', cat: 'tiki',
    glass: 'Hurricane-Glas', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['2 cl', 'Zitronensaft'], ['2 cl', 'Pfirsichlikör'], ['4 cl', 'Vodka'], ['auffüllen', 'Orangensaft'], ['auffüllen', 'Ananassaft'], ['1 cl', 'Grenadine', 'floaten']],
    steps: ['Zitronensaft, Pfirsichlikör und Vodka mit Eis in den Shaker geben.', 'Mit Orangen- und Ananassaft auffüllen.', 'Shaken und ins Glas geben.', '1 cl Grenadine floaten.'],
    garnish: 'Orangenscheibe, Ananasspalte'
  },
  {
    id: 'lotus-shake', name: 'Lotus Shake', cat: 'shakes', af: true,
    glass: 'Hurricane-Glas', ice: 'ohne Eis', method: 'Mixen',
    ing: [['2 Kugeln', 'Vanilleeis'], ['3', 'Lotuskekse'], ['', 'Milch']],
    steps: ['Vanilleeis, Lotuskekse und Milch in den Mixer geben.', 'Cremig mixen.', 'Ins Glas füllen.', 'Mit Sahne, Lotussoße und einem runden Lotuskeks anrichten.'],
    garnish: 'Sahne, Lotussoße, Lotuskeks'
  },
  {
    id: 'oreo-shake', name: 'Oreo Shake', cat: 'shakes', af: true,
    glass: 'Hurricane-Glas', ice: 'ohne Eis', method: 'Mixen',
    ing: [['2 Kugeln', 'Vanilleeis'], ['3', 'Oreo-Kekse'], ['', 'Milch']],
    steps: ['Vanilleeis, Oreo-Kekse und Milch in den Mixer geben.', 'Cremig mixen.', 'Ins Glas füllen.', 'Mit Sahne, Schokoladensoße und einem Oreo-Keks anrichten.'],
    garnish: 'Sahne, Schokoladensoße, Oreo-Keks'
  },
  {
    id: 'raffaello-shake', name: 'Raffaello Shake', cat: 'shakes', af: true,
    glass: 'Hurricane-Glas', ice: 'ohne Eis', method: 'Mixen',
    ing: [['2 Kugeln', 'Vanilleeis'], ['3', 'Raffaello'], ['', 'Milch']],
    steps: ['Vanilleeis, Raffaello und Milch in den Mixer geben.', 'Cremig mixen.', 'Ins Glas füllen.', 'Mit Sahne, Schokoladensoße und einem Raffaello anrichten.'],
    garnish: 'Sahne, Schokoladensoße, Raffaello'
  },
  {
    id: 'spaghetti-eis-shot', name: 'Spaghetti Eis Shot', cat: 'shots',
    glass: 'Shotglas', ice: 'ohne Eis', method: 'Shaken',
    ing: [['1 cl', 'Sahne'], ['1 cl', 'Erdbeersirup'], ['2 cl', 'Vodka']],
    steps: ['Alle Zutaten mit Eis in den Shaker geben.', 'Shaken.', 'Ins Shotglas abseihen.'],
    garnish: '–'
  },
  {
    id: 'strawberry-colada', name: 'Strawberry Colada', cat: 'coladas',
    glass: 'Hurricane-Glas', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['2 cl', 'Sahne'], ['3 cl', 'Kokossirup'], ['3 cl', 'Erdbeersirup'], ['6 cl', 'weißer Rum'], ['auffüllen', 'Ananassaft']],
    steps: ['Sahne, Kokossirup, Erdbeersirup und weißen Rum mit Eis in den Shaker geben.', 'Mit Ananassaft auffüllen.', 'Shaken und ins Glas geben.', 'Mit Sahne, Erdbeersoße und Erdbeeren anrichten.'],
    garnish: 'Sahne, Erdbeersoße, Erdbeeren'
  },
  {
    id: 'swimming-pool', name: 'Swimming Pool', cat: 'coladas',
    glass: 'Hurricane-Glas', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['2 cl', 'Sahne'], ['2 cl', 'Kokossirup'], ['2 cl', 'Blue Curaçao'], ['3 cl', 'weißer Rum'], ['3 cl', 'Vodka'], ['auffüllen', 'Ananassaft']],
    steps: ['Sahne, Kokossirup, Blue Curaçao, weißen Rum und Vodka mit Eis in den Shaker geben.', 'Mit Ananassaft auffüllen.', 'Shaken und ins Glas geben.', 'Mit Sahne, etwas Blue Curaçao, Ananas und Cocktailkirsche anrichten.'],
    garnish: 'Sahne, Blue Curaçao, Ananasspalte, Cocktailkirsche'
  },
  {
    id: 'tequila-sunrise', name: 'Tequila Sunrise', cat: 'longdrinks',
    glass: 'Longdrinkglas', ice: 'Eiswürfel', method: 'Bauen',
    ing: [['2 cl', 'Zitronensaft'], ['6 cl', 'Tequila'], ['2 cl', 'Triple Sec'], ['auffüllen', 'Orangensaft'], ['2 cl', 'Grenadine', 'floaten']],
    steps: ['Glas mit Eis füllen.', 'Zitronensaft, Tequila und Triple Sec hineingeben.', 'Mit Orangensaft auffüllen.', '2 cl Grenadine floaten.'],
    garnish: 'Orangenzeste'
  },
  {
    id: 'touch-down', name: 'Touch Down', cat: 'longdrinks',
    glass: 'Longdrinkglas', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['2 cl', 'Zitronensaft'], ['2 cl', 'Apricot Brandy'], ['2 cl', 'Grenadine'], ['6 cl', 'Vodka'], ['auffüllen', 'Maracujasaft']],
    steps: ['Zitronensaft, Apricot Brandy, Grenadine und Vodka mit Eis in den Shaker geben.', 'Mit Maracujasaft auffüllen.', 'Shaken.', 'In ein Glas mit Eis füllen.'],
    garnish: 'Halbe Maracuja'
  },
  {
    id: 'tropical', name: 'Tropical', cat: 'longdrinks',
    glass: 'Longdrinkglas', ice: 'Eiswürfel', method: 'Bauen',
    ing: [['2 cl', 'Lime'], ['4 cl', 'Gin'], ['2 cl', 'Orangenlikör'], ['auffüllen', 'Orangensaft'], ['2 cl', 'Grenadine', 'floaten']],
    steps: ['Glas mit Eis füllen.', 'Lime, Gin und Orangenlikör hineingeben.', 'Mit Orangensaft auffüllen.', 'Rühren.', '2 cl Grenadine floaten.'],
    garnish: 'Getrocknete Orangenscheibe, Cocktailkirsche'
  },
  {
    id: 'virgin-colada', name: 'Virgin Colada', cat: 'coladas', af: true,
    glass: 'Hurricane-Glas', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['2 cl', 'Sahne'], ['2 cl', 'Kokossirup'], ['auffüllen', 'Ananassaft']],
    steps: ['Sahne und Kokossirup mit Eis in den Shaker geben.', 'Mit Ananassaft auffüllen.', 'Shaken und ins Glas geben.', 'Mit Sahne, Ananas und Cocktailkirsche anrichten.'],
    garnish: 'Sahne, Ananasspalte, Cocktailkirsche'
  },
  {
    id: 'virgin-mojito', name: 'Virgin Mojito', cat: 'longdrinks', af: true,
    glass: 'Longdrinkglas', ice: 'Crushed Ice', method: 'Muddeln',
    ing: [['4', 'Limettenspalten'], ['2 cl', 'Lime'], ['1 cl', 'Zuckersirup'], ['2', 'Minzzweige'], ['auffüllen', 'Sprite']],
    steps: ['Limettenspalten, Lime und Zuckersirup ins Glas geben.', 'Muddeln.', '2 Minzzweige dazugeben.', 'Glas mit Crushed Ice füllen.', 'Mit Sprite auffüllen.', 'Rühren.'],
    garnish: 'Minzzweig, Limettenscheibe, Strohhalm'
  },
  {
    id: 'virgin-strawberry-colada', name: 'Virgin Strawberry Colada', cat: 'coladas', af: true,
    glass: 'Hurricane-Glas', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['2 cl', 'Sahne'], ['2 cl', 'Kokossirup'], ['2 cl', 'Erdbeersirup'], ['auffüllen', 'Ananassaft']],
    steps: ['Sahne, Kokossirup und Erdbeersirup mit Eis in den Shaker geben.', 'Mit Ananassaft auffüllen.', 'Shaken und ins Glas geben.', 'Mit Sahne, Erdbeersoße und Erdbeeren anrichten.'],
    garnish: 'Sahne, Erdbeersoße, Erdbeeren'
  },
  {
    id: 'white-russian', name: 'White Russian', cat: 'short',
    glass: 'Tumbler', ice: 'Eiswürfel', method: 'Rühren',
    ing: [['3 cl', 'Vodka'], ['5 cl', 'Kahlúa'], ['3 cl', 'Sahne', 'schichten']],
    steps: ['Vodka und Kahlúa mit Eis in den Shaker geben.', 'Rühren.', 'Ins Glas abseihen.', '3 cl Sahne obendrauf schichten.', 'Mit Kakaopulver, Kaffeebohnen und Löffelbiskuit servieren.'],
    garnish: 'Kakaopulver, Kaffeebohnen, Löffelbiskuit'
  },
  {
    id: 'whisky-sour', name: 'Whisky Sour', cat: 'sours',
    glass: 'Tumbler', ice: 'Eiswürfel', method: 'Dry Shake',
    ing: [['6 cl', 'Bourbon Whiskey'], ['3 cl', 'Zitronensaft'], ['2 cl', 'Zuckersirup'], ['2 cl', 'Eiweiß']],
    steps: ['Alle Zutaten ohne Eis in den Shaker geben.', 'Dry Shaken.', 'Eis hinzufügen.', 'Kräftig shaken.', 'Auf frisches Eis ins Glas abseihen.'],
    garnish: 'Orangenzeste'
  },
  {
    id: 'zombie', name: 'Zombie', cat: 'tiki',
    glass: 'Longdrinkglas', ice: 'Eiswürfel', method: 'Shaken',
    ing: [['4 cl', 'Zitronensaft'], ['2 cl', 'Maracujasirup'], ['4 cl', 'brauner Rum'], ['4 cl', 'weißer Rum'], ['2 cl', '151er Rum'], ['auffüllen', 'Ananassaft'], ['auffüllen', 'Orangensaft'], ['2 cl', 'Grenadine', 'floaten']],
    steps: ['Zitronensaft, Maracujasirup und alle drei Rumsorten mit Eis in den Shaker geben.', 'Mit Ananas- und Orangensaft auffüllen.', 'Shaken.', 'In ein Glas mit Eis füllen.', '2 cl Grenadine floaten.'],
    garnish: 'Limettenscheibe'
  }
];
