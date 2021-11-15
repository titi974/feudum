export default class Parchemin {
    constructor(private readonly id: number, private seau: boolean = false) {
    }

    get hasSeau(): boolean {
        return this.seau
    }
}
