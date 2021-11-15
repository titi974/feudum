export default interface ValueObject<T> {
    same(other: T): boolean
}
