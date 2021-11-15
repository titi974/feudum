import {JoueurService} from "../../../src/api/joueur/joueur.service";

class JoueurServiceTest {}
const providerJoueurServiceTest = {useClass: JoueurServiceTest, provide: JoueurService}
export default providerJoueurServiceTest
