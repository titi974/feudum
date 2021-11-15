import Guild from "../entity/guild/Guild";

export default interface GuildRepository {
    initialiser(): Promise<Guild[]>
}
