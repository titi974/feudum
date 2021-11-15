import GuildRepository from "../../../src/domain/port/GuildRepository";
import GuildMemory from "../../../src/infrastructure/memory/GuildMemory";
import Guild from "../../../src/domain/entity/guild/Guild";

class GuildMemoryTest implements GuildRepository{
    initialiser(): Promise<Guild[]> {
        return Promise.resolve([]);
    }
}
const providerGuildMemoryTest = {useClass: GuildMemoryTest, provide: GuildMemory}
export default providerGuildMemoryTest
