### Status
<a href="https://sonarcloud.io/dashboard?id=s3b1R_Diplomarbeit-NDS" target="_blank"><img src="https://sonarcloud.io/api/project_badges/measure?project=s3b1R_Diplomarbeit-NDS&metric=alert_status" alt="code-quality" /></a>
<a href="https://github.com/s3b1R/Diplomarbeit-NDS/actions/workflows/onBuildDevelop.yml" target="_blank"><img src="https://github.com/s3b1R/Diplomarbeit-NDS/actions/workflows/onBuildDevelop.yml/badge.svg" alt="build status develop branch" /></a>
<a href="https://github.com/s3b1R/Diplomarbeit-NDS/actions/workflows/onBuildMaster.yml" target="_blank"><img src="https://github.com/s3b1R/Diplomarbeit-NDS/actions/workflows/onBuildMaster.yml/badge.svg" alt="build status master branch" /></a>

---

# Ressourcen Planer

## Einleitung
Dieses Projekt habe ich zum Abschluss im Lehrgang NDS HF Applikationsentwicklung der [ibW](https://www.ibw.ch/) erstellt.

Die Applikation soll die Planung des Workloads in PI- und Sprint-Plannings im Tribe in welchem ich arbeite erleichtern.

--- 

## Vorbereitung und Applikationsstart
GIT Repository clonen oder ZIP download


## Installation
```bash
$ npm install
```
Es werden alle benötigten Pakete für das Front- und Backend installiert.  
**Wichtig:** Docker muss gestartet sein, da mit dem Script auch ein Image und ein Container für die Datenbank erstellt werden.

---

## Start Applikation
### Lokal
```bash
$ npm run start:local
```
Der Script startet den Docker Container mit der Datenbank, sowie das lokal installierte Front- und Backend.
Nach dem Start ist die Applikation unter [http://localhost:4200](http://localhost:4200) erreichbar.
#### Beispieldaten
```bash
$ npm run seed:localdb
```
Nachdem die Applikation läuft, kann die Applikation mit obigem Script mit Beispieldaten gefüllt werden.

### Container basiert
```bash
$ npm run start:docker
```
Wenn die Applikation nicht lokal installiert wurde, kann diese mit allen Komponenten in Containern gestartet werden.
Nach dem Start ist die Applikation unter [http://localhost](http://localhost) erreichbar.

#### Beispieldaten
```bash
$ npm run seed:db
```
Nachdem die Applikation läuft, kann die Applikation mit obigem Script mit Beispieldaten gefüllt werden.

### Beispiel csv
Im Ordner `testfile` befindet sich eine .csv Datei, mit welcher in der Applikation neue Workload Daten importiert werden können.
Ob die Applikation lokal oder im Container ausgeführt wird, ist davon unabhängig.

---


## Tests

### Unit-Tests
```bash
# backend
$ npm run test:backend

# frontend
$ npm run test:frontend
```

### End2End-Tests
```bash
# backend
$ npm run e2e:backend

# frontend
$ npm run e2e:frontend
```
**Wichtig:** Docker Container der Applikation müssen gestoppt sein, da für die e2e Tests ein eigener Datenbank-Container erstellt wird und Port 3306 daher frei sein muss. 

--- 

## Systemvoraussetzungen
- Node.js (Version 12 oder 14) inkl. npm
- [Angular CLI](https://www.npmjs.com/package/@angular/cli)
- [Nest CLI](https://www.npmjs.com/package/@nestjs/cli)
- Chrome (Version 90)
- Mac OS X oder Linux
