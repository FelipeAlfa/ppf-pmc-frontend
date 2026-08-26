const DEFAULT_TIMEOUT = 1000;

type CreateDummyDataListGeneratorWithoutOriginFunction = <D>(
    creationCallback: (index: number) => D,
    defaultCount?: number,
) => DummyListHandler<D>;

type CreateDummyDataListGeneratorWithOriginFunction = <D, O>(
    creationCallback: (index: number, originData: O) => D,
    originDataList: O[],
) => DummyListHandler<D>;

type createDummyDataListGeneratorFunction = CreateDummyDataListGeneratorWithoutOriginFunction & CreateDummyDataListGeneratorWithOriginFunction;

const dummyListHandlerMarker = Symbol("dummyListHandler");

type DummyListHandler<D> = ((count?: number) => D[]) & {
    [dummyListHandlerMarker]: true;
};

export const createDummyList: createDummyDataListGeneratorFunction = <D, O>(
    creationCallback: ((index: number) => D) | ((index: number, originData: O) => D),
    originDataListOrDefaultCount: O[] | number = 1,
) => {
    let originDataList: O[] | null;
    let defaultCount: number;

    if (Array.isArray(originDataListOrDefaultCount)) {
        originDataList = originDataListOrDefaultCount;
        defaultCount = originDataList.length;
    }
    else {
        originDataList = null;
        defaultCount = originDataListOrDefaultCount;
    }

    const handler = ((count?: number) => {
        const length = count ?? defaultCount;

        if (originDataList !== null && originDataList.length > 0) {
            return Array.from({ length }, (_, i) =>
                (creationCallback as (index: number, originData: O) => D)(
                    i,
                    originDataList[i % originDataList.length],
                )
            );
        }

        return Array.from({ length }, (_, i) =>
            (creationCallback as (index: number) => D)(i)
        );
    }) as DummyListHandler<D>;

    handler[dummyListHandlerMarker] = true;

    return handler;
};

type DummyListRequestInputParams = {
    limit?: number;
    [key: string]: string | number | boolean | undefined;
}

type DummyListRequestHandler = DummyListHandler<unknown>;
type DummyController<D> = (params: DummyListRequestInputParams) => D;

const isDummyListHandler = (
    listHandler: unknown
): listHandler is DummyListRequestHandler => (
    typeof listHandler === "function" && dummyListHandlerMarker in listHandler
);

export function createDummyRequest<D>(
    listHandler: DummyListHandler<D>,
    timeout?: number,
): (
    params?: DummyListRequestInputParams | number
) => Promise<D[]>;

export function createDummyRequest<D>(
    controller: DummyController<D>,
    timeout?: number,
): (
    params?: DummyListRequestInputParams | number
) => Promise<D>;

export function createDummyRequest<D>(
    data: D,
    timeout?: number,
): (
    params?: DummyListRequestInputParams | number
) => Promise<D>;

export function createDummyRequest<D>(
    data: DummyListRequestHandler | DummyController<unknown> | D,
    timeout: number = DEFAULT_TIMEOUT
) {
    return function dummyRequest(
        params?: DummyListRequestInputParams | number
    ) {
        const requestParams = typeof params === "number" ? { limit: params } : params;
        const limit = requestParams?.limit;
        const controllerParams = requestParams ?? {};

        return new Promise<unknown>((resolve) => {
            setTimeout(() => {
                if (isDummyListHandler(data)) {
                    resolve(data(limit));
                    return;
                }

                if (typeof data === "function") {
                    resolve((data as DummyController<unknown>)(controllerParams));
                    return;
                }

                resolve(data);
            }, timeout);
        })
    };
}

export const asLimit = (
    data: string | number | boolean | undefined,
    fallbackLimit?: number) => {
    if (data !== undefined) {
        const n = Number(data);

        if (!Number.isNaN(n) && n > -1) {
        return n;
        }

        return fallbackLimit ?? 0;
    }

    return 0;
};
