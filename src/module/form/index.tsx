import { Button } from "../../component/Button";
import { Form } from "../../component/Form";
import { Input, InputNumber } from "../../component/Input";
import { Select } from "../../component/Select";
import { MultiSelect } from "../../component/Select/multiSelect";

export default function main () {
    const handleSubmit = (data:any) => {
        console.log('data ',data)
    }
    return <>
    <Form label="Custom Form" onSubmit={handleSubmit}>
        <Input name="name" label='name' placeholder="Enter Name" />
        <InputNumber name='Contact' label='Contact' placeholder="Enter Contact"  />
        <Select name='country' label='Country' 
        placeholder="Choose a Country" 
        url='https://restcountries.com/v3.1/all?fields=name,cca2' />
        <Select name='department' label='Department' placeholder="Choose a Department"  
        dropdownValues={[{label:'abc',code:'abc'}]}
        />
        <MultiSelect name='language' label='Language' placeholder="Choose a language"
        dropdownValues={[{label:'Hindi', code:'hindi'},{label:'English', code:'english'}]}
        />

        <Button label='Submit' />
    </Form>
    </>
}