class User {
    constructor(nom, coordX, coordY,color) {
        this._nom = nom;
        this._coordX = coordX;
        this._coordY = coordY;
        this._color = color;
    }

    // Getter pour le nom
    get nom() {
        return this._nom;
    }

    // Setter pour le nom
    set nom(nouveauNom) {
        this._nom = nouveauNom;
    }
    get color() {
        return this._color;
    }

    // Setter pour le nom
    set color(color) {
        this._color = color;
    }

    // Getter pour coordX
    get coordX() {
        return this._coordX;
    }

    // Setter pour coordX
    set coordX(nouvelleCoordX) {
        this._coordX = nouvelleCoordX;
    }

    // Getter pour coordY
    get coordY() {
        return this._coordY;
    }

    // Setter pour coordY
    set coordY(nouvelleCoordY) {
        this._coordY = nouvelleCoordY;
    }

    afficherCoordonnees() {
        console.log(`Coordonnées de ${this.nom}: (${this.coordX}, ${this.coordY})`);
    }
}
export default User;