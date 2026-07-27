export const createFetchMock = <D>(
  timeout: number = 500,
  data?: D,
  dataHandler?: (searchValue: string) => D
) => {
  return (searchValue?: string) => {
    return new Promise<D>((resolve) => {
      console.log('fetch', searchValue);
      setTimeout(() => {
        if (dataHandler && searchValue) {
          resolve(dataHandler(searchValue!));
        } else {
          resolve(data as D);
        }
      }, timeout);
    });
  }
}
