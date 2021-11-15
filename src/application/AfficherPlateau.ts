import PlateauRepository from "./port/PlateauRepository";
import Plateau from "./entity/plateau/Plateau";
import PlateauId from "./valueObject/PlateauId";

export type AfficherPlateau = (id: string) => Promise<Plateau>

const makeAfficherPlateau = (plateauRepository: PlateauRepository): AfficherPlateau => (id: string): Promise<Plateau> => {
    return plateauRepository.get(new PlateauId(id));
}

export default makeAfficherPlateau
