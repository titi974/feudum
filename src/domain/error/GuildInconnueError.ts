import DomainError from "../entity/DomainError";

export default class GuildInconnueError extends DomainError{
    constructor(guild: string) {
        super(`La guild ${guild} n'existe pas`);
    }
}
