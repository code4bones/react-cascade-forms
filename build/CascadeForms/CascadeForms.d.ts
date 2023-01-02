import React from "react";
import { FormActions, ControlItemProps } from "./CascadeForms.types";
export * from "./CascadeForms.types";
declare const CascadeForms: React.ForwardRefExoticComponent<{
    form: import("./CascadeForms.types").FormItems;
} & Omit<ControlItemProps, "item"> & React.RefAttributes<FormActions>>;
export default CascadeForms;
