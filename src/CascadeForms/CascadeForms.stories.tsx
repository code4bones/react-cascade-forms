// Generated with util/create-component.js
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "./story.css";

import React,{ createRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CascadeForms,{ ControlRenderProps,CascadeFormProps,FormActions,FormState,FormItem,OnChangeFn } from "./CascadeForms";
import FORM from "./form1.json";

import { Button,Callout,Checkbox, EditableText, InputGroup, RadioGroup, Switch } from "@blueprintjs/core";


const CustomCtrl = (props:ControlRenderProps) => {
	const { item,formState, onChange } = props;
	return (
		<div className="customCtrl">
			<Callout intent="warning">
				Enter some chars..
			</Callout>
			<EditableText value={formState[item.id]?.value} multiline={true} minLines={5} onChange={(text) => onChange(item.id,text || "") } />
		</div>
	);
};

const PayloadTest = (props:ControlRenderProps) => {
	const { item,formState, onChange } = props;
	const { payload } = item;
	return (
		<select value={formState[item.id]?.value || 1} onChange={(ev) => onChange(item.id,ev.target.value)}>
			{payload.map(({ value,label })=>{
				return <option key={label} value={value}>{label}</option>;
			})}
		</select>
	);
};

const onRender = (formState:FormState,item:FormItem,onChange:OnChangeFn) => {
	switch ( item.type ) {
	case "input":
		return <InputGroup intent={formState[item.id]?.state ? "danger" : "primary"} value={formState[item.id]?.value || ""} placeholder={item.title} onChange={(ev) => onChange(item.id,ev.target.value)} />;
	case "checkbox":
		return <Checkbox value={formState[item.id]?.value} label={item.title} onChange={(ev) => onChange(item.id,ev.target.checked)} />;
	case "radio":
		return <Switch checked={formState[item.id]?.value} label={item.title} onChange={(ev) => onChange(item.id,ev.target.checked)} />;
	case "custom":
		return <CustomCtrl formState={formState} item={item} onChange={onChange} />;
	case "select":
		return <PayloadTest formState={formState} item={item} onChange={onChange} />;
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
	formState:{
		details:{
			value:false
		}
	},
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
