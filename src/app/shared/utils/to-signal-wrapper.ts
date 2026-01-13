import { computed, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, map, Observable, of } from "rxjs";

export type SignalWrapper<T> = {
  data: Signal<T | undefined>,
  error: Signal<any> 
}

export function toSignalWrapper<T>(observable$: Observable<T>): { data: Signal<T | undefined>, error: Signal<any> } {
  const source = toSignal(observable$.pipe(
    map((data) => ({ data, error: undefined })),
    catchError((error) => of({ data: undefined, error: error }))
  ));

  const data = computed(() => source()?.data);
  const error = computed(() => source()?.error);
  
  return { data, error };
}