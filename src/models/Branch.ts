export default interface Branch {
    readonly name: string,
    readonly commit: {
        sha: string,
        url: string
    },
    readonly protected: boolean
}