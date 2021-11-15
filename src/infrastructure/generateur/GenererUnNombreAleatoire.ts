import NombreAleatoire from "../../domain/port/NombreAleatoire";
import {Injectable} from "@nestjs/common";

@Injectable()
export default class GenererUnNombreAleatoire implements NombreAleatoire {

    execute(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}
