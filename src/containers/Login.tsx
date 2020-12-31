import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Login.css";

export default function Login() {
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  function validateForm(): boolean {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      if (userHasAuthenticated) {
        userHasAuthenticated(true);
      } else {
        throw new Error("Missing userHasAuthenticated in React.Provider");
      }
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            size="lg"
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            size="lg"
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}
