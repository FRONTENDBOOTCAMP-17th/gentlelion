export function calcListNum(data, range, currentPage) {
    const pageSize = 20;
    const totalCount = data.data.pagination?.totalCount ?? 0;

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);

    range.textContent = `${start} - ${end}`;
}