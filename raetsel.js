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
  zusammenpassen!
*/

window.SPIEL = {
  titel: "I & M",
  untertitel: "Die verschwundenen Ringe",
  startBild: "bilder/titel.svg",
  startText: [
    "Heute heiraten I & M. Ihr seid die Trauzeugen – und habt nur eine einzige Aufgabe: auf die Ringe aufpassen.",
    "Leider hat Onkel Ferdi sie versteckt. Das macht er bei jeder Familienhochzeit. Diesmal hat er das ganze Hotel in eine Rätselreise verwandelt: acht Zimmer, jedes erinnert an etwas, das I & M lieben – Japan, das Casino, die Therme und ihre Spieleabende.",
    "Findet die Ringe, bevor die Trauung beginnt."
  ],

  raeume: [
    // ======================= JAPAN =======================
    {
      id: "garten",
      thema: "Japan",
      name: "Der Zen-Garten",
      kurz: "Steine, Moos und Koi",
      bild: "bilder/garten.svg",
      intro: [
        "Hinter dem Hotel liegt ein kleiner japanischer Garten: geharkter Kies, ein Teich mit Koi und eine steinerne Laterne.",
        "An der Laterne baumelt ein Vorhängeschloss mit vier Rädchen. Daneben hängen hölzerne Wunschtäfelchen – und ein Zettel von Ferdi."
      ],
      raetsel: [
        {
          id: "garten-1",
          titel: "Die Wunschtäfelchen",
          typ: "schloss",
          tafeln: ["五", "一", "八", "三"],
          text: [
            "»Auf meinen Täfelchen stehen japanische Zahlen. Auf der Schriftrolle findet ihr, was sie bedeuten:",
            "一 1 · 二 2 · 三 3 · 四 4 · 五 5 · 六 6 · 七 7 · 八 8 · 九 9 · 十 10",
            "Aber Achtung: Ich lese heute wie ein alter Japaner – von rechts nach links.«"
          ],
          frage: "Öffnet das Schloss an der Laterne.",
          loesung: "3815",
          tipps: [
            "Übersetzt jedes Zeichen mit der Schriftrolle in eine Zahl.",
            "Von links nach rechts steht da 5 – 1 – 8 – 3. Jetzt umdrehen.",
            "Von rechts nach links: 3815."
          ],
          erfolg: "Das Schloss springt auf. In der Laterne liegen drei zusammengerollte Gedichte."
        },
        {
          id: "garten-2",
          titel: "Die drei Haikus",
          typ: "auswahl",
          text: [
            "»Ein Haiku hat drei Zeilen: 5 Silben, 7 Silben, 5 Silben. Nur eines meiner Gedichte hält sich daran – dort steckt der nächste Hinweis.«"
          ],
          gedicht: [
            "# Haiku 1",
            "Der Teich ist ganz still,",
            "ein Koi schwimmt unter der Brücke,",
            "das Wasser glänzt.",
            "",
            "# Haiku 2",
            "Kirschblüten im Wind,",
            "zwei Ringe schlafen im Moos,",
            "wer sucht, der findet.",
            "",
            "# Haiku 3",
            "Laternen leuchten hell,",
            "der Garten schläft schon lange,",
            "Ferdi lacht leise."
          ],
          frage: "Welches Haiku folgt der Regel 5 – 7 – 5?",
          optionen: ["Haiku 1", "Haiku 2", "Haiku 3"],
          loesung: "Haiku 2",
          tipps: [
            "Klatscht die Silben mit: »Kirsch-blü-ten im Wind« sind fünf.",
            "Haiku 1 hat in der zweiten Zeile acht Silben, Haiku 3 in der ersten sechs.",
            "Haiku 2 ist das richtige."
          ],
          erfolg: "Unter dem Moos neben der Laterne liegt ein Schlüssel mit einem Anhänger: »Teehaus«."
        }
      ]
    },
    {
      id: "teehaus",
      thema: "Japan",
      name: "Das Teehaus",
      ziffer: { thema: "Japan", wert: "7" },
      kurz: "Matcha und Glücksbringer",
      bild: "bilder/teehaus.svg",
      intro: [
        "Das Teehaus hat Schiebetüren aus Papier und Tatami-Matten. Schuhe bleiben draußen.",
        "Auf einem niedrigen Regal stehen vier kleine Figuren. Ferdi hat einen Zettel daran geklebt."
      ],
      raetsel: [
        {
          id: "teehaus-1",
          titel: "Die Glücksbringer",
          typ: "auswahl",
          bild: "bilder/teehaus.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Zu Beginn habe ich gar keine Augen.",
            "Ein Auge malt man mir, wenn man sich etwas wünscht –",
            "das zweite, wenn der Wunsch in Erfüllung geht.",
            "In mir steckt, was ihr sucht.«"
          ],
          frage: "Welche Figur nehmt ihr vom Regal?",
          optionen: ["Winkekatze", "Daruma", "Kokeshi-Puppe", "Tanuki"],
          loesung: "Daruma",
          tipps: [
            "Seht euch die Figuren an: Eine von ihnen hat leere, weiße Augen.",
            "Es ist die runde, rote Figur ohne Arme und Beine.",
            "Die Lösung ist: Daruma."
          ],
          erfolg: "Der Daruma ist hohl. Darin steckt eine Anleitung für eine Teezeremonie – mit vertauschten Schritten."
        },
        {
          id: "teehaus-2",
          titel: "Die Teezeremonie",
          typ: "reihenfolge",
          text: [
            "»Bereitet mir eine Schale Matcha zu, und zwar richtig:",
            "Erst warm, dann grün, dann nass, dann Schaum – und ganz zum Schluss bekommt der Gast etwas.«"
          ],
          frage: "Tippt die Schritte in der richtigen Reihenfolge an.",
          karten: [
            "Schale mit heißem Wasser anwärmen",
            "Matcha-Pulver in die Schale geben",
            "Heißes Wasser aufgießen",
            "Mit dem Bambusbesen schaumig schlagen",
            "Schale drehen und dem Gast reichen"
          ],
          tipps: [
            "Ferdis Merkspruch ist die Reihenfolge: warm – grün – nass – Schaum – Gast.",
            "Grün ist das Matcha-Pulver, nass das heiße Wasser.",
            "Anwärmen – Pulver – Wasser – Schlagen – Reichen."
          ],
          erfolg: "Auf dem Boden der Teeschale klebt ein Spielchip: »Roulette – 1. Stock«."
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
        "Im ersten Stock hat Ferdi einen Casinoabend aufgebaut: grüner Filz, gedimmtes Licht, ein Kessel, der leise klackert.",
        "Der Croupier nickt euch zu und schiebt einen Umschlag über den Tisch."
      ],
      raetsel: [
        {
          id: "roulette-1",
          titel: "Der richtige Einsatz",
          typ: "schloss",
          bild: "bilder/roulette.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Setzt auf die Zahl, die rot ist, gerade ist und im ersten Dutzend liegt.",
            "Nur eine passt. Sie öffnet die Kassette des Croupiers.«"
          ],
          frage: "Stellt die Zahl am Schloss ein.",
          loesung: "12",
          tipps: [
            "Das erste Dutzend sind die Zahlen 1 bis 12.",
            "Schaut im Bild, welche geraden Zahlen von 1 bis 12 rot sind.",
            "Nur die 12 ist rot und gerade."
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
            "»Zählt meinen Einsatz. Der Wert der Jetons steht auf dem Schild.",
            "Die Summe öffnet die Kasse.«"
          ],
          frage: "Wie viel ist Ferdis Einsatz wert?",
          loesung: "244",
          tipps: [
            "Zählt erst, wie viele Jetons jeder Farbe es gibt.",
            "2 schwarze, 1 grüner, 3 rote und 4 weiße.",
            "200 + 25 + 15 + 4 = 244."
          ],
          erfolg: "Die Kasse öffnet sich. Darin liegt eine Spielkarte, ein Pik-Ass. Auf der Rückseite: »Pokertisch«."
        }
      ]
    },
    {
      id: "poker",
      thema: "Casino",
      name: "Der Pokertisch",
      ziffer: { thema: "Casino", wert: "3" },
      kurz: "Alles auf eine Karte",
      bild: "bilder/poker.svg",
      intro: [
        "Am Pokertisch sind drei Hände aufgedeckt. Vor jeder liegt ein Kärtchen mit einem Ort: Bar, Tresor, Spielautomat.",
        "Ferdis Zettel liegt in der Mitte auf dem Pot."
      ],
      raetsel: [
        {
          id: "poker-1",
          titel: "Die beste Hand",
          typ: "auswahl",
          bild: "bilder/poker.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Wer die beste Hand hat, bewacht mein nächstes Versteck.«"
          ],
          frage: "Welche Hand gewinnt?",
          optionen: ["Bar", "Tresor", "Spielautomat"],
          loesung: "Spielautomat",
          tipps: [
            "Die Bar hat eine Straße, der Tresor einen Flush (fünf Herz). Was hat der Spielautomat?",
            "Drei Damen und zwei Vierer sind ein Full House.",
            "Full House schlägt Flush und Straße: Spielautomat."
          ],
          erfolg: "Am Spielautomaten klebt ein Zettel: »Ein Code, und ich zahle aus.«"
        },
        {
          id: "poker-2",
          titel: "Der Spielautomat",
          typ: "schloss",
          bild: "bilder/automat.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "Die Walzen sind stehen geblieben. Auf dem Automaten hängt eine Gewinntabelle.",
            "»Ersetzt die Bilder durch ihre Zahlen – von links nach rechts.«"
          ],
          frage: "Gebt den Code am Automaten ein.",
          loesung: "537",
          tipps: [
            "Die Gewinntabelle oben verrät, welche Zahl zu welchem Bild gehört.",
            "Die Walzen zeigen Glocke, Kirsche, Sieben.",
            "Glocke 5, Kirsche 3, Sieben 7: 537."
          ],
          erfolg: "Der Automat rattert und spuckt ein Armband aus: »Therme – Eintritt frei«."
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
        "Im Keller des Hotels liegt die Therme. Dampf steigt aus vier Becken, an jedem hängt ein Schild mit der Wassertemperatur.",
        "Auf einer Liege liegt ein Bademantel – in der Tasche steckt Ferdis nächster Zettel."
      ],
      raetsel: [
        {
          id: "therme-1",
          titel: "Die Becken",
          typ: "auswahl",
          bild: "bilder/therme.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Im wärmsten Becken bade ich nicht, im kältesten auch nicht.",
            "Und unter 34 Grad friere ich. Am Grund meines Lieblingsbeckens liegt etwas für euch.«"
          ],
          frage: "In welchem Becken taucht ihr?",
          optionen: ["Whirlpool", "Solebecken", "Außenbecken", "Sportbecken"],
          loesung: "Solebecken",
          tipps: [
            "Streicht das wärmste und das kälteste Becken.",
            "Übrig bleiben 36 °C und 32 °C. Welches ist mindestens 34 °C warm?",
            "Das Solebecken mit 36 °C."
          ],
          erfolg: "Am Grund liegt ein Spindschlüssel. Die Nummer auf dem Anhänger ist leider abgerieben."
        },
        {
          id: "therme-2",
          titel: "Die Spinde",
          typ: "schloss",
          bild: "bilder/spinde.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Mein Spind ist der mit dem Handtuch. Das Nummernschild ist abgefallen – aber ihr könnt doch zählen, oder?«"
          ],
          frage: "Welche Nummer hat Ferdis Spind?",
          loesung: "23",
          tipps: [
            "Schaut, wie die Nummern von Spalte zu Spalte und von Reihe zu Reihe wachsen.",
            "In jeder Reihe geht es um 1 weiter, nach unten um 6.",
            "Rechts neben der 22 und über der 29: Spind 23."
          ],
          erfolg: "Im Spind liegt ein Saunatuch mit einer Stickerei: »Bis gleich in der Sauna«."
        }
      ]
    },
    {
      id: "sauna",
      thema: "Sauna",
      name: "Die Sauna",
      ziffer: { thema: "Therme", wert: "9" },
      kurz: "Ins Schwitzen kommen",
      bild: "bilder/sauna.svg",
      intro: [
        "Holzgeruch, 90 Grad und eine Sanduhr, die langsam rieselt. Vor der Saunatür hängt eine Tafel mit dem Aufgussplan.",
        "Neben der Tür steckt ein Zettel im Handtuchhaken."
      ],
      raetsel: [
        {
          id: "sauna-1",
          titel: "Das Saunaritual",
          typ: "reihenfolge",
          text: [
            "»Ich verrate euch nur etwas, wenn ihr richtig sauniert.",
            "Wer sauniert, fängt sauber an und hört entspannt auf.«"
          ],
          frage: "Tippt die Schritte in der richtigen Reihenfolge an.",
          karten: [
            "Duschen",
            "Gut abtrocknen",
            "Schwitzen in der Sauna",
            "Abkühlen an der frischen Luft",
            "Ausruhen"
          ],
          tipps: [
            "Bevor man die Sauna betritt, wäscht man sich.",
            "Trocken schwitzt man besser – und nach dem Schwitzen kommt die Abkühlung.",
            "Duschen – Abtrocknen – Schwitzen – Abkühlen – Ausruhen."
          ],
          erfolg: "Ferdis nächster Zettel steckt hinter der Tafel mit dem Aufgussplan."
        },
        {
          id: "sauna-2",
          titel: "Der Aufgussplan",
          typ: "schloss",
          bild: "bilder/aufguss.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Mein Lieblingsaufguss duftet weder nach einem Baum noch nach einer Frucht.",
            "Seine Uhrzeit ist der Code für den Kasten des Saunameisters.«"
          ],
          frage: "Stellt die Uhrzeit ein (Stunden und Minuten).",
          loesung: "1630",
          tipps: [
            "Birke und Zirbe sind Bäume, die Orange ist eine Frucht.",
            "Übrig bleibt die Minze. Wann ist dieser Aufguss?",
            "Um 16:30 Uhr: 1630."
          ],
          erfolg: "Im Kasten des Saunameisters liegt ein Spielwürfel mit einem Zettel: »Spielezimmer, 2. Stock«."
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
        "Das Spielezimmer ist das Herz des Hotels: ein großer Tisch, gemütliches Licht und ein Regal voller Spiele.",
        "Auf dem Tisch steht eine Spieleschachtel mit Zahlenschloss. Davor liegen drei Würfel."
      ],
      raetsel: [
        {
          id: "spielezimmer-1",
          titel: "Die Würfel",
          typ: "schloss",
          bild: "bilder/wuerfel.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Der Code steht auf den Seiten, die ihr nicht seht – auf der Unterseite jedes Würfels, von links nach rechts.«"
          ],
          frage: "Öffnet die Spieleschachtel.",
          loesung: "152",
          tipps: [
            "Bei jedem normalen Würfel ergeben gegenüberliegende Seiten zusammen 7.",
            "Oben liegen 6, 2 und 5. Was liegt jeweils unten?",
            "7 − 6 = 1, 7 − 2 = 5, 7 − 5 = 2: 152."
          ],
          erfolg: "In der Schachtel liegt eine Karte: »Nur wer steht, zählt. Seht ins Regal.«"
        },
        {
          id: "spielezimmer-2",
          titel: "Das Spieleregal",
          typ: "text",
          bild: "bilder/regal.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Nur die Spiele, die aufrecht stehen, zählen. Nehmt von links nach rechts jeweils den ersten Buchstaben.",
            "Das Wort verrät euch mein letztes Zimmer.«"
          ],
          frage: "Welches Wort ergibt sich?",
          platzhalter: "Wort eintippen",
          loesung: ["bomb", "bomb busters", "bombbusters"],
          tipps: [
            "Liegende Schachteln zählen nicht.",
            "Aufrecht stehen Backgammon, Oware, Mühle und Bingo.",
            "B-O-M-B: Bomb."
          ],
          erfolg: "Bomb! Hinter dem Regal ist eine Tür mit der Aufschrift »Bomb Busters – Entschärfungsteam«."
        }
      ]
    },
    {
      id: "bombbusters",
      thema: "Bomb Busters",
      name: "Die Bombe",
      ziffer: { thema: "Brettspiele", wert: "2" },
      kurz: "Das richtige Kabel",
      bild: "bilder/bombe.svg",
      intro: [
        "Mitten im Raum steht eine Bombe aus Pappe, ganz im Stil von Bomb Busters. Der Zünder tickt, die Kabelständer stehen bereit.",
        "Ferdi hat die Regeln an die Wand gepinnt: Die Kabel auf jedem Ständer liegen aufsteigend sortiert, von links nach rechts. Blaue Kabel haben die Werte 1 bis 12. Rote Kabel haben Werte wie 4,5 – wer eines durchschneidet, lässt die Bombe hochgehen."
      ],
      raetsel: [
        {
          id: "bombbusters-1",
          titel: "Ferdis Ständer",
          typ: "schloss",
          bild: "bilder/kabel1.svg",
          bildText: "Tippe aufs Bild, um es zu vergrößern.",
          text: [
            "»Auf meinem Ständer liegen fünf blaue Kabel, aufsteigend sortiert. Drei habe ich euch gezeigt, zwei sind verdeckt.",
            "Kein Wert kommt bei mir doppelt vor, und alle fünf zusammen ergeben 21.",
            "Die zwei verdeckten Werte, von links nach rechts, sind der Code.«"
          ],
          frage: "Welche Werte haben die verdeckten Kabel?",
          loesung: "25",
          tipps: [
            "Die sichtbaren Kabel sind 1, 4 und 9. Zusammen sind das 14 – es fehlen also noch 7.",
            "Das erste verdeckte Kabel liegt zwischen 1 und 4, das zweite zwischen 4 und 9.",
            "Nur 2 + 5 passt: Der Code ist 25."
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
            "»Letzte Mission! Die drei verdeckten Kabel sind: das rote Kabel 4,5, das blaue Kabel 6 und noch ein blaues Kabel.",
            "Schneidet die blaue 6, und die Bombe ist entschärft. Erwischt ihr das rote … dann sagt lieber niemand Ja.«"
          ],
          frage: "Welches Kabel schneidet ihr durch?",
          optionen: ["Kabel B", "Kabel D", "Kabel E"],
          loesung: "Kabel E",
          tipps: [
            "Kabel B liegt zwischen der 2 und der 4. Kann dort die 4,5 oder die 6 liegen?",
            "Also liegen die 4,5 und die 6 auf D und E – aber in welcher Reihenfolge?",
            "4,5 ist kleiner als 6, also ist D rot und E die blaue 6."
          ],
          erfolg: "Schnipp. Der Zünder bleibt stehen, das Licht wird grün. Die Bombe ist entschärft!"
        }
      ]
    }
  ],

  finale: {
    titel: "Der Code fürs Schloss",
    bild: "bilder/kaestchen.svg",
    text: [
      "Ihr habt alle vier Welten von I & M bereist und aus jeder eine Ziffer mitgebracht.",
      "Jetzt seid ihr dran: Stellt die vier Ziffern am echten Schloss ein – genau in dieser Reihenfolge. Dahinter warten die Ringe."
    ]
  }
};
