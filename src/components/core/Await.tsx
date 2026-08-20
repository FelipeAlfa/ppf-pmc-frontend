import { ReactNode, Suspense } from "react";

type AwaitPromisesData<T extends readonly Promise<unknown>[]> = {
  [K in keyof T]: Awaited<T[K]>;
};

interface AwaitPromiseProps<T> {
  promise: Promise<T>;
  promises?: never;
  suspense?: ReactNode;
  children: (data: T) => ReactNode;
}

interface AwaitPromisesProps<T extends readonly Promise<unknown>[]> {
  promise?: never;
  promises: T;
  suspense?: ReactNode;
  children: (data: AwaitPromisesData<T>) => ReactNode;
}

type AwaitProps<T, P extends readonly Promise<unknown>[]> =
  | AwaitPromiseProps<T>
  | AwaitPromisesProps<P>;

interface AwaitPromiseContentProps<T> {
  promise: Promise<T>;
  children: (data: T) => ReactNode;
}

interface AwaitPromisesContentProps<T extends readonly Promise<unknown>[]> {
  promises: T;
  children: (data: AwaitPromisesData<T>) => ReactNode;
}

export default function Await<T>(props: AwaitPromiseProps<T>): ReactNode;
export default function Await<P extends readonly Promise<unknown>[]>(
  props: AwaitPromisesProps<P>
): ReactNode;
export default function Await(
  props: AwaitProps<unknown, readonly Promise<unknown>[]>
) {
  const { suspense } = props;
  const content = isAwaitPromisesProps(props)
    ? (
      <AwaitPromisesContent promises={props.promises}>
        {props.children}
      </AwaitPromisesContent>
    )
    : (
      <AwaitPromiseContent promise={props.promise}>
        {props.children}
      </AwaitPromiseContent>
    );

  if (suspense === undefined) {
    return content;
  }

  return (
    <Suspense fallback={suspense}>
      {content}
    </Suspense>
  );
}

function isAwaitPromisesProps(
  props: AwaitProps<unknown, readonly Promise<unknown>[]>
): props is AwaitPromisesProps<readonly Promise<unknown>[]> {
  return props.promises !== undefined;
}

async function AwaitPromiseContent<T>({
  promise,
  children,
}: AwaitPromiseContentProps<T>) {
  const data = await promise;

  return children(data);
}

async function AwaitPromisesContent<T extends readonly Promise<unknown>[]>({
  promises,
  children,
}: AwaitPromisesContentProps<T>) {
  const data = await Promise.all(promises) as AwaitPromisesData<T>;

  return children(data);
}
