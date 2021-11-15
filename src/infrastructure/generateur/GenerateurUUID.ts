import {Injectable} from "@nestjs/common";
import GenerateurId from "../../domain/port/GenerateurId";
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export default class GenerateurUUID implements GenerateurId {
    execute(): string {
        return uuidv4();
    }
}
