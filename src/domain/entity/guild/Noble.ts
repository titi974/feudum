import Parchemin from "../Parchemin";
import {CompteurStatut, UneGuild} from "./Guild";
import {GUILD_NOMS} from "./GUILD_NOMS";
import Case from "../case/Case";
import * as _ from "lodash"
import {Optional} from "@eastbanctech/ts-optional";
import {STATUS_GUILD} from "../STATUS_GUILD";

export default class Noble extends UneGuild {
    public readonly nom = GUILD_NOMS.NOBLE
    private readonly combinaisons: string[] = ['123', '45', '146', '25s']

    constructor(private readonly parchemins: Parchemin[] = []) {
        super()
    }

    calculerStatut(cases: Case[]): void {
        // const compteur: [COULEURS, number][] = [];
        const liste = _(cases).map(lacase => lacase.personnages)
            .flatten()
            .filter(personnage => personnage.guild === this.nom)
            .reduce((result, personnage) => {
                // const {couleur} = personnage;
                // let val = result.has(personnage.couleur) ? result.get(couleur) : 0
                // result.set(couleur, ++val)
                const optFind = Optional.ofNullable(result.find(([couleur,]) => couleur === personnage.couleur));
                if (optFind.isPresent()) {
                    let [, cpt] = optFind.get();
                    ++cpt
                } else {
                    result.push([personnage.couleur, 0])
                }
                return result
            }, [] as CompteurStatut[])

        const optCouleurMaitre = Optional.ofNullable(this.status.get(STATUS_GUILD.MAITRE));

        if (optCouleurMaitre.isPresent()) {
            const [, maitreCpt] = liste[0];
            const [, cpt] = optCouleurMaitre.get()
            if(maitreCpt > cpt){
                this.status.set(STATUS_GUILD.MAITRE, liste[0])
            }
        }else{
            this.status.set(STATUS_GUILD.MAITRE, liste[0])
        }

        const optCouleurApprentie = Optional.ofNullable(this.status.get(STATUS_GUILD.APPRENTIE));
        if (optCouleurApprentie.isPresent()) {
            const [, apprentieCpt] = liste[1];
            const [, cpt] = optCouleurApprentie.get()
            if(apprentieCpt > cpt){
                this.status.set(STATUS_GUILD.APPRENTIE, liste[1])
            }
        } else {
            this.status.set(STATUS_GUILD.APPRENTIE, liste[1])
        }
    }
}
