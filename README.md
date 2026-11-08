# Iris & Michi – Der vergessene Code

Ein Escape Room fürs Handy als Hochzeitsgeschenk. Sophie und Lukas haben ihr Geschenk für Iris & Michi mit einem Zahlenschloss gesichert – und den Code in einer Rätselreise durch vier Themenwelten versteckt. Die Trauzeugen Sophie und Bernhard tauchen mit Notizen auf.

| Thema | Level | Ziffer |
|---|---|---|
| Japan | Das Samurai-Dojo, Das Teehaus, Die Sushi-Bar, Das Onsen | 7 |
| Casino | Der Roulettesaal, Der Pokertisch | 3 |
| Therme | Die Therme, Die Sauna | 9 |
| Brettspiele | Das Spielezimmer, Die Bombe (Bomb Busters) | 2 |

Ein Thema öffnet sich erst, wenn das vorherige geschafft ist. Nach jedem Thema gibt es eine Ziffer. Am Ende zeigt die App alle vier in der richtigen Reihenfolge – das ist der Code für das **echte Zahlenschloss** am Geschenk (aktuell `7392`).

20 Rätsel mit je 3 Tipps, die nur in die richtige Richtung deuten. Alle Rätsel haben genau eine Lösung (nachgerechnet). Der Spielstand wird am Handy gespeichert.

**Testmodus:** Auf der Startseite unten „Testmodus“ antippen – dann sind alle Räume offen und bei jedem Rätsel steht die Lösung dabei. Vor dem echten Spiel wieder ausschalten!

## Online

`https://lukasindy.github.io/IundM/`

## Auf dem Handy wie eine App installieren

- **iPhone (Safari):** Link öffnen → Teilen-Symbol → **Zum Home-Bildschirm**.
- **Android (Chrome):** Link öffnen → Menü ⋮ → **App installieren** bzw. **Zum Startbildschirm hinzufügen**.

## Rätsel anpassen

Alles Inhaltliche steht in **`raetsel.js`**: Story, Texte, Lösungen, Tipps und die vier Ziffern.
**Wichtig:** Trag bei `ziffer: { … wert: "7" }` die Ziffern eures echten Schlosses ein (Reihenfolge: Japan, Casino, Therme, Brettspiele).

Bei Bild-Rätseln steckt die Lösung im Bild (Jetons, Spinde, Würfelturm, Spieleregal, Kabelständer …).
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
