/*
  ============================================================
  HIER STEHT DAS GANZE SPIEL – Story, Räume, Rätsel, Tipps.
  Du kannst alles ändern, ohne den restlichen Code anzufassen.
  ============================================================

  Rätseltypen:
    "text"        – Antwort eintippen. "loesung" ist eine Liste erlaubter Antworten
                    (Groß/Klein, Leerzeichen und Umlaute sind egal).
    "schloss"     – Zahlenschloss. "loesung" ist der Code als Text, z. B. "742".
                    Die Anzahl der Rädchen ergibt sich aus der Länge.
    "auswahl"     – Mehrere Antwortmöglichkeiten. "loesung" ist der Text der richtigen.
    "reihenfolge" – Karten in die richtige Reihenfolge tippen. "karten" in RICHTIGER
                    Reihenfolge eintragen – die App mischt sie selbst.

  Zusätzliche Felder (optional):
    "bild"     – Bild aus dem Ordner "bilder/" (kann durch eigene Fotos ersetzt werden)
    "gedicht"  – Zeilen als Liste. "" macht eine Leerzeile, "# Titel" eine kleine Überschrift.
    "tafeln"   – große Schriftzeichen nebeneinander (z. B. japanische Zeichen)
    "ziffer"   – (an einem Raum) diese Ziffer bekommt man, wenn der Raum geschafft ist.
                 Am Ende zeigt die App alle Ziffern in Raum-Reihenfolge an – das ist der
                 Code für euer ECHTES Zahlenschloss. Trag hier die Ziffern eures Schlosses ein!

  Wichtig: Wenn du ein Rätsel änderst, prüf, dass Bild, Text und Lösung noch
  zusammenpassen! Alle Rätsel hier haben genau eine Lösung (nachgerechnet).
*/

window.SPIEL = {
  titel: "Iris & Michi",
  untertitel: "Der vergessene Code",
  startBild: "bilder/titel.svg",
  startText: [
    "Liebe Iris, lieber Michi – herzlichen Glückwunsch zu eurer kirchlichen Hochzeit!",
    "Sophie und Lukas haben euch ein ganz besonderes Geschenk besorgt und es mit einem Zahlenschloss gesichert. Den Code hat Sophie gut versteckt – in einer Reihe von Rätseln, die nur ihr zwei lösen könnt. Wohin sie euch führen, verraten wir noch nicht.",
    "Das Problem: Sophie weiß die Lösungen selbst nicht mehr. Und Lukas hat ihr »ehrlich gesagt nicht so ganz zugehört« – ein bisschen helfen kann er euch aber trotzdem. Sophies Notizen und ein paar Kommentare von Bernhard, eurem zweiten Trauzeugen, haben sie euch hinterlassen. Den Rest müsst ihr selbst knacken.",
    "Unterwegs findet ihr vier Ziffern. Mit allen vier öffnet ihr euer Geschenk. Viel Glück!"
  ],

  // Die vier Themen auf der Übersicht. Welche Räume zu einem Thema gehören, ergibt sich
  // aus der Reihenfolge unten: Ein Thema endet mit dem Raum, der die "ziffer" vergibt.
  themen: {
    "Japan": { kurz: "Das Land der aufgehenden Sonne", bild: "bilder/samurai.svg" },
    "Casino": { kurz: "Hohe Einsätze, kühle Köpfe", bild: "bilder/roulette.svg" },
    "Therme": { kurz: "Warm, wärmer, Aufguss", bild: "bilder/therme.svg" },
    "Brettspiele": { kurz: "Würfel, Schachteln und eine Bombe", bild: "bilder/regal.svg" }
  },

  raeume: [
    // ======================= JAPAN =======================
    {
      id: "samurai",
      thema: "Japan",
      name: "Das Samurai-Dojo",
      kurz: "Ehre, Klinge, Disziplin",
      bild: "bilder/samurai.svg",
      intro: [
        "Sophies erste Notiz führt euch in ein Dojo: Tatami-Matten, eine Rüstung in der Ecke und an der Wand ein großes Banner.",
        "Vor einem verschlossenen Waffenschrank liegt ein Holzbrett mit vier leeren Sitzkissen, nummeriert von 1 bis 4 – von links nach rechts. Bernhard hat dazugeschrieben: »Hier standen vier Samurai-Figuren. Ich hab sie beim Putzen weggeräumt. Sorry.«"
      ],
      raetsel: [
        {
          id: "samurai-1",
          titel: "Die vier Samurai",
          typ: "schloss",
          text: [
            "»Vier Samurai saßen hier: Kenji, Hiro, Taro und Yuki. Jeder trug ein Wappen (rot, blau, grün oder weiß) und eine Waffe (Katana, Bogen, Naginata oder Speer).",
            "1. Der Bogenschütze saß direkt rechts neben Hiro.",
            "2. Yuki saß ganz außen und trug kein Katana.",
            "3. Das rote Wappen gehörte dem Samurai mit der Naginata.",
            "4. Taro saß irgendwo links vom weißen Wappen.",
            "5. Der Speerträger hatte ein blaues Wappen und saß direkt neben dem roten Wappen.",
            "6. Kenji trug das Katana.",
            "7. Das grüne Wappen lag auf Platz 1.",
            "8. Taro hat nie einen Speer angefasst.",
            "Der Code für den Waffenschrank: die Platznummer von Kenji, dann von Hiro, dann von Taro, dann von Yuki.« – S."
          ],
          frage: "Öffnet den Waffenschrank.",
          loesung: "1324",
          tipps: [
            "Zeichnet euch eine Tabelle mit vier Plätzen und tragt ein, was sicher ist. Hinweis 7 ist ein guter Anfang.",
            "Kenji hat das Katana, also kann er nicht der Speerträger mit dem blauen Wappen sein. Und wo kann Yuki überhaupt sitzen, wenn Platz 1 schon ein bestimmtes Wappen hat?",
            "Der Bogenschütze sitzt rechts neben Hiro – Hiro kann also nicht auf Platz 4 sitzen. Probiert aus, wo Hiro sitzen kann, ohne dass ein anderer Hinweis bricht."
          ],
          erfolg: "Klack – der Waffenschrank öffnet sich. Darin liegt ein Katana. In die Klinge sind seltsame Buchstaben graviert."
        },
        {
          id: "samurai-2",
          titel: "Die Gravur",
          typ: "text",
          bild: "bilder/bushido.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "Auf der Klinge steht: YJJMFZX",
            "Sophies Notiz dazu: »Nicht jede Tugend durfte mitmachen. Nur die Tugenden, die mit einem einzigen Schriftzeichen geschrieben werden, haben jeden Buchstaben um je einen Schritt im Alphabet nach vorne geschoben. Schiebt sie zurück.«"
          ],
          frage: "Was steht wirklich auf der Klinge?",
          platzhalter: "Wort eintippen",
          loesung: ["teehaus", "das teehaus", "ins teehaus"],
          tipps: [
            "Schaut euch das Banner genau an: Manche Tugenden bestehen aus einem Schriftzeichen, manche aus zwei.",
            "Zählt nur die Tugenden mit genau einem Zeichen. So viele Schritte wurde jeder Buchstabe nach vorne geschoben.",
            "Geht im Alphabet genauso viele Schritte zurück – vor dem A kommt rückwärts wieder das Z."
          ],
          erfolg: "Das Teehaus! Lukas hat unter die Gravur gekritzelt: »Ich hätte auf Karaoke getippt.«"
        }
      ]
    },
    {
      id: "teehaus",
      thema: "Japan",
      name: "Das Teehaus",
      kurz: "Matcha und Glücksbringer",
      bild: "bilder/teehaus.svg",
      intro: [
        "Das Teehaus hat Schiebetüren aus Papier und Tatami-Matten. Schuhe bleiben draußen.",
        "Auf einem niedrigen Regal stehen vier Glücksbringer: eine Winkekatze, ein Daruma, eine Kokeshi-Puppe und ein Tanuki. Daneben eine alte Balkenwaage – und eine Notiz von Sophie."
      ],
      raetsel: [
        {
          id: "teehaus-1",
          titel: "Die Glücksbringer",
          typ: "schloss",
          bild: "bilder/teehaus.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Ich habe alle Figuren gewogen, aber nur die Vergleiche aufgeschrieben:",
            "Die Winkekatze wiegt 3 Teile mehr als die Kokeshi.",
            "Der Daruma wiegt so viel wie Winkekatze und Kokeshi zusammen.",
            "Zwei Tanuki wiegen genauso viel wie Daruma und Kokeshi zusammen.",
            "Alle vier Figuren zusammen wiegen 35 Teile.",
            "Das Gewicht des Daruma öffnet die Teedose.« – S."
          ],
          frage: "Wie viel wiegt der Daruma?",
          loesung: "13",
          tipps: [
            "Drückt alle Figuren durch das Gewicht der Kokeshi aus.",
            "Winkekatze = Kokeshi + 3. Was ist dann der Daruma – und was zwei Tanuki?",
            "Wenn ihr alles zusammenzählt, bekommt ihr eine Gleichung mit nur einer Unbekannten. Achtung: Ein Tanuki ist die Hälfte von etwas."
          ],
          erfolg: "In der Teedose liegt kein Tee, sondern ein zusammengerolltes Rollbild mit Pinselschrift."
        },
        {
          id: "teehaus-2",
          titel: "Das Rollbild",
          typ: "text",
          tafeln: ["十九", "二十一", "十九", "八", "九"],
          text: [
            "Auf dem Rollbild stehen fünf Zeichen-Gruppen. An der Wand des Teehauses hängt eine Zahlentafel:",
            "一 1 · 二 2 · 三 3 · 四 4 · 五 5 · 六 6 · 七 7 · 八 8 · 九 9 · 十 10",
            "Lukas: »Größere Zahlen schreibt man in Japan aus diesen Zeichen zusammen. Und jede Zahl ist eigentlich ein Buchstabe.«"
          ],
          frage: "Wohin müsst ihr als Nächstes?",
          platzhalter: "Ort eintippen",
          loesung: ["sushi", "sushibar", "sushi-bar", "die sushibar", "die sushi-bar", "in die sushibar"],
          tipps: [
            "十 ist 10. Steht eine Zahl davor, wird multipliziert – steht eine dahinter, wird addiert.",
            "So wird zum Beispiel 三十二 zu 3 × 10 + 2 = 32.",
            "Wenn ihr fünf Zahlen habt: Welcher Buchstabe steht im Alphabet an dieser Stelle?"
          ],
          erfolg: "Bernhard hat auf die Rückseite des Rollbilds geschrieben: »Ich hab Hunger. Wir sehen uns da.«"
        }
      ]
    },
    {
      id: "sushi",
      thema: "Japan",
      name: "Die Sushi-Bar",
      kurz: "Alles läuft im Kreis",
      bild: "bilder/sushi.svg",
      intro: [
        "In der Sushi-Bar dreht sich ein Förderband mit bunten Tellern im Kreis. Bernhard ist natürlich schon weg, aber der Koch schiebt euch einen zerknitterten Kassenbon hin.",
        "»Die Frau Sophie war vorgestern da«, sagt er. »Sie hat gesagt, ihr wisst dann schon.«"
      ],
      raetsel: [
        {
          id: "sushi-1",
          titel: "Sophies Rechnung",
          typ: "schloss",
          bild: "bilder/teller.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Ich habe genau 10 Teller gegessen und dafür 37 Euro bezahlt.",
            "Von jeder Farbe war mindestens ein Teller dabei.",
            "Ich hatte mehr blaue als grüne Teller – und genau doppelt so viele rote wie goldene.",
            "Der Code für die Kasse: wie viele grüne, blaue, rote und goldene Teller ich hatte – genau in dieser Reihenfolge.« – S."
          ],
          frage: "Öffnet die Kasse.",
          loesung: "1621",
          tipps: [
            "Schaut auf der Preistafel nach, was jede Farbe kostet. Ihr braucht zwei Gleichungen: eine für die Anzahl der Teller, eine für den Preis.",
            "Rote und goldene Teller kommen immer im Paket: Zu jedem goldenen gehören zwei rote. Rechnet aus, was so ein Paket an Tellern und Euro kostet.",
            "Probiert erst aus, wie viele goldene Teller es höchstens sein können. Dann bleibt für Grün und Blau nicht mehr viel Spielraum."
          ],
          erfolg: "Die Kasse springt auf. Darin liegt ein Zettel: »Schaut aufs Band – da fehlen zwei Teller.«"
        },
        {
          id: "sushi-2",
          titel: "Das Förderband",
          typ: "schloss",
          bild: "bilder/foerderband.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "Auf jedem Teller am Förderband klebt eine Nummer. Sophie schreibt:",
            "»Meine Teller folgen einer Regel. Zwei hat Bernhard gegessen – ihre Nummern, von links nach rechts, öffnen die Box des Kochs.«"
          ],
          frage: "Welche Nummern hatten die fehlenden Teller?",
          loesung: "2947",
          tipps: [
            "Schaut nicht nur, wie groß die Abstände zwischen den Nummern sind, sondern wie jede Nummer aus den vorherigen entsteht.",
            "Nehmt zwei Teller, die direkt nebeneinander stehen. Was haben sie mit dem Teller rechts daneben zu tun?",
            "Prüft eure Regel am Ende: Die beiden fehlenden Nummern müssen zusammen genau die letzte Nummer ergeben."
          ],
          erfolg: "Die Box öffnet sich. Darin liegt ein Holzschild mit dem Zeichen ♨ und Lukas’ Handschrift: »Onsen. Bringt Handtücher mit.«"
        }
      ]
    },
    {
      id: "onsen",
      thema: "Japan",
      name: "Das Onsen",
      kurz: "Heiße Quellen unter freiem Himmel",
      ziffer: { thema: "Japan", wert: "7" },
      bild: "bilder/onsen.svg",
      intro: [
        "Ein Onsen dampft zwischen Felsen und Bambus. Aus einem Rohr sprudelt heißes Quellwasser, daneben plätschert ein kalter Bergbach.",
        "Ein Holzkasten am Beckenrand ist mit einem Zahlenschloss gesichert. Natürlich hängt ein Zettel daran."
      ],
      raetsel: [
        {
          id: "onsen-1",
          titel: "Das perfekte Bad",
          typ: "schloss",
          bild: "bilder/quellen.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Das Becken fasst genau 15 Eimer Wasser. Ich fülle es nur mit Wasser aus der heißen Quelle und aus dem kalten Bach – die Temperaturen stehen auf den Schildern.",
            "Lukas’ perfektes Bad hat genau 48 Grad. Ja, er mag es heiß.",
            "Der Code: wie viele Eimer heißes Wasser, dann wie viele Eimer kaltes Wasser.« – S."
          ],
          frage: "Öffnet den Holzkasten.",
          loesung: "78",
          tipps: [
            "Wenn man Wasser mischt, ist die Temperatur am Ende der Durchschnitt aller Eimer.",
            "Rechnet aus, wie viel »Wärme« 15 Eimer mit 48 Grad zusammen haben – und wie viel jeder heiße und jeder kalte Eimer beiträgt.",
            "Jeder heiße Eimer, den ihr gegen einen kalten tauscht, macht das ganze Becken ein Stück wärmer. Um wie viel genau?"
          ],
          erfolg: "Im Holzkasten liegt ein Fernglas und Sophies nächster Zettel: »Schaut mal, wer da alles badet.«"
        },
        {
          id: "onsen-2",
          titel: "Gäste im Nebel",
          typ: "schloss",
          text: [
            "Durch das Fernglas erkennt ihr im Dampf Badegäste, Schneeaffen – und ein paar Kraniche, die am Beckenrand stehen.",
            "»Ich habe 15 Köpfe gezählt, 42 Beine und 6 Flügel. Affen haben vier Beine, Menschen und Kraniche zwei. Nur Kraniche haben Flügel.",
            "Der Code für das Gartentor: die Zahl der Affen, dann der Menschen, dann der Kraniche.« – S."
          ],
          frage: "Öffnet das Gartentor.",
          loesung: "663",
          tipps: [
            "Fangt mit den Flügeln an – die verraten euch eine Tierart sofort.",
            "Zieht die Kraniche von den Köpfen und Beinen ab. Was übrig bleibt, gehört zu Affen und Menschen.",
            "Stellt euch vor, alle übrigen wären Menschen. Wie viele Beine fehlen dann noch – und wie viele bringt jeder Affe zusätzlich mit?"
          ],
          erfolg: "Das Gartentor öffnet sich. Ein Schneeaffe drückt euch einen Spielchip in die Hand. Darauf steht: »Japan geschafft. Weiter ins Casino.«"
        }
      ]
    },

    // ======================= CASINO =======================
    {
      id: "roulette",
      thema: "Casino",
      name: "Der Roulettesaal",
      kurz: "Rien ne va plus",
      bild: "bilder/roulette.svg",
      intro: [
        "Grüner Filz, gedimmtes Licht, ein Kessel, der leise klackert. Sophie war hier offensichtlich in ihrem Element.",
        "Der Croupier schiebt euch einen Umschlag über den Tisch. Lukas hat außen draufgeschrieben: »Sie hat verloren. Natürlich.«"
      ],
      raetsel: [
        {
          id: "roulette-1",
          titel: "Zwei Einsätze",
          typ: "schloss",
          bild: "bilder/roulette.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Ich habe zweimal gesetzt. Beide Zahlen liegen auf diesem Tisch.",
            "Erster Einsatz: eine schwarze Zahl. In ihrer waagrechten Reihe liegen genau zwei rote Zahlen – und zwar direkt links und rechts neben ihr.",
            "Zweiter Einsatz: eine rote Zahl. Ihre Quersumme ist genau so groß wie die Anzahl der schwarzen Zahlen in ihrer senkrechten Spalte.",
            "Die beiden Zahlen hintereinander öffnen die Kassette.« – S."
          ],
          frage: "Stellt die beiden Zahlen am Schloss ein.",
          loesung: "41",
          tipps: [
            "Zählt für jede waagrechte Reihe zuerst, wie viele rote Zahlen darin liegen. Nur eine Reihe hat genau zwei.",
            "Für den zweiten Einsatz: Notiert für jede senkrechte Spalte, wie viele schwarze Zahlen sie hat, und vergleicht mit der Quersumme jeder roten Zahl darin.",
            "Die Null zählt bei beiden Einsätzen nicht mit."
          ],
          erfolg: "Klick! In der Kassette liegt ein Stapel Jetons und eine Notiz."
        },
        {
          id: "roulette-2",
          titel: "Die Jetons",
          typ: "schloss",
          bild: "bilder/jetons.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Das ist alles, was von meinem Einsatz übrig ist. Die Werte habe ich mir nur als Wechselkurse gemerkt – sie stehen auf dem Schild.",
            "Die Summe aller Jetons öffnet die Kasse.« – S."
          ],
          frage: "Wie viel sind die Jetons zusammen wert?",
          loesung: "244",
          tipps: [
            "Fangt beim Weißen an – das ist der einzige Jeton, dessen Wert direkt dasteht.",
            "Rechnet euch Stufe für Stufe nach oben: Weiß → Rot → Grün → Schwarz.",
            "Zählt die Jetons jeder Farbe sorgfältig – manche liegen am Rand und sind leicht zu übersehen."
          ],
          erfolg: "Die Kasse öffnet sich. Darin liegt ein Pik-Ass. Auf der Rückseite: »Pokertisch. Diesmal hätte ich gewinnen müssen.«"
        }
      ]
    },
    {
      id: "poker",
      thema: "Casino",
      name: "Der Pokertisch",
      kurz: "Alles auf eine Karte",
      ziffer: { thema: "Casino", wert: "3" },
      bild: "bilder/poker.svg",
      intro: [
        "Am Pokertisch liegen fünf offene Karten in der Mitte. Davor drei Spieler-Plätze mit je zwei aufgedeckten Karten – und Namensschildern: Bar, Tresor, Spielautomat.",
        "Lukas: »Texas Hold’em. Jeder bildet seine beste Hand aus seinen zwei Karten und den fünf in der Mitte.«"
      ],
      raetsel: [
        {
          id: "poker-1",
          titel: "Showdown",
          typ: "auswahl",
          bild: "bilder/poker.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Ich saß am Platz mit der besten Hand – und mein nächstes Versteck trägt denselben Namen.« – S.",
            "Darunter Lukas: »Sie saß übrigens NICHT am Platz mit dem Flush. Das war ich.«"
          ],
          frage: "Welche Hand gewinnt?",
          optionen: ["Bar", "Tresor", "Spielautomat"],
          loesung: "Spielautomat",
          tipps: [
            "Jeder Platz darf die fünf Karten aus der Mitte mitbenutzen. Bildet für jeden Platz die beste Hand aus fünf von sieben Karten.",
            "Zwei Plätze haben ein Full House. Bei zwei Full Houses entscheidet zuerst der Drilling.",
            "Die Reihenfolge der Hände: Full House schlägt Flush, Flush schlägt Straße."
          ],
          erfolg: "Am Spielautomaten klebt ein Zettel: »Nur die Gewinnlinie zählt.«"
        },
        {
          id: "poker-2",
          titel: "Der Spielautomat",
          typ: "schloss",
          bild: "bilder/automat.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "Die drei Walzen sind stehen geblieben, man sieht je drei Bilder übereinander. Oben hängt eine Gewinntabelle.",
            "»Die Gewinnlinie verläuft schräg: von links oben nach rechts unten. Ersetzt die Bilder darauf durch ihre Zahlen.« – S."
          ],
          frage: "Gebt den Code am Automaten ein.",
          loesung: "537",
          tipps: [
            "Ignoriert die mittlere Reihe – auch wenn sie am auffälligsten ist.",
            "Links oben, Mitte, rechts unten: Das sind die drei Felder der Gewinnlinie.",
            "Die Gewinntabelle verrät, welche Zahl zu jedem Bild gehört."
          ],
          erfolg: "Der Automat rattert und spuckt ein Bändchen aus: »Therme – Eintritt für zwei. Bernhard hat schon Liegen reserviert.«"
        }
      ]
    },

    // ======================= THERME & SAUNA =======================
    {
      id: "therme",
      thema: "Therme",
      name: "Die Therme",
      kurz: "Warmes Wasser, kühler Kopf",
      bild: "bilder/therme.svg",
      intro: [
        "Dampf steigt aus vier Becken, an jedem hängt ein Schild mit der Wassertemperatur.",
        "Auf einer Liege liegt Bernhards Bademantel. In der Tasche steckt eine Notiz von Sophie."
      ],
      raetsel: [
        {
          id: "therme-1",
          titel: "Wer badet wo?",
          typ: "auswahl",
          bild: "bilder/therme.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Lukas, Bernhard, Tante Resi und ich waren hier – jeder in einem anderen Becken.",
            "Lukas friert schnell: Sein Becken hatte mindestens 36 Grad.",
            "Bernhard saß in einem Becken, das genau 4 Grad kälter war als meins.",
            "Mein Becken war wärmer als das von Tante Resi.",
            "Am Grund meines Beckens liegt der Spindschlüssel.« – S."
          ],
          frage: "In welchem Becken taucht ihr?",
          optionen: ["Whirlpool", "Solebecken", "Außenbecken", "Sportbecken"],
          loesung: "Solebecken",
          tipps: [
            "Schreibt die vier Temperaturen auf. Welche Paare von Becken liegen genau 4 Grad auseinander?",
            "Geht jedes mögliche Paar für Sophie und Bernhard durch. Bleibt dann für Lukas noch ein passendes Becken?",
            "Tante Resi muss kälter baden als Sophie. Bei einem der übrig gebliebenen Fälle klappt das nicht."
          ],
          erfolg: "Am Grund liegt ein Spindschlüssel. Die Nummer auf dem Anhänger ist abgerieben."
        },
        {
          id: "therme-2",
          titel: "Die Spinde",
          typ: "schloss",
          bild: "bilder/spinde.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Mein Spind ist der mit dem Handtuch. Ein paar Nummernschilder sind abgefallen – aber die Nummern folgen einer Regel.« – S."
          ],
          frage: "Welche Nummer hat Sophies Spind?",
          loesung: "24",
          tipps: [
            "Schaut euch eine vollständige Reihe an: Wie kommt man von einer Nummer zur nächsten?",
            "In jeder Reihe passiert dasselbe – nur der Startwert ist anders.",
            "Die erste Spalte gibt den Startwert, danach wird bei jedem Schritt nach rechts dasselbe gemacht."
          ],
          erfolg: "Im Spind liegt ein Saunatuch. Daran hängt ein Zettel von Lukas: »Sauna. Und dreht ja die Sanduhr richtig um.«"
        }
      ]
    },
    {
      id: "sauna",
      thema: "Therme",
      name: "Die Sauna",
      kurz: "Ins Schwitzen kommen",
      ziffer: { thema: "Therme", wert: "9" },
      bild: "bilder/sauna.svg",
      intro: [
        "Holzgeruch, 90 Grad. Auf der Bank stehen zwei Sanduhren: eine für 7 Minuten, eine für 11 Minuten.",
        "Neben der Tür hängt der Aufgussplan. Und natürlich steckt ein Zettel im Handtuchhaken."
      ],
      raetsel: [
        {
          id: "sauna-1",
          titel: "Die Sanduhren",
          typ: "schloss",
          bild: "bilder/sauna.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Lukas will genau 15 Minuten schwitzen, keine Sekunde mehr. Eine Uhr gibt es hier nicht, nur die 7-Minuten- und die 11-Minuten-Sanduhr.",
            "Ihr dreht beide gleichzeitig um, wenn Lukas sich hinsetzt. Danach dürft ihr Sanduhren nur in dem Moment umdrehen, in dem eine von ihnen gerade durchgelaufen ist.",
            "Der Code: nach wie vielen Minuten ihr die 7-Minuten-Sanduhr zum zweiten Mal umdreht.« – S."
          ],
          frage: "Nach wie vielen Minuten dreht ihr die kleine Sanduhr zum zweiten Mal um?",
          loesung: "11",
          tipps: [
            "Spielt die Zeit Schritt für Schritt durch: Was passiert nach 7 Minuten, was nach 11?",
            "15 lässt sich aus 11 und einem Rest zusammensetzen. Wie viele Minuten fehlen nach 11 noch?",
            "Wenn die kleine Sanduhr gerade erst eine Weile läuft, steckt in ihrer oberen Hälfte nur wenig Sand – und in der unteren genau die Zeit, die schon vergangen ist."
          ],
          erfolg: "Nach genau 15 Minuten steht Lukas auf. Hinter der Sanduhr klebt ein Zettel: »Mein Lieblingsaufguss. Schaut auf den Plan.«"
        },
        {
          id: "sauna-2",
          titel: "Der Aufgussplan",
          typ: "schloss",
          bild: "bilder/aufguss.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Mein Lieblingsaufguss duftet weder nach einem Baum noch nach einer Frucht.",
            "Er beginnt genau zweieinhalb Stunden nach dem ersten Frucht-Aufguss des Tages.",
            "Seine Uhrzeit ist der Code für den Kasten des Saunameisters.« – S."
          ],
          frage: "Stellt die Uhrzeit ein (Stunden und Minuten).",
          loesung: "1630",
          tipps: [
            "Sortiert die Aufgüsse in drei Gruppen: Bäume, Früchte und der Rest. Vorsicht – nicht alles, was nach Kräutern klingt, ist auch ein Kraut.",
            "Welcher Frucht-Aufguss ist der früheste des Tages? Rechnet von dort zweieinhalb Stunden weiter.",
            "Gebt die Uhrzeit ohne Doppelpunkt ein: erst die Stunden, dann die Minuten."
          ],
          erfolg: "Im Kasten des Saunameisters liegt ein Spielwürfel mit Bernhards Notiz: »Spieleabend! Ich hab schon alles aufgebaut.«"
        }
      ]
    },

    // ======================= BRETTSPIELE =======================
    {
      id: "spielezimmer",
      thema: "Brettspiele",
      name: "Das Spielezimmer",
      kurz: "Würfel und Schachteln",
      bild: "bilder/regal.svg",
      intro: [
        "Ein großer Tisch, gemütliches Licht und ein Regal voller Spiele – genau wie bei euren Spieleabenden.",
        "Auf dem Tisch steht eine Spieleschachtel mit Zahlenschloss. Bernhard hat daneben einen Turm aus drei Würfeln gebaut. Natürlich."
      ],
      raetsel: [
        {
          id: "spielezimmer-1",
          titel: "Bernhards Würfelturm",
          typ: "schloss",
          bild: "bilder/wuerfel.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Drei ganz normale Würfel, aufeinandergestapelt. Ihr seht nur die Vorderseiten und die oberste Fläche.",
            "Der Code: die Summe aller Augen auf den Flächen, die ihr nicht sehen könnt, weil sie aufeinander oder auf dem Tisch liegen.« – S."
          ],
          frage: "Öffnet die Spieleschachtel.",
          loesung: "16",
          tipps: [
            "Bei jedem normalen Würfel ergeben gegenüberliegende Seiten zusammen immer dieselbe Zahl.",
            "Zählt erst, wie viele Flächen versteckt sind: zwischen den Würfeln und unter dem untersten.",
            "Beim mittleren und untersten Würfel sind jeweils zwei gegenüberliegende Flächen versteckt. Beim obersten nur eine – und die liegt genau gegenüber von einer Fläche, die ihr seht."
          ],
          erfolg: "In der Schachtel liegt eine Karte: »Nur was steht, zählt. Seht ins Regal.«"
        },
        {
          id: "spielezimmer-2",
          titel: "Das Spieleregal",
          typ: "text",
          bild: "bilder/regal.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Jede Schachtel hat einen kleinen Aufkleber mit einer Zahl. Liegende Schachteln sind nur Ablenkung.",
            "Die Zahl sagt euch, welcher Buchstabe im Namen des Spiels zählt. Von links nach rechts ergibt sich das letzte Zimmer.« – S."
          ],
          frage: "Welches Wort ergibt sich?",
          platzhalter: "Wort eintippen",
          loesung: ["bomb", "bomb busters", "bombbusters"],
          tipps: [
            "Streicht zuerst alle liegenden Schachteln.",
            "Eine 3 bedeutet: der dritte Buchstabe im Namen des Spiels.",
            "Das Wort ist englisch – und erinnert an ein Spiel, das ihr beide gerne spielt."
          ],
          erfolg: "Bomb! Hinter dem Regal ist eine Tür mit der Aufschrift »Bomb Busters – Entschärfungsteam Sophie, Lukas & Bernhard«."
        }
      ]
    },
    {
      id: "bombbusters",
      thema: "Brettspiele",
      name: "Die Bombe",
      kurz: "Das richtige Kabel",
      ziffer: { thema: "Brettspiele", wert: "2" },
      bild: "bilder/bombe.svg",
      intro: [
        "Mitten im Raum steht eine Bombe aus Pappe, ganz im Stil von Bomb Busters. Der Zünder tickt, die Kabelständer stehen bereit.",
        "Lukas hat die Regeln an die Wand gepinnt: Die Kabel auf jedem Ständer liegen aufsteigend sortiert, von links nach rechts. Blaue Kabel haben ganze Werte von 1 bis 12. Gelbe Kabel haben Werte mit ,1 (zum Beispiel 3,1), rote Kabel Werte mit ,5 (zum Beispiel 4,5). Wer ein rotes Kabel durchschneidet, lässt die Bombe hochgehen."
      ],
      raetsel: [
        {
          id: "bombbusters-1",
          titel: "Bernhards Ständer",
          typ: "schloss",
          bild: "bilder/kabel1.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Auf Bernhards Ständer liegen sechs blaue Kabel, drei davon verdeckt.",
            "Kein Wert kommt doppelt vor. Alle sechs zusammen ergeben 41.",
            "Das fünfte Kabel ist eine Primzahl.",
            "Multipliziert man die drei verdeckten Werte, ist das Ergebnis durch 9 teilbar.",
            "Die drei verdeckten Werte, von links nach rechts, sind der Code.« – S."
          ],
          frage: "Welche Werte haben die verdeckten Kabel?",
          loesung: "3611",
          tipps: [
            "Die Sortierung verrät euch, zwischen welchen Werten jedes verdeckte Kabel liegen muss.",
            "Beim fünften Kabel bleibt wegen der Primzahl nur eine Möglichkeit. Dann wisst ihr auch, was die zwei anderen verdeckten zusammen ergeben müssen.",
            "Für die zwei übrigen gibt es zwei Paare, die in die Lücke passen. Nur bei einem ist das Produkt durch 9 teilbar."
          ],
          erfolg: "Der Zünder stockt. Ein zweiter Ständer klappt auf – mit einem roten Warnlicht."
        },
        {
          id: "bombbusters-2",
          titel: "Das letzte Kabel",
          typ: "auswahl",
          bild: "bilder/kabel2.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Letzte Mission! Auf diesem Ständer sind vier Kabel verdeckt: zwei rote (2,5 und 11,5), ein blaues (6) und ein gelbes (8,1).",
            "Nur wenn ihr das gelbe Kabel durchschneidet, ist die Bombe entschärft. Erwischt ihr ein rotes … dann gibt’s kein Geschenk.« – S."
          ],
          frage: "Welches Kabel schneidet ihr durch?",
          optionen: ["Kabel B", "Kabel D", "Kabel E", "Kabel G"],
          loesung: "Kabel E",
          tipps: [
            "Jedes verdeckte Kabel muss größer sein als sein linker und kleiner als sein rechter sichtbarer Nachbar.",
            "Kabel B liegt zwischen 1 und 4, Kabel G ganz rechts nach der 10. Welche der vier verdeckten Werte passen dorthin?",
            "Für die Lücke zwischen 4 und 10 bleiben zwei Werte übrig. Die Sortierung entscheidet, welcher zuerst kommt."
          ],
          erfolg: "Schnipp. Der Zünder bleibt stehen, das Licht wird grün. Die Bombe ist entschärft!"
        }
      ]
    }
  ],

  finale: {
    titel: "Der Code für euer Geschenk",
    bild: "bilder/kaestchen.svg",
    text: [
      "Ihr habt es geschafft – alle Rätsel gelöst. Sophie ist sehr erleichtert, Lukas sagt, er hätte es »natürlich gewusst«, und Bernhard hat schon wieder Hunger.",
      "Stellt die vier Ziffern jetzt am Schloss eures Geschenks ein, genau in dieser Reihenfolge. Alles Liebe zur Hochzeit, Iris und Michi!"
    ]
  }
};
