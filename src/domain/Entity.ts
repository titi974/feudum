export default interface Entity<T> {
    same(other: T): boolean
}
