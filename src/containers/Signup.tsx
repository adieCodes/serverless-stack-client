import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Signup.css";
import { Auth } from "aws-amplify";

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const history = useHistory();
  // Can't use ISignUpResult as I can't import it and copying is a chore
  const [newUser, setNewUser] = useState({});
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      if (userHasAuthenticated) {
        userHasAuthenticated(true);
        history.push("/");
      }
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            size="lg"
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <Form.Text muted>Please check your email for the code.</Form.Text>
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            size="lg"
            autoFocus
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
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            size="lg"
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </Form>
    );
  }

  return (
    <div className="Signup">
      {Object.keys(newUser).length === 0
        ? renderForm()
        : renderConfirmationForm()}
    </div>
  );
}
