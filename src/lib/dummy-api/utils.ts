import type {
  CreateDummyListGeneratorFunction,
  CreationCallback,
  CreationCallbackWithOriginData
} from "./types";

const DEFAULT_TIMEOUT = 1000;

export const createDummyList: CreateDummyListGeneratorFunction = <D, O>(
  creationCallback: CreationCallback<D> | CreationCallbackWithOriginData<D, O>,
  defaultLengthOrOriginData: O[] | number = 1
) => {
  const defaultLegth = typeof defaultLengthOrOriginData === "number"
    ? defaultLengthOrOriginData
    : defaultLengthOrOriginData.length;

  const originData = typeof defaultLengthOrOriginData === "number"
    ? null
    : defaultLengthOrOriginData;

  return (length: number = defaultLegth) => {
    return Array.from({ length }, (_, i) =>
      originData !== null
        ? (creationCallback as (index: number, originData: O) => D)(i, originData[i % originData.length])
        : (creationCallback as (index: number) => D)(i)
    ) as D[];
  };
};

export function createDummyRequest<P, D>(
  requestHandler: (params?: P) => D,
  timeout: number = DEFAULT_TIMEOUT
) {
  return function dummyHandler(params?: P) {
    return new Promise<D>((resolve) => {
      setTimeout(() => {
        resolve(requestHandler(params));
      }, timeout);
    });
  }
}
