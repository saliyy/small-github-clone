type BreadCrumbItemLabel = string
type uid = string | number

export default interface BreadCrumbItem {
    uid: uid,
    label: BreadCrumbItemLabel,
    onClick: (item: BreadCrumbItem) => void
}