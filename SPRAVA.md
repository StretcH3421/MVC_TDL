# To-Do List aplikácia s použitím MVC a Singleton

**Autor:** Lubomir Chynoradsky  
**Predmet:** AAIKT
**Typ projektu:** Webová aplikácia  
**Technológie:** React, Tailwind CSS, Vite

---

## 1. Úvod

Cieľom tohto projektu je vytvoriť jednoduchú webovú aplikáciu To-Do List, kde si používateľ môže pridávať úlohy, označovať ich ako hotové a mazať tie, ktoré už dokončil. Projekt nie je len o tom, aby aplikácia fungovala — hlavným zámerom je ukázať, ako môže byť aj jednoduchá aplikácia dobre štruktúrovaná pomocou návrhových vzorov.

V projekte sú použité dva návrhové vzory:

- **MVC (Model–View–Controller)** — aby boli dáta, zobrazenie a logika oddelené a každá časť mala svoju jasnú zodpovednosť.
- **Singleton** — aby v celej aplikácii existoval len jeden centrálny objekt, ktorý spravuje zoznam úloh.

Táto správa opisuje, čo aplikácia robí, ako je navrhnutá, prečo boli tieto vzory použité a čo by sa na nej dalo v budúcnosti rozšíriť.

---

## 2. Opis projektu

### Čo aplikácia robí

Aplikácia umožňuje používateľovi pracovať so zoznamom úloh. Konkrétne:

- **Pridať úlohu** — používateľ napíše text do vstupného poľa a klikne na tlačidlo „Pridať". Úloha sa objaví v zozname.
- **Označiť úlohu ako dokončenú** — kliknutím na tlačidlo „Hotovo" sa úloha vizuálne označí (prečiarknutý text, iná farba).
- **Zmazať úlohu** — kliknutím na tlačidlo „Zmazať" sa úloha odstráni zo zoznamu.

### Použité technológie

| Technológia       | Účel                                              |
| ----------------- | ------------------------------------------------- |
| React             | Knižnica pre tvorbu používateľského rozhrania     |
| Tailwind CSS      | Rýchle štýlovanie priamo v JSX cez utility triedy |
| Vite              | Nástroj na rýchle spustenie a build projektu      |
| JavaScript (ES6+) | Jazyk celej aplikácie vrátane tried a metód       |

---

## 3. Vytvorené artefakty

V rámci projektu vznikli tieto výstupy:

- **Zdrojový kód** — rozdelený do priečinkov podľa MVC vrstiev (`model/`, `controller/`, `view/`)
- **TaskStore.js** — trieda predstavujúca Model aj Singleton, uchováva a spravuje zoznam úloh
- **TaskController.js** — trieda predstavujúca Controller, spracúva akcie používateľa a prepája Model s View
- **App.jsx** — React komponent predstavujúci View, zobrazuje rozhranie a reaguje na akcie používateľa
- **GitHub repozitár** — celý projekt je nahratý na GitHub a nasadený cez Vercel
- **README.md** — základný popis projektu priložený v repozitári

---

## 4. Architektúra aplikácie

Projekt je rozdelený do priečinkov podľa zodpovednosti každej časti. Štruktúra priečinkov vyzerá takto:

```
src/
├── model/
│   └── TaskStore.js        ← Model + Singleton
├── controller/
│   └── TaskController.js   ← Controller
└── view/
    └── App.jsx             ← View
main.jsx                    ← vstupný bod aplikácie
index.css                   ← globálne štýly + Tailwind import
```

Každý priečinok zodpovedá jednej vrstve MVC. Toto rozdelenie je zámerné — pri pohľade na štruktúru projektu je okamžite vidno, kde čo žije a prečo.

---

## 5. Použitie návrhového vzoru MVC

### Čo je MVC

MVC je návrhový vzor, ktorý rozdeľuje aplikáciu na tri časti:

- **Model** — stará sa o dáta a operácie s nimi. Nevie nič o tom, ako aplikácia vyzerá.
- **View** — stará sa o zobrazenie. Ukazuje dáta používateľovi a zachytáva jeho akcie. Nevie, kde dáta vznikajú.
- **Controller** — je prostredník medzi Modelom a View. Prijíma akcie od View, zavolá príslušnú metódu na Modeli a zabezpečí, aby sa View aktualizovalo.

Jednoduchá analógia: Model je kuchár, View je čašník, Controller je objednávkový systém, ktorý spojí požiadavku hosťa s kuchyňou.

### Ako je MVC použité v tomto projekte

**Model — `TaskStore.js`**

Trieda `TaskStore` uchováva pole úloh (`this.task`) a obsahuje metódy na prácu s nimi:

- `addTask(name)` — vytvorí nový objekt úlohy s unikátnym `id` a pridá ho do poľa
- `deleteTask(id)` — vyfiltruje úlohu s daným `id` z poľa
- `toggleTask(id)` — prepne hodnotu `isCompleted` pre úlohu s daným `id`

Model neobsahuje žiadny JSX, žiadne Tailwind triedy ani žiadnu logiku zobrazovania.

**View — `App.jsx`**

React komponent `App.jsx` zobrazuje celé rozhranie aplikácie. Obsahuje:

- vstupné pole a tlačidlo na pridanie úlohy
- zoznam úloh vykreslený pomocou `tasks.map(...)`
- tlačidlá „Hotovo" a „Zmazať" pri každej úlohe
- podmienené Tailwind triedy pre vizuálne odlíšenie dokončených úloh

View neobsahuje žiadnu priamu logiku práce s dátami. Keď používateľ niečo klikne, View zavolá príslušnú metódu Controllera.

**Controller — `TaskController.js`**

Trieda `TaskController` dostáva v konštruktore referenciu na `store` (Model) a funkciu `setTasks` (na aktualizáciu React state). Obsahuje tieto metódy:

- `handleAddTask(text)` — skontroluje, či text nie je prázdny (`trim()`), zavolá `store.addTask(text)` a obnoví View
- `handleDeleteTask(id)` — zavolá `store.deleteTask(id)` a obnoví View
- `handleToggleTask(id)` — zavolá `store.toggleTask(id)` a obnoví View
- `refreshView()` — pomocná metóda, ktorá zavolá `setTasks([...this.store.task])`, čím spustí React render

Controller teda neuchováva dáta a neobsahuje žiadne JSX. Je to čistý „dirigent", ktorý koordinuje ostatné časti.

### Tok dát v aplikácii

```
Používateľ klikne → View zavolá Controller → Controller zavolá Model
→ Model zmení dáta → Controller obnoví React state → View sa prekreslí
```

---

## 6. Použitie návrhového vzoru Singleton

### Čo je Singleton

Singleton je návrhový vzor, ktorý zabezpečuje, že trieda môže mať počas celého behu aplikácie **najviac jednu inštanciu**. Ak sa niekto pokúsi vytvoriť ďalšiu inštanciu, dostane tú istú, ktorá už existuje.

### Prečo je Singleton vhodný pre správu úloh

Keby každý komponent alebo časť aplikácie vytvorila vlastný nový `TaskStore`, každý by mal svoje vlastné pole úloh — navzájom oddelené. Aplikácia by nefungovala správne, lebo by neexistoval jeden spoločný zdroj pravdy o tom, aké úlohy momentálne existujú.

Singleton zaručuje, že celá aplikácia pracuje vždy s **jedným centrálnym objektom**, kde sú uložené všetky úlohy.

### Ako je Singleton implementovaný

V triede `TaskStore` je statická metóda `getInstance()`:

```js
static getInstance() {
  if (!this._instance) {
    this._instance = new TaskStore();
  }
  return this._instance;
}
```

Princíp je jednoduchý:

1. Keď sa `getInstance()` zavolá po prvýkrát, `_instance` neexistuje, takže sa vytvorí nová inštancia `TaskStore` a uloží sa.
2. Keď sa `getInstance()` zavolá znova, `_instance` už existuje, takže sa vráti tá istá inštancia bez vytvorenia novej.

Atribút `_instance` je uložený na samotnej triede (nie na objekte), čo je možné vďaka kľúčovému slovu `static`. Podčiarknutie v názve `_instance` signalizuje, že ide o internú záležitosť triedy, do ktorej by zvonku nemalo nič zasahovať.

V `App.jsx` sa `TaskStore` používa výhradne cez:

```js
const store = TaskStore.getInstance();
```

Nikde v projekte sa nepoužíva `new TaskStore()` priamo — vždy len cez `getInstance()`.

---

## 7. Väzba medzi MVC a Singleton

Singleton a MVC v tomto projekte spolu priamo súvisia. `TaskStore` zároveň plní úlohu Modelu v MVC aj Singletonu — je to jedna trieda s dvomi zodpovednosťami:

- ako **Model** uchováva dáta a poskytuje metódy na ich zmenu,
- ako **Singleton** garantuje, že existuje len jeden takýto Model v celej aplikácii.

Controller (`TaskController`) pristupuje k Modelu výhradne cez `TaskStore.getInstance()`, čím sa zaručuje, že vždy pracuje s tým istým zdrojom dát. View (`App.jsx`) dáta nezíska priamo z Modelu, ale cez React state, ktorý Controller aktualizuje po každej zmene.

Táto kombinácia vzorov teda nie je náhodná — Singleton posilňuje konzistenciu Modelu v rámci MVC architektúry.

---

## 8. Dôvody použitia vzorov

Použitie MVC a Singleton v tomto projekte má konkrétne praktické dôvody:

- **Prehľadnosť** — každá vrstva má jasne definovanú zodpovednosť. Pri pohľade na štruktúru priečinkov je okamžite jasné, kde čo nájsť.
- **Oddelenie zodpovedností** — Model nemusí vedieť o zobrazení, View nemusí vedieť o logike. Zmena v jednej vrstve neovplyvní ostatné vrstvy.
- **Jednoduchšia údržba** — ak treba zmeniť, ako vyzerá zoznam úloh, stačí upraviť `App.jsx`. Ak treba zmeniť logiku mazania, stačí upraviť `TaskStore` alebo `TaskController`.
- **Jeden zdroj pravdy** — vďaka Singletonu neexistuje riziko, že rôzne časti aplikácie budú pracovať s rôznymi verziami zoznamu úloh.
- **Rozšíriteľnosť** — projekt má jasnú štruktúru, do ktorej sa dajú pridávať nové funkcie bez toho, aby sa muselo prerábať všetko od začiatku.

---

## 9. Dôsledky použitia vzorov

### Výhody

- Kód je organizovaný a čitateľný — každý súbor má jasný účel.
- Debugovanie je jednoduchšie, lebo problémy s dátami sú v Modeli a problémy so zobrazením sú vo View.
- Projekt ukazuje reálny spôsob myslenia, ktorý sa používa aj vo väčších aplikáciách.

### Nevýhody

- Pre takto malú aplikáciu je štruktúra o niečo zložitejšia, než by technicky musela byť. Rovnaká funkčnosť by sa dala napísať aj priamo v jednom React komponente s niekoľkými `useState` hookmi.
- Singleton prináša istú rigiditu — trieda sa nedá jednoducho testovať v izolácii, pretože zdieľa stav naprieč celou aplikáciou.

Tieto nevýhody sú však pri školskom projekte vedome akceptované, pretože cieľom je ukázať pochopenie vzorov, nie vytvoriť minimalistický kód.

---

## 10. Najdôležitejší prípad použitia — Pridanie novej úlohy

Pridanie novej úlohy je základnou funkciou aplikácie a dobre ilustruje, ako spolu spolupracujú všetky tri vrstvy MVC.

**Kroky:**

1. Používateľ napíše text úlohy do vstupného poľa v aplikácii.
2. Používateľ klikne na tlačidlo „Pridať" alebo stlačí Enter.
3. **View** (`App.jsx`) zachytí udalosť `onSubmit` formulára a zavolá `controller.handleAddTask(inputValue)`.
4. **Controller** (`TaskController`) prijme text, zavolá na ňom `trim()`, aby odstránil medzery na začiatku a konci. Ak je výsledok prázdny reťazec, akcia sa nevykoná.
5. Ak text nie je prázdny, Controller zavolá `store.addTask(text)` na **Modeli**.
6. **Model** (`TaskStore`) vytvorí nový objekt úlohy s unikátnym `id` (z `Date.now()`), textom a hodnotou `isCompleted: false`. Pridá ho do poľa `this.task`.
7. Controller zavolá `refreshView()`, čo aktualizuje React state cez `setTasks([...this.store.task])`.
8. React zaregistruje zmenu state a prekreslí **View** — nová úloha sa objaví v zozname.
9. **View** zároveň vymaže obsah vstupného poľa, aby bol pripravený na ďalší vstup.

---

## 11. Možnosti budúceho rozšírenia

Projekt je navrhnutý tak, aby bol rozšíriteľný. Možné rozšírenia:

- **localStorage** — uloženie úloh do lokálneho úložiska prehliadača, aby zostali zachované aj po obnovení stránky. Stačilo by pridať metódy `save()` a `load()` do `TaskStore`.
- **Filtrovanie úloh** — zobrazenie len aktívnych, len dokončených alebo všetkých úloh. Stačilo by pridať stav filtra do View a metódu `getFilteredTasks()` do Modelu.
- **Editovanie úloh** — možnosť zmeniť text existujúcej úlohy. Stačilo by pridať metódu `editTask(id, newText)` do Modelu a tlačidlo „Upraviť" do View.
- **Kategórie a štítky** — priradenie úloh do kategórií ako „Práca", „Škola", „Osobné".
- **Tmavý režim** — prepínanie medzi svetlým a tmavým zobrazením pomocou Tailwind `dark:` tried.
- **Priorita úloh** — možnosť označiť úlohu ako dôležitú a zoradiť zoznam podľa priority.

---

## 12. Záver

Projekt To-Do List aplikácia s použitím MVC a Singleton ukazuje, že aj jednoduchá webová aplikácia môže byť navrhnutá s ohľadom na štruktúru a čitateľnosť kódu. Aplikácia plní všetky základné požiadavky pridávanie, označovanie a mazanie úloh pričom jej kód je rozdelený do jasných vrstiev podľa MVC.

Návrhový vzor MVC zabezpečuje, že dáta, logika a zobrazenie sú od seba oddelené a každá vrstva má svoju jednoznačnú zodpovednosť. Návrhový vzor Singleton garantuje, že v celej aplikácii existuje len jeden centrálny objekt spravujúci zoznam úloh, čo zabraňuje nekonzistentnosti dát.

Projekt ukazuje, že návrhové vzory nie sú len akademické koncepty — majú reálne využitie aj v menších projektoch a pomáhajú písať kód, ktorý je ľahšie čitateľný, udržiavateľný a rozšíriteľný.
