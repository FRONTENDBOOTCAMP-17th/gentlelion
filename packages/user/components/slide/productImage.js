export function getDisplayImage(item) {
  return item?.images?.[1] ?? item?.images?.[0] ?? "";
}