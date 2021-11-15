import {GUILD_NOMS} from "../entity/guild/GUILD_NOMS";
import {COULEURS} from "../entity/COULEURS";
import ValueObject from "../ValueObject";


export default class Personnage implements ValueObject<Personnage> {
    constructor(public readonly guild: GUILD_NOMS, public readonly couleur: COULEURS) {
    }

    same(other: Personnage) {
        return this.couleur === other.couleur && this.guild === other.guild;
    }
}
