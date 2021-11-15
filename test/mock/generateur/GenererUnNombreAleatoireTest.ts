import NombreAleatoire from "../../../src/domain/port/NombreAleatoire";
import GenererUnNombreAleatoire from "../../../src/infrastructure/generateur/GenererUnNombreAleatoire";

class GenererUnNombreAleatoireTest implements NombreAleatoire{
    execute(min: number, max: number): number {
        return 2;
    }

}
const providerGenererUnNombreAleatoireTest = {useClass: GenererUnNombreAleatoireTest, provide: GenererUnNombreAleatoire}
export default providerGenererUnNombreAleatoireTest
