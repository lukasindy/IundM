/* Spiel-Engine. Die Inhalte stehen in raetsel.js – hier musst du normalerweise nichts ändern. */
(function () {
  "use strict";

  var SPIEL = window.SPIEL;
  var SPEICHER_KEY = "escape-" + slug(SPIEL.titel);
  var app = document.getElementById("app");

  // ---------- Fortschritt ----------
  var stand = laden();
  function leererStand() { return { geloest: {}, tipps: {}, start: null, ende: null }; }
  function laden() {
    try {
      var s = JSON.parse(localStorage.getItem(SPEICHER_KEY));
      if (s && s.geloest) return s;
    } catch (e) {}
    return leererStand();
  }
  function speichern() { try { localStorage.setItem(SPEICHER_KEY, JSON.stringify(stand)); } catch (e) {} }

  // ---------- Testmodus (zeigt bei jedem Rätsel die Lösung) ----------
  var TEST_KEY = SPEICHER_KEY + "-testmodus";
  var testmodus = false;
  try { testmodus = localStorage.getItem(TEST_KEY) === "1"; } catch (e) {}
  function setzeTestmodus(an) {
    testmodus = an;
    try { an ? localStorage.setItem(TEST_KEY, "1") : localStorage.removeItem(TEST_KEY); } catch (e) {}
  }
  function loesungText(x) {
    if (x.typ === "reihenfolge") return x.karten.map(function (k, i) { return (i + 1) + ". " + k; }).join("  ·  ");
    if (x.typ === "text") return x.loesung[0].charAt(0).toUpperCase() + x.loesung[0].slice(1);
    return String(x.loesung);
  }

  // ---------- Themen (Gruppen von Räumen) ----------
  var GRUPPEN = (function () {
    var g = [], akt = [];
    SPIEL.raeume.forEach(function (r, i) {
      akt.push(i);
      if (r.ziffer || i === SPIEL.raeume.length - 1) {
        var name = r.ziffer ? r.ziffer.thema : (r.thema || "Weitere Räume");
        var info = (SPIEL.themen && SPIEL.themen[name]) || {};
        g.push({ name: name, kurz: info.kurz || "", bild: info.bild || SPIEL.raeume[akt[0]].bild, raeume: akt, ziffer: r.ziffer });
        akt = [];
      }
    });
    return g;
  })();
  function gruppeVon(ri) {
    for (var k = 0; k < GRUPPEN.length; k++) if (GRUPPEN[k].raeume.indexOf(ri) >= 0) return k;
    return 0;
  }

  function istGeloest(r) { return !!stand.geloest[r.id]; }
  function raumFertig(raum) { return raum.raetsel.every(istGeloest); }
  function raumOffen(i) { return testmodus || i === 0 || raumFertig(SPIEL.raeume[i - 1]); }
  function naechstesIndex(raum) {
    for (var j = 0; j < raum.raetsel.length; j++) if (!istGeloest(raum.raetsel[j])) return j;
    return -1;
  }
  function anzahl() {
    var gesamt = 0, fertig = 0;
    SPIEL.raeume.forEach(function (r) { r.raetsel.forEach(function (x) { gesamt++; if (istGeloest(x)) fertig++; }); });
    return { gesamt: gesamt, fertig: fertig };
  }
  function tippsGesamt() { var n = 0; for (var k in stand.tipps) n += stand.tipps[k]; return n; }

  // ---------- Navigation (mit Zurück-Taste von Android) ----------
  var ansicht = { name: "start" };
  function gehe(neu, ersetzen) {
    ansicht = neu;
    try { history[ersetzen ? "replaceState" : "pushState"](neu, ""); } catch (e) {}
    zeichnen();
    window.scrollTo(0, 0);
  }
  window.addEventListener("popstate", function (e) {
    ansicht = (e.state && e.state.name) ? e.state : { name: "start" };
    zeichnen();
    window.scrollTo(0, 0);
  });

  // ---------- Hilfsfunktionen ----------
  function slug(s) { return normal(s).slice(0, 30); }
  function normal(s) {
    return String(s).toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9]/g, "");
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function absaetze(liste) { return (liste || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join(""); }
  function bild(src, alt, zoombar) {
    if (!src) return "";
    return '<button class="pic" ' + (zoombar ? 'data-zoom="' + esc(src) + '"' : 'tabindex="-1"') +
      ' aria-label="' + esc(alt) + (zoombar ? ' – vergrößern' : '') + '"><img src="' + esc(src) + '" alt="' + esc(alt) + '"></button>';
  }
  function dauer(ms) {
    var min = Math.max(1, Math.round(ms / 60000));
    if (min < 60) return min + " min";
    return Math.floor(min / 60) + " h " + (min % 60) + " min";
  }
  function vibriere(m) { try { navigator.vibrate && navigator.vibrate(m); } catch (e) {} }
  var haken = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  function zifferPanel() {
    var mit = SPIEL.raeume.filter(function (r) { return r.ziffer; });
    if (!mit.length) return "";
    return '<section class="digits" aria-label="Gesammelte Ziffern"><span class="eyebrow">Eure Ziffern</span><div class="digit-row">' +
      mit.map(function (r) {
        var da = gruppeFertig(gruppeVon(SPIEL.raeume.indexOf(r)));  // erst wenn ALLE Level des Themas gelöst sind
        return '<div class="dslot' + (da ? " got" : "") + '"><strong>' + (da ? esc(r.ziffer.wert) : "?") + '</strong><span>' + esc(r.ziffer.thema) + '</span></div>';
      }).join("") + '</div></section>';
  }

  function kopf(zurueck, rechts) {
    return '<div class="topbar">' +
      (zurueck ? '<button class="back" data-back>' + esc(zurueck) + '</button>' : '<span></span>') +
      '<span class="progress">' + (rechts || "") + '</span></div>';
  }

  // ---------- Ansichten ----------
  function zeichnen() {
    var v = ansicht;
    if (v.name === "raeume") return zeigeRaeume();
    if (v.name === "thema") return zeigeThema(v.g);
    if (v.name === "raum") return zeigeRaum(v.r);
    if (v.name === "raetsel") return zeigeRaetsel(v.r, v.x);
    if (v.name === "erfolg") return zeigeErfolg(v.r, v.x);
    if (v.name === "finale") return zeigeFinale();
    return zeigeStart();
  }

  function zeigeStart() {
    var a = anzahl();
    var laeuft = a.fertig > 0;
    app.innerHTML =
      '<section class="hero fade-in">' +
        bild(SPIEL.startBild, "Zwei Eheringe", false) +
        '<span class="eyebrow">' + esc(SPIEL.untertitel) + '</span>' +
        '<h1>' + titelSchoen(SPIEL.titel) + '</h1>' +
        '<div class="prose">' + absaetze(SPIEL.startText) + '</div>' +
      '</section>' +
      '<div class="btn-row">' +
        '<button class="btn" id="los">' + (laeuft ? "Weiterspielen" : "Spiel starten") + '</button>' +
        (laeuft ? '<button class="btn quiet" id="reset">Von vorne beginnen</button>' : '') +
        '<div id="reset-frage" class="btn-row" hidden>' +
          '<p class="muted" style="text-align:center">Wirklich den ganzen Fortschritt löschen?</p>' +
          '<button class="btn secondary" id="reset-ja">Ja, alles löschen</button>' +
        '</div>' +
        '<button class="test-toggle' + (testmodus ? " an" : "") + '" id="testmodus" aria-pressed="' + testmodus + '">' +
          '<span class="test-dot"></span>Testmodus: ' + (testmodus ? "an – alle Räume offen, Lösungen sichtbar" : "aus") +
        '</button>' +
      '</div>';
    on("#los", function () {
      if (!stand.start) { stand.start = Date.now(); speichern(); }
      gehe({ name: "raeume" });
    });
    on("#reset", function () { document.getElementById("reset-frage").hidden = false; this.hidden = true; });
    on("#reset-ja", function () { stand = leererStand(); speichern(); zeichnen(); });
    on("#testmodus", function () { setzeTestmodus(!testmodus); zeichnen(); });
  }
  function titelSchoen(t) {
    // "Iris & Michi" -> Et-Zeichen kursiv und farbig; sonst das letzte Wort kursiv in eigener Zeile
    if (t.indexOf("&") >= 0) {
      return t.split("&").map(function (s) { return esc(s.trim()); }).join(' <em class="amp">&amp;</em> ');
    }
    var w = t.split(" ");
    if (w.length < 2) return esc(t);
    return esc(w.slice(0, -1).join(" ")) + "<em>" + esc(w[w.length - 1]) + "</em>";
  }

  var SIEGEL = '<span class="room-seal" aria-hidden="true"><svg viewBox="0 0 40 40"><path class="bg" d="M13 18v-4a7 7 0 0 1 14 0v4"/><rect x="9" y="18" width="22" height="16" rx="3"/><circle class="kh" cx="20" cy="26" r="2.5"/></svg></span>';

  function gruppeOffen(g) { return raumOffen(GRUPPEN[g].raeume[0]); }
  function gruppeFertig(g) { return GRUPPEN[g].raeume.every(function (ri) { return raumFertig(SPIEL.raeume[ri]); }); }

  function zeigeRaeume() {
    var a = anzahl();
    var html = kopf("Start", a.fertig + " / " + a.gesamt + " gelöst") +
      '<header class="prose fade-in"><span class="eyebrow">Wählt ein Thema</span><h2>Eure Spur</h2></header>' +
      zifferPanel() +
      '<div class="rooms">';
    GRUPPEN.forEach(function (gr, g) {
      var offen = gruppeOffen(g);
      var fertig = gruppeFertig(g);
      var n = gr.raeume.filter(function (ri) { return raumFertig(SPIEL.raeume[ri]); }).length;
      html += '<button class="room theme' + (offen ? "" : " locked") + '" data-gruppe="' + g + '"' + (offen ? "" : ' aria-disabled="true"') + '>' +
        (offen ? '<img src="' + esc(gr.bild) + '" alt="">' : SIEGEL) +
        '<span class="room-text"><strong>' + esc(gr.name) + '</strong><span>' +
          (offen ? esc(gr.kurz) : "Wartet auf euch") + '</span></span>' +
        '<span class="badge' + (fertig ? " done" : offen ? "" : " sealed") + '">' +
          (fertig ? "Geschafft" : offen ? n + " / " + gr.raeume.length + " Level" : "Versiegelt") + '</span>' +
      '</button>';
    });
    html += '</div>';
    if (a.fertig === a.gesamt) html += '<button class="btn" id="zumfinale">Zum Finale</button>';
    app.innerHTML = html;
    alle("[data-gruppe]", function (el) {
      var g = +el.getAttribute("data-gruppe");
      if (!gruppeOffen(g)) return;
      el.addEventListener("click", function () { gehe({ name: "thema", g: g }); });
    });
    on("#zumfinale", function () { gehe({ name: "finale" }); });
  }

  function zeigeThema(g) {
    var gr = GRUPPEN[g];
    if (!gr) return gehe({ name: "raeume" }, true);
    var fertig = gruppeFertig(g);
    var html = kopf("Themen", "Thema " + (g + 1) + " von " + GRUPPEN.length) +
      '<header class="prose fade-in"><span class="eyebrow">Thema ' + (g + 1) + '</span><h2>' + esc(gr.name) + '</h2>' +
      (gr.kurz ? '<p class="muted">' + esc(gr.kurz) + '</p>' : '') + '</header>' +
      '<div class="rooms">';
    gr.raeume.forEach(function (ri, k) {
      var raum = SPIEL.raeume[ri];
      var offen = raumOffen(ri);
      var rf = raumFertig(raum);
      var n = raum.raetsel.filter(istGeloest).length;
      html += '<button class="room' + (offen ? "" : " locked") + '" data-raum="' + ri + '"' + (offen ? "" : ' aria-disabled="true"') + '>' +
        (offen ? '<img src="' + esc(raum.bild) + '" alt="">' : SIEGEL) +
        '<span class="room-text"><span class="room-theme">Level ' + (k + 1) + '</span>' +
          '<strong>' + (offen ? esc(raum.name) : "Geheimer Raum") + '</strong><span>' +
          (offen ? esc(raum.kurz) : "Wartet auf euch") + '</span></span>' +
        '<span class="badge' + (rf ? " done" : offen ? "" : " sealed") + '">' + (rf ? "Geschafft" : offen ? n + " / " + raum.raetsel.length : "Versiegelt") + '</span>' +
      '</button>';
    });
    html += '</div>';
    if (fertig && gr.ziffer) {
      html += '<div class="reward"><span class="eyebrow">Ziffer für ' + esc(gr.ziffer.thema) + '</span><strong>' + esc(gr.ziffer.wert) + '</strong></div>';
    }
    if (fertig) {
      var naechste = g + 1 < GRUPPEN.length;
      html += '<button class="btn" id="weiter">' + (naechste ? "Weiter: " + esc(GRUPPEN[g + 1].name) : "Zur Übersicht") + '</button>';
    }
    app.innerHTML = html;
    alle("[data-raum]", function (el) {
      var i = +el.getAttribute("data-raum");
      if (!raumOffen(i)) return;
      el.addEventListener("click", function () { gehe({ name: "raum", r: i }); });
    });
    on("#weiter", function () { gehe(g + 1 < GRUPPEN.length ? { name: "thema", g: g + 1 } : { name: "raeume" }); });
  }

  function zeigeRaum(ri) {
    var raum = SPIEL.raeume[ri];
    var naechstes = naechstesIndex(raum);
    var gr = GRUPPEN[gruppeVon(ri)];
    var lvl = gr.raeume.indexOf(ri) + 1;
    var html = kopf(gr.name, "Level " + lvl + " von " + gr.raeume.length) +
      bild(raum.bild, raum.name, true) +
      '<header class="prose fade-in"><span class="eyebrow">' + esc(gr.name) + ' · Level ' + lvl + '</span><h2>' + esc(raum.name) + '</h2>' +
      absaetze(raum.intro) + '</header><div class="steps">';
    raum.raetsel.forEach(function (x, j) {
      var geloest = istGeloest(x);
      var aktuell = j === naechstes;
      var gesperrt = !geloest && !aktuell;
      html += '<button class="step' + (geloest ? " solved" : aktuell ? " current" : " locked") + '" data-x="' + j + '"' + (gesperrt ? ' aria-disabled="true"' : '') + '>' +
        '<span class="dot">' + (geloest ? haken.replace("<svg", '<svg width="16" height="16"') : j + 1) + '</span>' +
        '<span class="label">' + (gesperrt ? "Noch nicht entdeckt" : esc(x.titel)) + '</span>' +
        (aktuell ? '<span class="go">Lösen</span>' : geloest ? '<span class="go">Ansehen</span>' : '') +
      '</button>';
    });
    html += '</div>';
    if (naechstes === -1) {
      var letzter = ri === SPIEL.raeume.length - 1;
      var wechsel = !letzter && gruppeVon(ri + 1) !== gruppeVon(ri);
      html += '<button class="btn" id="weiter">' + (letzter ? "Zum Finale" : wechsel ? "Zurück zu " + esc(gr.name) : "Weiter: " + esc(SPIEL.raeume[ri + 1].name)) + '</button>';
    }
    app.innerHTML = html;
    alle("[data-x]", function (el) {
      var j = +el.getAttribute("data-x");
      if (!istGeloest(raum.raetsel[j]) && j !== naechstes) return;
      el.addEventListener("click", function () { gehe({ name: "raetsel", r: ri, x: j }); });
    });
    on("#weiter", function () {
      if (ri === SPIEL.raeume.length - 1) gehe({ name: "finale" });
      else if (gruppeVon(ri + 1) !== gruppeVon(ri)) gehe({ name: "thema", g: gruppeVon(ri) });
      else gehe({ name: "raum", r: ri + 1 });
    });
    zoomAktivieren();
  }

  function zeigeRaetsel(ri, xi) {
    var raum = SPIEL.raeume[ri];
    var x = raum.raetsel[xi];
    var geloest = istGeloest(x);
    var html = kopf(raum.name, "Rätsel " + (xi + 1) + " von " + raum.raetsel.length) +
      '<header class="prose fade-in"><span class="eyebrow">' + esc(raum.name) + '</span><h2>' + esc(x.titel) + '</h2></header>';
    if (x.bild) {
      html += bild(x.bild, x.titel, true);
      if (x.bildText) html += '<p class="pic-caption">' + esc(x.bildText) + '</p>';
    }
    if (x.text) html += '<div class="note">' + absaetze(x.text) + '</div>';
    if (x.tafeln) html += '<div class="tafeln">' + x.tafeln.map(function (z) { return '<span class="tafel" lang="ja">' + esc(z) + '</span>'; }).join("") + '</div>';
    if (x.gedicht) html += '<div class="note poem">' + x.gedicht.map(function (z) {
      if (z === "") return '<span class="gap"></span>';
      if (z.charAt(0) === "#") return '<b class="poem-head">' + esc(z.replace(/^#\s*/, "")) + '</b>';
      return "<span>" + esc(z) + "</span>";
    }).join("") + '</div>';

    html += '<section class="answer" id="answer"><p class="question">' + esc(x.frage) + '</p>';
    if (geloest) {
      html += '<p class="hint"><b>Gelöst</b>' + esc(x.erfolg) + '</p>';
    } else {
      if (testmodus) html += '<p class="test-loesung"><b>Testmodus · Lösung</b>' + esc(loesungText(x)) + '</p>';
      html += eingabe(x) + '<p class="feedback" id="feedback" role="status"></p>';
    }
    html += '</section>';

    if (!geloest) {
      var benutzt = stand.tipps[x.id] || 0;
      html += '<section class="hints" id="hints">';
      for (var t = 0; t < benutzt; t++) html += tippHtml(x, t);
      html += '</section>';
      if (benutzt < x.tipps.length) {
        html += '<button class="btn secondary" id="tipp">Tipp ' + (benutzt + 1) + ' von ' + x.tipps.length + ' anzeigen</button>';
      }
    }
    app.innerHTML = html;
    zoomAktivieren();
    if (!geloest) {
      eingabeAktivieren(x, function () { loesen(ri, xi); });
      on("#tipp", function () {
        stand.tipps[x.id] = (stand.tipps[x.id] || 0) + 1;
        speichern();
        var n = stand.tipps[x.id];
        document.getElementById("hints").insertAdjacentHTML("beforeend", tippHtml(x, n - 1));
        if (n >= x.tipps.length) this.remove();
        else this.textContent = "Tipp " + (n + 1) + " von " + x.tipps.length + " anzeigen";
      });
    }
  }
  function tippHtml(x, t) {
    return '<div class="hint fade-in"><b>Tipp ' + (t + 1) + '</b>' + esc(x.tipps[t]) + '</div>';
  }

  function eingabe(x) {
    if (x.typ === "text") {
      return '<form id="form" class="answer" autocomplete="off">' +
        '<input class="input" id="antwort" type="text" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="' + esc(x.platzhalter || "Antwort") + '" aria-label="Antwort">' +
        '<button class="btn" type="submit">Prüfen</button></form>';
    }
    if (x.typ === "schloss") {
      var h = '<div class="lock" id="lock" role="group" aria-label="Zahlenschloss">';
      for (var i = 0; i < String(x.loesung).length; i++) {
        h += '<div class="wheel"><button class="up" data-rad="' + i + '" data-d="1" aria-label="Rädchen ' + (i + 1) + ' hoch"></button>' +
          '<span class="digit" id="rad' + i + '">0</span>' +
          '<button class="down" data-rad="' + i + '" data-d="-1" aria-label="Rädchen ' + (i + 1) + ' runter"></button></div>';
      }
      return h + '</div><button class="btn" id="oeffnen">Öffnen</button>';
    }
    if (x.typ === "auswahl") {
      return '<div class="choices" id="choices">' + x.optionen.map(function (o) {
        return '<button class="choice" data-wahl="' + esc(o) + '">' + esc(o) + '</button>';
      }).join("") + '</div>';
    }
    if (x.typ === "reihenfolge") {
      return '<div class="order-picked" id="picked"></div><div class="order-pool" id="pool"></div>' +
        '<button class="btn quiet" id="neu">Reihenfolge zurücksetzen</button>';
    }
    return "";
  }

  function eingabeAktivieren(x, richtig) {
    var fb = document.getElementById("feedback");
    var bereich = document.getElementById("answer");
    function falsch(text) {
      fb.textContent = text || "Das stimmt noch nicht.";
      bereich.classList.remove("shake"); void bereich.offsetWidth; bereich.classList.add("shake");
      vibriere([60, 40, 60]);
    }

    if (x.typ === "text") {
      document.getElementById("form").addEventListener("submit", function (e) {
        e.preventDefault();
        var a = normal(document.getElementById("antwort").value);
        if (!a) return falsch("Bitte erst eine Antwort eintippen.");
        var ok = x.loesung.some(function (l) { return normal(l) === a; });
        ok ? richtig() : falsch();
      });
    }

    if (x.typ === "schloss") {
      var werte = String(x.loesung).split("").map(function () { return 0; });
      alle("[data-rad]", function (b) {
        b.addEventListener("click", function () {
          var i = +b.getAttribute("data-rad");
          werte[i] = (werte[i] + +b.getAttribute("data-d") + 10) % 10;
          document.getElementById("rad" + i).textContent = werte[i];
          fb.textContent = "";
          vibriere(8);
        });
      });
      on("#oeffnen", function () {
        werte.join("") === String(x.loesung) ? richtig() : falsch("Das Schloss rührt sich nicht.");
      });
    }

    if (x.typ === "auswahl") {
      alle("[data-wahl]", function (b) {
        b.addEventListener("click", function () {
          normal(b.getAttribute("data-wahl")) === normal(x.loesung) ? richtig() : falsch(b.getAttribute("data-wahl") + "? Nein, da ist nichts.");
        });
      });
    }

    if (x.typ === "reihenfolge") {
      var gemischt = mischen(x.karten);
      var gewaehlt = [];
      var picked = document.getElementById("picked");
      var pool = document.getElementById("pool");
      function malen() {
        picked.innerHTML = gewaehlt.map(function (k, i) { return '<div class="slot"><b>' + (i + 1) + '</b>' + esc(k) + '</div>'; }).join("");
        pool.innerHTML = gemischt.filter(function (k) { return gewaehlt.indexOf(k) < 0; })
          .map(function (k) { return '<button class="choice" data-karte="' + esc(k) + '">' + esc(k) + '</button>'; }).join("");
        alle("[data-karte]", function (b) {
          b.addEventListener("click", function () {
            gewaehlt.push(b.getAttribute("data-karte"));
            fb.textContent = "";
            malen();
            if (gewaehlt.length === x.karten.length) {
              if (gewaehlt.join("|") === x.karten.join("|")) richtig();
              else { falsch("Die Reihenfolge passt noch nicht."); setTimeout(function () { gewaehlt = []; malen(); }, 900); }
            }
          });
        });
      }
      malen();
      on("#neu", function () { gewaehlt = []; fb.textContent = ""; malen(); });
    }
  }

  function mischen(liste) {
    var a = liste.slice();
    for (var n = 0; n < 20; n++) {
      for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
      if (a.join("|") !== liste.join("|")) break;
    }
    return a;
  }

  function loesen(ri, xi) {
    stand.geloest[SPIEL.raeume[ri].raetsel[xi].id] = true;
    var a = anzahl();
    if (a.fertig === a.gesamt && !stand.ende) stand.ende = Date.now();
    speichern();
    vibriere(120);
    gehe({ name: "erfolg", r: ri, x: xi }, true);
  }

  function zeigeErfolg(ri, xi) {
    var raum = SPIEL.raeume[ri];
    var x = raum.raetsel[xi];
    var naechstes = naechstesIndex(raum);
    var letzterRaum = ri === SPIEL.raeume.length - 1;
    var knopf, ziel;
    if (naechstes !== -1) { knopf = "Weiter"; ziel = { name: "raetsel", r: ri, x: naechstes }; }
    else if (!letzterRaum && gruppeVon(ri + 1) !== gruppeVon(ri)) { knopf = "Weiter: " + GRUPPEN[gruppeVon(ri + 1)].name; ziel = { name: "thema", g: gruppeVon(ri + 1) }; }
    else if (!letzterRaum) { knopf = "Weiter: " + SPIEL.raeume[ri + 1].name; ziel = { name: "raum", r: ri + 1 }; }
    else { knopf = "Zum Finale"; ziel = { name: "finale" }; }

    app.innerHTML =
      '<section class="success">' +
        '<div class="seal">' + haken + '</div>' +
        '<span class="eyebrow">' + (naechstes === -1 ? esc(raum.name) + " geschafft" : "Gelöst") + '</span>' +
        '<h2>' + esc(x.titel) + '</h2>' +
        '<p>' + esc(x.erfolg) + '</p>' +
        (naechstes === -1 && raum.ziffer && gruppeFertig(gruppeVon(ri)) ?
          '<div class="reward"><span class="eyebrow">Ziffer für ' + esc(raum.ziffer.thema) + '</span><strong>' + esc(raum.ziffer.wert) + '</strong><span class="muted">Merkt sie euch gut – ihr braucht sie ganz am Ende.</span></div>' : '') +
      '</section>' +
      '<div class="btn-row"><button class="btn" id="weiter">' + esc(knopf) + '</button>' +
      '<button class="btn quiet" id="zurueck">Zurück zu ' + esc(GRUPPEN[gruppeVon(ri)].name) + '</button></div>';
    on("#weiter", function () { gehe(ziel); });
    on("#zurueck", function () { gehe({ name: "thema", g: gruppeVon(ri) }); });
  }

  function zeigeFinale() {
    var f = SPIEL.finale;
    var a = anzahl();
    if (a.fertig < a.gesamt) return gehe({ name: "raeume" }, true);
    var zeit = stand.start && stand.ende ? dauer(stand.ende - stand.start) : "–";
    app.innerHTML =
      bild(f.bild, "Kästchen mit Zahlenschloss", false) +
      '<section class="prose fade-in" style="text-align:center"><span class="eyebrow">Alle Rätsel gelöst</span><h1>' + esc(f.titel) + '</h1></section>' +
      '<div class="prose">' + absaetze(f.text) + '</div>' +
      endCode() +
      '<div class="stats"><div class="stat"><strong>' + zeit + '</strong><span>Spielzeit</span></div>' +
      '<div class="stat"><strong>' + tippsGesamt() + '</strong><span>Tipps genutzt</span></div></div>' +
      '<div class="btn-row"><button class="btn secondary" id="nochmal">Noch einmal spielen</button></div>';
    on("#nochmal", function () { stand = leererStand(); speichern(); gehe({ name: "start" }); });
  }

  function endCode() {
    var mit = SPIEL.raeume.filter(function (r) { return r.ziffer; });
    if (!mit.length) return "";
    return '<section class="endcode" aria-label="Code fürs Schloss">' + mit.map(function (r) {
      return '<div><strong>' + esc(r.ziffer.wert) + '</strong><span>' + esc(r.ziffer.thema) + '</span></div>';
    }).join("") + '</section>';
  }

  // ---------- Lightbox ----------
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var lbScroll = document.getElementById("lightbox-scroll");
  function zoomAktivieren() {
    alle("[data-zoom]", function (b) {
      b.addEventListener("click", function () {
        lbImg.src = b.getAttribute("data-zoom");
        lbScroll.classList.remove("zoomed");
        lb.hidden = false;
      });
    });
  }
  lbImg.addEventListener("click", function () { lbScroll.classList.toggle("zoomed"); });
  document.getElementById("lightbox-close").addEventListener("click", function () { lb.hidden = true; });

  // ---------- Kleinkram ----------
  function on(sel, fn) { var el = app.querySelector(sel); if (el) el.addEventListener("click", fn); }
  function alle(sel, fn) { Array.prototype.forEach.call(app.querySelectorAll(sel), fn); }
  app.addEventListener("click", function (e) {
    if (e.target.closest("[data-back]")) {
      var v = ansicht;
      if (v.name === "raetsel") gehe({ name: "raum", r: v.r });
      else if (v.name === "raum") gehe({ name: "thema", g: gruppeVon(v.r) });
      else if (v.name === "thema") gehe({ name: "raeume" });
      else gehe({ name: "start" });
    }
  });

  // iOS: Doppeltipp- und Pinch-Zoom verhindern (Rädchen schnell drücken soll nicht zoomen)
  var letzterTipp = 0;
  document.addEventListener("touchend", function (e) {
    var jetzt = Date.now();
    if (jetzt - letzterTipp < 350 && !e.target.closest("input, textarea")) {
      e.preventDefault();               // kein Zoom …
      var ziel = e.target.closest("button");
      if (ziel && !ziel.disabled) ziel.click(); // … aber der Tipp zählt trotzdem
    }
    letzterTipp = jetzt;
  }, { passive: false });
  ["gesturestart", "gesturechange"].forEach(function (t) {
    document.addEventListener(t, function (e) { e.preventDefault(); }, { passive: false });
  });

  // Offline-Unterstützung (nur auf GitHub Pages / https)
  if ("serviceWorker" in navigator && location.protocol === "https:" && !/claude/.test(location.hostname)) {
    try { navigator.serviceWorker.register("sw.js").catch(function () {}); } catch (e) {}
  }

  try { history.replaceState(ansicht, ""); } catch (e) {}
  zeichnen();
})();
