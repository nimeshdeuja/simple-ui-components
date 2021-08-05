# simple-ui-react

Simple ui components for all reacte basic components like Autocomplete, Button, Dailog and Form all in one package.

## Install

```bash
npm i simple-ui-components
```

## Tooltip

```jsx
import { SimpleTooltip } from "simple-ui-components";
const { TooltipContainer } = SimpleTooltip;

<Tooltip text="Tooltip Content" placement="left" space={10} disabled={false}>
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
          label: "Acroyoga",
          id: "Acroyoga",
          icon: "https://unprint.pt/static/media/logo.4af0ed03.png",
          color: "#000",
        },
        {
          label: "Conlanging",
          id: "Conlanging",
          icon: "https://unprint.pt/static/media/logo.4af0ed03.png",
          color: "#000",
        },
        {
          label: "Fishfarming",
          id: "Fishfarming",
          icon: "https://unprint.pt/static/media/logo.4af0ed03.png",
          color: "#000",
        },
      ]}
      change={() => console.log("change handler")}
      placeholder="Placeholder text"
      inputPlaceholder="Input search placeholder"
      emptyText="List is empty"
      multiple={false}
      clear={true}
      selectedCallback={true}
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
  value: string,
  label: string,
  id: string | number,
  icon?: string,
};

type objectTypes = {
  dateofBirth?: Date,
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
    dateofBirth: new Date("2021-07-07"),
    hobbies: [
      { value: "Fishfarming", label: "Fishfarming", id: "Fishfarming" },
    ],
  };

const onSubmit = () => console.log(data);
const inputChangeHandler = (e: any) =>
  setData((prev) => UpdateObject(prev, { [e.target.name]: e.target.value }));
const dateChangeHandler = (date: MaterialUiPickersDate) =>
  setData((prev) => UpdateObject(prev, { dateofBirth: date }));
const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) =>
  setData((prev) => UpdateObject(prev, { occupation: e.target.value }));
const autocompleteChangeHandler = (data: autocompleteType[]) =>
  setData((prev) => UpdateObject(prev, { hobbies: data }));
const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
  setData((prev) => UpdateObject(prev, { [e.target.name]: e.target.checked }));

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
        name: "fullName",
        type: "text",
        //className: 'focused',
        //defaultValue: '',
        onChange: inputChangeHandler,
      }}
    />
    <InputGroup
      type="date"
      name="dateofBirth"
      placeholder="Date of birth meterial"
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
        <DatePicker
          name="dateofBirth"
          format="yyyy-MM-dd"
          views={["year", "month", "date"]}
          onChange={dateChangeHandler}
          value={data.dateofBirth}
          InputProps={{ disableUnderline: true }}
        />
      </MuiPickersUtilsProvider>
    </InputGroup>
    <InputGroup
      name="age"
      placeholder="Age"
      inputElement={{
        name: "age",
        type: "number",
        onChange: inputChangeHandler,
      }}
    />
    <InputGroup name="email" placeholder="Email">
      <input
        name="email"
        type="email"
        onBlur={SimpleOnBlur}
        onChange={inputChangeHandler}
      />
    </InputGroup>
    <InputGroup
      type="select"
      name="occupation"
      placeholder="Occupation"
      inputElement={{
        name: "occupation",
        defaultValue: "Programmer",
        options: [
          { value: "Designer", label: "Designer" },
          { value: "Programmer", label: "Programmer" },
        ],
        onChange: selectChangeHandler,
      }}
    />
    <InputGroup
      type="autocomplete"
      name="hobbies"
      placeholder="hobbies"
      inputElement={{
        id: "hobbies",
        list: [
          {
            value: "Acroyoga",
            label: "Acroyoga",
            id: "Acroyoga",
          },
          { value: "Conlanging", label: "Conlanging", id: "Conlanging" },
          { value: "Fishfarming", label: "Fishfarming", id: "Fishfarming" },
        ],
        change: autocompleteChangeHandler,
        selected: [
          { value: "Fishfarming", label: "Fishfarming", id: "Fishfarming" },
        ],
        placeholder: "hobbies...",
        inputPlaceholder: "search hobbies...",
        emptyText: "No hobbies to display",
        multiple: true,
        clear: true,
      }}
    />
    <InputGroup
      type="password"
      placeholder="Password"
      inputElement={{
        type: "password",
        id: "password",
        autoComplete: "password-new",
        onChange: inputChangeHandler,
      }}
    />
    <InputGroup type="password" name="rePassword" placeholder="Re-Password">
      <input
        name="rePassword"
        type="password"
        autoComplete="new-password"
        id="rePassword"
        onBlur={SimpleOnBlur}
        onChange={inputChangeHandler}
      />
    </InputGroup>
    <InputGroup
      type="radio"
      name="gender"
      placeholder="Gender"
      inputElement={{
        name: "gender",
        onChange: inputChangeHandler,
        options: [
          { value: "Mail", label: "Mail" },
          { value: "Femail", label: "Femail" },
        ],
      }}
    />

    <InputGroup
      type="checkbox"
      name="privacy"
      placeholder="Privacy"
      inputElement={{
        name: "privacy",
        onChange: checkboxChangeHandler,
        label: "Accept all privacy",
      }}
    />

    <InputGroup
      type="textarea"
      name="feedback"
      placeholder="feedback"
      inputElement={{
        onChange: inputChangeHandler,
        rows: 10,
      }}
    />
    <input type="submit" onClick={onSubmit} />
  </Form>
);
```

## Author

Nimesh Deuja
