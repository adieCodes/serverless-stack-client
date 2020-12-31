// Unable to type this file due to an issue with React Bootstraps handling of onChange in Form's - https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16208

import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      });
    },
  ];
}
