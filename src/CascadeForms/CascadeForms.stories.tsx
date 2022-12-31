// Generated with util/create-component.js
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./story.css";

import React,{ createRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CascadeForms,{ CascadeFormProps,FormActions,FormState,FormItem,OnChangeFn } from "./CascadeForms";
import FORM from "./form1.json";

import { Button,Checkbox, InputGroup, RadioGroup, Switch } from "@blueprintjs/core";

const onRender = (formState:FormState,item:FormItem,onChange:OnChangeFn) => {
	console.log("onRender",formState);
	switch ( item.type ) {
	case "input":
		return <InputGroup intent={formState[item.id]?.state ? "danger" : "primary"} value={formState[item.id]?.value || ""} placeholder={item.title} onChange={(ev) => onChange(item.id,ev.target.value)} />;
	case "checkbox":
		return <Checkbox value={formState[item.id]?.value || false} label={item.title} onChange={(ev) => onChange(item.id,ev.target.checked)} />;
	case "radio":
		return <Switch checked={formState[item.id]?.value || false} label={item.title} onChange={(ev) => onChange(item.id,ev.target.checked)} />;
	default:
		return <div className="default">{item.title}</div>;
	}
};


const CascadeFormsTest = (props:CascadeFormProps) => {
	const st = createRef<FormActions>();
	const [formState,setFormState] = React.useState<FormState>({
		...props.formState
	});

	const onUpdate = (state:any) => {
		console.log("DynaForm",state);
		setFormState(state);
	};

	const onReadState = () => {
		const state = st.current?.getState();
		alert(JSON.stringify(state,null,2));
		console.log("STATE",state);
	};

	return (
		<div>
			<CascadeForms ref={st} form={FORM} formState={formState} onRender={onRender} onUpdate={onUpdate} />
			<Button text="Read state !" onClick={onReadState} />
		</div>
	);		
};

export default {
	title: "Demo",
	component:CascadeFormsTest,
	argTypes:{
		formState:{
			details:{
				value:true
			}
		},
		form:{
			table:{
				disable:true
			}
		},
	}
} as ComponentMeta<typeof CascadeFormsTest>;


const Template : ComponentStory<typeof CascadeForms> = (args:CascadeFormProps) => <CascadeFormsTest {...args} />; 

export const CascadeFormSample = Template.bind({});

CascadeFormSample.args = {
	form:FORM,
};


/*
export const FolderTree = Template.bind({});

FolderTree.args = {
	id:"simple_tree_2",
	treeID:"tree_2",
	initialCollapsed:false,
	groupIconLeft:false,
};
*/
// FolderTree.args.defaultCollapsed = false;

/*
export const FullSample = ()  => {
	const ref = createRef<TreeMenuActions>();
	const renderMarker = ({ id,...rest }) => {
		if ( id === "sub" || id === "m3" || id === "LAST")
			return <Badge color="green" />;
		if ( id === "home" || id === "m2")
			return <Badge color="orange" />;
		if ( id === "n1" )
			return <button onClick={() => alert(rest.title)}>Menu</button>;
	};

	const onClick = (id:string) => {
		const item = ref.current?.getItem(id);
	};

	const onToggle = (...args:any) => {
		console.log(...args);
	};

	const renderGroupState = (item:TreeMenuItem) => {
		console.log(">>>",item);
		return item.collapsed ? <FaFolder /> : <FaFolderOpen/>;
	};
	const renderIcon = (item:TreeMenuItem) => {
		if ( item.childs )
			return <FaFolder style={{ marginRight:5 }} color="var(--item-group-icon)" />;
	};

	return (
		<div style={{ display:"flex",flexDirection:"row" }}>
			<div style={{ minWidth:400 }}>
				<TreeMenu 
					treeID="tree1"
					// propertyGrid
					classPrefix="test"
					initialCollapsed
					// theme="dark"
					enableRotate={true}
					// initialSelected="LAST"
					// ref={ref}
					items={tree as TreeMenuItem[]}
					renderGroupState={<FaChevronRight />}
					// renderIcon={renderIcon}
					// renderGroupState={renderGroupState}
					// renderBadge={renderMarker} 
					onClick={onClick} 
					onToggle={onToggle}
				/>
			</div>
		</div>
	);
};
*/
/*
			<div style={{ minWidth:400 }}>
				<TreeMenu 
					classPrefix="test"
					// initialCollapsed
					theme="light"
					enableRotate={true}
					// initialSelected="LAST"
					// ref={ref}
					items={ITEMS}
					renderGroupState={<FaChevronRight />}
					// renderIcon={renderIcon}
					//renderGroupState={renderGroupState}
					renderBadge={renderMarker} 
					onClick={onClick} 
					onToggle={onToggle}
				/>

*/
// export const WithBaz = WithBar;

// export const WithBaz = () => <TreeMenu foo="baz" />;
