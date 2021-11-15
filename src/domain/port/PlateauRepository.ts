import Plateau from "../entity/plateau/Plateau";
import PlateauId from "../valueObject/PlateauId";

export default interface PlateauRepository {
    insert(plateau: Plateau): Promise<void>
    get(plateauId: PlateauId): Promise<Plateau>
}
