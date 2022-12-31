import React,{ useEffect,useImperativeHandle,useState } from "react";
import Validator,{ ValidationError } from "fastest-validator";
import { FormActions,FormItem,FormState,EntryProps,OnChangeFn, RenderProps,CascadeFormProps } from "./CascadeForms.types";

export * from "./CascadeForms.types";

const isVisible = (item:FormItem,formState:FormState) => {
	if ( item.visible ) {
		const formValue = formState[item.visible.state]?.value;
		if ( formValue !== item.visible.expect )
			return false;    
	}
	return true;
};


const Entry : React.FC<EntryProps> = ({ item,formState,onUpdate,onRender }) => {
	const [state,setState] = useState(formState);

	const onChange = (id:string,value:string) => {
		const { validator } = item;
		let err : boolean | string = false;
		if ( validator ) {
			const v = new Validator();
			const check = v.compile({ [item.id]:validator });
			const res = check({ [item.id]:value }) as ValidationError[];
			if ( res.length )
				err = res.map((e) => e.message).join(",");
			console.log("VALIDATIOM",res);
		}
		console.log({ [id]:value,state });
		setState({ ...formState,
			[id]:{
				value,
				state:err,
			} });
	};

	useEffect(()=>{
		if ( !state )
			return;
		onUpdate && onUpdate(state);
	},[state]);

	const view = React.useMemo(()=>{
		if ( onRender )
			return onRender(formState,item,onChange);
		return <div className="entry">{item.title}</div>;
	},[item,formState,onRender]);
	return view;
};

const Render = ({ parent, items,formState,onUpdate,onRender } : RenderProps) => {
	return (
		<div className={parent?.className}>
			{items.filter(entry => isVisible(entry,formState)).map((entry:FormItem,idx:number) => {
				return ( 
					<div className={entry.className} key={`render_${idx}_${entry.id}`}>
						<Entry key={`entry_${idx}_${entry.id}`} onRender={onRender} item={entry} formState={formState} onUpdate={onUpdate} />
						{entry.items?.length && <Render parent={entry} formState={formState} items={entry.items} onRender={onRender} onUpdate={onUpdate} />}
					</div>
				);
			})}
		</div>
	);
};


const CascadeForms = React.forwardRef<FormActions,CascadeFormProps>(({ form,formState,onRender, onUpdate },ref) => {

	const getState = () => {
		let res = {};
		const iterate = (item:FormItem) => {		
			console.log("Processing",item?.id);
			if ( isVisible(item,formState) ) {
				res = {
					...res,
					[item.id]:formState[item.id]?.value
				};
			} else
				return;
			if ( !item?.items?.length )
				return;	            
			item.items.forEach((item)=>{
				iterate(item);
			});            
		};
		console.log("Gettting state",formState);
		form.forEach(iterate);
		return Object.entries(res).reduce((agg,[key,val])=>{
			if ( !val )
				return agg;
			return { ...agg,[key]:val };
		},{});
	};

	useImperativeHandle(ref,()=>({
		getState,
	}),[formState]);

	const view = React.useMemo(()=>{
		if ( !form?.length  )
			return <div>empty</div>;
		return <Render formState={formState} items={form} onUpdate={onUpdate} onRender={onRender} />;
	},[form,formState]);
	return view;
});

CascadeForms.displayName = "CascadeForms";
/*
function DynaForm<T>(props:CascadeFormProps) {
	const { form,formState,onRender, onUpdate } = props;    
	const view = React.useMemo(()=>{
		if ( !form?.length )
			return <div>empty</div>;
		return <Render formState={formState} items={form} onUpdate={onUpdate} onRender={onRender} />;
	},[form,formState]);
	return <div>{view}</div>;
}
*/

export default CascadeForms;
