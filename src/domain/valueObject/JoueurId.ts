import ValueObject from "../ValueObject";

export default class JoueurId implements ValueObject<JoueurId> {
    public readonly value: string;

    constructor(id: string) {
        if (typeof id !== "string" && id === '') {
            throw new Error("null")
        }
        this.value = id
    }

    same(other: JoueurId): boolean {
        return this.value === other.value;
    }

}
