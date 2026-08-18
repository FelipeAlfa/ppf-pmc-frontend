type CreateDummyDataListGeneratorWithoutOriginFunction = <D>(
    creationCallback: (index: number) => D,
) => (count: number) => D[];

type CreateDummyDataListGeneratorWithOriginFunction = <D, O>(
    creationCallback: (index: number, originData: O) => D,
    originDataList: O[],
) => (count: number) => D[];

type createDummyDataListGeneratorFunction = CreateDummyDataListGeneratorWithoutOriginFunction & CreateDummyDataListGeneratorWithOriginFunction;

export const createDummyListData: createDummyDataListGeneratorFunction = <D, O>(
    creationCallback: ((index: number) => D) | ((index: number, originData: O) => D),
    originDataList?: O[],
) => {
    return (count: number) => {
        if (originDataList && originDataList.length > 0) {
            return Array.from({ length: count }, (_, i) =>
                (creationCallback as (index: number, originData: O) => D)(
                    i,
                    originDataList[i % originDataList.length],
                )
            );
        }

        return Array.from({ length: count }, (_, i) =>
            (creationCallback as (index: number) => D)(i)
        );
    }
};

type DummyRequestParams = Record<string, unknown>;

export const createDummyRequest = <D, P extends DummyRequestParams = DummyRequestParams>(
  data: D | ((params: P) => D),
  defaultParams: P = {} as P,
  defaultTimeout = 1000
) => {
  return (
    params: P = defaultParams,
    timeout = defaultTimeout
  ) => {
    return new Promise<D>((resolve) => {
      setTimeout(() => {
        resolve(
          typeof data === "function" 
          ? (data as (params: P) => D)(params as P)
          : data);
      }, timeout);
    });
  }
};
