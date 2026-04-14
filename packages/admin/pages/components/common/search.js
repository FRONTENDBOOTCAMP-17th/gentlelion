let currentHandler = null;

export function search(items, input, onSearch, filterFn) {
  if (!input) return;

  if(currentHandler){
    input.removeEventListener("input", currentHandler);
  }

  currentHandler = () => {
    const keyword = input.value.trim().toLowerCase();

    if (!keyword) {
      onSearch(items);
      return;
    }

    onSearch(items.filter((item) => filterFn(item, keyword)));
  }

  input.addEventListener("input", currentHandler);
}