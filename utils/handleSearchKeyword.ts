export const handleSearchKeyword = (keyword: string, searchKeyword: string[]) => {
  const newSearchKeyword = [keyword, ...searchKeyword.filter((item) => item !== keyword)].slice(0, 10);
  return newSearchKeyword;
};
