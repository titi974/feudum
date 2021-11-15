import ValueObject from "../ValueObject";

export default class PlateauId implements ValueObject<PlateauId> {
    public readonly value: string;

    constructor(id: string) {
        if (typeof id !== "string") {
            throw new Error("null")
        }
        this.value = id
    }

    same(other: PlateauId): boolean {
        return this.value === other.value;
    }

}
