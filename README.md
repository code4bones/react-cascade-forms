
### Cascade Forms -  state-driven container/controls renderer

Simple engine for render  component / group depends on common state
 

`yarn install @code4bones/react-cascade-forms`

```tsx

import  CascadeForms , {
  FormItems,
  ControlRenderProps,
  FormState,
  FormItem,
  OnChangeFn,
  FormActions } from  "@code4bones/react-cascade-forms";


...

const  FORM : FormItems = [ ... ] // check samples !

const  actions = createRef<FormActions>();

const [formState,setFormState] = React.useState<FormState>({
	name:{ // default state, conforms to  FormState
	 value:"",
	}
});

const  onRender = (formState:FormState,item:FormItem,onChange:OnChangeFn) => {
  switch ( item.type ) {
    case  "custom":
        // Signature = FormControlRenderFn
		return  <CustomCtrl  formState={formState}  item={item}  onChange={onChange}  />;
    default:
		return <div>Unexpected type {item.type}</div>
   }
  }
 
const  onUpdate = (state:any) => {
	console.log("Live State",state);
	setFormState(state);
};

const  onReadState = () => {
   // read active values ( visible ) only
   const  state = actions.current?.getState();
   /* state {
       [id]:{
         value:...,
         state: // => false if no error, or joined string from ValidationError[] (fastest-validator) 
       }
     }
    */
   console.log("Actual state",state);
};

<CascadeForms  
	ref={actions}  
	form={FORM}  
	formState={formState}  
	onRender={onRender}  
	onUpdate={onUpdate}  />

<Button  text="Read state"  onClick={onReadState}  />
...
```

Samples available via storybook.

That's all, folks !



