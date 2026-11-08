# Iris & Michi – Die verschwundenen Ringe

Ein Hochzeits-Escape-Room fürs Handy. Onkel Ferdi hat die Ringe versteckt, und seine Spur führt durch vier Themenwelten:

| Thema | Räume | Ziffer |
|---|---|---|
| Japan | Der Zen-Garten, Das Teehaus | 7 |
| Casino | Der Roulettesaal, Der Pokertisch | 3 |
| Therme & Sauna | Die Therme, Die Sauna | 9 |
| Brettspiele | Das Spielezimmer, Die Bombe (Bomb Busters) | 2 |

Nach jedem Thema gibt es eine Ziffer. Am Ende zeigt die App alle vier in der richtigen Reihenfolge – das ist der Code für euer **echtes Zahlenschloss** (aktuell `7392`).

16 Rätsel, je 3 Tipps (die nur in die richtige Richtung deuten), Spielstand wird am Handy gespeichert.

**Testmodus:** Auf der Startseite unten „Testmodus“ antippen – dann steht bei jedem Rätsel die Lösung dabei. Vor dem echten Spiel wieder ausschalten! Läuft auf **iOS und Android**, gehostet über **GitHub Pages**.

## Online

Die Seite liegt unter `https://<dein-github-name>.github.io/IundM/`
(GitHub → Repository **IundM** → **Settings → Pages**: Branch `main`, Ordner `/ (root)`).

## Auf dem Handy wie eine App installieren

- **iPhone (Safari):** Link öffnen → Teilen-Symbol → **Zum Home-Bildschirm**.
- **Android (Chrome):** Link öffnen → Menü ⋮ → **App installieren** bzw. **Zum Startbildschirm hinzufügen**.

## Rätsel anpassen

Alles Inhaltliche steht in **`raetsel.js`**: Texte, Lösungen, Tipps und die vier Ziffern.
**Wichtig:** Trag bei `ziffer: { … wert: "7" }` die Ziffern eures echten Schlosses ein (Reihenfolge: Japan, Casino, Therme, Brettspiele).

Bei Bild-Rätseln steckt die Lösung im Bild (Jetons, Spinde, Würfel, Spieleregal, Kabelständer …).
Wenn du ein Bild austauschst, passe die Lösung an.

Dateien kannst du direkt auf GitHub ändern: Datei anklicken → Stift-Symbol → **Commit changes**. Nach ca. einer Minute ist die neue Version online.

## Dateien

| Datei | Wofür |
|---|---|
| `raetsel.js` | Story, Räume, Rätsel, Tipps, Ziffern – **hier wird gebastelt** |
| `app.js` | Spiel-Logik |
| `style.css` | Aussehen |
| `index.html` | Grundgerüst |
| `manifest.webmanifest`, `sw.js`, `icons/` | Installierbar als App + offline spielbar |
| `bilder/` | Raum- und Rätselbilder |
