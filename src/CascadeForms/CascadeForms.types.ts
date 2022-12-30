import { ValidationRuleObject } from "fastest-validator";

type FormItemVisible = {
    state:string;
    expect:string | boolean | unknown;
}

type FormValue = {
    value:any;
    state?:string | boolean;
}

export type FormState = Record<string | number,FormValue>;

export type FormItem = {
    id:string;
    type:string;
    validator?:ValidationRuleObject;
    className?:string;
    title?:string;
    visible?:FormItemVisible;
    items?:Array<FormItem>;
}

export type FormItems = FormItem[];

export type OnChangeFn = (id:string,value:string) => void;
export type FormControlRenderFn = (formState:FormState,item:FormItem,onChange:OnChangeFn) => JSX.Element;
export type StateUpdateFn = (state:FormState) => void;


export type EntryProps = {
    item:FormItem;
    formState:FormState;
    onRender:FormControlRenderFn;
    onUpdate:StateUpdateFn;
}

export type CascadeFormProps = {
    form:FormItems;
} & Omit<EntryProps,"item">

export type RenderProps = {
    items:FormItems;
    parent?:FormItem;
} & Omit<EntryProps,"item">

export type FormActions = {
    getState:() => FormState;
}
