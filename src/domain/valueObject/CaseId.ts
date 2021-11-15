import ValueObject from "../ValueObject";

export default class CaseId implements ValueObject<CaseId> {
    public readonly value: string;

    constructor(id: string) {
        if (typeof id !== "string") {
            throw new Error("null")
        }
        this.value = id
    }

    same(other: CaseId): boolean {
        return this.value === other.value;
    }

}
