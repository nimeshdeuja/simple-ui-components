# simple-ui-react

Simple ui components for all react basic components like Autocomplete, Button, Dialog and Form all in one package.

## Install

```bash
npm i simple-ui-components
```

## Tooltip

```jsx
import { SimpleTooltip } from "simple-ui-components";
const { TooltipContainer } = SimpleTooltip;

<Tooltip
  text="Tooltip Content"
  placement="left"
  space={10}
  disabled={false}
  click={true} // if you want to hide tooltip on mouse click
>
  Hover me
</Tooltip>;

<TooltipContainer />; // call once in root file if you are using tooltip do not call more then one time;
```

## Button

```jsx
import { Button } from "simple-ui-components";

<Button
  className="myClass"
  theme="default"
  type="button"
  clicked={() => console.log("Button has been clicked!")}
  icon={""} // you add SVG icon
  text="Click me"
/>;
```

## Dialog

```jsx
import {  SimpleDialog } from "simple-ui-components";
const {Dialog, DialogBody, DialogFooter} = SimpleDialog;

<Dialog
  close={()=>}
  title="Simple dialog box"
  theme="default"
  size="md"
  open={true}
  className="myClass"
>
    <DialogBody
      className="myClass"
    >
      Dialog box body content.
    </DialogBody>
    <DialogFooter
      multiple={true}
      className="myClass"
    >
    Dialog box footer content.
    </DialogFooter>
</Dialog>
```

## Autocomplete

```jsx
import { Autocomplete, SimpleForm } from "simple-ui-components";
const { InputGroup } = SimpleForm;

<div className="md default">
  <InputGroup type="autocomplete" placeholder="Input Name">
    <Autocomplete
      id="testing"
      list={[
        {
          label: "One",
          id: "one",
          icon: "https://unprint.pt/static/media/logo.4af0ed03.png",
          color: "#000",
        },
        {
          label: "Two",
          id: "two",
          icon: "https://unprint.pt/static/media/logo.4af0ed03.png",
          color: "#000",
        },
        {
          label: "Three",
          id: "three",
          icon: "https://unprint.pt/static/media/logo.4af0ed03.png",
          color: "#000",
        },
      ]}
      change={() => console.log("change handler")}
      value={[
        {
          label: "Three",
          id: "three",
          icon: "https://unprint.pt/static/media/logo.4af0ed03.png",
          color: "#000",
        },
      ]}
      placeholder="Placeholder text"
      inputPlaceholder="Input search placeholder"
      emptyText="List is empty"
      multiple={false}
      clear={true}
      selectedCallback={true}
      secondaryOption="label" // if you want to add secondary option
    />
  </InputGroup>
</div>;
```

## Form

```jsx
import { SimpleForm, SimpleUtility } from "simple-ui-components";
import ptLocale from "date-fns/locale/pt";

import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

type autocompleteType = {
  label: string,
  id: string | number,
  icon?: string,
  color?: string
};

type objectTypes = {
  dateOfBirth?: Date,
  hobbies?: autocompleteType[],
};

const {
  UpdateObject,
  UpdateArray,
  ShortArray,
  GetIndexBy,
  ShortNameGenerate,
  GetUniqueId,
} = SimpleUtility;

const { SimplePreventAlphabet, SimpleOnBlur, Message, Form, InputGroup } =
  SimpleForm;

const [data, setData] =
  useState <
  objectTypes >
  {
    dateOfBirth: new Date("2021-07-07"),
    hobbies: [
      {
        label: 'One',
        id: 'one',
        icon:'https://unprint.pt/static/media/logo.4af0ed03.png',
        color:'#000'
      },
    ],
  };

const onSubmit = () => console.log(data);
const inputChangeHandler = (e: any) =>
  setData((prev) => UpdateObject(prev, { [e.target.name]: e.target.value }));
const dateChangeHandler = (date: MaterialUiPickersDate) =>
  setData((prev) => UpdateObject(prev, { dateOfBirth: date }));
const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) =>
  setData((prev) => UpdateObject(prev, { occupation: e.target.value }));
const autocompleteChangeHandler = (data: autocompleteType[]) =>
  setData((prev) => UpdateObject(prev, { hobbies: data }));
const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
  setData((prev) => UpdateObject(prev, { [e.target.name]: e.target.checked }));
const getUploadedFileHandler = (file:File|string|null)=>setData((prev) => UpdateObject(prev, { file: file }))

return (
  <Form
    size="md"
    layout="outline"
    onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
  >
    <InputGroup
      name="fullName"
      placeholder="Full Name"
      inputElement={{
        name: "fullName", // must have name
        type: "text", // must have type
        onChange: inputChangeHandler,
      }}
    />
    <InputGroup
      type="date"
      name="dateOfBirth"
      placeholder="Date of birth material"
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
        <DatePicker
          name="dateOfBirth"
          format="yyyy-MM-dd"
          views={["year", "month", "date"]}
          onChange={dateChangeHandler}
          value={data.dateOfBirth}
          InputProps={{ disableUnderline: true }}
        />
      </MuiPickersUtilsProvider>
    </InputGroup>
    <InputGroup
      placeholder="Age"
      inputElement={{
        name: "age", // must have name
        type: "number", // must have type
        onChange: inputChangeHandler,
      }}
    />
    <InputGroup
      placeholder="Email"
      inputElement={{
        name="email" // must have name
        type: "email", // must have title
        onChange: inputChangeHandler,
      }}
    />
    <InputGroup
      type="select"
      name="occupation" // must have name
      placeholder="Occupation"
      inputElement={{
        defaultValue: "Programmer",
        options: [
          { value: "Designer", label: "Designer" },
          { value: "Programmer", label: "Programmer" },
        ], // options must have value and label.
        onChange: selectChangeHandler,
      }}
    />
    <InputGroup
      type="autocomplete"
      name="hobbies"
      placeholder="hobbies"
      inputElement={{
        id: "hobbies", // id should be unique.
        list: [
          {
            label: "One",
            id: "one",
          },
          { label: "Two", id: "two" },
          { label: "Three", id: "three" },
        ], // list must have value label and id.
        change: autocompleteChangeHandler,
        value: data.hobbies, // or undefined
        placeholder: "hobbies...", // String | null | undefined
        inputPlaceholder: "search hobbies...", // String | null | undefined
        emptyText: "No hobbies to display", // String | null | undefined
        multiple: true, // true | false | null | undefined
        clear: true, // true | false | null | undefined
        secondaryOption="label" // if you want to add secondary option or undefined
      }}
    />
    <InputGroup
      type="password"
      placeholder="Password"
      inputElement={{
        id: "password", // id should be unique.
        autoComplete: "password-new",
        onChange: inputChangeHandler,
      }}
    />
    <InputGroup
      type="radio" // 'radio' | 'radio-row'
      name="gender" // must have name
      placeholder="Gender"
      inputElement={{
        onChange: inputChangeHandler,
        options: [
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
        ], // must have value and label
      }}
    />

    <InputGroup
      type="checkbox"
      name="privacy" // must have name
      placeholder="Privacy"
      inputElement={{
        onChange: checkboxChangeHandler,
        label: "Accept all privacy",
      }}
    />

    <InputGroup
      type="file"
      placeholder="Upload File"
      inputElement={{
        feedbackText: (e: string) =>
          `Document <u><b>${e}</b></u> has been successfully uploaded.`, // or String | null | undefined
        labelText: "Upload",
        id: "myFile", // id should be unique.
        Uploaded: getUploadedFileHandler,
        format: "base64", // 'file' | 'base64' | null | undefined
        clear: true, // true | false | null | undefined
      }}
    />

    <InputGroup
      type="textarea"
      name="feedback"
      placeholder="feedback"
      inputElement={{
        onChange: inputChangeHandler,
        rows: 10, // Number
      }}
    />
    <input type="submit" onClick={onSubmit} />
  </Form>
);
```

## Author

Nimesh Deuja
