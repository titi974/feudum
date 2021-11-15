import {PlateauService} from "../../../src/api/plateau/plateau.service";

class PlateauServiceTest {}
const providerPlateauService = {useClass: PlateauServiceTest, provide: PlateauService}
export default providerPlateauService
