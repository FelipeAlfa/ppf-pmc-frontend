type CreateListHandler<D> = (length?: number) => D[];

export type CreationCallback<D> = (index: number) => D;

export type CreationCallbackWithOriginData<D, O> = (index: number, originData: O) => D;

type CreateDummyListWithLengthGeneratorFunction = <D>(
  creationCallback: CreationCallback<D>,
  defaultLength?: number
) => CreateListHandler<D>;

type CreateDummyListWithOriginGeneratorFunction = <D, O>(
  creationCallback: CreationCallbackWithOriginData<D, O>,
  originData: O[]
) => CreateListHandler<D>;

export type CreateDummyListGeneratorFunction = (
  CreateDummyListWithLengthGeneratorFunction & CreateDummyListWithOriginGeneratorFunction
);

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

export function dummyImageSrc(width: number, height: number) {
  return `https://picsum.photos/${width}/${height}`;
}

export function randomImage(maxSize: number, minSize: number) {
  const width = randomInteger(minSize, maxSize);
  const height = randomInteger(minSize, maxSize);

  return `https://picsum.photos/${width}/${height}`;
}

function randomInteger(min: number, max: number) {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);

  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}
