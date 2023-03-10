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

export type FormPayload = any;

export type FormItem = {
    id:string;
    type:string;
    payload?:FormPayload;
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

export type ControlRenderProps = {
    formState:FormState;
    item:FormItem;
    onChange:OnChangeFn;
} 


export type ControlItemProps = {
    item:FormItem;
    formState:FormState;
    onRender:FormControlRenderFn;
    onUpdate:StateUpdateFn;
}

export type CascadeFormProps = {
    form:FormItems;
} & Omit<ControlItemProps,"item">

export type RenderProps = {
    items:FormItems;
    parent?:FormItem;
} & Omit<ControlItemProps,"item">

export type FormActions = {
    getState:() => FormState;
}
