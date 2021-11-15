import ValueObject from "../ValueObject";

export default class PartieId implements ValueObject<PartieId> {
    public readonly value: string;

    constructor(id: string) {
        if (typeof id !== "string" && id === '') {
            throw new Error("null")
        }
        this.value = id
    }

    same(other: PartieId): boolean {
        return this.value === other.value;
    }

}
