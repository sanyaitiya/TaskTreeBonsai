export interface Action<Payload> {
    type: string,
    payload?: Payload,
}

type HandlerMapWithState<T> = {
    [type: string]: { (action: Action<any>): (state: T) => T }
}

export function createReducer<T>(defaultState: T, handlers: HandlerMapWithState<T>){
    return (state: T = defaultState, action: Action<any>): T => {
        const handler = handlers[action.type] || handlers[DEFAULT];
        return handler ? handler(action)(state) : state;
    };
}

export const DEFAULT = "DEFAULT";
export const CHANGE_PROJECT = "CHANGE_PROJECT";
export type  CHANGE_PROJECT = Action<number>
export const changeProject = (projectId: number): CHANGE_PROJECT => {
    return {
        type: CHANGE_PROJECT,
        payload: projectId
    }
}