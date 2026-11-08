# Masons Drinks

Web-App für das Thekenteam: alle Drinks aus dem Masons-Getränkehandbuch mit Foto, Zutaten, Zubereitung, Glas und Deko. Läuft auf jedem Handy im Browser, funktioniert nach dem ersten Öffnen auch offline und lässt sich zum Home-Bildschirm hinzufügen.

**Adresse:** https://snopebushyfam.github.io/Mason-s-Drinks-/
**QR-Code-Aushang zum Drucken:** https://snopebushyfam.github.io/Mason-s-Drinks-/aushang.html

## Funktionen
- Suche nach Name **oder Zutat** (z. B. „Kokos“, „Tequila“)
- Filter: Alkoholfrei, Longdrinks, Tiki, Short Drinks, Sours, Spritz, Coladas, Frozen, Shots, Shakes, Matcha
- Raster- oder Listenansicht
- Rezeptseite mit Glas, Eis, Technik, Zutaten, Schritten zum Abhaken, Deko
- Mengen für 1–4 Drinks umrechnen
- Bildschirm bleibt an, solange ein Rezept offen ist
- Direkter Link zu jedem Drink: `…/#/mojito`

## Drinks ändern oder hinzufügen
1. `drinks.js` öffnen und einen Block kopieren oder anpassen (Erklärung der Felder steht oben in der Datei).
2. Foto als JPG nach `img/<id>.jpg` legen.
3. In `sw.js` die `VERSION` um eins erhöhen und in `index.html` und `sw.js` die `?v=` Nummer gleich mit erhöhen, damit alle Handys die neue Version laden.

## Online stellen (einmalig)
GitHub → Repository → **Settings → Pages** → Source: „Deploy from a branch“, Branch: `main`, Ordner: `/ (root)` → Save. Nach 1–2 Minuten ist die App unter der Adresse oben erreichbar.
