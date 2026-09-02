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
