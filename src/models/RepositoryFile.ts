export default interface RepositoryFile {
    readonly name: string,
    readonly path: string,
    readonly type: "file" | "dir",
    readonly sha: string,
    readonly content: string
}
