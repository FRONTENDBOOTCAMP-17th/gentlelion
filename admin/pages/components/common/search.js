export function search(items, input, onSearch, filterFn) {
  if (!input) return;

  input.addEventListener("input", () => {
    const keyword = input.value.trim().toLowerCase();

    if (!keyword) {
      onSearch(items);
      return;
    }

    onSearch(items.filter((item) => filterFn(item, keyword)));
  });
}