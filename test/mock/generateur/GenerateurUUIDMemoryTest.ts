import GenerateurUUID from "../../../src/infrastructure/generateur/GenerateurUUID";

class GenerateurUUIDMemoryTest implements GenerateurUUID {
    execute(): string {
        return "";
    }
}

const providerGenerateurUUIDMemoryTest = {useClass: GenerateurUUIDMemoryTest, provide: GenerateurUUID}
export default providerGenerateurUUIDMemoryTest
